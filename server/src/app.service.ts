import { Injectable, Inject } from "@nestjs/common";
import { PG_CONNECTION } from "./database/database.module";

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getUsers() {
    const res = await this.conn.query('SELECT * FROM "user"');

    // return res.rows;
    return res.rows;
  }
}
