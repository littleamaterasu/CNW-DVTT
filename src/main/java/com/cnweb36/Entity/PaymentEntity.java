package com.cnweb36.Entity;

import java.util.Set;

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

	@OneToMany(mappedBy = "payment")
	private Set<OrderEntity> orderList;
	
	@OneToMany(mappedBy = "payment")
	private Set<PaymentLogEntity> paymentLogList;
	
	@ManyToOne
	@JoinColumn(name = "user_payment")
	private AccountEntity user;
	
	@ManyToOne
	@JoinColumn(name="coupon_id")
	private CouponEntity coupon;
	
	public PaymentEntity() { super(); }
	public PaymentEntity(String address, String phone, String note, Float pay) {
		super();
		this.address = address;
		this.phone = phone;
		this.note = note;
		this.pay = pay;
	}

	public String getAddress() { return address; }
	public void setAddress(String address) { this.address = address; }

	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }

	public String getNote() { return note; }
	public void setNote(String note) { this.note = note; }

	public Float getPay() { return pay; }
	public void setPay(Float pay) { this.pay = pay; }

	public Set<OrderEntity> getOrderList() { return orderList; }
	public void setOrderList(Set<OrderEntity> orderList) { this.orderList = orderList; }

	public Set<PaymentLogEntity> getPaymentLogList() { return paymentLogList; }
	public void setPaymentLogList(Set<PaymentLogEntity> paymentLogList) { this.paymentLogList = paymentLogList; }

	public AccountEntity getUser() { return user; }
	public void setUser(AccountEntity user) { this.user = user; }

	public CouponEntity getCoupon() { return coupon; }
	public void setCoupon(CouponEntity coupon) { this.coupon = coupon; }
	
}
