import {MigrationInterface, QueryRunner} from "typeorm";

export class serviceTechnical1643174781360 implements MigrationInterface {
    name = 'serviceTechnical1643174781360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_technical" ("id" SERIAL NOT NULL, "note" character varying(255) NOT NULL, "status" character varying(100) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "ending_date" TIMESTAMP WITH TIME ZONE, "user" integer, "technical" integer, CONSTRAINT "PK_cea057b3b8f8edddfbfb77cc95b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service_technical" ADD CONSTRAINT "FK_c748a7c69da570b036ef4c5d28f" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_technical" ADD CONSTRAINT "FK_f23bb75aa5cf0ef0243a12e48ce" FOREIGN KEY ("technical") REFERENCES "technical"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_technical" DROP CONSTRAINT "FK_f23bb75aa5cf0ef0243a12e48ce"`);
        await queryRunner.query(`ALTER TABLE "service_technical" DROP CONSTRAINT "FK_c748a7c69da570b036ef4c5d28f"`);
        await queryRunner.query(`DROP TABLE "service_technical"`);
    }

}
