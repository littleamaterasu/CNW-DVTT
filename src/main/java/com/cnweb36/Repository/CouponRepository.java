package com.cnweb36.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cnweb36.Entity.CouponEntity;

public interface CouponRepository extends JpaRepository<CouponEntity, Long> {
	CouponEntity findByName(String name);
	CouponEntity findEntityById(Long id);
	
	@Query("select c from CouponEntity c where c.id=?1 and c.status!='-1'")
	CouponEntity findEntityByid(Long id);
	
	@Query("select c from CouponEntity c where c.name=?1 and c.status!='-1'")
	CouponEntity findEntityByName(String name);
	
	@Query("select c from CouponEntity c where c.status!='-1'")
	List<CouponEntity> findAll();
	}
