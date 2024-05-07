import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Backend API")
        .setDescription("The Backend API")
        .setVersion("1.0")
        .addOAuth2({
            type: "oauth2",
            bearerFormat: "",
            flows: {
                clientCredentials: {
                    tokenUrl: `/token`,
                    scopes: {
                        "api://backend-api.com/.default": "Default"
                    }
                }
            }
        })
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('/docs', app, document);

    await app.listen(3001);
}

bootstrap();
