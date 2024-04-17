package com.cnweb36.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_log")
public class Payment_logEntity extends BaseEntity{

	@Column(name = "info")
	private String info;

	@ManyToOne
	@JoinColumn(name = "pamentid", nullable = false)
	private PaymentEntity paymentid;
	
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public PaymentEntity getPaymentid() {
		return paymentid;
	}

	public void setPaymentid(PaymentEntity paymentid) {
		this.paymentid = paymentid;
	}
	
	
}
