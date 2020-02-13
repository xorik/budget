import axios from 'axios'

import { CategoryService } from '../domain/service/category-service'
import { IntervalService } from '../domain/service/interval-service'
import { categoryModule, intervalModule } from './store'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
})

// Init services
const categoryService = new CategoryService(api, categoryModule)
const intervalService = new IntervalService(api, intervalModule)

// Fill storage
categoryService.list()
intervalService.getCurrent()

export { categoryService, intervalService }
