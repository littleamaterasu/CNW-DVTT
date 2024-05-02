package com.cnweb36.API;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.OrderDTO;
import com.cnweb36.DTO.Response.CommentResponse;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderAPI {
	
	@Autowired
	private OrderService orderService;

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
	public NoticeResponse AddOrder(@RequestBody OrderDTO orderDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			Long id= orderService.addOrder(orderDTO);
			noticeResponse.setStatus(id);
			noticeResponse.setContent("Oke");
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent("Something went wrong!");
		}
		return noticeResponse;
	}
}
