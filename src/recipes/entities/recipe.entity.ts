import { ArrayType, Entity, PrimaryKey, Property } from '@mikro-orm/sqlite';
import { v4 } from 'uuid';

@Entity()
export class Recipe {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  title: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  creationDate: Date = new Date();

  @Property({ type: ArrayType })
  ingredients: string[];

  constructor({
    title,
    ingredients,
    description,
  }: {
    title: string;
    ingredients: string[];
    description?: string;
  }) {
    this.title = title;
    this.ingredients = ingredients;
    this.description = description;
  }
}
