package com.cnweb36.DTO.Request;

public class Message {

	private String admin;
    private String content;
    private String username;
    
	public Message() {
		super();
	}
	public Message(String admin, String content, String user) {
		super();
		this.admin = admin;
		this.setContent(content);
		this.username = user;
	}
	public String getAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	public String getUser() {
		return username;
	}
	public void setUser(String user) {
		this.username = user;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
}