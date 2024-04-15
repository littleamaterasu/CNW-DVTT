package com.cnweb36.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="FAQ")
public class FAQEntity extends BaseEntity {
	@Column(nullable=false, columnDefinition="text")
	private String question;
	
	@Column(nullable=false, columnDefinition="text")
	private String answer;

	@ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="adminId", nullable=false)
	private AdminEntity admin;
	
	public String getQuestion() { return question; }
	public void setQuestion(String question) { this.question = question; }

	public String getAnswer() { return answer; }
	public void setAnswer(String answer) { this.answer = answer; }
	
	public AdminEntity getAdmin() { return admin; }
	public void setAdmin(AdminEntity admin) { this.admin = admin; }
	
}
