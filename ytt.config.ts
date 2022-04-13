import { ChangeCase, defineConfig } from 'yapi-to-typescript'

/**
 * 将方法名称转换为函数名称
 * @param {string} operation_name 方法名称 eg: a.b.c.d
 * @param {string} method 请求方法 eg: put get post...
 * @return {string} eg: "a b c"
 */
const getRequestFuncName = (operation_name: string, method: string) => {
  let funcNameArr = operation_name.split('.')
  if (funcNameArr.length > 2) {
    // 去头去尾
    funcNameArr.pop()
    funcNameArr.shift()
  }
  // 将请求的方法放入队首
  funcNameArr.unshift(method.toLocaleLowerCase())

  return funcNameArr.join(' ')
}

// 获取请求函数的名称
const getRequestFunctionName = (interfaceInfo: any, changeCase: ChangeCase) => {
  const { operation_name, method } = interfaceInfo

  // 以接口全路径生成请求函数名
  return changeCase.camelCase(getRequestFuncName(operation_name, method))
}

// 获取请求数据类型的名称
const getRequestDataTypeName = (interfaceInfo: any, changeCase: ChangeCase) => {
  const { operation_name, method } = interfaceInfo

  // 以接口全路径生成请求函数名
  return changeCase.pascalCase('IRequest ' + getRequestFuncName(operation_name, method))
}

// 获取请求数据类型的名称
const getResponseDataTypeName = (interfaceInfo: any, changeCase: ChangeCase) => {
  const { operation_name, method } = interfaceInfo

  // 以接口全路径生成请求函数名
  return changeCase.pascalCase('IResponse ' + getRequestFuncName(operation_name, method))
}

export default defineConfig([
  {
    serverUrl: 'http://yapi.cocos.org',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false
    },
    dataKey: 'data',
    comment: {
      enabled: true,
      requestHeader: false,
      extraTags: (interfaceInfo: any) => {
        const { status } = interfaceInfo
        return [{ name: '状态', value: status === 'done' ? '已完成' : '未完成' }]
      }
    },
    prodEnvName: 'production',
    outputFilePath: 'src/api/index.ts',
    requestFunctionFilePath: 'src/api/request.ts',
    // 获取请求函数的名称
    getRequestFunctionName,
    // 获取请求数据类型的名称
    getRequestDataTypeName,
    // 获取请求数据类型的名称
    getResponseDataTypeName,
    projects: [
      {
        token: '40f85c0566c1300b41b07358e63d36fc38096e28a6437523c1dd9f8c1f4890da',
        categories: [{ id: 0 }]
      }
    ]
  }
])
