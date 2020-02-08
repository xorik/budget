import { AxiosInstance } from 'axios'

import { CategoryCreateDto } from '../../../../_common/dto/category.dto'
import { Category } from '../../../../_common/model/category'

export class CategoryService {
  constructor(private api: AxiosInstance) {}

  public async list(): Promise<Category[]> {
    const response = await this.api.get<Category[]>('/categories')

    return response.data
  }

  public async create(data: CategoryCreateDto): Promise<Category> {
    const response = await this.api.post<Category>('/categories', data)

    return response.data
  }

  public async update(id: number, data: CategoryCreateDto): Promise<Category> {
    const response = await this.api.put<Category>(`/categories/${id}`, data)

    return response.data
  }
}
