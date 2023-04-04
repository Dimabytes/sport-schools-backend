import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewUserAndTrainingColumns1680636176737 implements MigrationInterface {
    name = 'addNewUserAndTrainingColumns1680636176737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "role", "createdAt", "updatedAt") SELECT "id", "email", "password", "role", "createdAt", "updatedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_training" ("id" varchar PRIMARY KEY NOT NULL, "startTime" text NOT NULL, "endTime" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "groupId" varchar NOT NULL, "dayOfWeek" text NOT NULL, CONSTRAINT "FK_0cdd27de3f1971e0f9a8362a197" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_training"("id", "startTime", "endTime", "createdAt", "updatedAt", "groupId") SELECT "id", "startTime", "endTime", "createdAt", "updatedAt", "groupId" FROM "training"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`ALTER TABLE "temporary_training" RENAME TO "training"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstName" text NOT NULL, "lastName" text NOT NULL, "middleName" text NOT NULL, "achievements" text, "education" text, "dateOfBirth" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "role", "createdAt", "updatedAt") SELECT "id", "email", "password", "role", "createdAt", "updatedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "role", "createdAt", "updatedAt") SELECT "id", "email", "password", "role", "createdAt", "updatedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "training" RENAME TO "temporary_training"`);
        await queryRunner.query(`CREATE TABLE "training" ("id" varchar PRIMARY KEY NOT NULL, "startTime" text NOT NULL, "endTime" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "groupId" varchar NOT NULL, CONSTRAINT "FK_0cdd27de3f1971e0f9a8362a197" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "training"("id", "startTime", "endTime", "createdAt", "updatedAt", "groupId") SELECT "id", "startTime", "endTime", "createdAt", "updatedAt", "groupId" FROM "temporary_training"`);
        await queryRunner.query(`DROP TABLE "temporary_training"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "role", "createdAt", "updatedAt") SELECT "id", "email", "password", "role", "createdAt", "updatedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
