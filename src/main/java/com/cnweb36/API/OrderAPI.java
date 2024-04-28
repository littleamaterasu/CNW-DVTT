package com.cnweb36.API;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Response.CommentResponse;
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
}
