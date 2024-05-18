package com.cnweb36.DTO.Request;

public class Message {

	private String from;
    private String content;
    private String username;
    
	public Message() {
		super();
	}
	

	public Message(String from, String content, String username) {
		super();
		this.from = from;
		this.content = content;
		this.username = username;
	}

	public String getFrom() {
		return from;
	}


	public void setFrom(String from) {
		this.from = from;
	}


	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}