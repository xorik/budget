import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { Category } from '@common/model/category'

@Entity('category')
export class CategoryEntity implements Category {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 100 })
  public title: string

  @Column({ length: 100 })
  public icon: string
}
