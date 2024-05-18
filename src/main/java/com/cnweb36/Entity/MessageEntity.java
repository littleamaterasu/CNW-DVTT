package com.cnweb36.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "message")
public class MessageEntity extends BaseEntity {

	@Column(name = "content")
	private String content;
	
	@Column(name = "admin")
	private String admin;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private AccountEntity user;
	
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }

	public String getAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	public AccountEntity getUser() { return user; }
	public void setUser(AccountEntity user) { this.user = user; }	
	
}
