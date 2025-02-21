import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1740104660670 implements MigrationInterface {
    name = 'UpdateUserTable1740104660670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_email_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email_verification_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_reset_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profile_picture" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'job_seeker'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_picture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_reset_token"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_verification_token"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_email_verified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
    }

}
