## NestJs | GraphQL | Mikro Orm

Example of using NestJs with GraphQL and Mikro ORM

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Migrations

```bash
# create
$ mikro-orm migration:create

# migrate up to the latest version
$ mikro-orm migration:up 

# migrate one step down
$ mikro-orm migration:down 

#clear the database and rerun all migrations
$ mikro-orm migration:fresh   
```

## GraphQL Playground

The playground can be accessed here: [http://localhost:3000/graphql](http://localhost:3000/graphql)

Example of mutation:

```gql
mutation AddRecipeMutation {
  addRecipe(
    newRecipeData: {
      ingredients: ["Water", "Salt"]
      title: "My Recipe"
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ) {
    id
  }
}
```

Example of query:

```gql
query AllRecipesIds {
  recipes {
    id
  }
}
```
