export function resultSuccess({ data, message = '请求成功' } = {}) {
  return {
    code: 0,
    data,
    message
  }
}

export function resultError({
  data = null,
  message = '请求失败',
  code = -1
} = {}) {
  return {
    code,
    data,
    message
  }
}

export function bodyParser(body) {
  return JSON.parse(body)
}

export function urlParser(url) {
  const stringQuery = url.split('?')[1]
  const query = {}

  const temp = stringQuery.split('&')
  temp.forEach(item => {
    const [key, val] = item.split('=')
    query[key] = val
  })

  return query
}
