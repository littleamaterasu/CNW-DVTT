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
import com.cnweb36.Repository.AuthorRepository;
import com.cnweb36.Repository.CategoryRepository;
import com.cnweb36.Repository.ProductRepository;
import com.cnweb36.Repository.ProviderRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductConverter productConverter;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ProviderRepository providerRepository;
	
	public Long AddProduct(ProductDTO productDTO) {
		
		ProductEntity productEntity=productConverter.toEntity(productDTO);
		Set<CategoryEntity> listCategory=new HashSet<>();
		for(String s: productDTO.getCategory()) {
			listCategory.add(categoryRepository.findByName(s));
		}
		productEntity.setCategoryList(listCategory);
		
		productEntity.setProvider(providerRepository.findByName(productDTO.getProvider()));
		productEntity.setNumberRate(0);
		productEntity.setRating(0f);
		return productRepository.save(productEntity).getId();
	}
	
	public List<Book> getAllBook(Integer page) {
		List<Book> listBook=new ArrayList<>();
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		for(ProductEntity e: productRepository.findAll(pageWithTenElements)) {
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
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 2, Sort.by("modifiedDate").descending());
		for(ProductEntity e: productRepository.findByNameContaining(keyword, pageWithTenElements)) {
			listBook.add(productConverter.toBook(e));
		}
		return listBook;
	}
		
	public List<Book> getTop10(Integer page) {
		List<Book> listBook=new ArrayList<>();
		if(page==null||page<1) page=1;  
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 2, Sort.by("soldCount").descending());
		for(ProductEntity e: productRepository.findAll(pageWithTenElements)) {
			listBook.add(productConverter.toBook(e));
		}
		return listBook;
	}
}
