package com.cnweb36.DTO.Response;

public class SignUpResponse {

	private Long id;
	private String content;
	
	public SignUpResponse() {
		super();
	}
	public SignUpResponse(Long id, String content) {
		super();
		this.id = id;
		this.content = content;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
	
}
