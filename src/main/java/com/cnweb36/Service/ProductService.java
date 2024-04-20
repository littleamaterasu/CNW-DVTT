package com.cnweb36.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.ProductConverter;
import com.cnweb36.DTO.Entity.ProductDTO;
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
		
}
