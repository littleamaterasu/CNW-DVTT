package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.CouponConverter;
import com.cnweb36.Converter.PaymentConverter;
import com.cnweb36.Converter.ProductConverter;
import com.cnweb36.DTO.Entity.OrderDTO;
import com.cnweb36.DTO.Entity.PaymentDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.PaymentResponse;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.PaymentEntity;
import com.cnweb36.Entity.PaymentLogEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Repository.CouponRepository;
import com.cnweb36.Repository.OrderRepository;
import com.cnweb36.Repository.PaymentLogRepository;
import com.cnweb36.Repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private PaymentConverter paymentConverter;
	@Autowired
	private PaymentLogRepository paymentLogRepository;
	@Autowired
	private ProductConverter productConverter;
	@Autowired
	private CouponConverter couponConverter;
	@Autowired
	private CouponRepository couponRepository;
	
	public Long addPayment(PaymentDTO paymentDTO, String username) throws Exception {
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		PaymentEntity paymentEntity=paymentConverter.toEntity(paymentDTO);
		paymentEntity.setUser(accountEntity);
		
		Set<OrderEntity> listOrder= new HashSet<>();
		for(OrderDTO o: paymentDTO.getOrderList()) {
			try {
				OrderEntity orderEntity=orderRepository.findEntityById(o.getOrderId());
				// order dang cho thanh toan
				if(username.compareTo(orderEntity.getUser().getUsername())==0) {
					if(orderEntity.getStatus().compareTo("0")==0) {
						orderEntity.setStatus("1");
						orderEntity.setQuantity(o.getQuantity());
						orderRepository.save(orderEntity);
						listOrder.add(orderEntity);
					}else {
						throw new Exception("This order has starus  "+ orderEntity.getStatus()+ "not equal 0");
					}
				
				}else {
					throw new Exception("You don't have this order "+ o.getOrderId());
				}
			} catch (Exception e) {
				throw new Exception(e.getMessage());
				//throw new Exception("No order has id ="+ o.getOrderId());
			}
			
		}
		paymentEntity.setOrderList(listOrder);
		
//		Set<PaymentLogEntity> listpaymentlog=new HashSet<>();
//		for(Long id: paymentDTO.getPaymentLogListid()) {
//			try {
//				listpaymentlog.add(paymentLogRepository.findEntityById(id));
//			} catch (Exception e) {
//				throw new Exception("No paymentLong has id ="+ id);
//			}
//		}
//		paymentEntity.setPaymentLogList(listpaymentlog);
		paymentEntity.setCoupon(couponRepository.findEntityById(paymentDTO.getCouponId()));
		paymentEntity.setStatus("1"); // payment dang cho thanh toan
		PaymentEntity paymentEntity2= paymentRepository.save(paymentEntity);
		for(OrderEntity o: listOrder) {
			o.setPayment(paymentEntity2);
			orderRepository.save(o);
		}
		return paymentEntity2.getId();
		
	}
	
	//
	public PaymentResponse getPayment(String username,Long paymentId)  {
		AccountEntity accountEntity= accountRepository.findEntityByUsername(username);
		PaymentEntity paymentEntity=paymentRepository.findEntityById(paymentId);
		if(paymentEntity.getUser().getId()==accountEntity.getId()) {
			PaymentResponse paymentResponse=paymentConverter.toResponse(paymentEntity);
			List<Long> orderId=new ArrayList<>();
			List<Book> listBook= new ArrayList<>();
			for(OrderEntity o: paymentEntity.getOrderList()) {
				Book book= productConverter.toBook(o.getProduct_order());
				listBook.add(book);
				orderId.add(o.getId());
			}
			paymentResponse.setListBook(listBook);
			paymentResponse.setListOrderId(orderId);
			
			paymentResponse.setCouponDTO(couponConverter.toDTO(paymentEntity.getCoupon()));
			return paymentResponse;
			
		}else {
			return new PaymentResponse();
		}
	}
}
