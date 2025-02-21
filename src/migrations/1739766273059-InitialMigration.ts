import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1739766273059 implements MigrationInterface {
    name = 'InitialMigration1739766273059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`CREATE TABLE "job_category" ("id" SERIAL NOT NULL, "job_id" integer NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_15f44c4b9fbb84e28a0346e930f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_0c4e9330020ee70d765dff04867" UNIQUE ("name"), CONSTRAINT "PK_4257e6a577f466ed9123a55df3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_job_type_enum" AS ENUM('full_time', 'part_time', 'contract', 'internship')`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "experience" integer NOT NULL, "education" character varying NOT NULL, "salary_min" integer, "salary_max" integer, "job_type" "public"."jobs_job_type_enum" NOT NULL, "age" integer NOT NULL, "work_schedule" character varying NOT NULL, "location" character varying NOT NULL, "gender" "public"."jobs_gender_enum" NOT NULL, "isActive" boolean NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "jobCategoryId" integer, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobs_tags_job_tag" ("jobsId" integer NOT NULL, "jobTagId" uuid NOT NULL, CONSTRAINT "PK_fd9f9270a8ee92d8181cddb1afa" PRIMARY KEY ("jobsId", "jobTagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e111cfd0ec2429c6e45dcd6b47" ON "jobs_tags_job_tag" ("jobsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87875e6484cc4e59a30bf4f34a" ON "jobs_tags_job_tag" ("jobTagId") `);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_8bfcd4b06680a050132fcf3408a" FOREIGN KEY ("jobCategoryId") REFERENCES "job_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "FK_e111cfd0ec2429c6e45dcd6b475" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "FK_87875e6484cc4e59a30bf4f34a2" FOREIGN KEY ("jobTagId") REFERENCES "job_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "FK_87875e6484cc4e59a30bf4f34a2"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "FK_e111cfd0ec2429c6e45dcd6b475"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_8bfcd4b06680a050132fcf3408a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87875e6484cc4e59a30bf4f34a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e111cfd0ec2429c6e45dcd6b47"`);
        await queryRunner.query(`DROP TABLE "jobs_tags_job_tag"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_job_type_enum"`);
        await queryRunner.query(`DROP TABLE "job_tag"`);
        await queryRunner.query(`DROP TABLE "job_category"`);
    }

}
