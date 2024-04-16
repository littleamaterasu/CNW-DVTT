package com.cnweb36.Entity;

//import java.util.ArrayList;
//import java.util.List;
import java.util.HashSet;
import java.util.Set;

import com.cnweb36.Config.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Admin")
public class AdminEntity extends BaseEntity {
	@Column(nullable=false)
	private String username;
	
	@Column(nullable=false)
	private String password;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=false)
	private String email;
	
	@Column()
	private String address;
	
	@Column(nullable=false, length=20)
	private String phone;
	
	@Column(nullable=false)
	private Role role;

	@OneToMany(fetch=FetchType.LAZY, mappedBy="admin", cascade=CascadeType.ALL)
	private Set<FAQEntity> faqList = new HashSet<>();
	
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

	public Role getRole() { return role; }
	public void setRole(Role role) { this.role = role; }
	
	public Set<FAQEntity> getFAQList() { return faqList; }
	public void setFAQList(Set<FAQEntity> faqList) { this.faqList = faqList; }
}
