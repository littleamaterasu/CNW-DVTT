package com.cnweb36.Converter;

import org.springframework.stereotype.Component;

import com.cnweb36.DTO.Entity.PaymentDTO;
import com.cnweb36.DTO.Response.PaymentResponse;
import com.cnweb36.Entity.PaymentEntity;

@Component
public class PaymentConverter {

	public PaymentEntity toEntity(PaymentDTO paymentDTO) {
		PaymentEntity paymentEntity=new PaymentEntity();
		paymentEntity.setAddress(paymentDTO.getAddress());
		paymentEntity.setNote(paymentDTO.getNote());
		paymentEntity.setPay(paymentDTO.getPay());
		paymentEntity.setPhone(paymentDTO.getPhone());
		paymentEntity.setStatus(paymentDTO.getPayStatus());
		return paymentEntity;
	}
	
	public PaymentEntity toEntity(PaymentEntity paymentEntity,PaymentDTO paymentDTO) {
		paymentEntity.setAddress(paymentDTO.getAddress());
		paymentEntity.setNote(paymentDTO.getNote());
		paymentEntity.setPay(paymentDTO.getPay());
		paymentEntity.setPhone(paymentDTO.getPhone());
		
		return paymentEntity;
	}
	
	public PaymentDTO toDTO(PaymentEntity paymentEntity) {
		PaymentDTO paymentDTO=new PaymentDTO();
		paymentDTO.setAddress(paymentEntity.getAddress());
		paymentDTO.setNote(paymentEntity.getNote());
		paymentDTO.setPay(paymentEntity.getPay());
		paymentDTO.setPhone(paymentEntity.getPhone());	
		paymentDTO.setPayStatus(paymentEntity.getStatus());
		return paymentDTO;
	}
	
	public PaymentResponse toResponse(PaymentEntity paymentEntity) {
		PaymentResponse paymentResponse=new PaymentResponse();
		paymentResponse.setAddress(paymentEntity.getAddress());
		paymentResponse.setNote(paymentEntity.getNote());
		paymentResponse.setPay(paymentEntity.getPay());
		paymentResponse.setPhone(paymentEntity.getPhone());
		paymentResponse.setCreatedDate(paymentEntity.getCreatedDate());
		paymentResponse.setModifiedDate(paymentEntity.getModifiedDate());
		paymentResponse.setStatus(paymentEntity.getStatus());
		paymentResponse.setUserId(paymentEntity.getUser().getId());
		paymentResponse.setPayStatus(paymentEntity.getStatus());
		
		return paymentResponse;
	}
}
