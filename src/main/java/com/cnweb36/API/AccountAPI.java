package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.LoginDTO;
import com.cnweb36.DTO.Request.LoginRequest;
import com.cnweb36.DTO.Response.LoginResponse;
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
