package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

	AccountEntity findByUsername(String username);

	AccountEntity findByPassword(String password);
}
