package com.cnweb36.API;

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
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.DTO.Response.PaymentResponse;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Service.PaymentService;
import com.cnweb36.Service.Security.JwtUtility;
import com.cnweb36.Service.VnPay.VnPayService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "${cnweb36.crossOrigin}", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/payment")
public class PaymentAPI {
	
	@Autowired
	private JwtUtility jwtUtility;
	@Autowired
	private PaymentService paymentService;

	
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/post")
	public NoticeResponse addPayment(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,
			@RequestBody PaymentDTO paymentDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			String username= jwtUtility.getUserNameFromJwtToken(jwtToken);
			Long resultId=paymentService.addPayment(paymentDTO, username);
			noticeResponse.setContent("Oke");
			noticeResponse.setStatus(resultId);
		} catch (Exception e) {
			noticeResponse.setContent(e.getMessage());
			noticeResponse.setStatus(-1l);
		}
		
		return noticeResponse;
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/get")
	public PaymentResponse getPayment(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken, @RequestParam(name="paymentId") Long paymentId) {
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		PaymentResponse paymentResponse = paymentService.getPayment(username, paymentId);
		if (paymentResponse != null) {
			return paymentResponse;
		} else {
			return new PaymentResponse();
		}
	}
	
}
