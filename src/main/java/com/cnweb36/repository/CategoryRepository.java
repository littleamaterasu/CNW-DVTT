package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.Entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	CategoryEntity findByName(String name);
}
