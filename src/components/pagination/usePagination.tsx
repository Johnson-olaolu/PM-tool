import React, { useMemo } from 'react'

interface IusePagination {
    totalCount: number,
    pageSize : number,
    siblingCount : number,
    currentPage : number
}

const usePagination  = () => {
    const paginationRange = useMemo(() => {

    }, [])
  return paginationRange
}

export default usePagination