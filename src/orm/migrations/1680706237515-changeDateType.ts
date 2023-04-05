import { MigrationInterface, QueryRunner } from "typeorm";

export class changeDateType1680706237515 implements MigrationInterface {
    name = 'changeDateType1680706237515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstName" text NOT NULL, "lastName" text NOT NULL, "middleName" text NOT NULL, "achievements" text, "education" text, "dateOfBirth" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth") SELECT "id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstName" text NOT NULL, "lastName" text NOT NULL, "middleName" text NOT NULL, "achievements" text, "education" text, "dateOfBirth" date NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth") SELECT "id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstName" text NOT NULL, "lastName" text NOT NULL, "middleName" text NOT NULL, "achievements" text, "education" text, "dateOfBirth" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth") SELECT "id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstName" text NOT NULL, "lastName" text NOT NULL, "middleName" text NOT NULL, "achievements" text, "education" text, "dateOfBirth" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth") SELECT "id", "email", "password", "role", "createdAt", "updatedAt", "firstName", "lastName", "middleName", "achievements", "education", "dateOfBirth" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
