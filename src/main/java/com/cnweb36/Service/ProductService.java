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
import com.cnweb36.Entity.AuthorEntity;
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
	private AuthorRepository authorRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ProviderRepository providerRepository;
	
	public Long AddProduct(ProductDTO productDTO) {
		
		ProductEntity productEntity=productConverter.toEntity(productDTO);
		Set<AuthorEntity> listAuthor=new HashSet<>();
		for(String s: productDTO.getAuthor()) {
			listAuthor.add(authorRepository.findByName(s));
		}
		productEntity.setAuthorList(listAuthor);
		Set<CategoryEntity> listCategory=new HashSet<>();
		for(String s: productDTO.getCategory()) {
			listCategory.add(categoryRepository.findByName(s));
		}
		productEntity.setCategoryList(listCategory);
		
		productEntity.setProvider(providerRepository.findByName(productDTO.getProvider()));
		
		return productRepository.save(productEntity).getId();
	}
	
	public List<Book> getAllBook(Integer page) {
		List<Book> listBook=new ArrayList<>();
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		for(ProductEntity e: productRepository.findAll(pageWithTenElements)) {
			Book book= new Book();
			book.setId(e.getId());
			book.setName(e.getName());
			book.setImageUrl(e.getImageUrl());
			book.setPrice(e.getPrice());
			
			listBook.add(book);
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
		
}
