import React, { useState, useEffect } from 'react'
import { Box, Center, VStack, HStack, Text, Pressable } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import SortableTable from '../components/sortable-table'
import { getCoinsMarkets } from '../apis/coins'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function MainScreen() {
  const [coinList, setCoinList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentOrder, setCurrentOrder] = useState({
    name: 'market_cap',
    direction: 'desc',
  })

  useEffect(async () => {
    setIsRefresh(true)
    await fetchCoinList({ page: 1, order: getOrderState() })
    setIsRefresh(false)
  }, [currentOrder])

  function getOrderState() {
    return `${currentOrder.name}_${currentOrder.direction}`
  }

  async function fetchCoinList({ page = 0, order = null }) {
    try {
      const { data } = await getCoinsMarkets({
        vs_currency: 'usd',
        // 'gecko_desc', 'gecko_asc', 'market_cap_asc', 'market_cap_desc', 'volume_asc', 'volume_desc', 'id_asc', 'id_desc'
        order: order,
        page: page,
        per_page: '25',
        sparkline: false,
      })

      if (page === 1) {
        setCoinList(data)
      } else {
        setCoinList(prevCoinList => {
          data.forEach(coin => {
            if (
              prevCoinList.length === 0 ||
              !prevCoinList.find(c => c.id === coin.id)
            ) {
              prevCoinList.push(coin)
            }
          })
          return prevCoinList
        })
        setCurrentPage(prevPage => prevPage + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchNextPage() {
    setLoading(true)
    await fetchCoinList({ page: currentPage + 1, order: getOrderState() })
    setLoading(false)
  }

  async function setCoinListOrder(order) {
    const isToggleCurrentOrder = order === currentOrder.name
    if (isToggleCurrentOrder) {
      setCurrentOrder(prevOrder => {
        return {
          ...prevOrder,
          direction: prevOrder.direction === 'desc' ? 'asc' : 'desc',
        }
      })
    } else {
      setCurrentOrder(prevOrder => {
        return {
          ...prevOrder,
          name: order,
        }
      })
    }
  }

  function _renderListHeader() {
    return (
      <Box pl="2" pr="3" py="2">
        <HStack space={2} justifyContent="space-between">
          <Pressable onPress={() => setCoinListOrder('gecko')}>
            <HStack width={8} justifyContent="center" alignItems="center">
              <Text alignSelf="flex-end" fontSize="xs">
                #
              </Text>
              {currentOrder.name === 'gecko' &&
                (currentOrder.direction === 'desc' ? (
                  <MaterialCommunityIcons
                    name="arrow-down-thick"
                    size={16}
                    color="blue"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-up-thick"
                    size={16}
                    color="blue"
                  />
                ))}
            </HStack>
          </Pressable>
          <Pressable onPress={() => setCoinListOrder('id')}>
            <HStack width={12} justifyContent="center" alignItems="center">
              <Text fontSize="xs">COIN</Text>
              {currentOrder.name === 'id' &&
                (currentOrder.direction === 'desc' ? (
                  <MaterialCommunityIcons
                    name="arrow-down-thick"
                    size={16}
                    color="blue"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-up-thick"
                    size={16}
                    color="blue"
                  />
                ))}
            </HStack>
          </Pressable>
          <Center minW={16}>
            <Text alignSelf="flex-end">PRICE</Text>
          </Center>
          <Center minW={16}>
            <Text alignSelf="flex-end">24H</Text>
          </Center>
          <Pressable onPress={() => setCoinListOrder('market_cap')}>
            <HStack minW={32} justifyContent="flex-end" alignItems="center">
              <Text alignSelf="flex-end" fontSize="xs">
                MARKET CAP
              </Text>
              {currentOrder.name === 'market_cap' &&
                (currentOrder.direction === 'desc' ? (
                  <MaterialCommunityIcons
                    name="arrow-down-thick"
                    size={16}
                    color="blue"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-up-thick"
                    size={16}
                    color="blue"
                  />
                ))}
            </HStack>
          </Pressable>
        </HStack>
      </Box>
    )
  }

  return (
    <VStack>
      <SortableTable
        loading={loading}
        isRefresh={isRefresh}
        coinList={coinList}
        fetchNextPage={fetchNextPage}
        _renderListHeader={_renderListHeader}
      />
    </VStack>
  )
}
