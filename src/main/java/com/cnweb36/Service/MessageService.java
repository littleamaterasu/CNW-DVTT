package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Entity.MessageDTO;
import com.cnweb36.DTO.Response.MessageAdminResponse;
import com.cnweb36.Entity.MessageEntity;
import com.cnweb36.Repository.MessageRepository;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository;
	
	public void save(MessageEntity messageEntity) {
		messageEntity.setStatus("0");
		messageRepository.save(messageEntity);
	}
	
	public List<MessageDTO> userget(String username, Integer page) {
		List<MessageEntity> listmessE;
		if(page==null) {
			listmessE=messageRepository.findByUsername(username, Sort.by("createdDate").descending());
		}else {
			Pageable pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("createdDate").descending());
			listmessE=messageRepository.findMessByUser(username,pageWithTenElements);
		}
		
		List<MessageDTO> listMess=new ArrayList<>();
		for(MessageEntity m: listmessE) {
			listMess.add(new MessageDTO(m.getId() , m.getCreatedDate(), m.getModifiedDate(), m.getStatus(),
										username, m.getFrom(), m.getContent()));	
		}
		
		return listMess;
	}
	
	public List<MessageAdminResponse> adminget(Integer Day) {
		if(Day==null) Day=1;
		List<MessageAdminResponse> listResult=new ArrayList<>();
		Map<String,List<MessageDTO>> myMap =new HashMap<>();
		for(MessageEntity e: messageRepository.adminfindByDay(Day)) {
			String username= e.getUsername();
			if(!myMap.containsKey(username)) {
				List<MessageDTO> list= new ArrayList<>();
				list.add(new MessageDTO(e.getId(), e.getCreatedDate(), e.getModifiedDate(),
										e.getStatus(), username, e.getFrom(), e.getContent()));
				myMap.put(username, list);
			}else {
				
				List<MessageDTO> list=myMap.get(username);
				list.add(new MessageDTO(e.getId(), e.getCreatedDate(), e.getModifiedDate(),
										e.getStatus(), username, e.getFrom(), e.getContent()));
				myMap.put(username, list);
			}
		}
		
		myMap.forEach((Key,value) -> {
			MessageAdminResponse messageAdminResponse =new MessageAdminResponse(Key, value);
			listResult.add(messageAdminResponse);
		});
		
		return listResult;
	}
	
	public String delete(Long id) {
		MessageEntity messageEntity=messageRepository.findEntityById(id);
		if(messageEntity!=null) {
			messageEntity.setStatus("-1");
			messageRepository.save(messageEntity);
			return "Oke";
		}else return "Not found Entity with id= "+id;
	}
}
