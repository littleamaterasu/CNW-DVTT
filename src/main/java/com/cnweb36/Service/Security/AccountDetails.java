package com.cnweb36.Service.Security;

import java.util.Collection;
import java.util.Date;
//import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

//import com.example.demo.entity.ERole;
//import com.example.demo.entity.RoleEnity;
import com.cnweb36.Entity.AccountEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class AccountDetails implements UserDetails {
	
  private static final long serialVersionUID = 1L;
  private Long id;
  private String username;
  private String email;

  @JsonIgnore
  private String password;  
  private Date signoutTime;
  private Collection<? extends GrantedAuthority> authorities;

  public AccountDetails(Long id, String username, String email, String password, Date signoutTime,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.signoutTime = signoutTime;
    this.authorities = authorities;
  }

  public static AccountDetails build(AccountEntity accountEntity) {
//	RoleEnity userRole = new RoleEnity();
//	userRole.setName(ERole.ROLE_ADMIN);
//	Set<RoleEnity> userRoles = new HashSet<RoleEnity>();
//	userRoles.add(userRole);
	Set<String> accountRoles = accountEntity.getRoles();
	
//    List<GrantedAuthority> authorities = user.getRoles().stream()
//        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
//        .collect(Collectors.toList());
    List<GrantedAuthority> accountAuthorities = accountRoles.stream()
            .map(role -> new SimpleGrantedAuthority(role))
            .collect(Collectors.toList());
    
    return new AccountDetails(
    		accountEntity.getId(), 
    		accountEntity.getUsername(), 
    		accountEntity.getEmail(),
    		accountEntity.getPassword(), 
    		accountEntity.getSignoutTime(),
    		accountAuthorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  	public Date getSignoutTime() {
  		return signoutTime;
	}
	
	public void setSignoutTime(Date signoutTime) {
		this.signoutTime = signoutTime;
	}

@Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    AccountDetails user = (AccountDetails) o;
    return Objects.equals(id, user.id);
  }
}
