package com.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.data.entity.User;
import com.data.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository uresp;
	
	public String save(User u) {
		User exisitngUser=uresp.findByUsername(u.getUsername()).orElse(null);
		if(exisitngUser!=null) {
			return "Username is already exists. please try another one";
		}
		else {
			uresp.save(u);
			return "User registered successfully";
		}
	}
	
	public String login(String username, String password) {
		User existingUser=uresp.findByUsername(username).orElse(null);
		if(existingUser!=null) {
			if(existingUser.getPassword().equals(password)) {
				return "login successful";
			}
		}
		return "login failed";
	}
}
