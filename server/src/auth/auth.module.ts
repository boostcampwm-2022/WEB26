import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/common/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { UserRepository } from "src/common/repositories/user.repository";
import { AuthRepository } from "../common/repositories/auth.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmCustomModule.forCustomRepository([UserRepository])],
    providers: [AuthService, UserService, JwtService, AuthRepository],
    controllers: [AuthController],
})
export class AuthModule {}
