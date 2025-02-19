import { Migration } from '@mikro-orm/migrations';

export class Migration20250219114853 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`recipe\` (\`id\` text not null, \`title\` text not null, \`description\` text null, \`creation_date\` datetime not null, \`ingredients\` text not null, primary key (\`id\`));`);
  }

}
