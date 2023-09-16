import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/database/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly prismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    validate({ id }: Pick<User, "id">): Promise<{
        role: {
            id: string;
            message: import(".prisma/client").$Enums.RoleName;
            userId: string;
        }[];
    } & {
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
