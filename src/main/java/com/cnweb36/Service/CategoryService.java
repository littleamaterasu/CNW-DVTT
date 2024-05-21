package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Entity.CategoryDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Entity.CategoryEntity;
import com.cnweb36.Entity.ProductEntity;
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
			newcategoryEntity.setStatus("0");

			noticeResponse.setStatus(categoryRepository.save(newcategoryEntity).getId());
			noticeResponse.setContent("Create a category");
		}else {
			categoryEntity.setInfo(categoryDTO.getInfo());
			categoryEntity.setStatus("0");
			
			noticeResponse.setStatus(categoryRepository.save(categoryEntity).getId());
			noticeResponse.setContent("Update a category");
		}
		return noticeResponse;
	}
	
	
	public List<CategoryDTO> getListCategory() {
		List<CategoryDTO> listCategory=new ArrayList<>();
		
		for(CategoryEntity e: categoryRepository.findAll()) {
			if(e.getStatus().compareTo("-1")!=0) {
			CategoryDTO categoryDTO=new CategoryDTO();
			categoryDTO.setId(e.getId());
			categoryDTO.setInfo(e.getInfo());
			categoryDTO.setName(e.getName());
			
			listCategory.add(categoryDTO);
			}
		}
		return listCategory;
	}
	
	//get product 
	public List<Book> getAllProduct(String categoryName) {
		
		CategoryEntity categoryEntity=categoryRepository.findByName(categoryName);
		List<Book> listBook=new ArrayList<>();
		for(ProductEntity e: categoryEntity.getProductList()) {
			if(e.getStatus().compareTo("-1")!=0) {
			Book book =new Book();
			book.setId(e.getId());
			book.setImageUrl(e.getImageUrl());
			book.setName(e.getName());
			book.setPrice(e.getPrice());
			listBook.add(book);
			}
		}
		return listBook;
	}
	
	public String delete(String name) {
		CategoryEntity categoryEntity=categoryRepository.findByName(name);
		if(categoryEntity!=null) {
			categoryEntity.setStatus("-1");
			categoryRepository.save(categoryEntity);
			return "Oke";
		}else return "Not found Entity with name= "+name;
	}
}
