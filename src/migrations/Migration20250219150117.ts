import { Migration } from '@mikro-orm/migrations';

export class Migration20250219150117 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`author\` (\`id\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null, \`email\` text not null, \`terms_accepted\` integer not null, \`born\` datetime null, primary key (\`id\`));`);
    this.addSql(`create unique index \`author_email_unique\` on \`author\` (\`email\`);`);

    this.addSql(`create table \`recipe\` (\`id\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`title\` text not null, \`description\` text null, \`ingredients\` text not null, \`author_id\` text not null, constraint \`recipe_author_id_foreign\` foreign key(\`author_id\`) references \`author\`(\`id\`) on update cascade, primary key (\`id\`));`);
    this.addSql(`create index \`recipe_author_id_index\` on \`recipe\` (\`author_id\`);`);
  }

}
