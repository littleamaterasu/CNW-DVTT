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
@Table(name="faq")
public class FAQEntity extends BaseEntity {
	@Column(nullable=false, columnDefinition="text")
	private String question;
	
	@Column(nullable=false, columnDefinition="text")
	private String answer;

	@ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="admin_id", nullable=false)
	private AccountEntity admin;
	
	public String getQuestion() { return question; }
	public void setQuestion(String question) { this.question = question; }

	public String getAnswer() { return answer; }
	public void setAnswer(String answer) { this.answer = answer; }
	
	public AccountEntity getAdmin() { return admin; }
	public void setAdmin(AccountEntity admin) { this.admin = admin; }
	
}
