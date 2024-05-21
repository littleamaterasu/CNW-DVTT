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
import com.cnweb36.DTO.Request.RatingRequest;
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
		if(orderRepository.findByUserAndProduct(accountEntity, productEntity)==null) {
			OrderEntity orderEntity=new OrderEntity();
			orderEntity.setUser(accountEntity);
			orderEntity.setProduct(productEntity);
			orderEntity.setStatus("0");
			orderEntity.setQuantity(0);
			orderEntity.setQuantity(orderRequest.getQuantity());
			orderEntity.setPrice(orderRequest.getPrice());
			
			return orderRepository.save(orderEntity).getId();
		}
		
		else return -1l;
	}
	
	public List<OrderResponse> getProductSold(String username, Integer page) {
		List<OrderResponse> listBook=new ArrayList<>();
		if(page==null||page<1) page=1;
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		for(OrderEntity o: orderRepository.findProductSold(accountEntity, pageWithTenElements)) {
			OrderResponse orderResponse= new OrderResponse(o.getId(), o.getStatus());
			Book book=productConverter.toBook(o.getProduct_order());
			orderResponse.setBook(book);
			listBook.add(orderResponse);
		}
		return listBook;
	}
	
	public List<OrderResponse> getCart(String username, Integer page) {
		List<OrderResponse> listBook=new ArrayList<>();
		if(page==null||page<1) page=1;
		Pageable  pageWithTenElements = PageRequest.of((int)page-1, 10, Sort.by("modifiedDate").descending());
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		for(OrderEntity o: orderRepository.findcart(accountEntity, pageWithTenElements)) {
			OrderResponse orderResponse= new OrderResponse(o.getId(), o.getStatus());
			Book book=productConverter.toBook(o.getProduct_order());
			orderResponse.setBook(book);
			listBook.add(orderResponse);
		}
		return listBook;
	}
	
	public List<OrderResponse> getStatus(String username) {
		List<OrderResponse> listOrder= new ArrayList<>();
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		for(OrderEntity o: accountEntity.getOrderList()) {
			OrderResponse orderResponse= new OrderResponse(o.getId(), o.getStatus());
			Book book=productConverter.toBook(o.getProduct_order());
			orderResponse.setBook(book);
			listOrder.add(orderResponse);
		}
		return listOrder;
		
	}
	
	public String rate(RatingRequest ratingRequest, String Username) {
		OrderEntity orderEntity=orderRepository.findEntityById(ratingRequest.getOrderId());
		AccountEntity accountEntity=accountRepository.findEntityByUsername(Username);
		if(accountEntity.getId()==orderEntity.getUser().getId()) {
			if(orderEntity.getStatus().compareTo("3")==0
			 ||orderEntity.getStatus().compareTo("4")==0) {
				orderEntity.setComment(ratingRequest.getComment());
				orderEntity.setRate(ratingRequest.getRate());
				if(ratingRequest.getLikeOrDislike()==1) orderEntity.setLike(1);
				else orderEntity.setDislike(1);
				orderRepository.save(orderEntity);
				
				// set product rate
				ProductEntity productEntity=orderEntity.getProduct_order();
				Float rate= productEntity.getRating();
				Integer numberRate=productEntity.getNumberRate();
				Float newRate=((rate*numberRate)+ratingRequest.getRate())/(numberRate+1);
				productEntity.setRating(newRate);
				productEntity.setNumberRate(numberRate+1);
				productRepository.save(productEntity);
				
				return "Cảm ơn bạn đã đánh giá";
			}else {
				return "Bạn chưa thể đánh giá sản phẩm này";
			}
		}else {
			return "Bạn không có quyền đánh giá sản phẩm này";
		}
	}
	
	public String delete(Long id) {
		OrderEntity orderEntity=orderRepository.findEntityById(id);
		if(orderEntity!=null) {
			orderEntity.setStatus("-1");
			orderRepository.save(orderEntity);
			return "Oke";
		}else return "Not found Entity with id= "+id;
	}
}
