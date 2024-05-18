package com.cnweb36.DTO.Entity;

import java.util.Date;

public class MessageDTO {
	
	private Long id;
	private Date createDate;
	private Date modifiedDate;
	private String status;
	private String username;	
	private String from;
	private String content;
	
	public MessageDTO() {
		super();
	}

	public MessageDTO(Long id, Date createDate, Date modifiedDate, String status, String username,
			String from, String content) {
		super();
		this.id = id;
		this.createDate = createDate;
		this.modifiedDate = modifiedDate;
		this.status = status;
		this.username = username;
		this.from = from;
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getfrom() {
		return from;
	}

	public void setfrom(String from) {
		this.from = from;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
