package com.cnweb36.Service.Security;

import java.io.IOException;
import java.util.Objects;
//import java.util.stream.Collectors;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cnweb36.Service.AccountDetailsService;

public class AuthTokenFilter extends OncePerRequestFilter {	
	@Value("${cnweb36.csrfHeader}")
	private String csrfHeader;
	
	@Autowired
	private JwtUtility jwtUtility;

	@Autowired
	private AccountDetailsService accountDetailsService;

	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		
		try {
			String jwt = parseJwt(request);
			if (jwt != null && jwtUtility.validateJwtToken(jwt)) {
//				String test = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
//				System.out.println(test);
				String username = jwtUtility.getUserNameFromJwtToken(jwt);
				String csrfToken = jwtUtility.getCsrfTokenFromJwtToken(jwt);
				String requestCsrfToken = request.getHeader(csrfHeader);
				
				if (Objects.equals(csrfToken, requestCsrfToken)) {
					UserDetails userDetails = accountDetailsService.loadUserByUsername(username);
					UsernamePasswordAuthenticationToken authentication =
						new UsernamePasswordAuthenticationToken(
						userDetails,
						null,
						userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);
		}

		filterChain.doFilter(request, response);
	}

  	private String parseJwt(HttpServletRequest request) {
//  		String headerAuth = request.getHeader("Authorization");
//	
//	    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
//	    	return headerAuth.substring(7);
//	    }
//	
//	    return null;
	    String jwt = jwtUtility.getJwtFromCookies(request);
	    return jwt;
  	}
}
