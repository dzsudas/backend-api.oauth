import {ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AzureAdJwtVerifier} from "src/security/jwt-verifier.service";
import {API_SCOPE, API_SCOPE_REQUIRED} from "src/constants";
import {AuthorizationError} from "src/security/guards/authorization.error";
import OktaJwtVerifier from "@okta/jwt-verifier";
import {GenericAuthGuard} from "src/security/guards/generic-auth-guard";

@Injectable()
export class UserAccessGuard extends GenericAuthGuard {
    constructor(private readonly reflector: Reflector, jwtVerifier: AzureAdJwtVerifier) {
        super(jwtVerifier)
    }

    verifyClaims(decodedToken: OktaJwtVerifier.Jwt, context: ExecutionContext): boolean {
        const scopeRequired = this.reflector.getAllAndOverride<API_SCOPE>(
            API_SCOPE_REQUIRED,
            [context.getHandler(), context.getClass()]
        )

        const scopes = (decodedToken.claims.scp as unknown as string).split(' ');

        if (scopes.indexOf(scopeRequired) == -1) {
            throw new AuthorizationError(
                `Incorrect scope, provided '${scopes}', but required '${scopeRequired}'`
            )
        }

        return true
    }
}