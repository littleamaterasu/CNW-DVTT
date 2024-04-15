package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.entity.CouponEntity;

public interface CouponRepository extends JpaRepository<CouponEntity, Long> {
	CouponEntity findByName(String name);
}
