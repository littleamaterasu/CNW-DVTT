package com.cnweb36.API;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Request.LoginRequest;
import com.cnweb36.DTO.Response.LoginResponse;
//import com.cnweb36.DTO.AccountDTO;
import com.cnweb36.Service.AccountService;
//import com.example.demo.dto.LoginRequest;
//import com.example.demo.dto.UserResponse;
import com.cnweb36.Service.Security.JwtUtility;
import com.cnweb36.Service.Security.AccountDetails;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/account")
public class AccountAPI {
	
	@Autowired
	private AccountService userService;
	
//	@PostMapping("/login")
//	public ResponseEntity<?> accountLogin(@Valid @RequestBody LoginRequest loginRequest) {
//			  Authentication authentication = authenticationManager
//			  .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		
//		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//		String csrfToken = JwtUtility.generateCsrfToken();
//		
//		ResponseCookie jwtCookie = jwtUtility.generateJwtCookie(userDetails, csrfToken);
//		
//		List<String> roles = userDetails.getAuthorities().stream()
//			.map(item -> item.getAuthority())
//			.collect(Collectors.toList());
//		
//		// Thêm cookie vào header của ResponseEntity
//		HttpHeaders headers = new HttpHeaders();
//		headers.add(HttpHeaders.SET_COOKIE, jwtCookie.toString());	  
//		
//		return ResponseEntity.ok().headers(headers)
//			  .body(new LoginResponse(userDetails.getId(), roles, csrfToken));
	
//	@PostMapping("/guest/register")
//	public notice regiter(@RequestBody AccountDTO AccountDTO) {
//		notice notice=new notice();
//		
//		Long result=userService.usersignup(AccountDTO);
//		System.out.println(AccountDTO.getName());
//		notice.setUserid(result);
//		if(result==-1l) {
//			notice.setContent("username already exists!");
//		}else {
//			notice.setContent("Oke");
//		}
//		return notice;
//	}
}
