package com.cnweb36.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.PaymentEntity;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
	
	@Query("select p from PaymentEntity p where p.id=?1 and p.status !='-1'")
	PaymentEntity findEntityById(Long id);
	
	@Query("select p from PaymentEntity p where p.user=?1 and p.status !='-1'")
	List<PaymentEntity> findAll(AccountEntity user,Sort sort);
	
	@Query("select p from PaymentEntity p where p.user=?1 and p.status !='-1'")
	Page<PaymentEntity> findAll(AccountEntity user,Pageable pageable);
}
