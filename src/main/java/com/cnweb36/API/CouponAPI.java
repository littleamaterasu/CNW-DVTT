package com.cnweb36.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.CouponDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.CouponService;

@RestController
@RequestMapping("/coupon")
public class CouponAPI {

	@Autowired
	private CouponService couponService;
	
	@PostMapping("/post")
	//@PreAuthorize("hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3') or hasRole('ROLE_ADMIN_1')")
	public NoticeResponse addOrUpdateCategory(@RequestBody CouponDTO couponDTO) {
		try {
			String result= couponService.addOrUpdate(couponDTO);
			return new NoticeResponse(0l, result);
		} catch (Exception e) {
			NoticeResponse noticeResponse=new NoticeResponse(-1l, e.getMessage());
			return noticeResponse;
		}
	}
}
