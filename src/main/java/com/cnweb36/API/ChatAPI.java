package com.cnweb36.API;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class ChatAPI {
	
	
	@MessageMapping("/hello")
	@SendToUser("/queue/reply")
	public String send(String username) {
	return "Hello, " + username;
	}
}
