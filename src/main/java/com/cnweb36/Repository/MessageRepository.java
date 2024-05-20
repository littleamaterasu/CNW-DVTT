package com.cnweb36.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cnweb36.Entity.MessageEntity;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
	
	@Query("select m from MessageEntity m where m.username=?1")
	List<MessageEntity> findMessByUser(String username,Pageable pageable);
	
	List<MessageEntity> findByUsername(String username,Sort sort);
	
	@Query("select m from MessageEntity m where DATEDIFF(CURDATE(), m.createdDate) < ?1 order by m.createdDate")
	List<MessageEntity> adminfindByDay(Integer Day);
}
