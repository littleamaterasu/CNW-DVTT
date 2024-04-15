package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.Entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
	AdminEntity findByUsername(String username);
}
