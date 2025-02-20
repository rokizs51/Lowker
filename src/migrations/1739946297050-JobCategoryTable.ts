import { MigrationInterface, QueryRunner } from "typeorm";

export class JobCategoryTable1739946297050 implements MigrationInterface {
    name = 'JobCategoryTable1739946297050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "job_category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "job_category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "job_category" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_category" ADD "createdAt" TIMESTAMP NOT NULL`);
    }

}
