import axios from 'axios'

import { CategoryService } from '../domain/service/category-service'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
})

const categoryService = new CategoryService(api)

export { categoryService }
