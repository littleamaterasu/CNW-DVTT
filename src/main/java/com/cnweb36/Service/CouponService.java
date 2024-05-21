package com.cnweb36.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.Converter.CouponConverter;
import com.cnweb36.DTO.Entity.CouponDTO;
import com.cnweb36.Entity.CouponEntity;
import com.cnweb36.Repository.CouponRepository;

@Service
public class CouponService {

	@Autowired
	private CouponRepository couponRepository;
	@Autowired
	private CouponConverter couponConverter;
	
	public String addOrUpdate(CouponDTO couponDTO) {
		CouponEntity couponEntity;
		if(couponDTO.getId()==null) {
			couponEntity=couponConverter.toEntity(couponDTO);
		}else {
			couponEntity=couponRepository.findEntityByid(couponDTO.getId());
			if(couponEntity!=null) {
				couponEntity=couponConverter.toEntity(couponEntity, couponDTO);
			}else return "Not found id";
		}
		couponEntity.setStatus("0");
		couponRepository.save(couponEntity);
		return "Oke";
	}
}
