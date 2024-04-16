package com.cnweb36.Entity;

import com.cnweb36.Config.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class UserEntity extends BaseEntity {
	
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
	private Role role;

	public UserEntity(String username, String password, String name, String email, String address, String phone,
		Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.address = address;
		this.phone = phone;
		this.role = role;
	}

	public UserEntity() {
		super();
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

	public Role getRole() { return role; }
	public void setRole(Role role) { this.role = role; }
	
}
