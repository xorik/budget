import { AxiosInstance } from 'axios'

import { BudgetUpdateDto } from '@common/dto/budget.dto'
import { Interval } from '@common/model/interval'

interface IntervalStorage {
  setCurrent(interval: Interval): void
}

class IntervalService {
  constructor(
    private readonly api: AxiosInstance,
    private readonly storage: IntervalStorage,
  ) {}

  public async getCurrent(): Promise<void> {
    const response = await this.api.get<Interval>('intervals/current')

    this.storage.setCurrent(response.data)
  }

  public async save(id: number, data: BudgetUpdateDto[]): Promise<void> {
    const response = await this.api.post<Interval>(
      `intervals/${id}/budget`,
      data,
    )

    this.storage.setCurrent(response.data)
  }
}

export { IntervalService, IntervalStorage }
