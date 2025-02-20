import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTagTable1740016117285 implements MigrationInterface {
    name = 'EditTagTable1740016117285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "FK_87875e6484cc4e59a30bf4f34a2"`);
        await queryRunner.query(`ALTER TABLE "job_tag" DROP CONSTRAINT "PK_4257e6a577f466ed9123a55df3f"`);
        await queryRunner.query(`ALTER TABLE "job_tag" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job_tag" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_tag" ADD CONSTRAINT "PK_4257e6a577f466ed9123a55df3f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "PK_fd9f9270a8ee92d8181cddb1afa"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "PK_e111cfd0ec2429c6e45dcd6b475" PRIMARY KEY ("jobsId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87875e6484cc4e59a30bf4f34a"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP COLUMN "jobTagId"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD "jobTagId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "PK_e111cfd0ec2429c6e45dcd6b475"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "PK_fd9f9270a8ee92d8181cddb1afa" PRIMARY KEY ("jobsId", "jobTagId")`);
        await queryRunner.query(`CREATE INDEX "IDX_87875e6484cc4e59a30bf4f34a" ON "jobs_tags_job_tag" ("jobTagId") `);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "FK_87875e6484cc4e59a30bf4f34a2" FOREIGN KEY ("jobTagId") REFERENCES "job_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "FK_87875e6484cc4e59a30bf4f34a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87875e6484cc4e59a30bf4f34a"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "PK_fd9f9270a8ee92d8181cddb1afa"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "PK_e111cfd0ec2429c6e45dcd6b475" PRIMARY KEY ("jobsId")`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP COLUMN "jobTagId"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD "jobTagId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_87875e6484cc4e59a30bf4f34a" ON "jobs_tags_job_tag" ("jobTagId") `);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" DROP CONSTRAINT "PK_e111cfd0ec2429c6e45dcd6b475"`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "PK_fd9f9270a8ee92d8181cddb1afa" PRIMARY KEY ("jobsId", "jobTagId")`);
        await queryRunner.query(`ALTER TABLE "job_tag" DROP CONSTRAINT "PK_4257e6a577f466ed9123a55df3f"`);
        await queryRunner.query(`ALTER TABLE "job_tag" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job_tag" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "job_tag" ADD CONSTRAINT "PK_4257e6a577f466ed9123a55df3f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "jobs_tags_job_tag" ADD CONSTRAINT "FK_87875e6484cc4e59a30bf4f34a2" FOREIGN KEY ("jobTagId") REFERENCES "job_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
