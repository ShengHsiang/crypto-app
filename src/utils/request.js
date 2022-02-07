import axios from 'axios'
const DEFAULT_API_URI = 'https://api.coingecko.com/api/v3'
const DEFAULT_TIMEOUT = 30000

// create an axios instance
const service = axios.create({
  baseURL: DEFAULT_API_URI,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: DEFAULT_TIMEOUT,
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return {
        data: response.data,
      }
    } else {
      Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
