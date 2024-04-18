package com.cnweb36.DTO.Entity;

public class FAQDTO extends BaseDTO {
	private String question;
	private String answer;
	// private AdminDTO admin;
	
	public String getQuestion() { return question; }
	public void setQuestion(String question) { this.question = question; }

	public String getAnswer() { return answer; }
	public void setAnswer(String answer) { this.answer = answer; }
	
	// public AdminDTO getAdmin() { return admin; }
	// public void setAdmin(AdminDTO admin) { this.admin = admin; }
	
}
