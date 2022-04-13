/**
 * 分页
 */
export function usePagination(pagination: any, query: any) {
  const sizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    query()
  }
  const pageChange = (pageNum: number) => {
    console.log('pageNum', pageNum)
    pagination.pageNum = pageNum
    query()
  }
  return {
    sizeChange,
    pageChange
  }
}
