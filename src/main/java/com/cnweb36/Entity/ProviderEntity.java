package com.cnweb36.Entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="provider")
public class ProviderEntity extends BaseEntity {
	@Column(nullable=false)
	private String name;
	
	@Column(columnDefinition="text")
	private String info;
	
	@OneToMany(mappedBy = "provider")
	private Set<ProductEntity> productList;

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }
	
	public Set<ProductEntity> getProductList() { return productList; }
	public void setProductList(Set<ProductEntity> productList) { this.productList = productList; }	
	
}
