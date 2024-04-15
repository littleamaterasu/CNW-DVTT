package com.cnweb36.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.Entity.AuthorEntity;

public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {
	AuthorEntity findByName(String name);
}
