import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1740016117286 implements MigrationInterface {
    name = 'SeedInitialData1740016117286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed job categories
        await queryRunner.query(`INSERT INTO "job_category" (name) VALUES 
            ('Software Development'),
            ('Design'),
            ('Marketing'),
            ('Sales'),
            ('Customer Service')
        `);

        // Seed job tags
        await queryRunner.query(`INSERT INTO "job_tag" (name) VALUES 
            ('Remote'),
            ('Senior Level'),
            ('Junior Level'),
            ('JavaScript'),
            ('Python'),
            ('UI/UX'),
            ('Digital Marketing'),
            ('B2B'),
            ('Customer Support')
        `);

        // Get category IDs
        const softwareDevId = await queryRunner.query(`SELECT id FROM "job_category" WHERE name = 'Software Development'`);
        const designId = await queryRunner.query(`SELECT id FROM "job_category" WHERE name = 'Design'`);
        const marketingId = await queryRunner.query(`SELECT id FROM "job_category" WHERE name = 'Marketing'`);

        // Insert sample jobs
        await queryRunner.query(`INSERT INTO "jobs" (title, description, experience, education, salary_min, salary_max, job_type, age, work_schedule, location, gender, "isActive", "jobCategoryId") VALUES
            ('Senior Full Stack Developer', 'We are looking for an experienced full stack developer...', 5, 'Bachelor Degree', 8000, 12000, 'full_time', 25, 'Monday-Friday', 'Jakarta', 'other', true, $1),
            ('UI/UX Designer', 'Creative designer needed for our product team...', 3, 'Bachelor Degree', 5000, 8000, 'full_time', 23, 'Monday-Friday', 'Bandung', 'other', true, $2),
            ('Digital Marketing Manager', 'Lead our digital marketing initiatives...', 4, 'Bachelor Degree', 6000, 9000, 'full_time', 25, 'Monday-Friday', 'Jakarta', 'other', true, $3)
        `, [softwareDevId[0].id, designId[0].id, marketingId[0].id]);

        // Get job IDs
        const devJobId = await queryRunner.query(`SELECT id FROM "jobs" WHERE title = 'Senior Full Stack Developer'`);
        const designJobId = await queryRunner.query(`SELECT id FROM "jobs" WHERE title = 'UI/UX Designer'`);
        const marketingJobId = await queryRunner.query(`SELECT id FROM "jobs" WHERE title = 'Digital Marketing Manager'`);

        // Get tag IDs
        const remoteTag = await queryRunner.query(`SELECT id FROM "job_tag" WHERE name = 'Remote'`);
        const seniorTag = await queryRunner.query(`SELECT id FROM "job_tag" WHERE name = 'Senior Level'`);
        const jsTag = await queryRunner.query(`SELECT id FROM "job_tag" WHERE name = 'JavaScript'`);
        const uiuxTag = await queryRunner.query(`SELECT id FROM "job_tag" WHERE name = 'UI/UX'`);
        const digitalMarketingTag = await queryRunner.query(`SELECT id FROM "job_tag" WHERE name = 'Digital Marketing'`);

        // Associate jobs with tags
        await queryRunner.query(`INSERT INTO "jobs_tags_job_tag" ("jobsId", "jobTagId") VALUES 
            ($1, $2), ($1, $3), ($1, $4),
            ($5, $2), ($5, $6),
            ($7, $2), ($7, $8)
        `, [devJobId[0].id, remoteTag[0].id, seniorTag[0].id, jsTag[0].id,
            designJobId[0].id, uiuxTag[0].id,
            marketingJobId[0].id, digitalMarketingTag[0].id]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove all data in reverse order
        await queryRunner.query(`DELETE FROM "jobs_tags_job_tag"`);
        await queryRunner.query(`DELETE FROM "jobs"`);
        await queryRunner.query(`DELETE FROM "job_tag"`);
        await queryRunner.query(`DELETE FROM "job_category"`);
    }
}