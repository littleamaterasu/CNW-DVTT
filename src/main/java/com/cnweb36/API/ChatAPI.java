package com.cnweb36.API;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;

import com.cnweb36.DTO.Entity.MessageDTO;
import com.cnweb36.DTO.Request.Message;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.MessageEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Service.MessageService;

@Controller
public class ChatAPI {
	
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	
	@Async  // Bất đồng bộ
    public CompletableFuture<String> saveToDatabase(Message message) {
        AccountEntity accountEntity= accountRepository.findEntityByUsername(message.getUsername());
        if(accountEntity!=null) {
        	MessageEntity messageEntity=new MessageEntity();
        	messageEntity.setUsername(message.getUsername());
        	messageEntity.setFrom(message.getFrom());
        	messageEntity.setContent(message.getContent());
        	
        	messageService.save(messageEntity);
        }
        return CompletableFuture.completedFuture("Kết quả từ phương thức bất đồng bộ");
    }
	
//	@MessageMapping("/hello")
//	@SendToUser("/queue/reply")
//	public String send(String username) {
//		//simpMessagingTemplate.convertAndSendToUser(username, username, username);
//	return "Hello, " + username;
//	}
	
	public boolean checkAdminconnection() {
		boolean flag=true;
		try {
			MessageDTO messageDTO=new MessageDTO();
			messageDTO.setfrom("server");
			messageDTO.setContent("Check admin connection");
			simpMessagingTemplate.convertAndSendToUser("admin", "queue/reply",messageDTO);
		} catch (Exception e) {
			flag=false;
		}
		return flag;
	}
	
	@MessageMapping("/hello")
	public void sendto(SimpMessageHeaderAccessor sha,Message message) {
		//System.out.println(sha.getUser().getName());
		//this.saveToDatabase(message);
		MessageDTO messageDTO=new MessageDTO();
		Date currDate= new Date();
		messageDTO.setfrom(message.getFrom());
		messageDTO.setContent(message.getContent());
		messageDTO.setUsername(message.getUsername());
		messageDTO.setCreateDate(currDate);
		String to="";
		if(message.getFrom().compareTo("user")==0) {
			to+="admin";
		}else to+=message.getUsername();
//		System.out.println(this.checkAdminconnection());
		simpMessagingTemplate.convertAndSendToUser(to, "queue/reply",messageDTO);
	}
}
