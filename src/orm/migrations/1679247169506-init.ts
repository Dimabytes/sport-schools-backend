import { MigrationInterface, QueryRunner } from "typeorm";

export class init1679247169506 implements MigrationInterface {
    name = 'init1679247169506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "training" ("id" varchar PRIMARY KEY NOT NULL, "startTime" text NOT NULL, "endTime" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "groupId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "kindOfSport" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "trainerId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "group_athletes_user" ("groupId" varchar NOT NULL, "userId" varchar NOT NULL, PRIMARY KEY ("groupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_76d91915ab69ea87949c076651" ON "group_athletes_user" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05a886f2eb75c9aa5bbeed25b2" ON "group_athletes_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_training" ("id" varchar PRIMARY KEY NOT NULL, "startTime" text NOT NULL, "endTime" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "groupId" varchar NOT NULL, CONSTRAINT "FK_0cdd27de3f1971e0f9a8362a197" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_training"("id", "startTime", "endTime", "createdAt", "updatedAt", "groupId") SELECT "id", "startTime", "endTime", "createdAt", "updatedAt", "groupId" FROM "training"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`ALTER TABLE "temporary_training" RENAME TO "training"`);
        await queryRunner.query(`CREATE TABLE "temporary_group" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "kindOfSport" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "trainerId" varchar NOT NULL, CONSTRAINT "FK_db821b3a00010ffd52c91706301" FOREIGN KEY ("trainerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_group"("id", "name", "kindOfSport", "createdAt", "updatedAt", "trainerId") SELECT "id", "name", "kindOfSport", "createdAt", "updatedAt", "trainerId" FROM "group"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`ALTER TABLE "temporary_group" RENAME TO "group"`);
        await queryRunner.query(`DROP INDEX "IDX_76d91915ab69ea87949c076651"`);
        await queryRunner.query(`DROP INDEX "IDX_05a886f2eb75c9aa5bbeed25b2"`);
        await queryRunner.query(`CREATE TABLE "temporary_group_athletes_user" ("groupId" varchar NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "FK_76d91915ab69ea87949c0766516" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_05a886f2eb75c9aa5bbeed25b26" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("groupId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_group_athletes_user"("groupId", "userId") SELECT "groupId", "userId" FROM "group_athletes_user"`);
        await queryRunner.query(`DROP TABLE "group_athletes_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_group_athletes_user" RENAME TO "group_athletes_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_76d91915ab69ea87949c076651" ON "group_athletes_user" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05a886f2eb75c9aa5bbeed25b2" ON "group_athletes_user" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_05a886f2eb75c9aa5bbeed25b2"`);
        await queryRunner.query(`DROP INDEX "IDX_76d91915ab69ea87949c076651"`);
        await queryRunner.query(`ALTER TABLE "group_athletes_user" RENAME TO "temporary_group_athletes_user"`);
        await queryRunner.query(`CREATE TABLE "group_athletes_user" ("groupId" varchar NOT NULL, "userId" varchar NOT NULL, PRIMARY KEY ("groupId", "userId"))`);
        await queryRunner.query(`INSERT INTO "group_athletes_user"("groupId", "userId") SELECT "groupId", "userId" FROM "temporary_group_athletes_user"`);
        await queryRunner.query(`DROP TABLE "temporary_group_athletes_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_05a886f2eb75c9aa5bbeed25b2" ON "group_athletes_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_76d91915ab69ea87949c076651" ON "group_athletes_user" ("groupId") `);
        await queryRunner.query(`ALTER TABLE "group" RENAME TO "temporary_group"`);
        await queryRunner.query(`CREATE TABLE "group" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "kindOfSport" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "trainerId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "group"("id", "name", "kindOfSport", "createdAt", "updatedAt", "trainerId") SELECT "id", "name", "kindOfSport", "createdAt", "updatedAt", "trainerId" FROM "temporary_group"`);
        await queryRunner.query(`DROP TABLE "temporary_group"`);
        await queryRunner.query(`ALTER TABLE "training" RENAME TO "temporary_training"`);
        await queryRunner.query(`CREATE TABLE "training" ("id" varchar PRIMARY KEY NOT NULL, "startTime" text NOT NULL, "endTime" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "groupId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "training"("id", "startTime", "endTime", "createdAt", "updatedAt", "groupId") SELECT "id", "startTime", "endTime", "createdAt", "updatedAt", "groupId" FROM "temporary_training"`);
        await queryRunner.query(`DROP TABLE "temporary_training"`);
        await queryRunner.query(`DROP INDEX "IDX_05a886f2eb75c9aa5bbeed25b2"`);
        await queryRunner.query(`DROP INDEX "IDX_76d91915ab69ea87949c076651"`);
        await queryRunner.query(`DROP TABLE "group_athletes_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "training"`);
    }

}
