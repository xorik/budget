import { Controller, Get } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CategoryStat } from '@common/dto/stat.dto'

import { IntervalEntity } from '../../infrastructure/entity/interval.entity'
import { TransactionRepository } from '../../infrastructure/repository/transaction.repository'

@Controller('stat')
export class StatController {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @InjectRepository(IntervalEntity)
    private readonly intervalRepository: Repository<IntervalEntity>,
  ) {}

  @Get()
  public async stat(): Promise<CategoryStat[]> {
    const interval = await this.intervalRepository.findOne(1)

    return this.transactionRepository.getByCategory(interval)
  }
}
