import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from '../infrastructure/entity/category.entity'
import { IntervalEntity } from '../infrastructure/entity/interval.entity'
import { TransactionEntity } from '../infrastructure/entity/transaction.entity'
import { CategoriesController } from './controller/categories.controller'
import { IntervalController } from './controller/interval.controller'
import { TransactionController } from './controller/transaction.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      CategoryEntity,
      IntervalEntity,
      TransactionEntity,
    ]),
  ],
  controllers: [
    CategoriesController,
    IntervalController,
    TransactionController,
  ],
  providers: [],
})
export class AppModule {}
