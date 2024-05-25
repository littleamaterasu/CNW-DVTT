package com.cnweb36.DTO.Response;

public class UserStatisticResponse {

	private Integer numberPayment;
	private Float paid;
	public Integer getNumberPayment() {
		return numberPayment;
	}
	public void setNumberPayment(Integer numberPayment) {
		this.numberPayment = numberPayment;
	}
	public Float getPaid() {
		return paid;
	}
	public void setPaid(Float paid) {
		this.paid = paid;
	}
	public UserStatisticResponse(Integer numberPayment, Float paid) {
		super();
		this.numberPayment = numberPayment;
		this.paid = paid;
	}
	
	
}
