package com.cnweb36.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "message")
public class MessageEntity extends BaseEntity {

	@Column(name = "content")
	private String content;
	
	@Column(name = "admin")
	private String from;
	
	@Column(name = "username")
	private String username;
	
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }

	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
