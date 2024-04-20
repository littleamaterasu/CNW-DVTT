package com.cnweb36.Converter;

import org.springframework.stereotype.Component;

import com.cnweb36.DTO.Entity.ProductDTO;
import com.cnweb36.Entity.ProductEntity;

@Component
public class ProductConverter {

	public ProductEntity toEntity(ProductDTO productDTO) {
		ProductEntity productEntity=new ProductEntity();
		
		productEntity.setCover(productDTO.getCover());
		productEntity.setDiscount(productDTO.getDiscount());
		productEntity.setImageUrl(productDTO.getImageUrl());
		productEntity.setInfo(productDTO.getInfo());
		productEntity.setName(productDTO.getName());
		productEntity.setPage(productDTO.getPage());
		productEntity.setPrice(productDTO.getPrice());
		productEntity.setRemainedCount(productDTO.getRemainedCount());
		productEntity.setSoldCount(productDTO.getSoldCount());
		productEntity.setWeight(productDTO.getWeight());
		productEntity.setYear(productDTO.getYear());
		
		return productEntity;
		
	}
}
