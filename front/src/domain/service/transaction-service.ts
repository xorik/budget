import { AxiosInstance } from 'axios'

import { TransactionCreateDto } from '@common/dto/transaction.dto'
import { Transaction } from '@common/model/transaction'

import { StatService } from './stat-service'

class TransactionService {
  constructor(
    private readonly api: AxiosInstance,
    private readonly statService: StatService,
  ) {}

  public async create(data: TransactionCreateDto): Promise<void> {
    const response = await this.api.post<Transaction>('transactions', data)
    this.statService.addTransaction(response.data)
  }
}

export { TransactionService }
