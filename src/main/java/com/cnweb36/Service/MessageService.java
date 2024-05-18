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
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.MessageEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Repository.MessageRepository;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private AccountRepository accountRepository;
	
	public void save(MessageEntity messageEntity) {
		messageRepository.save(messageEntity);
	}
	
	public List<MessageDTO> userget(String username, Integer page) {
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		Pageable pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("createdDate").descending());
		
		List<MessageDTO> listMess=new ArrayList<>();
		for(MessageEntity m: messageRepository.findMessByUser(accountEntity,pageWithTenElements)) {
			listMess.add(new MessageDTO(m.getId(),m.getCreatedDate(), m.getModifiedDate(), m.getStatus(),
										m.getUser().getUsername(), m.getAdmin(), m.getContent()));	
		}
		
		return listMess;
	}
	
	public List<MessageAdminResponse> getlistMessAndUser(Integer Day) {
		if(Day==null) Day=1;
		List<MessageAdminResponse> listResult=new ArrayList<>();
		Map<String,List<MessageDTO>> myMap =new HashMap<>();
		for(MessageEntity e: messageRepository.adminfindByDay(Day)) {
			String username= e.getUser().getUsername();
			if(!myMap.containsKey(username)) {
				List<MessageDTO> list= new ArrayList<>();
				list.add(new MessageDTO(e.getId(), e.getCreatedDate(), e.getModifiedDate(),
										e.getStatus(), username, e.getAdmin(), e.getContent()));
				myMap.put(username, list);
			}else {
				
				List<MessageDTO> list=myMap.get(username);
				list.add(new MessageDTO(e.getId(), e.getCreatedDate(), e.getModifiedDate(),
										e.getStatus(), username, e.getAdmin(), e.getContent()));
				myMap.put(username, list);
			}
		}
		
		myMap.forEach((Key,value) -> {
			MessageAdminResponse messageAdminResponse =new MessageAdminResponse(Key, value);
			listResult.add(messageAdminResponse);
		});
		
		return listResult;
	}
}
