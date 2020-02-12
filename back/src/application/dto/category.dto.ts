import { IsNotEmpty } from 'class-validator'

import { CategoryCreateDto as CategoryCreateDtoInterface } from '@common/dto/category.dto'

export class CategoryCreateDto implements CategoryCreateDtoInterface {
  @IsNotEmpty()
  public title: string
  @IsNotEmpty()
  public icon: string
}
