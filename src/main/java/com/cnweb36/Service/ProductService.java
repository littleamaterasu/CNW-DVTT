package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.ProductConverter;
import com.cnweb36.DTO.Entity.ProductDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.Entity.CategoryEntity;
import com.cnweb36.Entity.ProductEntity;
import com.cnweb36.Repository.CategoryRepository;
import com.cnweb36.Repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductConverter productConverter;
	@Autowired
	private CategoryRepository categoryRepository;
	
	public Long AddProduct(ProductDTO productDTO) {
		ProductEntity productEntity=new ProductEntity();
		if(productDTO.getId()!=null) {
			// update
			productEntity =productRepository.findOneById(productDTO.getId());
			
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
			productEntity.setProvider2(productDTO.getProvider());
		}else {
			//create
			productEntity=productConverter.toEntity(productDTO);
		}
			Set<CategoryEntity> listCategory=new HashSet<>();
			for(String s: productDTO.getCategory()) {
				listCategory.add(categoryRepository.findByName(s));
			}
			productEntity.setCategoryList(listCategory);
			
			productEntity.setNumberRate(0);
			productEntity.setRating(0f);
			return productRepository.save(productEntity).getId();
	}
	
	public List<Book> getAllBook(Integer page) {
		List<ProductEntity> listProduct;
		if(page==null) {
			listProduct= productRepository.findAll(Sort.by("modifiedDate").descending());
		}else {
			Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
			listProduct= productRepository.findAll(pageWithTenElements).toList();
		}
		List<Book> listBook=new ArrayList<>();
		for(ProductEntity e: listProduct) {
			listBook.add(productConverter.toBook(e));
		}
		return listBook;
	}
	
	public ProductDTO getone(Long id) {
		ProductEntity productEntity=new ProductEntity();
        productEntity = productRepository.findOneById(id);
        if(productEntity==null) {
        	return new ProductDTO();
        }else {
        	return productConverter.toDTO(productEntity);
        }
	}
	
	public List<Book> getwithkey(String keyword, Integer page) {
		if(page==null) page=(int)1;
		List<Book> listBook=new ArrayList<>();
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		for(ProductEntity e: productRepository.findByNameContaining(keyword, pageWithTenElements)) {
			listBook.add(productConverter.toBook(e));
		}
		return listBook;
	}
		
	public List<Book> getTop10(Integer page) {
		List<Book> listBook=new ArrayList<>();
		if(page==null||page<1) page=1;  
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("soldCount").descending());
		for(ProductEntity e: productRepository.findAll(pageWithTenElements)) {
			listBook.add(productConverter.toBook(e));
		}
		return listBook;
	}
	
	public String delete(Long id) {
		ProductEntity productEntity=productRepository.findOneById(id);
		if(productEntity!=null) {
		productEntity.setStatus("-1");
		productRepository.save(productEntity);
		return "Oke";
		}else return "Not found Entity with id= "+id;
	}
}
