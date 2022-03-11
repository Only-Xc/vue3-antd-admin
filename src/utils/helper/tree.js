const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = config => Object.assign({}, DEFAULT_CONFIG, config)

/**
 * 将扁平树转换为树形结构
 * @param {Array} list 扁平树
 * @param {Object} config 配置
 * @returns 树形结构
 */
export function toTree(list, config) {
  const conf = getConfig(config)
  const nodeMap = new Map()
  const result = []
  const { id, children, pid } = conf

  for (let i = 0; i < list.length; i++) {
    const node = list[i]
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }

  for (let i = 0; i < list.length; i++) {
    const node = list[i]
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent[children] : result).push(node)
  }

  return result
}

/**
 * 将树形结构扁平化
 * @param {Array} tree 树形结构
 * @param {Object} config 配置
 * @param {Boolean} deleteChildren 是否删除 children
 * @returns 扁平树
 */
export function flatTree(tree, config, deleteChildren = true) {
  const conf = getConfig(config)
  const { children } = conf
  const result = [...tree]

  for (let i = 0; i < result.length; i++) {
    const node = result[i]
    console.log(node, node?.[children])
    if (!node?.[children]) continue
    result.splice(i + 1, 0, ...node[children])
    deleteChildren && delete node[children]
  }

  return result
}
