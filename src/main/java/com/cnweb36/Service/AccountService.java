package com.cnweb36.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.AccountConverter;
import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.DTO.Entity.SignInDTO;
import com.cnweb36.DTO.Request.SignInRequest;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Service.Security.AccountDetails;
import com.cnweb36.Service.Security.JwtUtility;

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

	public SignInDTO accountSignin(SignInRequest signInRequest) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				signInRequest.getUsername(), signInRequest.getPassword());
		Authentication authentication = authenticationManager.authenticate(authToken);
		AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();

		String csrfToken = jwtUtility.generateCsrfToken();
		String jwtCookie = jwtUtility.generateJwtCookie(accountDetails, csrfToken).toString();
		List<String> roleList = accountDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return new SignInDTO(accountDetails.getId(), roleList, csrfToken, jwtCookie);
	}

	public Long userSignup(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {
			AccountEntity accountEntity = accountConverter.toEntity(AccountDTO);

			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());

			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_USER");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}

	public Long admin1Signup(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity accountEntity = accountConverter.toEntity(AccountDTO);
			
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());
			
			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_ADMIN_1");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}

	public Long admin2Signup(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity accountEntity = accountConverter.toEntity(AccountDTO);
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());
			
			accountEntity.setPassword(password);
			accountEntity.setRoles("ROLE_ADMIN_1", "ROLE_ADMIN_2");

			return accountRepository.save(accountEntity).getId();
		}
		return -1l;
	}
	
	public Long admin3Signup(AccountDTO AccountDTO) {
		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity accountEntity = accountConverter.toEntity(AccountDTO);
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());
			
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
}
