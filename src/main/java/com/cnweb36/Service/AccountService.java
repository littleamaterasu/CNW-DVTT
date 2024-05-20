package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.AccountConverter;
import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.DTO.Entity.SignInDTO;
import com.cnweb36.DTO.Request.Admin3FirstSignupRequest;
import com.cnweb36.DTO.Request.ChangeInfoRequest;
import com.cnweb36.DTO.Request.ChangePasswordRequest;
import com.cnweb36.DTO.Request.SignInRequest;
import com.cnweb36.DTO.Response.UserResponse;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.UserOTPEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Repository.UserOTPRepository;
import com.cnweb36.Service.Security.AccountDetails;
import com.cnweb36.Service.Security.JwtUtility;
import com.cnweb36.Service.SendMail.EmailService;

@Service
public class AccountService {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private AccountConverter accountConverter;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private JwtUtility jwtUtility;
	
	@Autowired
	private UserOTPRepository userOTPRepository;
	
	@Autowired
	private EmailService emailService;

	@Value("${cnweb36.bonusAttribute}")
	private String bonusAttribute;
	
	@Value("${cnweb36.admin3Passkey}")
	private String admin3Passkey;
	
	private static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public SignInDTO accountSignin(SignInRequest signInRequest) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				signInRequest.getUsername(), signInRequest.getPassword());
		Authentication authentication = authenticationManager.authenticate(authToken);
		AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();

		String csrfToken = jwtUtility.generateCsrfToken();
		String jwtCookie = jwtUtility.generateJwtCookie(accountDetails, csrfToken).toString() + bonusAttribute;
		List<String> roleList = accountDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return new SignInDTO(accountDetails.getId(), roleList, csrfToken, jwtCookie);
	}

	public Long userSignup(AccountDTO accountDTO) {

		String username = accountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {
			AccountEntity accountEntity = accountConverter.toEntity(accountDTO);

			//BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(accountDTO.getPassword());

			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_USER");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}

	public Long admin1Signup(AccountDTO accountDTO) {

		String username = accountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity accountEntity = accountConverter.toEntity(accountDTO);
			
			//BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(accountDTO.getPassword());
			
			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_ADMIN_1");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}

	public Long admin2Signup(AccountDTO accountDTO) {

		String username = accountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity accountEntity = accountConverter.toEntity(accountDTO);
			//BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(accountDTO.getPassword());
			
			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_ADMIN_1", "ROLE_ADMIN_2");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}
	
	public Long admin3Signup(AccountDTO accountDTO) {
		String username = accountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity accountEntity = accountConverter.toEntity(accountDTO);
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(accountDTO.getPassword());
			
			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_ADMIN_1", "ROLE_ADMIN_2", "ROLE_ADMIN_3");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}
		
	public Long admin3FirstSignupRequest(Admin3FirstSignupRequest admin3DTO) {
		Pageable pageWithFirstElement = PageRequest.of(0, 1, Sort.unsorted());
		List<AccountEntity> admin3EntityList = accountRepository.findByRolesContaining("ROLE_ADMIN_3", pageWithFirstElement);
		if (!admin3EntityList.isEmpty() && (admin3DTO.getPasskey() == admin3Passkey)) {
			AccountEntity accountEntity = accountConverter.toEntity((AccountDTO)admin3DTO);
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(admin3DTO.getPassword());
			
			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_ADMIN_1", "ROLE_ADMIN_2", "ROLE_ADMIN_3");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}
	
	public String accountSignout() {
		return jwtUtility.generateCleanJwtCookie().toString();
	}
	
	public String accountSignoutAll(String username) {
		AccountEntity accountEntity = accountRepository.findByUsername(username).get();
		if (accountEntity != null) {
			accountEntity.setSignoutTime(new Date());
			accountRepository.save(accountEntity);
		}
		return accountSignout();
	}
	
	public AccountDTO getUser(Long id, String username) {
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		if(accountEntity.getId()==id) {
			AccountDTO accountDTO=accountConverter.toDTO(accountEntity);
			return accountDTO;
		}else {
			//check role=admin 
			Boolean flag=false;
			for(String role: accountEntity.getRoles()) {
				if(role.compareTo("ROLE_ADMIN_1")==0) flag=true;
			}
			if(flag) {
				AccountEntity accountEntity2=accountRepository.findEntityById(id);
				AccountDTO accountDTO2=accountConverter.toDTO(accountEntity2);
				return accountDTO2;
			}else return new AccountDTO();
		}
	}
	
	public List<UserResponse> getAllUser(Integer page) {
		List<UserResponse> listUser=new ArrayList<>();
		List<AccountEntity> listacc;
		if(page==null||page<1) {
			listacc=accountRepository.findByRolesContaining("ROLE_USER", Sort.by("createdDate").descending());
		}else {
			Pageable pageWithTenElements = PageRequest.of((int)page-1, 2, Sort.by("createdDate").descending());
			listacc=accountRepository.findByRolesContaining("ROLE_USER", pageWithTenElements);
		}
		
		for(AccountEntity a: listacc) {
			UserResponse userResponse=new UserResponse();
			userResponse.setId(a.getId());
			userResponse.setName(a.getName());
			userResponse.setUsername(a.getUsername());
			listUser.add(userResponse);
		}
		return listUser;
	}
	
	// change info and pass
	
	public String changeInfo(ChangeInfoRequest changeInfoRequest, String username) {
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
	
		if(encoder.matches(changeInfoRequest.getPassword(), accountEntity.getPassword())) {
			accountEntity.setAddress(changeInfoRequest.getAddress());
			accountEntity.setPhone(changeInfoRequest.getPhone());
			accountRepository.save(accountEntity);
			return "Oke";
		}else {
			return "Mật khẩu không đúng";
		}
	}
	
	public String changePassword(ChangePasswordRequest changePasswordRequest, String username) {
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		
		
		if(encoder.matches(changePasswordRequest.getOldPassword(), accountEntity.getPassword())) {
			String newpassword = encoder.encode(changePasswordRequest.getNewPassword());
			accountEntity.setPassword(newpassword);
			accountRepository.save(accountEntity);
			return "Oke";
		}else {
			return "Mật khẩu không đúng";
		}
	}
	
	public String getOTP(String username) {
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		if(accountEntity!=null) {
			if(accountEntity.getEmail()!=null) {
				UserOTPEntity userOTPEntity =new UserOTPEntity();
				String OTP=userOTPEntity.generateString(8);
				userOTPEntity.setCount(0);
				userOTPEntity.setOTP(encoder.encode(OTP));
				userOTPEntity.setUsername(username);
				userOTPRepository.save(userOTPEntity);
				
				// send OTP by email
				String subject="OTP from cnweb36 - Expire in 5 minutes! ";
				String text="Your OTP    :     "+ OTP;
				emailService.sendMessage(accountEntity.getEmail(), subject, text);
				
				return "Oke";
			}else {
				return "Tài khoản này chưa cập nhật email";
			}
		}else {
			return "Tài khoản này không tồn tại";
		}
	}
	
	public String changePassWithOTP(String username, String OTP) {
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		UserOTPEntity userOTPEntity= userOTPRepository.findEntityByUsername(username);
		if(userOTPEntity!=null) {
			if(userOTPEntity.OTPisValid()) {
				if(encoder.matches(OTP,userOTPEntity.getOTP())) {
					// set new password and send
					String newPassword=userOTPEntity.generateString(12);
					accountEntity.setPassword(encoder.encode(newPassword));
					accountRepository.save(accountEntity);
					
					String subject="Password from cnweb36";
					String text="Your password    :     "+ newPassword;
					emailService.sendMessage(accountEntity.getEmail(), subject, text);
					
					userOTPRepository.delete(userOTPEntity);
					return "Oke";
				}else {
					userOTPEntity.setCount(userOTPEntity.getCount()+1);
					return "Nhập sai mã OTP lần "+userOTPRepository.save(userOTPEntity).getCount();
				}
			}else {
				userOTPRepository.delete(userOTPEntity);
				return "OTP của bạn đã hết hạn hoặc quá số lần nhập";
			}
		}else {
			return "Chưa gửi OTP cho tài khoản này";
		}
	}
	
	public String checkmail(String otp, String email) {
		try {
		String subject="OTP from cnweb36 to check mail";
		String text="Your OTP    :     "+ otp;
		emailService.sendMessage(email, subject, text);
		System.out.println(email);
		System.out.println(otp);
		return "Oke";
		}catch (Exception e) {
			return e.getMessage();
		}
		
	}
	
	public String delete(Long id) {
		AccountEntity accountEntity= accountRepository.findEntityById(id);
		if(accountEntity!=null) {
			accountEntity.setStatus("-1");
			accountRepository.save(accountEntity);
			return "Oke";
		}else return "Not found Entity with id= "+id;
	}
}
