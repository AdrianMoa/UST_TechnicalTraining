import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from "@nestjs/swagger";

const documentConfig = new DocumentBuilder()
    .setTitle('Backend NestJS Documentation')
    .setVersion('1.0.0')
    .addBearerAuth(
        {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "Authorization",
            description: "Enter JWT Token",
            in: "header",
        },
        "Bearer",
    )
    .addSecurityRequirements("Bearer")
    .build();

const swaggerUiOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
    customSiteTitle: "API Documentation",
    customJs: [
        "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js",
        "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js",
    ],
    customCssUrl: [
        "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css",
    ],
};

export const configureSwaggerUI = (app: INestApplication<any>) => {
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('api', app, document, swaggerUiOptions);
}