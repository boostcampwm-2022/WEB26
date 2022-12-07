import { Module } from "@nestjs/common";
import { UserRepository } from "../common/repositories/user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "../common/typeorm/typeorm.module";
import { User } from "../common/entities/user.entity";
import { CourseRepository } from "../common/repositories/course.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmCustomModule.forCustomRepository([UserRepository, CourseRepository]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
