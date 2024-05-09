package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cnweb36.Entity.UserOTPEntity;

public interface UserOTPRepository extends JpaRepository<UserOTPEntity, Long> {

	@Query("select u from UserOTPEntity u where u.username=?1")
	public UserOTPEntity findEntityByUsername(String username);
	
	@Query("select u from UserOTPEntity u where u.OTP=?1")
	UserOTPEntity findByOTP(String OTP);
}
