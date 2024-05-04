package com.cnweb36.DTO.Entity;

import java.util.Date;

public class CouponDTO extends BaseDTO {
	private Long id;
	private String name;
	private int limit;
	private int discountPercent;
	private Long discountValue;
	private Long maxDiscount;
	private Long minPrice;
	private Date startTime;
	private Date endTime;
	private String info;

//	private Set<FAQEntity> faqList = new HashSet<>();
	
	
	public String getName() { return name; }
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) { this.name = name; }
	
	public int getLimit() { return limit; }
	public void setLimit(int limit) { this.limit = limit; }
	
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
	
//	public Set<FAQEntity> getFAQList() { return faqList; }
//	public void setFAQList(Set<FAQEntity> faqList) { this.faqList = faqList; }
}
