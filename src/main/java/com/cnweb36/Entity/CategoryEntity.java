package com.cnweb36.Entity;

import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Category")
public class CategoryEntity extends BaseEntity {
	@Column(nullable=false)
	private String name;
	
	@Column(columnDefinition="text")
	private String info;
	
	@ManyToMany
	@JoinTable(
			  name = "category_product", 
			  joinColumns = @JoinColumn(name = "product_id"), 
			  inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<ProductEntity> productList;

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }
	
	public Set<ProductEntity> getProductList() { return productList; }
	public void setProductList(Set<ProductEntity> productList) { this.productList = productList; }
	
}
