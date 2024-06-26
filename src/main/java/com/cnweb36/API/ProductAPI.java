package com.cnweb36.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.ProductDTO;
import com.cnweb36.DTO.Request.KeyWordRequest;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.ProductService;

//@CrossOrigin(origins = "${cnweb36.crossOrigin}",allowCredentials = "true", maxAge = 3600)
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
	
	@GetMapping("/getAll")
	public List<Book> getAllBook(@RequestParam(required = false) Integer page) {
		try {
			return productService.getAllBook(page);
		} catch (Exception e) {
			return null;
		}
	}
	
	@GetMapping("/getOne")
	public ProductDTO getOne(@RequestParam(name="id") Long id) {
			return productService.getone(id);
		
	}
	
	@PostMapping("/getWithKeyword")
	public List<Book> getWithKey(@RequestBody KeyWordRequest keyWordRequest){
		return productService.getwithkey(keyWordRequest.getKeyword(), keyWordRequest.getPage());
	}
	
	@GetMapping("/getTopten")
	public List<Book> gettopten(@RequestParam Integer page){
		return productService.getTop10(page);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3')")
	@PostMapping("/delete")
	public NoticeResponse delete(@RequestParam Long id) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			noticeResponse.setContent(productService.delete(id));
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		return noticeResponse;
	}
}
