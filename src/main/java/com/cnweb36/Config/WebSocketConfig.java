package com.cnweb36.Config;



import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.cnweb36.Service.Socket.UserInterceptor;



@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	private String CORS_URl="http://localhost:5173";
	
	@Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
         //registry.addEndpoint("/chat").setAllowedOriginPatterns("http://172.11.12.60:5173");
         registry
         		.addEndpoint("/hello")
         		.setAllowedOrigins(CORS_URl)
         		.setAllowedOriginPatterns(CORS_URl).withSockJS();
         
         registry
         		.addEndpoint("/hello")
		  		.setAllowedOrigins(CORS_URl)
		  		.setAllowedOriginPatterns(CORS_URl);
         
    }
    
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(new UserInterceptor());
    }
}
