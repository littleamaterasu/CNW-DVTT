package com.cnweb36.Service.SendMail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceImpl implements EmailService{

	@Autowired
    private JavaMailSender emailSender;

    public void sendMessage(
      String to, String subject, String text) {
      
        SimpleMailMessage message = new SimpleMailMessage(); 
        //người gửi
        message.setFrom("nguyendinhtung103664@gmail.com");
        //người nhận
        message.setTo(to); 
        // tiêu đề
        message.setSubject(subject); 
        // Nội dung
        message.setText(text);
        emailSender.send(message);
 
    }
}
