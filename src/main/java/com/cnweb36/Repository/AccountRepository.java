package com.cnweb36.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {	
	
	@Query("select a from AccountEntity a where a.username=?1 and a.status!='-1'")
	Optional<AccountEntity> findByUsername(String username);
//	Optional<AccountEntity> findByPassword(String password);
	
	@Query("select a from AccountEntity a where a.username=?1 and a.status!='-1'")
	AccountEntity findEntityByUsername(String username);
	
	@Query("select a from AccountEntity a where a.id=?1 and a.status!='-1'")
	AccountEntity findEntityById(Long id);
	
	@Query("select a from AccountEntity a where a.roles like %?1% and a.status!='-1'")
	List<AccountEntity> findByRolesContaining(String userRole, Pageable pageable);
	
	@Query("select a from AccountEntity a where a.roles like %?1% and a.status!='-1'")
	List<AccountEntity> findByRolesContaining(String userRole,Sort sort);
}
