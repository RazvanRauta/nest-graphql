import { GraphQLResolveInfo } from 'graphql';
import { FieldsListOptions, fieldsProjection } from 'graphql-fields-list';

export const fieldsToRelations = (
  info: GraphQLResolveInfo,
  options?: FieldsListOptions,
): string[] => {
  const obj = fieldsProjection(info, options);
  return Object.keys(obj).filter((key) => obj[key] === 1);
};
