package com.cnweb36.Converter;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.cnweb36.DTO.Entity.AccountDTO;
import com.cnweb36.DTO.Entity.ProductDTO;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.ProductEntity;

@Component
public class AccountConverter {


	public AccountEntity toEntity(AccountDTO AccountDTO) {
		AccountEntity AccountEntity = new AccountEntity();

		AccountEntity.setAddress(AccountDTO.getAddress());
		AccountEntity.setEmail(AccountDTO.getEmail());
		AccountEntity.setName(AccountDTO.getName());
//		AccountEntity.setPassword(AccountDTO.getPassword());
		AccountEntity.setPhone(AccountDTO.getPhone());
		AccountEntity.setUsername(AccountDTO.getUsername());

		return AccountEntity;

	}
	
	public AccountDTO toDTO(AccountEntity AccountEntity) {
		AccountDTO AccountDTO=new AccountDTO();
		AccountDTO.setAddress(AccountEntity.getAddress());
		AccountDTO.setCreateDate(AccountEntity.getCreatedDate());
		AccountDTO.setEmail(AccountEntity.getEmail());
		AccountDTO.setId(AccountEntity.getId());
		AccountDTO.setName(AccountEntity.getName());
		//AccountDTO.setPassword(AccountEntity.getPassword());
		AccountDTO.setPhone(AccountEntity.getPhone());
		AccountDTO.setUsername(AccountEntity.getUsername());
		
		return AccountDTO;
	}
	
}
