package com.cnweb36.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.AccountConverter;
import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Repository.AccountRepository;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private AccountConverter AccountConverter;

	public Long usersignup(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity AccountEntity = AccountConverter.toEntity(AccountDTO);
			AccountEntity.setRoles("ROLE_USER");

			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}

	public Long adminsignup1(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity AccountEntity = AccountConverter.toEntity(AccountDTO);
			AccountEntity.setRoles("ROLE_ADMIN_1");

			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}

	public Long usersignup2(AccountDTO AccountDTO) {

		String username = AccountDTO.getUsername();
		if (!accountRepository.findByUsername(username).isPresent()) {

			AccountEntity AccountEntity = AccountConverter.toEntity(AccountDTO);
			AccountEntity.setRoles("ROLE_ADMIN1","ROLE_ADMIN_2");
            
			return accountRepository.save(AccountEntity).getId();
		}
		return -1l;
	}
}
