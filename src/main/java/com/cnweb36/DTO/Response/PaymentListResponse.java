package com.cnweb36.DTO.Response;

import java.util.Date;

public class PaymentListResponse {

	private Long id;
	private Date createdDate;
	private Float pay;
	private String status;
	private String listNameProduct;
	
	public PaymentListResponse() {
		super();
	}
	
	public PaymentListResponse(Long id, Date createdDate, Float pay, String status, String listNameProduct) {
		super();
		this.id = id;
		this.createdDate = createdDate;
		this.pay = pay;
		this.status = status;
		this.listNameProduct = listNameProduct;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getListNameProduct() {
		return listNameProduct;
	}

	public void setListNameProduct(String listNameProduct) {
		this.listNameProduct = listNameProduct;
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
