package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.ProductDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductAPI {

	@Autowired
	private ProductService productService;
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3')")
	public NoticeResponse AddProduct(@RequestBody ProductDTO productDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			Long result=productService.AddProduct(productDTO);
			noticeResponse.setStatus(result);
			noticeResponse.setContent("Oke");
			return noticeResponse;
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent(e.getMessage());
			return noticeResponse;
		}
	}
	
	
}
