package com.cnweb36.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


// tên thông thường nó bị trùng với syntax trong sql
@Entity
@Table(name="`order`")
public class OrderEntity extends BaseEntity {

	@Column(name="`quantity`")
	private Integer quantity;
	
	@Column(name="`price`")
	private Float price;
	
	@Column(name="`rate`")
	private Integer rate;
	
	@Column(name="`comment`")
	private String comment;
	
	@Column(name="`like`")
	private Integer like;
	
	@Column(name="dislike")
	private Integer dislike;
	
	@ManyToOne
    @JoinColumn(name="user_id", nullable=false)
	private AccountEntity user;

	@ManyToOne
	@JoinColumn(name="product_id", nullable=false)
	private ProductEntity product;
	
	@ManyToOne
	@JoinColumn(name="payment_id", nullable=false)
	private PaymentEntity payment;
	
	public OrderEntity() { super(); }
	public OrderEntity(Integer quantity, Float price, Integer rate, String comment, Integer like, Integer dislike) {
		super();
		this.quantity = quantity;
		this.price = price;
		this.rate = rate;
		this.comment = comment;
		this.like = like;
		this.dislike = dislike;
	}

	public Integer getQuantity() { return quantity; }
	public void setQuantity(Integer quantity) {	this.quantity = quantity; }

	public Float getPrice() { return price; }
	public void setPrice(Float price) { this.price = price; }

	public Integer getRate() { return rate; }
	public void setRate(Integer rate) { this.rate = rate; }

	public String getComment() { return comment; }
	public void setComment(String comment) { this.comment = comment; }

	public Integer getLike() { return like; }
	public void setLike(Integer like) { this.like = like; }

	public Integer getDislike() { return dislike; }
	public void setDislike(Integer dislike) { this.dislike = dislike; }

	public AccountEntity getUser() { return user; }
	public void setUser(AccountEntity user) { this.user = user; }

	public ProductEntity getProduct_order() { return product; }
	public void setProduct(ProductEntity product) {	this.product = product;	}

	public PaymentEntity getPayment() {	return payment;	}
	public void setPayment(PaymentEntity payment) {	this.payment = payment;	}	
	
}
