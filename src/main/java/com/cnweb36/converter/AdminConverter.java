package com.cnweb36.converter;

import org.springframework.stereotype.Component;

import com.cnweb36.dto.AdminDTO;
import com.cnweb36.entity.AdminEntity;

@Component
public class AdminConverter {
	
	public AdminEntity toNewEntity(AdminDTO dto) {
		AdminEntity entity = new AdminEntity();
		entity.setUsername(dto.getUsername());
		entity.setPassword(dto.getPassword());
		entity.setName(dto.getUsername());
		entity.setEmail(dto.getEmail());
		entity.setPhone(dto.getPhone());
		entity.setRole(dto.getRole());
//		entity.setFAQList(dto.getFAQList());
		return entity;
	}
	
	public AdminDTO toDTO(AdminEntity entity) {
		AdminDTO dto = new AdminDTO();
		if (entity.getId() != null) {
			dto.setId(entity.getId());
		}
		dto.setCreatedDate(entity.getCreatedDate());
		dto.setCreatedBy(entity.getCreatedBy());
		dto.setModifiedDate(entity.getModifiedDate());
		dto.setModifiedBy(entity.getModifiedBy());

		dto.setUsername(entity.getUsername());
		dto.setPassword(entity.getPassword());
		dto.setName(entity.getUsername());
		dto.setEmail(entity.getEmail());
		dto.setPhone(entity.getPhone());
		dto.setRole(entity.getRole());
//		dto.setFAQList(entity.getFAQList());
		return dto;
	}
	
	public AdminEntity toEntity(AdminDTO dto, AdminEntity entity) {
		entity.setUsername(dto.getUsername());
		entity.setPassword(dto.getPassword());
		entity.setName(dto.getUsername());
		entity.setEmail(dto.getEmail());
		entity.setPhone(dto.getPhone());
		entity.setRole(dto.getRole());
//		entity.setFAQList(dto.getFAQList());
		return entity;
	}
}