package com.cnweb36.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.AuthorDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.AuthorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/author")
public class AuthorAPI {

	@Autowired
	private AuthorService authorService;
	
	@PostMapping("/post")
	@PreAuthorize("hasRole('ROLE_ADMIN_1') or hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3')")
	public NoticeResponse AddProduct(@RequestBody AuthorDTO authorDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			return authorService.AddOrUpdateAuthor(authorDTO);
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent(e.getMessage());
			return noticeResponse;
		}
	}
	
	@GetMapping("/get")
	public List<AuthorDTO> getListAuthor() {
		return authorService.getListAuthor();
	}
}
