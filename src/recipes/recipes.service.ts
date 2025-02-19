import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe as RecipeModel } from './models/recipe.model';
import { Recipe } from './entities/recipe.entity';
import { EntityManager } from '@mikro-orm/sqlite';

@Injectable()
export class RecipesService {
  constructor(private readonly em: EntityManager) {}
  async create(data: NewRecipeInput): Promise<RecipeModel> {
    const repo = this.em.getRepository(Recipe);
    const recipe = repo.create(new Recipe(data));
    await this.em.persistAndFlush(recipe);
    return new RecipeModel(recipe);
  }

  async findOneById(id: string): Promise<RecipeModel> {
    const repo = this.em.getRepository(Recipe);
    const recipe = await repo.findOneOrFail(id);
    return new RecipeModel(recipe);
  }

  async findAll(recipesArgs: RecipesArgs): Promise<RecipeModel[]> {
    const repo = this.em.getRepository(Recipe);
    const recipes = await repo.findAll({
      offset: recipesArgs.skip,
      limit: recipesArgs.take,
    });
    return recipes.map((recipe) => new RecipeModel(recipe));
  }

  async remove(id: string): Promise<boolean> {
    const repo = this.em.getRepository(Recipe);
    const result = await repo.nativeDelete({ id });
    return result > 0;
  }
}
