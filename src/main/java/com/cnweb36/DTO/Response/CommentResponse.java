package com.cnweb36.DTO.Response;

import java.util.Date;

public class CommentResponse {

	private String userName;
	private Date createdDate;
	private Date modifiedDate;
	private Integer rate;
	private String comment;
	private Integer like;
	
	public CommentResponse(String userName, Date createdDate, Date modifiedDate, Integer rate, String comment,
			Integer like) {
		super();
		this.userName = userName;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.rate = rate;
		this.comment = comment;
		this.like = like;
	}
	public String getuserName() {
		return userName;
	}
	public void setuserName(String userName) {
		this.userName = userName;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	public Integer getRate() {
		return rate;
	}
	public void setRate(Integer rate) {
		this.rate = rate;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Integer getLike() {
		return like;
	}
	public void setLike(Integer like) {
		this.like = like;
	}
	
	
}
