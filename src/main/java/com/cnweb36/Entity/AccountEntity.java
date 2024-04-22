package com.cnweb36.Entity;

import java.util.HashSet;
import java.util.Set;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="account")
public class AccountEntity extends BaseEntity {
	
	@Column(name = "username", nullable = false)
	private String username;
	
	@Column(name = "password", nullable = false)
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
	
	@Column(name = "signoutTime")
	private Date signoutTime;

	@OneToMany(mappedBy = "admin")
	private Set<FAQEntity> faqList; 
	
	@OneToMany(mappedBy = "user")
	private Set<OrderEntity> orderList; 
	
	@OneToMany(mappedBy = "user")
	private Set<PaymentEntity> paymentList;
	
	@OneToMany(mappedBy = "admin")
	private Set<MessageEntity> adminMessList;
	
	@OneToMany(mappedBy = "user")
	private Set<MessageEntity> userMessList;
    
	public AccountEntity() { super(); }
	public AccountEntity(String username, String password, String name, String email, String address, String phone, Set<String> roles) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}
	
	public Set<String> getRoles() { 
		Set<String> result = new HashSet<>();
		for(String s: this.roles.split("=")) {
			result.add(s);
		}
		return result;
	}	
	public void setRoles(String... roleList) {
		String roles = new String();
		for(String s: roleList ) {
			roles = roles.concat(s).concat("=");
		}
		this.roles = roles.substring(0,roles.length()-1);
	}	

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
	
	public Date getSignoutTime() { return signoutTime; }
	public void setSignoutTime(Date signoutTime) { this.signoutTime = signoutTime; }
	
	public Set<FAQEntity> getFAQList() { return faqList; }
	public void setFAQList(Set<FAQEntity> faqList) { this.faqList = faqList; }

	public Set<OrderEntity> getOrderList() { return orderList; }
	public void setOrderList(Set<OrderEntity> orderList) {	this.orderList = orderList;	}

	public Set<PaymentEntity> getPaymentList() { return paymentList; }
	public void setPaymentList(Set<PaymentEntity> paymentList) { this.paymentList = paymentList; }

	public Set<MessageEntity> getAdminMessList() { return adminMessList; }
	public void setAdminMessList(Set<MessageEntity> adminMessList) { this.adminMessList = adminMessList; }

	public Set<MessageEntity> getUserMessList() { return userMessList;	}
	public void setUserMessList(Set<MessageEntity> userMessList) { this.userMessList = userMessList; }
	
}
