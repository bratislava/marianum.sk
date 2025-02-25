import axios from 'axios'
import { auth } from '@strapi/helper-plugin'

/**
 *
 * Copied from OLO waste-collection-days plugin https://github.com/bratislava/olo.sk/tree/master/strapi/src/plugins/waste-collection-days-import
 *
 */

const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
})

instance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${auth.getToken()}`

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    if (error.response?.status === 401) {
      auth.clearAppStorage()
      window.location.reload()
    }

    throw error
  },
)

export default instance
