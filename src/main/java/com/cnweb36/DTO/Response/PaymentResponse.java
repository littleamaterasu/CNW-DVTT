package com.cnweb36.DTO.Response;

import java.util.Date;
import java.util.List;

import com.cnweb36.DTO.Entity.CouponDTO;

public class PaymentResponse {

	private Long userId;
	private String address;
	private String phone;
	private String note;
	private Float pay;
	private Date createdDate;
	private Date modifiedDate;
	private String status;
	private CouponDTO couponDTO;
	private List<OrderResponse> listOrder;
	private String payStatus;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Float getPay() {
		return pay;
	}
	public void setPay(Float pay) {
		this.pay = pay;
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
	public CouponDTO getCouponDTO() {
		return couponDTO;
	}
	public void setCouponDTO(CouponDTO couponDTO) {
		this.couponDTO = couponDTO;
	}

	public List<OrderResponse> getListOrder() {
		return listOrder;
	}
	public void setListOrder(List<OrderResponse> listOrder) {
		this.listOrder = listOrder;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public String getPayStatus() {
		return payStatus;
	}
	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}
	
}
