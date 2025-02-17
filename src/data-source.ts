import { DataSource } from "typeorm";
import { Jobs } from "./entities/jobs.entity";
import { JobCategory } from "./entities/jobs-category.entity";
import { JobTag } from "./entities/job-tags.entity";

// export default new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'root',
//     password: 'admin123',
//     database: 'lowker',
//     entities: [Jobs, JobCategory, JobTag],
//     migrations: [/*...*/],
//     migrationsTableName: "custom_migration_table",
// })

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'root',
    password: 'admin123',
    database: 'lowker',
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],  // Ensure migrations are included
    synchronize: false, // Set to false when using migrations
    logging: true,
  });