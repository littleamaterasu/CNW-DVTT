package com.cnweb36.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_log")
public class PaymentLogEntity extends BaseEntity{

	@Column(name = "info")
	private String info;

	@ManyToOne
	@JoinColumn(name = "pament_id", nullable = false)
	private PaymentEntity payment;
	
	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }

	public PaymentEntity getPayment() { return payment; }
	public void setPayment(PaymentEntity payment) {	this.payment = payment; }
	
}
