import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe' })
export class Recipe {
  @Field(() => ID)
  id: string;

  @Directive('@upper')
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];

  constructor({
    id,
    title,
    ingredients,
    description,
    creationDate,
  }: {
    id: string;
    title: string;
    ingredients: string[];
    description?: string;
    creationDate: Date;
  }) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.description = description;
    this.creationDate = creationDate;
  }
}
