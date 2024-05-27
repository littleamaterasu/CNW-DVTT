package com.cnweb36.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.ProductEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	
	@Query("select o from OrderEntity o where o.product=?1 and o.status !='-1'")
	List<OrderEntity>  findAllByProduct(ProductEntity productEntity,Pageable pageable);
	
	@Query("select o from OrderEntity o where o.user=?1 and (o.status='3' or o.status='4')")
	List<OrderEntity> findProductSold(AccountEntity user, Pageable pageable);
	
	@Query("select o from OrderEntity o where o.user=?1 and o.status='0'")
	List<OrderEntity> findcart(AccountEntity user, Pageable pageable);
	
	@Query("select o from OrderEntity o where o.user=?1 and o.status='2'")
	List<OrderEntity> findOrderTransport(AccountEntity user, Pageable pageable);
	
	@Query("select o from OrderEntity o where o.id=?1 and o.status!='-1'")
	OrderEntity findEntityById(Long id);
	
	@Query("select o from OrderEntity o where o.user=?1 and o.product=?2 and o.status ='0'")
	OrderEntity findByUserAndProductWithStatus0(AccountEntity user, ProductEntity product);
}
