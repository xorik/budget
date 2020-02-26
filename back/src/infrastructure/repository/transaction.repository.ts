import { EntityRepository, Repository } from 'typeorm'

import { CategoryStat } from '@common/dto/stat.dto'
import { Interval } from '@common/model/interval'

import { TransactionEntity } from '../entity/transaction.entity'

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
  public async getByCategory(interval: Interval): Promise<CategoryStat[]> {
    const result = await this.createQueryBuilder('t')
      .select('SUM(t.amount)', 'sum')
      .addSelect('t.categoryId', 'categoryId')
      .where('t.date >= :start', { start: interval.start })
      .andWhere('t.date < :end', { end: interval.end })
      .groupBy('t.categoryId')
      .getRawMany()

    return result.map(x => ({
      sum: parseFloat(x.sum),
      categoryId: x.categoryId,
    }))
  }
}
