package com.cnweb36.Service.Security;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
//import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtility {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtility.class);

	@Value("${cnweb36.jwtSecret}")
	private String jwtSecret;

	@Value("${cnweb36.jwtExpirationMs}")
	private int jwtExpirationMs;

	@Value("${cnweb36.jwtCookieName}")
	private String jwtCookie;
  
	@Value("${cnweb36.sameSiteSetting}")
	private String sameSiteSetting;
	
//	public String generateJwtToken(Authentication authentication) {
//		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
//
//	    return Jwts.builder()
//	        .setSubject((userPrincipal.getUsername()))
//	        .setIssuedAt(new Date())
//	        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//	        .signWith(key(), SignatureAlgorithm.HS256)
//	        .compact();
//	}	
	
	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}	
	public String generateCsrfToken() {
		return UUID.randomUUID().toString();
	}
//	public String generateTokenFromUsername(String username, String token) {   
//		return Jwts.builder()
//			.setSubject(username + "===" + token)
//			.setIssuedAt(new Date())
//		  	.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//		  	.signWith(key(), SignatureAlgorithm.HS256)
//		  	.compact();
//	}
	
	private String getSubjectFromJwtToken(String token) {
		return Jwts.parserBuilder().setSigningKey(key()).build()
				.parseClaimsJws(token).getBody().getSubject();
	}
	public String getUserNameFromJwtToken(String token) {
		return getSubjectFromJwtToken(token).split("===")[0];
	}
	public String getCsrfTokenFromJwtToken(String token) {
		String subject = getSubjectFromJwtToken(token);
		if (subject.contains("===")) return getSubjectFromJwtToken(token).split("===")[1];
		else return null;
	}
	
	public String getJwtFromCookies(HttpServletRequest request) {
	    Cookie cookie = WebUtils.getCookie(request, jwtCookie);
	    if (cookie != null) {
	    	return cookie.getValue();
	    } else {
	    	return null;
	    }
	}
	
	public boolean validateJwtToken(String authToken) {
	    try {
	    	Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
	    	return true;
	    } catch (MalformedJwtException e) {
	    	logger.error("Invalid JWT token: {}", e.getMessage());
	    } catch (ExpiredJwtException e) {
	    	logger.error("JWT token is expired: {}", e.getMessage());
	    } catch (UnsupportedJwtException e) {
	    	logger.error("JWT token is unsupported: {}", e.getMessage());
	    } catch (IllegalArgumentException e) {
	    	logger.error("JWT claims string is empty: {}", e.getMessage());
	    }
	
	    return false;
	}

	public ResponseCookie generateJwtCookie(AccountDetails userPrincipal, String csrfToken) {		
	    String jwt = Jwts.builder()
	    		.setSubject(userPrincipal.getUsername() + "===" + csrfToken)
	    		.setIssuedAt(new Date())
	    	  	.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
	    	  	.signWith(key(), SignatureAlgorithm.HS256)
	    	  	.compact();
	    ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/").maxAge(24 * 60 * 60)
	    		.httpOnly(true).sameSite(sameSiteSetting).secure(true).build();
	    return cookie;
	}
	public ResponseCookie generateCleanJwtCookie() {
		ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/").maxAge(24 * 60 * 60)
	    		.httpOnly(true).sameSite(sameSiteSetting).secure(true).build();
		return cookie;
	}
	
}
