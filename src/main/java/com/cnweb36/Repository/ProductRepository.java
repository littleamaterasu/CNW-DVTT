package com.cnweb36.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
	
	@Query("select p from ProductEntity p where p.id=?1 and p.status !='-1'")
	ProductEntity findOneById(Long id);
	
	@Query("select p from ProductEntity p where p.status !='-1'")
	Page<ProductEntity> findAll(Pageable pageable);
	
	@Query("select p from ProductEntity p where p.name like %?1% and p.status !='-1'")
	List<ProductEntity> findByNameContaining(String keyword, Pageable pageable);
}
