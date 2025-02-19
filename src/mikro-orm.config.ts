import { defineConfig } from '@mikro-orm/sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import { SqliteDriver } from '@mikro-orm/sqlite';

export default defineConfig({
  driver: SqliteDriver,
  dbName: 'recipes.sqlite3',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
});
