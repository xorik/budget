import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from '../infrastructure/entity/category.entity'
import { IntervalEntity } from '../infrastructure/entity/interval.entity'
import { CategoriesController } from './controller/categories.controller'
import { IntervalController } from './controller/interval.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([CategoryEntity, IntervalEntity]),
  ],
  controllers: [CategoriesController, IntervalController],
  providers: [],
})
export class AppModule {}
