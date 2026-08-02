package com.leyde.backend.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI leydeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Leyde API")
                        .version("0.1.0")
                        .description("Leyde - Online Perfume Store API (architecture only)")
                        .contact(new Contact().name("Leyde Team")));
    }
}
