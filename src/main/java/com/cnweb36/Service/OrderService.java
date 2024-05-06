package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.ProductConverter;
import com.cnweb36.DTO.Entity.OrderDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.CommentResponse;
import com.cnweb36.DTO.Response.OrderResponse;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.ProductEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Repository.OrderRepository;
import com.cnweb36.Repository.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ProductConverter productConverter;
	
	public List<CommentResponse> getListComment(Long productId, Integer page) {
		
		ProductEntity productEntity=productRepository.findOneById(productId);
		if(page==null||page<1) page=1;
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		
		List<CommentResponse> listComment=new ArrayList<>();
		for(OrderEntity e: orderRepository.findAllByProduct(productEntity,pageWithTenElements)) {
			listComment.add(new CommentResponse(e.getUser().getName(), e.getCreatedDate(), e.getModifiedDate(),
					e.getRate(), e.getComment(), e.getLike()));
		}	
		
		return listComment;
	}
	
	public Long addOrder(OrderDTO orderRequest, String username) {
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		ProductEntity productEntity= productRepository.findOneById(orderRequest.getProductId());
		OrderEntity orderEntity=new OrderEntity();
		orderEntity.setUser(accountEntity);
		orderEntity.setProduct(productEntity);
		orderEntity.setStatus("0");
		orderEntity.setQuantity(0);
		orderEntity.setQuantity(orderRequest.getQuantity());
		orderEntity.setPrice(orderRequest.getPrice());
		
		return orderRepository.save(orderEntity).getId();
	}
	
	public List<Book> getProductSold(String username, Integer page) {
		List<Book> listBook=new ArrayList<>();
		if(page==null||page<1) page=1;
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 2, Sort.by("modifiedDate").descending());
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		for(OrderEntity o: orderRepository.findProductSold(accountEntity, pageWithTenElements)) {
			Book book=productConverter.toBook(o.getProduct_order());
			listBook.add(book);
		}
		return listBook;
	}
	
	public List<Book> getCart(String username, Integer page) {
		List<Book> listBook=new ArrayList<>();
		if(page==null||page<1) page=1;
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 2, Sort.by("modifiedDate").descending());
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		for(OrderEntity o: orderRepository.findcart(accountEntity, pageWithTenElements)) {
			Book book=productConverter.toBook(o.getProduct_order());
			listBook.add(book);
		}
		return listBook;
	}
	
	public List<OrderResponse> getStatus(String username) {
		List<OrderResponse> listOrder= new ArrayList<>();
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		for(OrderEntity o: accountEntity.getOrderList()) {
			listOrder.add(new OrderResponse(o.getId(), o.getStatus()));
		}
		return listOrder;
		
	}
}
