package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.DTO.Entity.LoginDTO;
import com.cnweb36.DTO.Request.LoginRequest;
import com.cnweb36.DTO.Response.LoginResponse;
import com.cnweb36.DTO.Response.SignUpResponse;
import com.cnweb36.Service.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/account")
public class AccountAPI {

	@Autowired
	private AccountService accountService;

	@PostMapping("/login")
	public ResponseEntity<?> accountLogin(@Valid @RequestBody LoginRequest loginRequest) {
		LoginDTO loginDTO = accountService.login(loginRequest);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, loginDTO.getJwtCookie());

		return ResponseEntity.ok().headers(headers)
				.body(new LoginResponse(loginDTO.getId(), loginDTO.getRoleList(), loginDTO.getCsrfToken()));
	}

	@PostMapping("/user/signup")
	public SignUpResponse regiter(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.usersignup(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("username already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}

	// admin signup for create admin1

	@PostMapping("/admin1/signup")
	@PreAuthorize("hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3')")
	public SignUpResponse admin1signup(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.adminsignup1(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}

	@PostMapping("/admin2/signup")
	@PreAuthorize("hasRole('ROLE_ADMIN_3')")
	public SignUpResponse admin2signup(@RequestBody AccountDTO AccountDTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.adminsignup2(AccountDTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}

}
