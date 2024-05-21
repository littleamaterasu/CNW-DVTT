package com.cnweb36.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.MessageDTO;
import com.cnweb36.DTO.Response.MessageAdminResponse;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.MessageService;
import com.cnweb36.Service.Security.JwtUtility;

@RestController
@RequestMapping("/message")
public class MessageAPI {
	
	@Autowired
	private JwtUtility jwtUtility;
	
	@Autowired
	private MessageService messageService;
	
	@PreAuthorize("hasAnyRole('USER')")
	@GetMapping("/user")
	public List<MessageDTO> userMess(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,@RequestParam(required = false) Integer page ) {
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		return messageService.userget(username, page);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@GetMapping("/admin")
	public List<MessageAdminResponse> adminMess(Integer Day) {
		return messageService.adminget(Day);
	}
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN_1', 'ADMIN_2', 'ADMIN_3')")
	@PostMapping("/delete")
	public NoticeResponse delete(@RequestParam Long id) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			noticeResponse.setContent(messageService.delete(id));
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		return noticeResponse;
	}
}
