package com.cnweb36.DTO.Response;

import java.util.List;

public class SignInResponse {
	private Long userId;
	private List<String> role;
	private String token;
	
	public SignInResponse(Long userId, List<String> role, String token) {
		super();
		this.userId = userId;
		this.role = role;
		this.token = token;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public List<String> getRole() {
		return role;
	}
	public void setRole(List<String> role) {
		this.role = role;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}
