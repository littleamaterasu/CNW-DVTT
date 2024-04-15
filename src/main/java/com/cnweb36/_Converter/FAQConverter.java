package com.cnweb36.Converter;

import org.springframework.stereotype.Component;

import com.cnweb36.DTO.FAQDTO;
//import com.cnweb36.Entity.AdminEntity;
import com.cnweb36.Entity.FAQEntity;

@Component
public class FAQConverter {
	
	public FAQEntity toNewEntity(FAQDTO dto) {
		FAQEntity entity = new FAQEntity();
		AdminConverter adminConverter = new AdminConverter();
		
		entity.setQuestion(dto.getQuestion());
		entity.setAnswer(dto.getAnswer());
		entity.setAdmin(adminConverter.toNewEntity(dto.getAdmin()));
		return entity;
	}
	
	public FAQDTO toDTO(FAQEntity entity) {
		FAQDTO dto = new FAQDTO();
		AdminConverter adminConverter = new AdminConverter();
		
		if (entity.getId() != null) {
			dto.setId(entity.getId());
		}
		dto.setCreatedDate(entity.getCreatedDate());
		dto.setCreatedBy(entity.getCreatedBy());
		dto.setModifiedDate(entity.getModifiedDate());
		dto.setModifiedBy(entity.getModifiedBy());

		dto.setQuestion(entity.getQuestion());
		dto.setAnswer(entity.getAnswer());
		dto.setAdmin(adminConverter.toDTO(entity.getAdmin()));
		return dto;
	}
	
	public FAQEntity toEntity(FAQDTO dto, FAQEntity entity) {
		AdminConverter adminConverter = new AdminConverter();
		
		entity.setQuestion(dto.getQuestion());
		entity.setAnswer(dto.getAnswer());
		entity.setAdmin(adminConverter.toNewEntity(dto.getAdmin()));
		return entity;
	}
}