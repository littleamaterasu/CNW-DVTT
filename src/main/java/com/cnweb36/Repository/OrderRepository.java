package com.cnweb36.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.ProductEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	
	List<OrderEntity>  findAllByProduct(ProductEntity productEntity,Pageable pageable);
}
