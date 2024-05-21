package com.cnweb36.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.DTO.Entity.SignInDTO;
import com.cnweb36.DTO.Request.Admin3FirstSignupRequest;
import com.cnweb36.DTO.Request.ChangeInfoRequest;
import com.cnweb36.DTO.Request.ChangePasswordRequest;
import com.cnweb36.DTO.Request.OTPRequest;
import com.cnweb36.DTO.Request.SignInRequest;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.DTO.Response.SignInResponse;
import com.cnweb36.DTO.Response.SignUpResponse;
import com.cnweb36.DTO.Response.UserResponse;
import com.cnweb36.Service.AccountService;
import com.cnweb36.Service.Security.JwtUtility;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/account")
public class AccountAPI {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private JwtUtility jwtUtility;
	
	@PostMapping("/checkMail")
	public NoticeResponse checkMail(@Valid @RequestBody OTPRequest otpRequest) {
		NoticeResponse noticeResponse=new NoticeResponse();
		String result= accountService.checkmail(otpRequest.getOtp(), otpRequest.getUsername());
		noticeResponse.setContent(result);
		noticeResponse.setStatus(0l);
		
		return noticeResponse;
	}

	@PostMapping("/signin")
	public ResponseEntity<?> accountSignin(@Valid @RequestBody SignInRequest signInRequest) {
		SignInDTO signInDTO = accountService.accountSignin(signInRequest);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, signInDTO.getJwtCookie());

		return ResponseEntity.ok().headers(headers)
				.body(new SignInResponse(signInDTO.getId(), signInDTO.getRoleList(), signInDTO.getCsrfToken()));
	}
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@PostMapping("/signout")
	public ResponseEntity<?> accountSignout() {
		String cleanJwtCookie = accountService.accountSignout();
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, cleanJwtCookie);
		return ResponseEntity.ok().headers(headers).body(null);
	}
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
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
			SignUpResponse.setContent("Admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}
	
	@PostMapping("/signup/admin3/first")
	public SignUpResponse admin3FirstSignupRequest(@RequestBody Admin3FirstSignupRequest admin3DTO) {
		SignUpResponse SignUpResponse = new SignUpResponse();

		Long result = accountService.admin3Signup(admin3DTO);
		SignUpResponse.setId(result);
		if (result == -1l) {
			SignUpResponse.setContent("admin already exists!");
		} else {
			SignUpResponse.setContent("Oke");
		}
		return SignUpResponse;
	}
	

	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@GetMapping("/getUser")
	public AccountDTO getuser(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,@RequestParam(name="id" )Long id) {
		
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		return accountService.getUser(id, username);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@GetMapping("/getAllUser")
	public List<UserResponse> getAllUser(@RequestParam(name="page",required = false) Integer page ) {
		return accountService.getAllUser(page);
	}
	
	//change password and info
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@PostMapping("/changeInfo")
	public NoticeResponse changeinfo(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,@RequestBody ChangeInfoRequest changeInfoRequest) {
		NoticeResponse noticeResponse=new NoticeResponse();
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		try {
			String result=accountService.changeInfo(changeInfoRequest, username);
			if(result.compareTo("Oke")==0) {
				noticeResponse.setStatus(1l);
			}else noticeResponse.setStatus(0l);
			noticeResponse.setContent(result);
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		return noticeResponse;
	}
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@PostMapping("/changepassword")
	public NoticeResponse changepass(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,@RequestBody ChangePasswordRequest changePasswordRequest) {
		NoticeResponse noticeResponse=new NoticeResponse();
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		try {
			String result=accountService.changePassword(changePasswordRequest, username);
			if(result.compareTo("Oke")==0) {
				noticeResponse.setStatus(1l);
			}else noticeResponse.setStatus(0l);
			noticeResponse.setContent(result);
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		return noticeResponse;
	}
	
	@PostMapping("/getOTP")
	public NoticeResponse getOTP(@RequestBody OTPRequest otpRequest) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			String result= accountService.getOTP(otpRequest.getUsername());
			if(result.compareTo("Oke")==0) {
				noticeResponse.setStatus(1l);
				noticeResponse.setContent("Đã gửi thành công OTP đến tài khoản email của bạn!");
			}else {
				noticeResponse.setStatus(0l);
				noticeResponse.setContent(result);
			}
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent(e.getMessage());
		}
		return noticeResponse;
	}
	
	@PostMapping("/getpass/mail")
	public NoticeResponse changePassWithOTP(@RequestBody SignInRequest signInRequest) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			String result= accountService.changePassWithOTP(signInRequest.getUsername(), signInRequest.getPassword());
			if(result.compareTo("Oke")==0) {
				noticeResponse.setStatus(1l);
				noticeResponse.setContent("Đã gửi thành công password đến tài khoản email của bạn!");
			}else {
				noticeResponse.setStatus(0l);
				noticeResponse.setContent(result);
			}
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent(e.getMessage());
		}
		return noticeResponse;
	}
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@PostMapping("/delete")
	public NoticeResponse delete(@RequestParam Long id) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			noticeResponse.setContent(accountService.delete(id));
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		return noticeResponse;
	}
}
