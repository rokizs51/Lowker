import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAndJobs1740112511822 implements MigrationInterface {
    name = 'UpdateUserAndJobs1740112511822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "logo" character varying, "email" character varying NOT NULL, "phone" character varying, "website" character varying, "address" character varying NOT NULL, "city" character varying, "state" character varying, "country" character varying NOT NULL DEFAULT 'Indonesia', "postal_code" character varying, "industry" character varying, "company_size" character varying, "is_active" boolean NOT NULL DEFAULT true, "linkedin_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "REL_c41a1d36702f2cd0403ce58d33" UNIQUE ("userId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "preferred_education" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "min_age" integer`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "max_age" integer`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "max_age"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "min_age"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "preferred_education"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "education" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
