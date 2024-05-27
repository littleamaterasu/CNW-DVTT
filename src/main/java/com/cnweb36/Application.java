package com.cnweb36;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:5173","https://cnw-frontend.onrender.com")
						.allowCredentials(true)
						.allowedHeaders("*")
						.allowedMethods("*")
						.maxAge(3600);
				registry.addMapping("/payment")
						.allowedOrigins("https://sandbox.vnpayment.vn")
						.allowCredentials(true)
						.allowedHeaders("*")
						.allowedMethods("*")
						.maxAge(3600);
			}
		};
	}
}
