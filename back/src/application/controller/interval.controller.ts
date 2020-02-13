import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BudgetUpdateDto } from '@common/dto/budget.dto'

import { BudgetEntity } from '../../infrastructure/entity/budget.entity'
import { IntervalEntity } from '../../infrastructure/entity/interval.entity'

@Controller('intervals')
@UseInterceptors(ClassSerializerInterceptor)
export class IntervalController {
  constructor(
    @InjectRepository(IntervalEntity)
    private readonly intervalRepository: Repository<IntervalEntity>,
  ) {}

  @Get('current')
  public async current(): Promise<IntervalEntity> {
    return await this.intervalRepository.findOne(1)
  }

  // TODO: validate DTO
  @Post(':id/budget')
  public async updateBudget(
    @Param('id') id: string,
    @Body() data: BudgetUpdateDto[],
  ): Promise<IntervalEntity> {
    const interval = await this.intervalRepository.findOne(parseInt(id))

    if (interval === undefined) {
      throw new NotFoundException()
    }

    for (const dto of data) {
      const budgetIndex = interval.budget.findIndex(
        x => x.categoryId === dto.categoryId,
      )

      // Update
      if (budgetIndex >= 0) {
        interval.budget[budgetIndex].amount = dto.amount
      } else {
        // Create
        const budget = new BudgetEntity()
        budget.amount = dto.amount
        budget.categoryId = dto.categoryId

        interval.budget.push(budget)
      }
    }

    await this.intervalRepository.save(interval)

    return interval
  }
}
