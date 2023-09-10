import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UserQueryCreatorService } from "src/queries/userQueryCreator.service";
import { User } from "src/types/user";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userQueryCreatorService;
    private connectionService;
    constructor(configService: ConfigService, userQueryCreatorService: UserQueryCreatorService, connectionService: any);
    validate({ user_id }: Pick<User, "user_id">): Promise<any>;
}
export {};
