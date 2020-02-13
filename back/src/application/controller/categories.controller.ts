import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CategoryEntity } from '../../infrastructure/entity/category.entity'
import { CategoryCreateDto } from '../dto/category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  @Get()
  public async getList(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find()
  }

  @Post()
  public async add(
    @Body() category: CategoryCreateDto,
  ): Promise<CategoryEntity> {
    return await this.categoryRepository.save(category)
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: CategoryCreateDto,
  ): Promise<CategoryEntity> {
    let category = await this.categoryRepository.findOne(parseInt(id))

    if (category === undefined) {
      throw new NotFoundException()
    }

    category = Object.assign(category, data)
    await this.categoryRepository.save(category)

    return category
  }
}
