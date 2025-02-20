import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739869073157 implements MigrationInterface {
    name = 'CreateTables1739869073157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "job_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_category" ADD "job_id" integer NOT NULL`);
    }

}
