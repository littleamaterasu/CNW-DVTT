package com.cnweb36.DTO.Response;

public class OrderResponse {

	private Long orderId;
	private String status;
	private Book book;
	
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	public OrderResponse(Long orderId, String status) {
		super();
		this.orderId = orderId;
		this.status = status;
	}
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
