package com.cnweb36.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@CreatedBy
	@Column(name="createdBy")
	private String createdBy;
	
	@CreatedDate
	@Column(name="createdDate")
	private Date createdDate;
	
	@LastModifiedBy
	@Column(name="modifiedBy")
	private String modifiedBy;
	
	@LastModifiedDate
	@Column(name = "modifiedDate")
	private Date modifiedDate;
	
	@Column(columnDefinition = "varchar(5) default '0'")
	private String status;
	
	public Long getId() { return id; }

	public String getCreatedBy() { return createdBy; }
	public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

	public Date getCreatedDate() { return createdDate; }
	public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }

	public String getModifiedBy() { return modifiedBy; }
	public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }

	public Date getModifiedDate() { return modifiedDate; }
	public void setModifiedDate(Date modifiedDate) { this.modifiedDate = modifiedDate; }
	
	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }
	
}