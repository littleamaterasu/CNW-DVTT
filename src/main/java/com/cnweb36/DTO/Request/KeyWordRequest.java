package com.cnweb36.DTO.Request;

public class KeyWordRequest {

	private String keyword;
	private Integer page;
	
	public KeyWordRequest() {
		super();
	}
	public KeyWordRequest(String keyword, Integer page) {
		super();
		this.keyword = keyword;
		this.page = page;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	
}
