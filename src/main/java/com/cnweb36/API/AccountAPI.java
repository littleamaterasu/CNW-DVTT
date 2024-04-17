package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.AccountDTO;
import com.cnweb36.Service.AccountService;

class notice{
	
	private Long userid;
	private String content;
	
	public notice() {
		super();
	}
	public notice(Long userid, String content) {
		super();
		this.userid = userid;
		this.content = content;
	}
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
}

@RestController
public class AccountAPI {
	
	@Autowired
	private AccountService userService;
	
	@PostMapping("/guest/register")
	public notice regiter(@RequestBody AccountDTO AccountDTO) {
		notice notice=new notice();
		
		Long result=userService.usersignup(AccountDTO);
		System.out.println(AccountDTO.getName());
		notice.setUserid(result);
		if(result==-1l) {
			notice.setContent("username or password already exists!");
		}else {
			notice.setContent("Oke");
		}
		return notice;
	}
}
