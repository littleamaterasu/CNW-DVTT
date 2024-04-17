package com.cnweb36.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Provider")
public class ProviderEntity extends BaseEntity {
	@Column(nullable=false)
	private String name;
	
	@Column(columnDefinition="text")
	private String info;
	
	@OneToMany(mappedBy = "provider_product")
	private List<ProductEntity> listProduct;

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getInfo() { return info; }
	public void setInfo(String info) { this.info = info; }
	
	public List<ProductEntity> getListProduct() {
		return listProduct;
	}
	public void setListProduct(List<ProductEntity> listProduct) {
		this.listProduct = listProduct;
	}
	
	
}
