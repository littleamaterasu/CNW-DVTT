package com.cnweb36.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment")
public class PaymentEntity extends BaseEntity {
	
	@Column(name="address")
	private String address;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="note")
	private String note;
	
	@Column(name="pay")
	private Float pay;

	@OneToMany(mappedBy = "payment_order")
	private List<OrderEntity> listOrder;
	
	@OneToMany(mappedBy = "paymentid")
	private List<Payment_logEntity> listLog;
	
	@ManyToOne
	@JoinColumn(name = "user_payment")
	private AccountEntity user_payment;
	
	@ManyToOne
	@JoinColumn(name="couponid", nullable = false)
	private CouponEntity coupon_payment;
	
	public PaymentEntity() {
		super();
	}

	public PaymentEntity(String address, String phone, String note, Float pay) {
		super();
		this.address = address;
		this.phone = phone;
		this.note = note;
		this.pay = pay;
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

	public List<OrderEntity> getListOrder() {
		return listOrder;
	}

	public void setListOrder(List<OrderEntity> listOrder) {
		this.listOrder = listOrder;
	}

	public List<Payment_logEntity> getListLog() {
		return listLog;
	}

	public void setListLog(List<Payment_logEntity> listLog) {
		this.listLog = listLog;
	}

	public AccountEntity getUser_payment() {
		return user_payment;
	}

	public void setUser_payment(AccountEntity user_payment) {
		this.user_payment = user_payment;
	}

	public CouponEntity getCoupon_payment() {
		return coupon_payment;
	}

	public void setCoupon_payment(CouponEntity coupon_payment) {
		this.coupon_payment = coupon_payment;
	}
	
	
	
}
