import axios from 'axios'

import { CategoryService } from '../domain/service/category-service'
import { categoryModule } from './store'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
})
const categoryService = new CategoryService(api, categoryModule)
categoryService.list()

export { categoryService }
