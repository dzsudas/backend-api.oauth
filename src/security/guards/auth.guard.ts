import {ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {API_ROLE, API_ROLE_REQUIRED} from "src/constants";
import {AzureAdJwtVerifier} from "src/security/jwt-verifier.service";
import {AuthorizationError} from "src/security/guards/authorization.error";
import {GenericAuthGuard} from "src/security/guards/generic-auth-guard";
import OktaJwtVerifier from "@okta/jwt-verifier";


@Injectable()
export class AuthGuard extends GenericAuthGuard {
    constructor(private readonly reflector: Reflector, jwtVerifier: AzureAdJwtVerifier) {
        super(jwtVerifier)
    }

    verifyClaims(decodedToken: OktaJwtVerifier.Jwt, context: ExecutionContext): boolean {
        const roleRequired = this.reflector.getAllAndOverride<API_ROLE>(
            API_ROLE_REQUIRED,
            [context.getHandler(), context.getClass()]
        )

        const roles = decodedToken.claims['roles'] as string[];

        if (roles.indexOf(roleRequired) == -1) {
            throw new AuthorizationError(
                `Incorrect role, provided '${roles}', but required '${roleRequired}'`
            )
        }

        return true
    }
}