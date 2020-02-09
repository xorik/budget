import { AxiosInstance } from 'axios'

import { CategoryCreateDto } from '../../../../_common/dto/category.dto'
import { Category } from '../../../../_common/model/category'

interface CategoryStorage {
  setCategories(categories: Category[]): void
  addCategory(category: Category): void
  updateCategory(category: Category): void
}

class CategoryService {
  constructor(
    private readonly api: AxiosInstance,
    private readonly storage: CategoryStorage,
  ) {}

  public async list(): Promise<void> {
    const response = await this.api.get<Category[]>('/categories')

    this.storage.setCategories(response.data)
  }

  public async create(data: CategoryCreateDto): Promise<void> {
    const response = await this.api.post<Category>('/categories', data)

    this.storage.addCategory(response.data)
  }

  public async update(id: number, data: CategoryCreateDto): Promise<void> {
    const response = await this.api.put<Category>(`/categories/${id}`, data)

    this.storage.updateCategory(response.data)
  }
}

export { CategoryService, CategoryStorage }
