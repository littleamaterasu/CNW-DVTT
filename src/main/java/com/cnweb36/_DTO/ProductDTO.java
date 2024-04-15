package com.cnweb36.DTO;

import java.util.Date;

public class ProductDTO {

	private Long id;
	private String createBy;
	private Date createDate;
	private Date modifiedDate;
	private String name;
	private String imageUrl;
	private Float price;
	private Float discount;
	private Integer soldCount;
	private Integer remainedCount;
	private Integer year;
	private Integer page;
	private String cover;
	private Integer weight;
	
	
	
	
	public ProductDTO() {
		super();
	}
	public ProductDTO(Long id, String createBy, Date createDate, Date modifiedDate, String name, String imageUrl,
			Float price, Float discount, Integer soldCount, Integer remainedCount, Integer year, Integer page,
			String cover, Integer weight) {
		super();
		this.id = id;
		this.createBy = createBy;
		this.createDate = createDate;
		this.modifiedDate = modifiedDate;
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = price;
		this.discount = discount;
		this.soldCount = soldCount;
		this.remainedCount = remainedCount;
		this.year = year;
		this.page = page;
		this.cover = cover;
		this.weight = weight;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public Float getDiscount() {
		return discount;
	}
	public void setDiscount(Float discount) {
		this.discount = discount;
	}
	public Integer getSoldCount() {
		return soldCount;
	}
	public void setSoldCount(Integer soldCount) {
		this.soldCount = soldCount;
	}
	public Integer getRemainedCount() {
		return remainedCount;
	}
	public void setRemainedCount(Integer remainedCount) {
		this.remainedCount = remainedCount;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
		this.weight = weight;
	}
	
	
}
