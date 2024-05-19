package com.cnweb36.Converter;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.cnweb36.DTO.Entity.ProductDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.Entity.ProductEntity;

@Component
public class ProductConverter {

	public ProductEntity toEntity(ProductDTO productDTO) {
		ProductEntity productEntity = new ProductEntity();

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
		productEntity.setAuthor(productDTO.getAuthor());
		return productEntity;

	}

	public Book toBook(ProductEntity productEntity) {
		Book book = new Book();
		book.setId(productEntity.getId());
		book.setImageUrl(productEntity.getImageUrl());
		book.setName(productEntity.getName());
		book.setPrice(productEntity.getPrice());
		book.setSoldCount(productEntity.getSoldCount());
		return book;
	}

	public ProductDTO toDTO(ProductEntity productEntity) {

		ProductDTO productDTO = new ProductDTO();

		productDTO.setCover(productEntity.getCover());
		productDTO.setDiscount(productEntity.getDiscount());
		productDTO.setImageUrl(productEntity.getImageUrl());
		productDTO.setInfo(productEntity.getInfo());
		productDTO.setName(productEntity.getName());
		productDTO.setPage(productEntity.getPage());
		productDTO.setPrice(productEntity.getPrice());
		productDTO.setRemainedCount(productEntity.getRemainedCount());
		productDTO.setSoldCount(productEntity.getSoldCount());
		productDTO.setWeight(productEntity.getWeight());
		productDTO.setYear(productEntity.getYear());
		productDTO.setId(productEntity.getId());
		productDTO.setCreateDate(productEntity.getCreatedDate());
		productDTO.setModifiedDate(productEntity.getModifiedDate());
		// provide
		productDTO.setProvider(productEntity.getProvider().getName());
		// category
		productDTO.setCategory(
				productEntity.getCategoryList().stream().map(e -> e.getName()).collect(Collectors.toList()));
		// author
		//productDTO.setAuthor(productEntity.getAuthorList().stream().map(e -> e.getName()).collect(Collectors.toList()));
		productDTO.setAuthor(productEntity.getAuthor());
		return productDTO;

	}

}
