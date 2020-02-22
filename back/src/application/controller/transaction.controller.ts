import { Body, Controller, Post } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TransactionCreateDto } from '@common/dto/transaction.dto'

import { TransactionEntity } from '../../infrastructure/entity/transaction.entity'

@Controller('transactions')
export class TransactionController {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  @Post()
  public async add(
    @Body() transaction: TransactionCreateDto,
  ): Promise<TransactionEntity> {
    return await this.transactionRepository.save(transaction)
  }
}
