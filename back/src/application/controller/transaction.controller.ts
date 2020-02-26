import { Body, Controller, Post } from '@nestjs/common'

import { TransactionCreateDto } from '@common/dto/transaction.dto'

import { TransactionEntity } from '../../infrastructure/entity/transaction.entity'
import { TransactionRepository } from '../../infrastructure/repository/transaction.repository'

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  @Post()
  public add(
    @Body() transaction: TransactionCreateDto,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(transaction)
  }
}
