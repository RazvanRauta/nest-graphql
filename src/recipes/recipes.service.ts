/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './entities/recipe.entity';
import { EntityManager, LoadHint, PopulatePath } from '@mikro-orm/sqlite';
import { GraphQLResolveInfo } from 'graphql';
import { fieldsToRelations } from 'src/utils/grapql';
import { Author } from 'src/authors/entities/author.entity';
import { wrap } from '@mikro-orm/sqlite';

export type RecipeFieldType = LoadHint<
  Recipe,
  never,
  PopulatePath.ALL,
  never
>['fields'];
@Injectable()
export class RecipesService {
  constructor(private readonly em: EntityManager) {}
  async create(data: NewRecipeInput): Promise<Recipe> {
    const repo = this.em.getRepository(Recipe);
    const authorRepo = this.em.getRepository(Author);
    let author = await authorRepo.findOne({ name: 'test' });

    if (!author) {
      author = authorRepo.create(
        new Author({
          name: 'test',
          email: 'test',
          termsAccepted: true,
          born: new Date(),
        }),
      );
    }
    const recipe = repo.create(new Recipe(data));
    wrap(recipe).assign({ author });
    await this.em.persistAndFlush(recipe);
    return recipe;
  }

  async findOneById(id: string, info: GraphQLResolveInfo): Promise<Recipe> {
    const fields = fieldsToRelations(info) as any;
    const recipe = await this.em
      .getRepository(Recipe)
      .findOneOrFail({ id }, { fields, populate: fields });

    return wrap(recipe).toObject() as unknown as Recipe;
  }

  async findAll(
    recipesArgs: RecipesArgs,
    info: GraphQLResolveInfo,
  ): Promise<Recipe[]> {
    const fields = fieldsToRelations(info) as any;

    const repo = this.em.getRepository(Recipe);
    const recipes = await repo.findAll({
      offset: recipesArgs.skip,
      limit: recipesArgs.take,
      fields,
      populate: fields,
    });

    return recipes.map(
      (recipe) => wrap(recipe).toObject() as unknown as Recipe,
    );
  }

  async remove(id: string): Promise<boolean> {
    const repo = this.em.getRepository(Recipe);
    const result = await repo.nativeDelete({ id });
    return result > 0;
  }
}
