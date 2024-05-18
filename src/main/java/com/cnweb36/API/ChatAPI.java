package com.cnweb36.API;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;

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
        AccountEntity accountEntity= accountRepository.findEntityByUsername(message.getUser());
        if(accountEntity!=null) {
        	MessageEntity messageEntity=new MessageEntity();
        	messageEntity.setUser(accountEntity);
        	messageEntity.setAdmin(message.getAdmin());
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
	
	@MessageMapping("/hello")
	public void sendto(SimpMessageHeaderAccessor sha,String username) {
		//System.out.println(sha.getUser().getName());
		simpMessagingTemplate.convertAndSendToUser("tung", "queue/reply", username);
	}
}
