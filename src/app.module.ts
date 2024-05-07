import {Module} from '@nestjs/common';
import {ApiController} from 'src/api.controller';
import {AppService} from './app.service';
import {AzureAdJwtVerifier} from "src/security/jwt-verifier.service";
import {TokenController} from "src/security/token.controller";

@Module({
    imports: [],
    controllers: [ApiController, TokenController],
    providers: [AppService, AzureAdJwtVerifier],
})
export class AppModule {
}
