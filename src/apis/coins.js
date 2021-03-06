import request from '../utils/request'

export function getCoinsMarkets({
  vs_currency = 'usd',
  order = 'market_cap_desc',
  per_page = '25',
  page = '1',
  sparkline = false,
}) {
  return request({
    url: '/coins/markets',
    method: 'get',
    params: {
      vs_currency,
      order,
      per_page,
      page,
      sparkline,
    },
  })
}
