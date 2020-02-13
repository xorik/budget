import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

import { Category } from '@common/model/category'

import { CategoryStorage } from '../../domain/service/category-service'

const CATEGORY_MODULE = 'category'

@Module({ name: CATEGORY_MODULE, namespaced: true })
class CategoryModule extends VuexModule implements CategoryStorage {
  public categories: Category[] = []

  @Mutation
  public setCategories(categories: Category[]): void {
    this.categories = categories
  }

  @Mutation
  public addCategory(category: Category): void {
    this.categories.push(category)
  }

  @Mutation
  public updateCategory(category: Category): void {
    const index = this.categories.findIndex(v => v.id === category.id)
    this.categories.splice(index, 1, category)
  }
}

export { CategoryModule, CATEGORY_MODULE }
