package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.Payment_logEntity;

@Repository
public interface Payment_logRepo extends JpaRepository<Payment_logEntity, Long> {
	

}
