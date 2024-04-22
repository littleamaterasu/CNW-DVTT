package com.cnweb36.DTO.Entity;

import java.util.List;

public class SignInDTO {
	private Long id;
	private List<String> roleList;
	private String csrfToken;
	private String jwtCookie;
	
	public SignInDTO(Long id, List<String> roleList, String csrfToken, String jwtCookie) {
		super();
		this.id = id;
		this.roleList = roleList;
		this.csrfToken = csrfToken;
		this.jwtCookie = jwtCookie;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<String> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<String> roleList) {
		this.roleList = roleList;
	}
	public String getCsrfToken() {
		return csrfToken;
	}
	public void setCsrfToken(String csrfToken) {
		this.csrfToken = csrfToken;
	}
	public String getJwtCookie() {
		return jwtCookie;
	}
	public void setJwtCookie(String jwtCookie) {
		this.jwtCookie = jwtCookie;
	}
	
}
