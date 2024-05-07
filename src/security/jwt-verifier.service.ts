import * as OktaJwtVerifier from "@okta/jwt-verifier";
import {Injectable} from "@nestjs/common";
import {env} from "src/env";

@Injectable()
export class AzureAdJwtVerifier extends OktaJwtVerifier {
    constructor() {
        super({
            issuer: `https://sts.windows.net/${env.AZURE_AD_TENANT_ID}/`,
            jwksUri: `https://login.microsoftonline.com/${env.AZURE_AD_TENANT_ID}/discovery/v2.0/keys`
        });
    }
}