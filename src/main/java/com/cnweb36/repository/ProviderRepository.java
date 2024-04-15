package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.entity.ProviderEntity;

public interface ProviderRepository extends JpaRepository<ProviderEntity, Long> {
	ProviderEntity findByName(String name);
}
