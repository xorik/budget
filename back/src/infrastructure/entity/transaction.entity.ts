import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Transaction } from '@common/model/transaction'

import { CategoryEntity } from './category.entity'

@Entity('transaction')
export class TransactionEntity implements Transaction {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => CategoryEntity)
  public category: CategoryEntity

  @Column()
  public categoryId: number

  @Column({ type: 'timestamp' })
  public date: Date

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  public amount: number
}
