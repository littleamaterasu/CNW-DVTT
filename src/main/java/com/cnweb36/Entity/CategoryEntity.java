package com.cnweb36.Entity;

import java.util.List;

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
			  joinColumns = @JoinColumn(name = "productid"), 
			  inverseJoinColumns = @JoinColumn(name = "categoryid"))
	private List<ProductEntity> listProductCategory;

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }
	public List<ProductEntity> getListProductCategory() {
		return listProductCategory;
	}
	public void setListProductCategory(List<ProductEntity> listProductCategory) {
		this.listProductCategory = listProductCategory;
	}
	
}
