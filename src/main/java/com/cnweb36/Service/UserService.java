package com.cnweb36.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.UserDTO;
import com.cnweb36.Repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo userRepo;

	public Long register(UserDTO userDTO) {
		
		String username=userDTO.getUsername();
		String password=userDTO.getPassword();
		if(userRepo.findByUsername(username)==null
		 &&userRepo.findByPassword(password)==null){
			
			return userRepo.save(userDTO.toEntity(userDTO)).getId();
		}
		return -1l;
	}
}
