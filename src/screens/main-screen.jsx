import React, { useState, useEffect } from 'react'
import { Box, Heading } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import SortableTable from '../components/sortable-table'
import { getCoinsMarkets } from '../apis/coins'

export default function MainScreen() {
  const [coinList, setCoinList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentOrder, setCurrentOrder] = useState('market_cap_desc')

  useEffect(() => {
    fetchCoinList({ currentPage, currentOrder })
  }, [])

  async function fetchCoinList({ page = currentPage, order = currentOrder }) {
    try {
      setLoading(true)
      const { data } = await getCoinsMarkets({
        vs_currency: 'usd',
        order: order,
        page: page,
        per_page: '25',
        sparkline: false,
      })

      if (page !== currentPage) {
        console.log('page changed, setting coinList')
        setCoinList(prevCoinList => [...prevCoinList, ...data])
        setCurrentPage(prevPage => prevPage + 1)
      } else {
        setCoinList(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function fetchNextPage() {
    fetchCoinList({ page: currentPage + 1 })
  }

  return (
    <Box>
      {/* <Heading fontSize="xl" p="4" pb="3">
        Cryptoassets
      </Heading> */}
      <SortableTable
        coinList={coinList}
        fetchNextPage={fetchNextPage}
        loading={loading}
      />
    </Box>
  )
}
