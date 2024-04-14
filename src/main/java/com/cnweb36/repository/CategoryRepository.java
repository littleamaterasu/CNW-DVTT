package com.cnweb36.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	CategoryEntity findByName(String name);
}
