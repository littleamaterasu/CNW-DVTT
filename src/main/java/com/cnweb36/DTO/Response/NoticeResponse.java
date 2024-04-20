package com.cnweb36.DTO.Response;

public class NoticeResponse {

	private Long status;
	private String content;
	public NoticeResponse(Long status, String content) {
		super();
		this.status = status;
		this.content = content;
	}
	public NoticeResponse() {
		super();
	}
	public Long getStatus() {
		return status;
	}
	public void setStatus(Long status) {
		this.status = status;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
	
}
