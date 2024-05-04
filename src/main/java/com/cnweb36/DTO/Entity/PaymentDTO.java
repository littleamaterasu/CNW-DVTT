package com.cnweb36.DTO.Entity;

import java.util.Set;

public class PaymentDTO {

	private String address;
	
	private String phone;
	
	private String note;
	
	private Float pay;

	private Set<OrderDTO> orderList;
	
	private Set<Long> paymentLogListid;

	private Long couponId;

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

	public Set<Long> getPaymentLogListid() {
		return paymentLogListid;
	}

	public void setPaymentLogListid(Set<Long> paymentLogListid) {
		this.paymentLogListid = paymentLogListid;
	}

	public Long getCouponId() {
		return couponId;
	}

	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}

	public Set<OrderDTO> getOrderList() {
		return orderList;
	}

	public void setOrderList(Set<OrderDTO> orderList) {
		this.orderList = orderList;
	}
	
	
}
