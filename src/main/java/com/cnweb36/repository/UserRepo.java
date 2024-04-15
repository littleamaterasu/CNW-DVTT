package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {

	UserEntity findByUsername(String username);
	UserEntity findByPassword(String password);
}
