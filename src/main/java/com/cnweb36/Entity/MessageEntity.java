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

	@ManyToOne
	@JoinColumn(name = "adminid", nullable = false)
	private AccountEntity admin_message;
	
	@ManyToOne
	@JoinColumn(name = "userid", nullable = false)
	private AccountEntity user_message;
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public AccountEntity getAdmin_message() {
		return admin_message;
	}

	public void setAdmin_message(AccountEntity admin_message) {
		this.admin_message = admin_message;
	}

	public AccountEntity getUser_message() {
		return user_message;
	}

	public void setUser_message(AccountEntity user_message) {
		this.user_message = user_message;
	}
	
	
}
