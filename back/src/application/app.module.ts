import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from '../infrastructure/entity/category.entity'
import { IntervalEntity } from '../infrastructure/entity/interval.entity'
import { TransactionRepository } from '../infrastructure/repository/transaction.repository'
import { CategoriesController } from './controller/categories.controller'
import { IntervalController } from './controller/interval.controller'
import { StatController } from './controller/stat.controller'
import { TransactionController } from './controller/transaction.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      CategoryEntity,
      IntervalEntity,
      TransactionRepository,
    ]),
  ],
  controllers: [
    CategoriesController,
    IntervalController,
    TransactionController,
    StatController,
  ],
  providers: [],
})
export class AppModule {}
