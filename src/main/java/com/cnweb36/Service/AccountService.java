package com.cnweb36.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import com.cnweb36.DTO.Entity.LoginDTO;
import com.cnweb36.DTO.Request.LoginRequest;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Service.Security.AccountDetails;
import com.cnweb36.Service.Security.JwtUtility;

@Service
public class AccountService {
	@Autowired
	private AuthenticationManager authenticationManager;

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
		List<String> roleList = accountDetails.getAuthorities().stream()
			.map(item -> item.getAuthority())
			.collect(Collectors.toList());
		
		return new LoginDTO(accountDetails.getId(), roleList, csrfToken, jwtCookie);
	}
	
//	public Long usersignup(AccountDTO AccountDTO) {
//
//		String username = AccountDTO.getUsername();
//		if (!accountRepository.findByUsername(username).isPresent()) {
//
//			AccountEntity AccountEntity = AccountConverter.toEntity(AccountDTO);
//			AccountEntity.setRoles("ROLE_USER");
//
//			return accountRepository.save(AccountEntity).getId();
//		}
//		return -1l;
//	}
//
//	public Long adminsignup1(AccountDTO AccountDTO) {
//
//		String username = AccountDTO.getUsername();
//		if (!accountRepository.findByUsername(username).isPresent()) {
//
//			AccountEntity AccountEntity = AccountConverter.toEntity(AccountDTO);
//			AccountEntity.setRoles("ROLE_ADMIN_1");
//
//			return accountRepository.save(AccountEntity).getId();
//		}
//		return -1l;
//	}
//
//	public Long usersignup2(AccountDTO AccountDTO) {
//
//		String username = AccountDTO.getUsername();
//		if (!accountRepository.findByUsername(username).isPresent()) {
//
//			AccountEntity AccountEntity = AccountConverter.toEntity(AccountDTO);
//			AccountEntity.setRoles("ROLE_ADMIN1","ROLE_ADMIN_2");
//            
//			return accountRepository.save(AccountEntity).getId();
//		}
//		return -1l;
//	}
}
