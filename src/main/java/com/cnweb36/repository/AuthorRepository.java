package com.cnweb36.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnweb36.entity.AuthorEntity;

public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {
	AuthorEntity findByName(String name);
}
