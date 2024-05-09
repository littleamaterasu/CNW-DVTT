package com.cnweb36.API;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.OrderDTO;
import com.cnweb36.DTO.Request.RatingRequest;
import com.cnweb36.DTO.Response.Book;
import com.cnweb36.DTO.Response.CommentResponse;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.DTO.Response.OrderResponse;
import com.cnweb36.Service.OrderService;
import com.cnweb36.Service.Security.JwtUtility;

@CrossOrigin(origins = "${cnweb36.crossOrigin}", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/order")
public class OrderAPI {
	
	@Autowired
	private OrderService orderService;
	@Autowired
	private JwtUtility jwtUtility;

	@GetMapping("/getAllComment")
	public List<CommentResponse> getAllComment(@RequestParam Long productId, @RequestParam(required = false) Integer page) {
		try {
			if(page==null||page<1) page=1;
			return orderService.getListComment(productId, page);
			
		} catch (Exception e) {
			return new ArrayList<>();
		}
		
	}
	
	@PostMapping("/post")
	@PreAuthorize("hasRole('ROLE_USER')")
	public NoticeResponse AddOrder(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,@RequestBody OrderDTO orderDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
			Long id= orderService.addOrder(orderDTO,username);
			noticeResponse.setStatus(id);
			noticeResponse.setContent("Oke");
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent("Something went wrong!");
		}
		return noticeResponse;
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/getProductSold")
	public List<OrderResponse> getProductSold(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,
			@RequestParam(name="page",required = false) Integer page) {
	    
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		return orderService.getProductSold(username, page);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/getCart")
	public List<OrderResponse> getCart(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,
			@RequestParam(name="page",required = false) Integer page) {
	    
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		return orderService.getCart(username, page);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/getStatus")
	public List<OrderResponse> getStatus(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken) {
		String username=jwtUtility.getUserNameFromJwtToken(jwtToken);
		return orderService.getStatus(username);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/rating")
	public NoticeResponse rating(@CookieValue("${cnweb36.jwtCookieName}") String jwtToken,@RequestBody RatingRequest ratingRequest) {
		String username= jwtUtility.getUserNameFromJwtToken(jwtToken);
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			String result= orderService.rate(ratingRequest, username);
			if(result.compareTo("Cảm ơn bạn đã đánh giá")==0) {
				noticeResponse.setStatus(1l);
			}else {
				noticeResponse.setStatus(0l);
			}
			noticeResponse.setContent(result);
			return noticeResponse;
		} catch (Exception e) {
			return new NoticeResponse(-1l, e.getMessage());
		}
	}
}
