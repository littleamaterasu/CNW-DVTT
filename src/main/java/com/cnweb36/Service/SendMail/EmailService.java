package com.cnweb36.Service.SendMail;

public interface EmailService {

	public void sendMessage(String to, String subject, String text);
}
