import {applyDecorators, Controller, Get, Post, SetMetadata, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiOAuth2, ApiOperation} from "@nestjs/swagger";
import {API_ROLE, API_ROLE_REQUIRED, API_SCOPE, API_SCOPE_REQUIRED} from "src/constants";
import {AuthGuard} from "src/security/guards/auth.guard";
import {UserId} from "src/security/user.id";
import {UserAccessGuard} from "src/security/guards/user-access.guard";


const ProtectedAccessApiHandler = (apiRole: API_ROLE) =>
    applyDecorators(
        UseGuards(AuthGuard),
        ApiOAuth2([apiRole]),
        SetMetadata(API_ROLE_REQUIRED, apiRole),
    )

const DelegatedAccessApiHandler = (apiScope: API_SCOPE) =>
    applyDecorators(
        UseGuards(UserAccessGuard),
        ApiOAuth2([apiScope]),
        SetMetadata(API_SCOPE_REQUIRED, apiScope),
    );

@Controller()
export class ApiController {
    constructor(private readonly appService: AppService) {
    }

    @Get("/data")
    @ApiOperation({description: "Read Backend Data"})
    @ProtectedAccessApiHandler(API_ROLE.READ)
    readData(): string {
        return this.appService.getApplicationData();
    }

    @Post("/data")
    @ApiOperation({description: "Write Backend Data"})
    @ProtectedAccessApiHandler(API_ROLE.WRITE)
    writeData(): string {
        return this.appService.updateApplicationData();
    }

    @Get("/user-data")
    @ApiOperation({description: "Reading User Data"})
    @DelegatedAccessApiHandler(API_SCOPE.USER_READ)
    getUserData(@UserId() userId: string) {
        return this.appService.getUserData(userId)
    }

}
