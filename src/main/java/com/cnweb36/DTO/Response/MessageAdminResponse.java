package com.cnweb36.DTO.Response;

import java.util.List;

import com.cnweb36.DTO.Entity.MessageDTO;

public class MessageAdminResponse {
	
	private String username;
	private List<MessageDTO> listMess;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<MessageDTO> getListMess() {
		return listMess;
	}
	public void setListMess(List<MessageDTO> listMess) {
		this.listMess = listMess;
	}
	public MessageAdminResponse(String username, List<MessageDTO> listMess) {
		super();
		this.username = username;
		this.listMess = listMess;
	}
	public MessageAdminResponse() {
		super();
	}
	
	
}
