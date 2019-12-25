import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMusing1577269935665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `musing` (\
    `id` bigint NOT NULL AUTO_INCREMENT,\
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성일자',\
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '수정일자',\
    `quote` text NOT NULL,\
    `from` varchar(255) NOT NULL,\
    `language` varchar(255) NOT NULL,\
    PRIMARY KEY (`id`))")
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("musings");
    }

}
