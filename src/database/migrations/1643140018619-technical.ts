import {MigrationInterface, QueryRunner} from "typeorm";

export class technical1643140018619 implements MigrationInterface {
    name = 'technical1643140018619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technical" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(50) NOT NULL, CONSTRAINT "PK_0071c7d8a6bae24482194122df9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "technical"`);
    }

}
