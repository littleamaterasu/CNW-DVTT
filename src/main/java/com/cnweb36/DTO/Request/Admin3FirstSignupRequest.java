package com.cnweb36.DTO.Request;

import com.cnweb36.DTO.Entity.AccountDTO;

public class Admin3FirstSignupRequest extends AccountDTO {
	private String passkey;
	
	public String getPasskey() {
		return passkey;
	}
	public void setPasskey(String passkey) {
		this.passkey = passkey;
	}
	
}
