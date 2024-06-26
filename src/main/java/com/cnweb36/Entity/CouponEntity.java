package com.cnweb36.Entity;

import java.util.Date;
//import java.util.ArrayList;
//import java.util.Set;
//import java.util.HashSet;
import java.util.Set;

//import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
@Table(name="coupon")
public class CouponEntity extends BaseEntity {
	@Column(nullable=false)
	private String name;
	
	@Min(0)
	@Column(nullable=false)
	private int limitCount;
	
	@Min(value =0000)
    @Max(value = 10000)
	@Column(nullable=false)
	private int discountPercent;
	
	@Min(0)
	@Column(nullable=false)
	private Long discountValue;
	
	@Min(0)
	@Column(nullable=false)
	private Long maxDiscount;
	
	@Min(0)
	@Column(nullable=false)
	private Long minPrice;
	
	@Column(nullable=false)
	private Date startTime;
	
	@Column(nullable=false)
	private Date endTime;
	
	@Column(columnDefinition="text")
	private String info;
	
	@OneToMany(mappedBy = "coupon")
	private Set<PaymentEntity> paymentList;

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	
	public int getLimitCount() { return limitCount; }
	public void setLimitCount(int limitCount) { this.limitCount = limitCount; }
	
	public int getDiscountPercent() { return discountPercent; }
	public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

	public Long getDiscountValue() { return discountValue; }
	public void setDiscountValue(Long discountValue) { this.discountValue = discountValue; }
	
	public Long getMaxDiscount() { return maxDiscount; }
	public void setMaxDiscount(Long maxDiscount) { this.maxDiscount = maxDiscount; }

	public Long getMinPrice() { return minPrice; }
	public void setMinPrice(Long minPrice) { this.minPrice = minPrice; }

	public Date getStartTime() { return startTime; }
	public void setStartTime(Date startTime) { this.startTime = startTime; }

	public Date getEndTime() { return endTime; }
	public void setEndTime(Date endTime) { this.endTime = endTime; }

	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }
	
	public Set<PaymentEntity> getPaymentList() { return paymentList; }
	public void setPaymentList(Set<PaymentEntity> paymentList) { this.paymentList = paymentList; }	
	
//	public Set<FAQEntity> getFAQList() { return faqList; }
//	public void setFAQList(Set<FAQEntity> faqList) { this.faqList = faqList; }
}
