package com.cnweb36.Entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
	private Long price;
	
	@Column(name="discount")
	private Integer discount;
	
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

	@OneToMany(mappedBy = "product")
	private Set<OrderEntity> orderList;
	
	@ManyToOne
	@JoinColumn(name = "provider_id")
	private ProviderEntity provider;
	
	@ManyToMany
	@JoinTable(
			  name = "category_product", 
			  joinColumns = @JoinColumn(name = "product_id"), 
			  inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<CategoryEntity> categoryList;
	
	@ManyToMany
	@JoinTable(
			  name = "author_product", 
			  joinColumns = @JoinColumn(name = "product_id"), 
			  inverseJoinColumns = @JoinColumn(name = "author_id"))
	private Set<AuthorEntity> authorList;
	
	public ProductEntity() { super(); }
	public ProductEntity(String name, String imageUrl, Long price, Integer discount, Integer soldCount,
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


	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getImageUrl() { return imageUrl; }
	public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

	public Long getPrice() { return price; }
	public void setPrice(Long price) { this.price = price; }

	public Integer getDiscount() { return discount; }
	public void setDiscount(Integer discount) { this.discount = discount; }

	public Integer getSoldCount() { return soldCount; }
	public void setSoldCount(Integer soldCount) { this.soldCount = soldCount; }

	public Integer getRemainedCount() { return remainedCount; }
	public void setRemainedCount(Integer remainedCount) { this.remainedCount = remainedCount; }

	public Integer getYear() { return year; }
	public void setYear(Integer year) { this.year = year; }

	public Integer getPage() { return page; }
	public void setPage(Integer page) { this.page = page; }

	public String getCover() { return cover; }
	public void setCover(String cover) { this.cover = cover; }

	public Integer getWeight() { return weight; }
	public void setWeight(Integer weight) { this.weight = weight; }

	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }

	public Float getRating() { return rating; }
	public void setRating(Float rating) { this.rating = rating; }

	public Set<OrderEntity> getOrderList() { return orderList; }
	public void setOrderList(Set<OrderEntity> orderList) { this.orderList = orderList; }

	public ProviderEntity getProvider() { return provider; }
	public void setProvider(ProviderEntity provider) { this.provider = provider; }

	public Set<CategoryEntity> getCategoryList() { return categoryList; }
	public void setCategoryList(Set<CategoryEntity> categoryList) { this.categoryList = categoryList; }

	public Set<AuthorEntity> getAuthorList() {	return authorList; }
	public void setAuthorList(Set<AuthorEntity> authorList) { this.authorList = authorList; }
	
}
