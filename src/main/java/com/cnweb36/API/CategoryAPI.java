package com.cnweb36.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.CategoryDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.CategoryService;


@RestController
@RequestMapping("/category")
public class CategoryAPI {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/post")
	@PreAuthorize("hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3') or hasRole('ROLE_ADMIN_1')")
	public NoticeResponse addOrUpdateCategory(@RequestBody CategoryDTO categoryDTO) {
		try {
			return categoryService.AddOrUpdateCategory(categoryDTO);
			
			
		} catch (Exception e) {
			NoticeResponse noticeResponse=new NoticeResponse(-1l, e.getMessage());
			return noticeResponse;
		}
	}
	
	@GetMapping("/get")
	public List<CategoryDTO> getListCategory(){
		return categoryService.getListCategory();
	}
	
	@GetMapping("/getAllProduct")
	public List<Book> getAllProduct(@RequestParam String categoryName){
		return categoryService.getAllProduct(categoryName);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@PostMapping("/delete")
	public NoticeResponse delete(@RequestParam String name) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			noticeResponse.setContent(categoryService.delete(name));
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		return noticeResponse;
	}
}
