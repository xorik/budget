import { AxiosInstance } from 'axios'

import { TransactionCreateDto } from '@common/dto/transaction.dto'

class TransactionService {
  constructor(private readonly api: AxiosInstance) {}

  public async create(data: TransactionCreateDto): Promise<void> {
    await this.api.post('transactions', data)
  }
}

export { TransactionService }
