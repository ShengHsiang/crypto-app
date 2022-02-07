import React, { useCallback } from 'react'
import {
  Text,
  FlatList,
  HStack,
  VStack,
  Box,
  Center,
  Avatar,
  Spinner,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RefreshControl } from 'react-native'

function _renderListItem({ item }) {
  const formatPrice = price => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return formatter.format(price)
  }

  const formatPricePercentage = price => {
    if (!price) return '-'
    return `${price.toFixed(2)}%`
  }

  const formatMarketCap = marketCap => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    return formatter.format(marketCap)
  }

  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="2"
      pr="3"
      py="2"
    >
      <HStack space={2} justifyContent="space-between">
        <Center width={8}>
          <Text fontSize="2xs">{item.market_cap_rank}</Text>
        </Center>
        <VStack alignItems="center" width={12}>
          <Avatar
            size="24px"
            source={{
              uri: item.image,
            }}
          />
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            bold
            fontSize="2xs"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item.symbol.toUpperCase()}
          </Text>
        </VStack>
        <Center minW={16}>
          <Text
            fontSize="xs"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            alignSelf="flex-end"
          >
            {formatPrice(item.current_price)}
          </Text>
        </Center>
        <Center minW={16}>
          <Text
            fontSize="xs"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            alignSelf="flex-end"
          >
            {formatPricePercentage(item.price_change_percentage_24h)}
          </Text>
        </Center>
        <Center minW={32}>
          <Text
            fontSize="xs"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            alignSelf="flex-end"
          >
            {formatMarketCap(item.market_cap)}
          </Text>
        </Center>
      </HStack>
    </Box>
  )
}

function _renderListFooter() {
  return (
    <Center py={4}>
      <Spinner />
    </Center>
  )
}

function SortableTable({
  coinList,
  fetchNextPage,
  loading,
  isRefresh,
  _renderListHeader,
}) {
  function onEndReached() {
    if (loading) return
    fetchNextPage()
  }

  return (
    <FlatList
      data={coinList}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={_renderListFooter}
      ListHeaderComponent={_renderListHeader}
      renderItem={_renderListItem}
      refreshing={isRefresh}
      refreshControl={
        <RefreshControl
          refreshing={isRefresh}
          colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
          progressBackgroundColor="#ffffff"
        />
      }
    />
  )
}

export default SortableTable
