package com.cnweb36.Entity;

import java.util.Random;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="OTP")
public class UserOTPEntity extends BaseEntity {

	private static final long OTP_VALID_TIME = 5 * 60 * 1000;   // 5 minutes
	
	@Column(name="username")
	private String username;
	@Column(name="OTP", nullable = false)
	private String OTP;
	@Column(name="count")
	private Integer count;
	
	public String generateString(int targetStringLength) {
		int leftLimit = 48; // numeral '0'
	    int rightLimit = 122; // letter 'z'
	    Random random = new Random();

	    String OTP = random.ints(leftLimit, rightLimit + 1)
	      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	      .limit(targetStringLength)
	      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	      .toString();
	    
	    return OTP;
	}
	
	public Boolean OTPisValid() {
		 if (this.getOTP() == null) {
	            return false;
	        }
	         
	        long currentTimeInMillis = System.currentTimeMillis();
	        long otpRequestedTimeInMillis = super.getModifiedDate().getTime();
	         
	        if (currentTimeInMillis-otpRequestedTimeInMillis>OTP_VALID_TIME) {
	            // OTP expires
	            return false;
	        }
	        
	        if(this.count>=3) return false;
	        
	        return true;
	}
	
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getOTP() {
		return OTP;
	}
	public void setOTP(String oTP) {
		OTP = oTP;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
	
}
