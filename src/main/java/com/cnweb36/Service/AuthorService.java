package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Entity.AuthorDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Entity.AuthorEntity;
import com.cnweb36.Repository.AuthorRepository;

@Service
public class AuthorService {

	@Autowired
	private AuthorRepository authorRepository;
	
	public NoticeResponse AddOrUpdateAuthor(AuthorDTO authorDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		AuthorEntity AuthorEntity=authorRepository.findByName(authorDTO.getName());
		if(AuthorEntity==null) {
			AuthorEntity newAuthorEntity=new AuthorEntity();
			
			newAuthorEntity.setName(authorDTO.getName());
			newAuthorEntity.setInfo(authorDTO.getInfo());
			
			noticeResponse.setStatus(authorRepository.save(newAuthorEntity).getId());
			noticeResponse.setContent("Create a author");
		}else {
			AuthorEntity.setInfo(authorDTO.getInfo());
			
			noticeResponse.setStatus(authorRepository.save(AuthorEntity).getId());
			noticeResponse.setContent("Update a author");
		}
		return noticeResponse;
	}
	
	public List<AuthorDTO> getListAuthor() {
		List<AuthorDTO> listAuthor=new ArrayList<>();
		for(AuthorEntity e: authorRepository.findAll()) {
			AuthorDTO authorDTO=new AuthorDTO();
			authorDTO.setId(e.getId());
			authorDTO.setInfo(e.getInfo());
			authorDTO.setName(e.getName());
			
			listAuthor.add(authorDTO);
		}
		return listAuthor;
	}
}
