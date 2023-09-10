import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PG_CONNECTION } from "src/database/database.module";
import { UserQueryCreatorService } from "src/queries/userQueryCreator.service";
import { User } from "src/types/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userQueryCreatorService: UserQueryCreatorService,
    @Inject(PG_CONNECTION) private connectionService: any,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate({ user_id }: Pick<User, "user_id">) {
    const res = await this.connectionService.query(
      this.userQueryCreatorService.getUserByIdQuery(user_id),
    );
    console.log(res.rows);

    return res.rows;
  }
}
