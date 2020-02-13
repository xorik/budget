import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Budget } from '@common/model/budget'

import { CategoryEntity } from './category.entity'
import { IntervalEntity } from './interval.entity'

@Entity('budget')
@Index(['interval', 'category'], { unique: true })
export class BudgetEntity implements Budget {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number

  @ManyToOne(() => IntervalEntity)
  public interval: IntervalEntity

  @ManyToOne(() => CategoryEntity)
  public category: CategoryEntity

  @Column()
  public categoryId: number

  @Column()
  public amount: number
}
