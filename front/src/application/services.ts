import axios from 'axios'

import { CategoryService } from '../domain/service/category-service'
import { IntervalService } from '../domain/service/interval-service'
import { StatService } from '../domain/service/stat-service'
import { TransactionService } from '../domain/service/transaction-service'
import { categoryModule, intervalModule, statModule } from './store'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
})

// Init services
const categoryService = new CategoryService(api, categoryModule)
const intervalService = new IntervalService(api, intervalModule)
const statService = new StatService(api, statModule)
const transactionService = new TransactionService(api, statService)

// Fill storage
categoryService.list()
intervalService.getCurrent()
statService.getStat()

export { categoryService, intervalService, transactionService, statService }
