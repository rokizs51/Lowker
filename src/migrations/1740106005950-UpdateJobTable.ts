import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateJobTable1740106005950 implements MigrationInterface {
    name = 'UpdateJobTable1740106005950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "gender" TO "preferred_gender"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_gender_enum" RENAME TO "jobs_preferred_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_preferred_gender_enum" RENAME TO "jobs_preferred_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_preferred_gender_enum" AS ENUM('male', 'female', 'any')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "preferred_gender" TYPE "public"."jobs_preferred_gender_enum" USING "preferred_gender"::"text"::"public"."jobs_preferred_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_preferred_gender_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."jobs_preferred_gender_enum_old" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "preferred_gender" TYPE "public"."jobs_preferred_gender_enum_old" USING "preferred_gender"::"text"::"public"."jobs_preferred_gender_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_preferred_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_preferred_gender_enum_old" RENAME TO "jobs_preferred_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_preferred_gender_enum" RENAME TO "jobs_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "preferred_gender" TO "gender"`);
    }

}
