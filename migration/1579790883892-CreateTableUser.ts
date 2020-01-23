import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1579790883892 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `user` (\
            `id` int NOT NULL AUTO_INCREMENT,\
            `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),\
            `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),\
            `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL,\
            UNIQUE INDEX `ux_user_email` (`email`),\
            PRIMARY KEY (`id`))')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
    }
}
