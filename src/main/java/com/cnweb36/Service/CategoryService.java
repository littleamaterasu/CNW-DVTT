package com.cnweb36.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Entity.CategoryDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Entity.CategoryEntity;
import com.cnweb36.Repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	public NoticeResponse AddOrUpdateCategory(CategoryDTO categoryDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		CategoryEntity categoryEntity=categoryRepository.findByName(categoryDTO.getName());
		if(categoryEntity==null) {
			CategoryEntity newcategoryEntity=new CategoryEntity();
			
			newcategoryEntity.setName(categoryDTO.getName());
			newcategoryEntity.setInfo(categoryDTO.getInfo());
			
			noticeResponse.setStatus(categoryRepository.save(newcategoryEntity).getId());
			noticeResponse.setContent("Create a category");
		}else {
			categoryEntity.setInfo(categoryDTO.getInfo());
			
			noticeResponse.setStatus(categoryRepository.save(categoryEntity).getId());
			noticeResponse.setContent("Update a category");
		}
		return noticeResponse;
	}
	
	
}
