package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.CategoryDTO;
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
}
