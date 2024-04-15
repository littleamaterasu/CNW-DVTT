package com.cnweb36.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	
	
	
}
