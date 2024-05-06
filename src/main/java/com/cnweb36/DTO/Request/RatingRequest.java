package com.cnweb36.DTO.Request;

public class RatingRequest {
	
	private Long orderId;
	private String comment;
	private Integer rate;
	private Integer likeOrDislike;
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public Integer getRate() {
		return rate;
	}
	public void setRate(Integer rate) {
		this.rate = rate;
	}
	public Integer getLikeOrDislike() {
		return likeOrDislike;
	}
	public void setLikeOrDislike(Integer likeOrDislike) {
		this.likeOrDislike = likeOrDislike;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
}
