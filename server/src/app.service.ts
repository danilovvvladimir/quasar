import { Injectable, Inject } from "@nestjs/common";
import { PG_CONNECTION } from "./database/database.module";
import { QueryResult, Pool } from "pg";

@Injectable()
export class AppService {
  // constructor(@Inject(PG_CONNECTION) private connectionService: Pool) {}
  // async getUsers() {
  //   const res = await this.connectionService.query('SELECT * FROM "user"');
  //   return res.rows;
  // }
}
