package com.cnweb36.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {	
	Optional<AccountEntity> findByUsername(String username);
//	Optional<AccountEntity> findByPassword(String password);
	
	@Query("select a from AccountEntity a where a.username=?1")
	AccountEntity findEntityByUsername(String username);
	
	@Query("select a from AccountEntity a where a.id=?1")
	AccountEntity findEntityById(Long id);
	
	List<AccountEntity> findByRolesContaining(String userRole,Pageable pageable);
}