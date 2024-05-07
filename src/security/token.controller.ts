import {Controller, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {ApiExcludeEndpoint} from "@nestjs/swagger";
import {env} from "src/env";

const TOKEN_URL = `https://login.microsoftonline.com/${env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

@Controller()
export class TokenController {
    constructor() {
    }

    @Post('/token')
    @ApiExcludeEndpoint()
    async token(@Req() request: Request, @Res() response: Response) {

        const [client_id, client_secret] = Buffer.from(request.headers.authorization.split(' ')[1], 'base64').toString().split(':')


        const fetchResponse = await fetch(TOKEN_URL, {
            method: "POST",
            body: new URLSearchParams({
                ...request.body,
                client_id,
                client_secret,
            })
        })


        response.status(fetchResponse.status)
        response.send(await fetchResponse.text())
    }
}
