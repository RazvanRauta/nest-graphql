import { ArrayType, Entity, ManyToOne, Property, Ref } from '@mikro-orm/sqlite';
import { Directive, Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/entities/entity.base';
import { Author } from '../../authors/entities/author.entity';
import { NewRecipeInput } from '../dto/new-recipe.input';

@ObjectType({ description: 'recipe' })
@Entity()
export class Recipe extends BaseEntity {
  @Directive('@upper')
  @Field()
  @Property()
  title: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => [String])
  @Property({ type: ArrayType })
  ingredients: string[];

  @Field(() => Author)
  @ManyToOne(() => Author, { ref: true })
  author: Ref<Author>;

  constructor(body: NewRecipeInput) {
    super(body);
  }
}
