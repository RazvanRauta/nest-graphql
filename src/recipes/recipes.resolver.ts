import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Info,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { RecipesArgs } from './dto/recipes.args';
import { RecipesService } from './recipes.service';
import { NewRecipeInput } from './dto/new-recipe.input';
import { GraphQLResolveInfo } from 'graphql';
import { Recipe } from './entities/recipe.entity';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => Recipe)
  async recipe(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id, info);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(() => [Recipe])
  recipes(
    @Args() recipesArgs: RecipesArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs, info);
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    await pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription(() => Recipe)
  recipeAdded() {
    return pubSub.asyncIterableIterator('recipeAdded');
  }
}
