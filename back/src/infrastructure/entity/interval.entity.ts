import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Interval } from '@common/model/interval'

import { BudgetEntity } from './budget.entity'

@Entity('interval')
export class IntervalEntity implements Interval {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 100 })
  public title: string

  @Column({ type: 'date' })
  public start: string

  @Column({ type: 'date' })
  public end: string

  @OneToMany(
    () => BudgetEntity,
    budget => budget.interval,
    { eager: true, cascade: true },
  )
  public budget: BudgetEntity[]
}
