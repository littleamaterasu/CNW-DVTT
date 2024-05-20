package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cnweb36.Entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	
	@Query("select c from CategoryEntity c where c.name=?1 and c.status !='-1'")
	CategoryEntity findByName(String name);
	
	@Query("select c from CategoryEntity c where c.id=?1 and c.status !='-1'")
	CategoryEntity findEntityById(Long id);
}
