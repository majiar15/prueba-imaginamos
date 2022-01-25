import {MigrationInterface, QueryRunner} from "typeorm";

export class init1643118921254 implements MigrationInterface {
    name = 'init1643118921254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "address" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
