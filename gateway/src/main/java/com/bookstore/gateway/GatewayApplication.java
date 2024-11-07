package com.bookstore.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/microservice/**")
                        .filters(f -> f.rewritePath("/microservice",""))
                        .uri("lb://microService")
                ).route(r->r.path("/function/**")
                        .filters(f->f.rewritePath("/function",""))
                        .uri("lb://function")
                ).route(r->r.path("/**")
                        .filters(f->f)
                        .uri("lb://Backend-Bookstore")
                )
                .build();
    }
}
