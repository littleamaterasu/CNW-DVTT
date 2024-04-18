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
	private List<FAQEntity> listFAQ; 
	
	@OneToMany(mappedBy = "user_order")
	private List<OrderEntity> listOrder; 
	
	@OneToMany(mappedBy = "user_payment")
	private List<PaymentEntity> listPayment;
	
	@OneToMany(mappedBy = "admin_message")
	private List<MessageEntity> ListMessOfAdmin;
	
	@OneToMany(mappedBy = "user_message")
	private List<MessageEntity> ListMessOfUser;
	
    // get set role
	public String setRoles(String... ListRole ){
		String result = new String();
		for(String s : ListRole ) {
			result=result.concat(s).concat("=");
		}
		return result.substring(0, result.length()-1);
	}
	
	public List<String> getRoles(){
			List<String> result=new ArrayList<>();
			for(String s: this.roles.split("=")) {
				result.add(s);
			}
			return result;
	}
	
	public String getRole() {
		return roles;
	}

	public void setRole(String roles) {
		this.roles = roles;
	}
    //
	public AccountEntity() {
		super();
	}

	public AccountEntity(String username, String password, String name, String email, String address, String phone,
			List<String> roles) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() { return phone; }

	public void setPhone(String phone) { this.phone = phone; }

	public List<FAQEntity> getListFAQ() {
		return listFAQ;
	}

	public void setListFAQ(List<FAQEntity> listFAQ) {
		this.listFAQ = listFAQ;
	}

	public List<OrderEntity> getListOrder() {
		return listOrder;
	}

	public void setListOrder(List<OrderEntity> listOrder) {
		this.listOrder = listOrder;
	}

	public List<PaymentEntity> getListPayment() {
		return listPayment;
	}

	public void setListPayment(List<PaymentEntity> listPayment) {
		this.listPayment = listPayment;
	}

	public List<MessageEntity> getListMessOfAdmin() {
		return ListMessOfAdmin;
	}

	public void setListMessOfAdmin(List<MessageEntity> listMessOfAdmin) {
		ListMessOfAdmin = listMessOfAdmin;
	}

	public List<MessageEntity> getListMessOfUser() {
		return ListMessOfUser;
	}

	public void setListMessOfUser(List<MessageEntity> listMessOfUser) {
		ListMessOfUser = listMessOfUser;
	}

	
	
}
