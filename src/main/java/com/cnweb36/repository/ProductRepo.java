package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.ProductEntity;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, Long> {
	

}
