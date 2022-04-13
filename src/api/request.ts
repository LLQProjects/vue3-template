import { RequestFunctionParams } from 'yapi-to-typescript'
import axios from 'axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const instance = axios.create({
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json; charset=utf8'
  }
})

instance.interceptors.request.use(
  (config) => {
    // do something with request data
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    // do something with response
    return response.data
  },
  (error) => {
    console.log(error.toString().indexOf('timeout'))
    Promise.reject(error)
  }
)

/**
 * 取消当前已存在的请求
 */
export function cancelRequest() {
  source.cancel('Operation canceled by the user.')
}

// 有哪些请求不能增加cancelToken的
// const cancelRequestWhiteList = []

/**
 * 默认请求函数
 */
export default async function request<TResponseData>(payload: RequestFunctionParams): Promise<TResponseData> {
  // ...
  // 基于 payload 获取接口信息，
  // 然后对接口发起请求，
  // 接着获取接口响应数据，
  // 并且根据 payload 的相关信息解析响应数据作为请求结果，
  // 最后返回请求结果。
  // ...

  const { mockUrl, path, method } = payload

  try {
    const res = await instance({
      method,
      url: `${mockUrl}${path}`,
      cancelToken: source.token
    })

    return res.data as TResponseData
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }

  // deal with some error or special code here
  // Todo: use interceptors or request
}
