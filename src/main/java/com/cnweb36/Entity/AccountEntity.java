package com.cnweb36.Entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="account")
public class AccountEntity extends BaseEntity {
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "name", columnDefinition = "VARCHAR(50) ")
	private String name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "phone", columnDefinition = "VARCHAR(20) ")
	private String phone;
	
	@Column(name = "role")
	private String roles;
	
	@OneToMany(mappedBy = "admin")
	private List<FAQEntity> faqList; 
	
	@OneToMany(mappedBy = "user")
	private List<OrderEntity> orderList; 
	
	@OneToMany(mappedBy = "user")
	private List<PaymentEntity> paymentList;
	
	@OneToMany(mappedBy = "admin")
	private List<MessageEntity> adminMessList;
	
	@OneToMany(mappedBy = "user")
	private List<MessageEntity> userMessList;
    
	public AccountEntity() { super(); }
	public AccountEntity(String username, String password, String name, String email, String address, String phone, List<String> roles) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}
	
	public List<String> getRoles() { List<String> result = new ArrayList<>();
		for(String s: this.roles.split("=")) {
			result.add(s);
		}
		return result;
	}	
	public void setRoles(String... roleList) {
		String result = new String();
		for(String s: roleList ) {
			result = result.concat(s).concat("=");
		}
//		return result.substring(0, result.length()-1);
	}
	
//	public String getRole() { return roles; }//
//	public void setRole(String roles) { this.roles = roles; }

	public String getUsername() { return username; }
	public void setUsername(String username) { this.username = username; }

	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	public String getAddress() { return address; }
	public void setAddress(String address) { this.address = address; }

	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }

	public List<FAQEntity> getFAQList() { return faqList; }
	public void setFAQList(List<FAQEntity> faqList) { this.faqList = faqList; }

	public List<OrderEntity> getOrderList() { return orderList; }
	public void setOrderList(List<OrderEntity> orderList) {	this.orderList = orderList;	}

	public List<PaymentEntity> getPaymentList() { return paymentList; }
	public void setPaymentList(List<PaymentEntity> paymentList) { this.paymentList = paymentList; }

	public List<MessageEntity> getAdminMessList() { return adminMessList; }
	public void setAdminMessList(List<MessageEntity> adminMessList) { this.adminMessList = adminMessList; }

	public List<MessageEntity> getUserMessList() { return userMessList;	}
	public void setUserMessList(List<MessageEntity> userMessList) { this.userMessList = userMessList; }
	
}
