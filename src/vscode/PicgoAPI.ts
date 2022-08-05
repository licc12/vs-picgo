import { IConfig, PicGo, IHelper, LifecyclePlugins, IPluginConfig } from 'picgo'
import { DataStore } from './DataStore'
import vscode from 'vscode'
import { decorateMessage, showError, showInfo } from './utils'
import { defaultSettings } from './settings'
import _ from 'lodash-es'
import { Get } from 'type-fest'
export type GetConfig<T extends string> = Get<IConfig, T>

export interface IUploaderConfig {
  uploaderName: string
  uploaderID: string
  configList?: IPluginConfig[]
}

export class PicgoAPI {
  static picgoAPI = new PicgoAPI()

  private readonly picgo: PicGo
  helper: IHelper
  constructor() {
    this.picgo = new PicGo(DataStore.dataStore.configPath)
    this.picgo.saveConfig({
      debug: true
    })
    this.initConfig()
    this.helper = this.picgo.helper
  }

  initConfig() {
    const host = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.host')
    if (host) {
      this.setConfig('picBed.gitlab.host', host)
    }

    const group = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.group')
    if (group) {
      this.setConfig('picBed.gitlab.group', group)
    }
    const project = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.project')
    if (project) {
      this.setConfig('picBed.gitlab.project', project)
    }

    const projectId = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.project_id')
    if (projectId) {
      this.setConfig('picBed.gitlab.project_id', projectId)
    }

    const branch = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.branch')
    if (branch) {
      this.setConfig('picBed.gitlab.branch', branch)
    }

    const token = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.token')
    if (token) {
      this.setConfig('picBed.gitlab.token', token)
    }

    const path = vscode.workspace
      .getConfiguration()
      .get('picgo.picBed.gitlab.path')
    if (path) {
      this.setConfig('picBed.gitlab.path', path)
    }

    const customOutputFormat = vscode.workspace
      .getConfiguration()
      .get('picgo.customOutputFormat')

    this.setConfig(
      'settings.vsPicgo.customOutputFormat',
      customOutputFormat || defaultSettings.settings.vsPicgo.customOutputFormat
    )

    const customUploadName = vscode.workspace
      .getConfiguration()
      .get('picgo.customUploadName')

    this.setConfig(
      'settings.vsPicgo.customUploadName',
      customUploadName || defaultSettings.settings.vsPicgo.customUploadName
    )
  }

  setConfigIfNotExist<T extends string>(configName: T, value: GetConfig<T>) {
    const config = this.picgo.getConfig<GetConfig<T>>(configName)
    if (!config) {
      this.picgo.saveConfig({
        [configName]: value
      })
    }
    return config ?? value
  }

  getConfig<T extends string>(configName: T): GetConfig<T> {
    return this.setConfigIfNotExist(
      configName,
      _.get(defaultSettings, configName)
    )
  }

  setConfig<T extends string>(configName: T, value: GetConfig<T>) {
    this.picgo.saveConfig({
      [configName]: value
    })
  }

  getAllUploaders() {
    return this.picgo.helper.uploader.getIdList()
  }

  handleConfigWithFunction = (configList?: IPluginConfig[]) => {
    if (!configList) return
    for (const config of configList) {
      if (typeof config.default === 'function') {
        config.default = config.default()
      }
      if (typeof config.choices === 'function') {
        config.choices = config.choices()
      }
    }
    return configList
  }

  getAllUploaderConfigs(): IUploaderConfig[] {
    return this.getAllUploaders().map((uploaderID) => {
      const uploader = this.picgo.helper.uploader.get(uploaderID)
      const uploaderName = uploader?.name ?? uploaderID
      const configList = this.handleConfigWithFunction(
        uploader?.config?.(this.picgo)
      )
      return {
        uploaderID,
        uploaderName,
        configList
      }
    })
  }

  /**
   * @param input This image file paths to be uploaded, will upload from clipboard if no input specified
   */
  async upload(input?: string[]) {
    // uploading progress, must be parallel with `picgo.upload` to catch events
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: decorateMessage('image uploading...'),
        cancellable: false
      },
      async (progress) => {
        return await new Promise<void>((resolve, reject) => {
          const onUploadProgress = (p: number) => {
            progress.report({ increment: p })
            if (p === 100) {
              cancelListeners.call(this)
              resolve()
            }
          }
          const onFailed = (error: Error) => {
            const errorReason = error.message || 'Unknown error'
            cancelListeners.call(this)
            showError(errorReason)
            resolve()
          }
          const onNotification = (notice: INotice) => {
            const errorReason = `${notice.title}! ${notice.body || ''}${
              notice.text || ''
            }`
            cancelListeners.call(this)
            showError(errorReason)
            resolve()
          }
          this.picgo.on('uploadProgress', onUploadProgress)
          this.picgo.on('failed', onFailed)
          this.picgo.on('notification', onNotification)
          function cancelListeners(this: PicgoAPI) {
            this.picgo.off('uploadProgress', onUploadProgress)
            this.picgo.off('failed', onFailed)
            this.picgo.off('notification', onNotification)
          }
        })
      }
    )

    // Error has been handled in on 'failed', so we just catch error to avoid unhandled rejected promise
    // Note that all unhandled promise in extension will be caught by vscode and show a warning like "command ran failed", which is not what we want
    return await this.picgo
      .upload(input)
      .catch(() => {})
      .then((res) => {
        if (res instanceof Error) return void 0
        else if (res) {
          DataStore.dataStore.db.insertMany(res)
          showInfo(`${res.length} image uploaded successfully.`)
          return res
        }
      })
  }

  setCurrentPluginName(name: string) {
    LifecyclePlugins.currentPlugin = name
  }
}

export interface INotice {
  body: string
  text: string
  title: string
}
