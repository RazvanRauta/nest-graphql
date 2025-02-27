import {
  BaseEntity as MikroORMBase,
  PrimaryKey,
  Property,
} from '@mikro-orm/sqlite';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType({ isAbstract: true })
export class BaseEntity extends MikroORMBase {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  public id: string = v4();

  @Field()
  @Property()
  public createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}
