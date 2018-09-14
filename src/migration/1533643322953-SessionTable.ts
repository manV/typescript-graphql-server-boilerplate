import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class SessionTable1533643322953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'token',
            type: 'varchar',
            length: '1000'
          },
          {
            name: 'expiresAt',
            type: 'bigint'
          },
          {
            name: 'createdAt',
            type: 'timestamp without time zone',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp without time zone',
            default: 'now()'
          },
          {
            name: 'userId',
            type: 'int'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('sessions');
  }
}
