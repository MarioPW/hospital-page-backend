import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(
        `
        ALTER TABLE patients
        ADD COLUMN email VARCHAR;
        `
      );
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(
        `
        ALTER TABLE patients
        DROP COLUMN email;
        `
      );
}

