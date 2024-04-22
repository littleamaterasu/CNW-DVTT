package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.DTO.Entity.SignInDTO;
import com.cnweb36.DTO.Request.SignInRequest;
import com.cnweb36.DTO.Response.SignInResponse;
import com.cnweb36.DTO.Response.SignUpResponse;
import com.cnweb36.Service.AccountService;
import com.cnweb36.Service.Security.JwtUtility;

import jakarta.validation.Valid;

@CrossOrigin(origins = "${cnweb36.crossOrigin}", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountAPI {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private JwtUtility jwtUtility;

	@PostMapping("/signin")
	public ResponseEntity<?> accountSignin(@Valid @RequestBody SignInRequest signInRequest) {
		SignInDTO signInDTO = accountService.accountSignin(signInRequest);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, signInDTO.getJwtCookie());

		return ResponseEntity.ok().headers(headers)
				.body(new SignInResponse(signInDTO.getId(), signInDTO.getRoleList(), signInDTO.getCsrfToken()));
	}
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3")
	@PostMapping("/signout")
	public ResponseEntity<?> accountSignout() {
		String cleanJwtCookie = accountService.accountSignout();
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, cleanJwtCookie);
		return ResponseEntity.ok().headers(headers).body(null);
	}
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3")
	@PostMapping("/signout/all")
	public ResponseEntity<?> accountSignoutAll(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken) {
		String cleanJwtCookie = accountService.accountSignoutAll(jwtUtility.getUserNameFromJwtToken(jwtToken));
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, cleanJwtCookie);
		return ResponseEntity.ok().headers(headers).body(null);
	}
	
	@PostMapping("/signup/user")
	public SignUpResponse userSignup(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.userSignup(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("username already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}

	// admin signup for create admin1

	@PostMapping("/signup/admin1")
	@PreAuthorize("hasRole('ADMIN_2') or hasRole('ADMIN_3')")
	public SignUpResponse admin1Signup(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.admin1Signup(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}

	@PostMapping("/signup/admin2")
	@PreAuthorize("hasRole('ADMIN_3')")
	public SignUpResponse admin2Signup(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.admin2Signup(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}
	
	@PostMapping("/signup/admin3")
	@PreAuthorize("hasRole('ADMIN_3')")
	public SignUpResponse admin3Signup(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.admin3Signup(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}
	
}
