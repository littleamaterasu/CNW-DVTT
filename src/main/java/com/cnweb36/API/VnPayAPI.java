package com.cnweb36.API;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.PaymentDTO;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.DTO.Response.PaymentResponse;
import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.PaymentEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Repository.PaymentRepository;
import com.cnweb36.Service.PaymentService;
import com.cnweb36.Service.Security.JwtUtility;
import com.cnweb36.Service.VnPay.VnPayService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/payment")
public class VnPayAPI {
	
	@Autowired
	private JwtUtility jwtUtility;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private VnPayService vnpayService;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private PaymentRepository paymentRepository;
	
	//@CrossOrigin(origins = "${cnweb36.crossOrigin}", allowCredentials = "true", maxAge = 3600)
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/vnpay/pay")
	public NoticeResponse vnpayPayment(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken, @RequestParam(name="paymentId") Long paymentId, 
			HttpServletRequest request) {
		String username = jwtUtility.getUserNameFromJwtToken(jwtToken);
		PaymentResponse paymentResponse = paymentService.getPayment(username, paymentId);
		if (paymentResponse != null && paymentResponse.getUserId() == accountRepository.findEntityByUsername(username).getId()) {
	        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
	        String vnpayUrl = vnpayService.createPayment(paymentResponse.getPay(), paymentId.toString(), baseUrl);
	        return new NoticeResponse(0l, vnpayUrl);
	        
		} else {
			return new NoticeResponse();
		}
	}
	
	@CrossOrigin(origins = "${vnpay.crossOrigin}", maxAge = 3600)
	@GetMapping("${vnpay.shortReturnUrl}")
	public String vnpayPaymentReturn(HttpServletRequest request) {
		int paymentStatus = vnpayService.paymentReturn(request);
        Long paymentId = Long.valueOf(request.getParameter("vnp_OrderInfo"));
//        String paymentTime = request.getParameter("vnp_PayDate");
//        String transactionId = request.getParameter("vnp_TransactionNo");
//        String totalPrice = request.getParameter("vnp_Amount");
        
		PaymentEntity paymentEntity = paymentRepository.findEntityById(paymentId);
		if(paymentStatus==1) {
			paymentEntity.setStatus("1");
			//order đang vận chuyển
			paymentService.setPaymentOrderStatus(paymentEntity,"3");
			paymentService.updateNumber(paymentEntity);
		}else {
			paymentEntity.setStatus("-1");
			paymentService.setPaymentOrderStatus(paymentEntity,"-1");
		}
		paymentRepository.save(paymentEntity);
		return paymentStatus == 1 ? "ordersuccess" : "orderfail";
//		paymentEntity.setStatus(paymentStatus == 1 ? "1" : "-1");
//		//order đang vận chuyển
//		paymentService.setPaymentOrderStatus(paymentEntity,"2");
//		paymentRepository.save(paymentEntity);
//        return paymentStatus == 1 ? "ordersuccess" : "orderfail";
	}
}
