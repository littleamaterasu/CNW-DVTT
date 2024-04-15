package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.PaymentEntity;

@Repository
public interface PaymentRepo extends JpaRepository<PaymentEntity, Long> {
	

}
