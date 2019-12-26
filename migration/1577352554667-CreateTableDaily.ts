import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableDaily1577352554667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `daily` (\
            `id` int NOT NULL AUTO_INCREMENT,\
            `seq` int NOT NULL,\
            `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),\
            `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),\
            `title` varchar(255) NOT NULL,\
            `slug` varchar(255) NOT NULL,\
            `content` text NOT NULL,\
            UNIQUE INDEX `ux_daily_seq` (`seq`),\
            UNIQUE INDEX `ux_daily_slug` (`slug`),\
            PRIMARY KEY (`id`))');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropTable("daily");
    }
}
