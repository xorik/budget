import { AxiosInstance } from 'axios'

import { CategoryStat } from '@common/dto/stat.dto'
import { Transaction } from '@common/model/transaction'

interface StatStorage {
  setStat(stat: CategoryStat[]): void
  addTransaction(transaction: Transaction): void
}

class StatService {
  constructor(
    private readonly api: AxiosInstance,
    private readonly storage: StatStorage,
  ) {}

  public async getStat(): Promise<void> {
    const response = await this.api.get<CategoryStat[]>('stat')

    this.storage.setStat(response.data)
  }

  public addTransaction(transaction: Transaction): void {
    this.storage.addTransaction(transaction)
  }
}

export { StatService, StatStorage }
