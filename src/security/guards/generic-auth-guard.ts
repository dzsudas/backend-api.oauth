import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AzureAdJwtVerifier} from "src/security/jwt-verifier.service";
import {env} from "src/env";
import {AuthorizationError} from "src/security/guards/authorization.error";
import OktaJwtVerifier from "@okta/jwt-verifier";

@Injectable()
export abstract class GenericAuthGuard implements CanActivate {
    protected constructor(private readonly jwtVerifier: AzureAdJwtVerifier) {
    }

    abstract verifyClaims(token: OktaJwtVerifier.Jwt, context: ExecutionContext): boolean;

    async canActivate(context: ExecutionContext) {
        try {
            const token = context.getArgs()[0]?.headers?.authorization?.split(" ")[1];


            if (!token) throw new AuthorizationError("No token provided");

            const decodedToken = await this.jwtVerifier.verifyAccessToken(
                token,
                env.AUDIENCE
            )

            const req = context.switchToHttp().getRequest();
            req.token = decodedToken;

            return this.verifyClaims(decodedToken, context);
        } catch (e) {

            throw new UnauthorizedException(
                e instanceof AuthorizationError ? e.message : ""
            )
        }
    }

}