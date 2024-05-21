package com.cnweb36.Converter;

import org.springframework.stereotype.Component;

import com.cnweb36.DTO.Entity.CouponDTO;
import com.cnweb36.Entity.CouponEntity;

@Component
public class CouponConverter {

	public CouponDTO toDTO(CouponEntity couponEntity) {
		CouponDTO couponDTO=new CouponDTO();
		couponDTO.setCreatedDate(couponEntity.getCreatedDate());
		couponDTO.setDiscountPercent(couponEntity.getDiscountPercent());
		couponDTO.setDiscountValue(couponEntity.getDiscountValue());
		couponDTO.setEndTime(couponEntity.getEndTime());
		couponDTO.setId(couponEntity.getId());
		couponDTO.setInfo(couponEntity.getInfo());
		couponDTO.setLimit(couponEntity.getLimitCount());
		couponDTO.setMaxDiscount(couponEntity.getMaxDiscount());
		couponDTO.setMinPrice(couponEntity.getMinPrice());
		couponDTO.setName(couponEntity.getName());
		couponDTO.setStartTime(couponEntity.getStartTime());
		
		return couponDTO;
	}
	
	public CouponEntity toEntity(CouponDTO couponDTO) {
		CouponEntity couponEntity=new CouponEntity();

		couponEntity.setDiscountPercent(couponDTO.getDiscountPercent());
		couponEntity.setDiscountValue(couponDTO.getDiscountValue());
		couponEntity.setEndTime(couponDTO.getEndTime());
		couponEntity.setInfo(couponDTO.getInfo());
		couponEntity.setLimitCount(couponDTO.getLimit());
		couponEntity.setMaxDiscount(couponDTO.getMaxDiscount());
		couponEntity.setMinPrice(couponDTO.getMinPrice());
		couponEntity.setName(couponDTO.getName());
		couponEntity.setStartTime(couponDTO.getStartTime());
		
		return couponEntity;
	}
	
	public CouponEntity toEntity(CouponEntity couponEntity,CouponDTO couponDTO) {

		couponEntity.setDiscountPercent(couponDTO.getDiscountPercent());
		couponEntity.setDiscountValue(couponDTO.getDiscountValue());
		couponEntity.setEndTime(couponDTO.getEndTime());
		couponEntity.setInfo(couponDTO.getInfo());
		couponEntity.setLimitCount(couponDTO.getLimit());
		couponEntity.setMaxDiscount(couponDTO.getMaxDiscount());
		couponEntity.setMinPrice(couponDTO.getMinPrice());
		couponEntity.setName(couponDTO.getName());
		couponEntity.setStartTime(couponDTO.getStartTime());
		
		return couponEntity;
	}
}
