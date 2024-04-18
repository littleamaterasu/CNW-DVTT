package com.cnweb36.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cnweb36.Service.Security.AuthEntryPointJwt;
import com.cnweb36.Service.Security.AuthTokenFilter;
import com.cnweb36.Service.AccountDetailsService;

@Configuration
@EnableMethodSecurity
// (securedEnabled = true,
// jsr250Enabled = true,
// prePostEnabled = true) // by default
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
	
	@Autowired
	AccountDetailsService accountDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}
	
	  @Bean
	  public DaoAuthenticationProvider authenticationProvider() {
	      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	       
	      authProvider.setUserDetailsService(accountDetailsService);
	      authProvider.setPasswordEncoder(passwordEncoder());
	   
	      return authProvider;
	  }
	  
  	@Bean
  	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
  		return authConfig.getAuthenticationManager();
  	}
  	
  	@Bean
  	public PasswordEncoder passwordEncoder() {
  		return new BCryptPasswordEncoder();
  	}
  	
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
    	.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .authorizeHttpRequests(auth -> auth
        	.requestMatchers("/guest/**").permitAll()
        	.requestMatchers("/user/**").hasRole("USER")
        	.requestMatchers("/admin1/**").hasAnyRole("ADMIN_1", "ADMIN_2", "ADMIN_3")
        	.requestMatchers("/admin2/**").hasAnyRole("ADMIN_2", "ADMIN_3")
        	.requestMatchers("/admin3/**").hasRole("ADMIN_3")
              .anyRequest().authenticated()
        );
    http.authenticationProvider(authenticationProvider());
 
	http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    
	return http.build();
  }
}
