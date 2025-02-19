import {
  Entity,
  Property,
  Unique,
  OneToMany,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/entity.base';
import { Recipe } from '../../recipes/entities/recipe.entity';

@ObjectType({ description: 'author' })
@Entity()
export class Author extends BaseEntity {
  @Field()
  @Property()
  public name: string;

  @Field()
  @Property()
  @Unique()
  public email: string;

  @Property()
  public termsAccepted = false;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public born?: Date;

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, (r: Recipe) => r.author, { cascade: [Cascade.ALL] })
  public recipes = new Collection<Recipe>(this);

  constructor(body: {
    name: string;
    email: string;
    termsAccepted?: boolean;
    born?: Date;
  }) {
    super(body);
  }
}
