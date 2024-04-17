package com.cnweb36.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="product")
public class ProductEntity extends BaseEntity {
	
	@Column(name="name")
	private String name;
	
	@Column(name="imageUrl")
	private String imageUrl;
	
	@Column(name="price")
	private Float price;
	
	@Column(name="discount")
	private Float discount;
	
	@Column(name="soldCount")
	private Integer soldCount;
	
	@Column(name="remainedCount")
	private Integer remainedCount;
	
	@Column(name="year")
	private Integer year;
	
	@Column(name="page")
	private Integer page;
	
	@Column(name="cover")
	private String cover;
	
	@Column(name="weight")
	private Integer weight;
	
	@Column(name="info")
	private String info;
	
	@Column(name="rating")
	private Float rating;

	@OneToMany(mappedBy = "product_order")
	private List<OrderEntity> listOrder;
	
	@ManyToOne
	@JoinColumn(name = "providerid")
	private ProviderEntity provider_product;
	
	public ProductEntity(String name, String imageUrl, Float price, Float discount, Integer soldCount,
			Integer remainedCount, Integer year, Integer page, String cover, Integer weight, String info,
			Float rating) {
		super();
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
		this.info = info;
		this.rating = rating;
	}

	public ProductEntity() {
		super();
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

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}

	public List<OrderEntity> getListOrder() {
		return listOrder;
	}

	public void setListOrder(List<OrderEntity> listOrder) {
		this.listOrder = listOrder;
	}

	public ProviderEntity getProvider_product() {
		return provider_product;
	}

	public void setProvider_product(ProviderEntity provider_product) {
		this.provider_product = provider_product;
	}
	
	
}
