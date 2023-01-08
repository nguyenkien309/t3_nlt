import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class migrations1673043548604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders-products',
        columns: [
          {
            name: 'orderId',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'productId',
            type: 'integer ',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'createdAt',
            type: 'timestamp ',
            default: 'current_timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp ',
            default: 'current_timestamp',
          },
          {
            name: 'deleted',
            type: 'boolean ',
            default: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'orders-products',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders-products');
  }
}
