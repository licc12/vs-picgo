/* eslint-disable no-template-curly-in-string */
import * as path from 'path'
import { Selection } from 'vscode'

export interface IVSPicgoConfiguration {
  'picgo.configPath': string | undefined
  'picgo.dataPath': string | undefined
  'picgo.customUploadName': string | undefined
  'picgo.customOutputFormat': string | undefined
  'picgo.picBed.current': string | undefined

  // aliyun picBed
  'picgo.picBed.aliyun.accessKeyId': string | undefined
  'picgo.picBed.aliyun.accessKeySecret': string | undefined
  'picgo.picBed.aliyun.bucket': string | undefined
  'picgo.picBed.aliyun.area': string | undefined
  'picgo.picBed.aliyun.path': string | undefined
  'picgo.picBed.aliyun.customUrl': string | undefined

  // github picBed
  'picgo.picBed.github.repo': string | undefined
  'picgo.picBed.github.token': string | undefined
  'picgo.picBed.github.path': string | undefined
  'picgo.picBed.github.customUrl': string | undefined
  'picgo.picBed.github.branch': string | undefined

  // gitlab picBed
  'picgo.picBed.gitlab.host': string | undefined
  'picgo.picBed.gitlab.group': string | undefined
  'picgo.picBed.gitlab.token': string | undefined
  'picgo.picBed.gitlab.branch': string | undefined
  'picgo.picBed.gitlab.project': string | undefined
  'picgo.picBed.gitlab.project_id': string | undefined
  'picgo.picBed.gitlab.path': string | undefined

  // minio picBed
  'picgo.picBed.minio.endPoint'?: string
  'picgo.picBed.minio.subdir'?: string
  'picgo.picBed.minio.port'?: number
  'picgo.picBed.minio.accessKey'?: string
  'picgo.picBed.minio.secretKey'?: string
  'picgo.picBed.minio.bucketName'?: string
  'picgo.picBed.minio.useSSL'?: boolean
  'picgo.picBed.minio.region'?: string
  'picgo.picBed.minio.transport'?: string
  'picgo.picBed.minio.sessionToken'?: string
  'picgo.picBed.minio.partSize'?: number

  // imgur picBed
  'picgo.picBed.imgur.clientId': string | undefined
  'picgo.picBed.imgur.proxy': string | undefined

  // qiniu picBed
  'picgo.picBed.qiniu.accessKey': string | undefined
  'picgo.picBed.qiniu.secretKey': string | undefined
  'picgo.picBed.qiniu.bucket': string | undefined
  'picgo.picBed.qiniu.url': string | undefined
  'picgo.picBed.qiniu.area': string | undefined
  'picgo.picBed.qiniu.options': string | undefined
  'picgo.picBed.qiniu.path': string | undefined

  // sm.ms picBed
  'picgo.picBed.smms.token': string | undefined

  // tcyun picBed
  'picgo.picBed.tcyun.version': string | undefined
  'picgo.picBed.tcyun.secretId': string | undefined
  'picgo.picBed.tcyun.secretKey': string | undefined
  'picgo.picBed.tcyun.bucket': string | undefined
  'picgo.picBed.tcyun.appId': string | undefined
  'picgo.picBed.tcyun.area': string | undefined
  'picgo.picBed.tcyun.path': string | undefined
  'picgo.picBed.tcyun.customUrl': string | undefined

  // upyun picBed
  'picgo.picBed.upyun.bucket': string | undefined
  'picgo.picBed.upyun.operator': string | undefined
  'picgo.picBed.upyun.password': string | undefined
  'picgo.picBed.upyun.options': string | undefined
  'picgo.picBed.upyun.path': string | undefined
  'picgo.picBed.upyun.url': string | undefined

  // weibo picBed
  'picgo.picBed.weibo.chooseCookie': boolean | undefined
  'picgo.picBed.weibo.username': string | undefined
  'picgo.picBed.weibo.quality': string | undefined
  'picgo.picBed.weibo.cookie': string | undefined
}

export type IVSPicgoConfigurationKeys = keyof IVSPicgoConfiguration

