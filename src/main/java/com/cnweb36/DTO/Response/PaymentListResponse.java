package com.cnweb36.DTO.Response;

import java.util.Date;

public class PaymentListResponse {

	private Long id;
	private Date createdDate;
	private Float pay;
	
	public PaymentListResponse() {
		super();
	}
	public PaymentListResponse(Long id, Date createdDate, Float pay) {
		super();
		this.id = id;
		this.createdDate = createdDate;
		this.pay = pay;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Float getPay() {
		return pay;
	}
	public void setPay(Float pay) {
		this.pay = pay;
	}
	
	
}
