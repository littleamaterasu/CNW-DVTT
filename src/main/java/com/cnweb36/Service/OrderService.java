package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Response.CommentResponse;
import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.ProductEntity;
import com.cnweb36.Repository.OrderRepository;
import com.cnweb36.Repository.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ProductRepository productRepository;
	
	public List<CommentResponse> getListComment(Long productId, Integer page) {
		
		ProductEntity productEntity=productRepository.findOneById(productId);
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		
		List<CommentResponse> listComment=new ArrayList<>();
		for(OrderEntity e: orderRepository.findAllByProduct(productEntity,pageWithTenElements)) {
			listComment.add(new CommentResponse(e.getUser().getName(), e.getCreatedDate(), e.getModifiedDate(),
					e.getRate(), e.getComment(), e.getLike()));
		}	
		
		return listComment;
	}
}
