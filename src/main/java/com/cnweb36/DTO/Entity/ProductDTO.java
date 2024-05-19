package com.cnweb36.DTO.Entity;

import java.util.Date;
import java.util.List;

public class ProductDTO {

	private Long id;
	private String createBy;
	private Date createDate;
	private Date modifiedDate;
	
	private String name;
	private String imageUrl;
	private Long price;
	private Integer discount;
	private Integer soldCount;
	private Integer remainedCount;
	private Integer year;
	private Integer page;
	private String cover;
	private String info;
	private Integer weight;	
	private String author;
	private List<String> category;
	private String provider;
	
	

	public String getProvider() {
		return provider;
	}
	public void setProvider(String provider) {
		this.provider = provider;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public List<String> getCategory() {
		return category;
	}
	public void setCategory(List<String> category) {
		this.category = category;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public ProductDTO() {
		super();
	}
	public ProductDTO(Long id, String createBy, Date createDate, Date modifiedDate, String name, String imageUrl,
			Long price, Integer discount, Integer soldCount, Integer remainedCount, Integer year, Integer page,
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
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	public Integer getDiscount() {
		return discount;
	}
	public void setDiscount(Integer discount) {
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
