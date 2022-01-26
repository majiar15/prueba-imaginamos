import {MigrationInterface, QueryRunner} from "typeorm";

export class serviceTechnicalCascade1643178218155 implements MigrationInterface {
    name = 'serviceTechnicalCascade1643178218155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_technical" DROP CONSTRAINT "FK_c748a7c69da570b036ef4c5d28f"`);
        await queryRunner.query(`ALTER TABLE "service_technical" DROP CONSTRAINT "FK_f23bb75aa5cf0ef0243a12e48ce"`);
        await queryRunner.query(`ALTER TABLE "service_technical" ADD CONSTRAINT "FK_c748a7c69da570b036ef4c5d28f" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_technical" ADD CONSTRAINT "FK_f23bb75aa5cf0ef0243a12e48ce" FOREIGN KEY ("technical") REFERENCES "technical"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_technical" DROP CONSTRAINT "FK_f23bb75aa5cf0ef0243a12e48ce"`);
        await queryRunner.query(`ALTER TABLE "service_technical" DROP CONSTRAINT "FK_c748a7c69da570b036ef4c5d28f"`);
        await queryRunner.query(`ALTER TABLE "service_technical" ADD CONSTRAINT "FK_f23bb75aa5cf0ef0243a12e48ce" FOREIGN KEY ("technical") REFERENCES "technical"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_technical" ADD CONSTRAINT "FK_c748a7c69da570b036ef4c5d28f" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