export interface IVSPicgoUploadStarterOptions {
  args4uploader: string[] // arguments sent to func,
  editor: {
    content: string
    selection: Selection
  }
}

export const TEST_MD_FILE_PATH = path.join(__dirname, '../../assets/test.md')
export const TEST_PICTURE_PATH = path.join(__dirname, '../../assets/test.png')

export const DEFAULT_CONFIGS: IVSPicgoConfiguration = {
  'picgo.configPath': '',
  'picgo.dataPath': '',
  'picgo.customUploadName': '${fileName}${extName}',
  'picgo.customOutputFormat': '![${uploadedName}](${url})',
  'picgo.picBed.current': 'smms',
  // 'picgo.picBed.current': 'github',

  // aliyun picBed
  'picgo.picBed.aliyun.accessKeyId': '',
  'picgo.picBed.aliyun.accessKeySecret': '',
  'picgo.picBed.aliyun.bucket': '',
  'picgo.picBed.aliyun.area': '',
  'picgo.picBed.aliyun.path': '',
  'picgo.picBed.aliyun.customUrl': '',

  // github picBed
  'picgo.picBed.github.repo': '',
  'picgo.picBed.github.token': '',
  'picgo.picBed.github.path': '',
  'picgo.picBed.github.customUrl': '',
  'picgo.picBed.github.branch': '',

  // gitlab picBed
  'picgo.picBed.gitlab.host': '',
  'picgo.picBed.gitlab.group': '',
  'picgo.picBed.gitlab.token': '',
  'picgo.picBed.gitlab.branch': '',
  'picgo.picBed.gitlab.project': '',
  'picgo.picBed.gitlab.project_id': '',
  'picgo.picBed.gitlab.path': '',

  // minio picBed
  'picgo.picBed.minio.endPoint': '',
  'picgo.picBed.minio.subdir': '',
  'picgo.picBed.minio.port': 443,
  'picgo.picBed.minio.accessKey': '',
  'picgo.picBed.minio.secretKey': '',
  'picgo.picBed.minio.bucketName': '',
  'picgo.picBed.minio.useSSL': true,
  'picgo.picBed.minio.region': '',
  'picgo.picBed.minio.transport': '',
  'picgo.picBed.minio.sessionToken': '',
  'picgo.picBed.minio.partSize': 64,

  // imgur picBed
  'picgo.picBed.imgur.clientId': '',
  'picgo.picBed.imgur.proxy': '',

  // qiniu picBed
  'picgo.picBed.qiniu.accessKey': '',
  'picgo.picBed.qiniu.secretKey': '',
  'picgo.picBed.qiniu.bucket': '',
  'picgo.picBed.qiniu.url': '',
  'picgo.picBed.qiniu.area': 'z0',
  'picgo.picBed.qiniu.options': '',
  'picgo.picBed.qiniu.path': '',

  // sm.ms picBed
  'picgo.picBed.smms.token': 'JxUI4p3alQ8QviKAd4wmQByitBufRqJS', // only for test

  // tcyun picBed
  'picgo.picBed.tcyun.version': 'v5',
  'picgo.picBed.tcyun.secretId': '',
  'picgo.picBed.tcyun.secretKey': '',
  'picgo.picBed.tcyun.bucket': '',
  'picgo.picBed.tcyun.appId': '',
  'picgo.picBed.tcyun.area': '',
  'picgo.picBed.tcyun.path': '',
  'picgo.picBed.tcyun.customUrl': '',

  // upyun picBed
  'picgo.picBed.upyun.bucket': '',
  'picgo.picBed.upyun.operator': '',
  'picgo.picBed.upyun.password': '',
  'picgo.picBed.upyun.options': '',
  'picgo.picBed.upyun.path': '',
  'picgo.picBed.upyun.url': '',

  // weibo picBed
  'picgo.picBed.weibo.chooseCookie': true,
  'picgo.picBed.weibo.username': '',
  'picgo.picBed.weibo.quality': 'large',
  'picgo.picBed.weibo.cookie': ''
}
