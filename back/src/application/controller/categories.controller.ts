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

import { CategoryCreateDto } from '@common/dto/category.dto'
import { Category } from '@common/model/category'

import { CategoryEntity } from '../../infrastructure/entity/category.entity'

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  @Get()
  public async getList(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  @Post()
  public async add(@Body() category: CategoryCreateDto): Promise<Category> {
    return await this.categoryRepository.save(category)
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: CategoryCreateDto,
  ): Promise<Category> {
    let category = await this.categoryRepository.findOne(parseInt(id))

    if (category === undefined) {
      throw new NotFoundException()
    }

    category = Object.assign(category, data)
    await this.categoryRepository.save(category)

    return category
  }
}
