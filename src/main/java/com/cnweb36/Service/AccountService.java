package com.cnweb36.Service;

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
import com.cnweb36.DTO.Entity.LoginDTO;
import com.cnweb36.DTO.Request.LoginRequest;
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

	public LoginDTO login(LoginRequest loginRequest) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(), loginRequest.getPassword());
		Authentication authentication = authenticationManager.authenticate(authToken);
		AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();

		String csrfToken = jwtUtility.generateCsrfToken();
		String jwtCookie = jwtUtility.generateJwtCookie(accountDetails, csrfToken).toString();
		List<String> roleList = accountDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return new LoginDTO(accountDetails.getId(), roleList, csrfToken, jwtCookie);
	}

	public Long usersignup(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {
			AccountEntity AccountEntity = accountConverter.toEntity(AccountDTO);

			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());

			AccountEntity.setPassword(password);
			AccountEntity.setRoles("ROLE_USER");

			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}

	public Long adminsignup1(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity AccountEntity = accountConverter.toEntity(AccountDTO);
			
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());
			
			AccountEntity.setPassword(password);
			AccountEntity.setRoles("ROLE_ADMIN_1");

			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}

	public Long adminsignup2(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity AccountEntity = accountConverter.toEntity(AccountDTO);
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());
			
			AccountEntity.setPassword(password);
			AccountEntity.setRoles("ROLE_ADMIN_1", "ROLE_ADMIN_2");

			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}
	
	public Long adminsignup3(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity AccountEntity = accountConverter.toEntity(AccountDTO);
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String password = encoder.encode(AccountDTO.getPassword());
			
			AccountEntity.setPassword(password);
			AccountEntity.setRoles("ROLE_ADMIN_1", "ROLE_ADMIN_2","ROLE_ADMIN_3");

			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}
}
