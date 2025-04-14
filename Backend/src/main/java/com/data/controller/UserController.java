package com.data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.data.dto.LoginDTO;
import com.data.entity.User;
import com.data.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	UserService uservice;
	
	@PostMapping("/register")
	public String save(@RequestBody User u) {
		return uservice.save(u);
	}
	
//	@PostMapping("/login")
//	public String login(@RequestBody LoginDTO logindto) {
//		return uservice.login(logindto.getUsername(), logindto.getPassword());
//	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO logindto) {
	   String user = uservice.login(logindto.getUsername(), logindto.getPassword());
	    
	    if (user != null) {
	        return ResponseEntity.ok(user);  // Send full user object
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }
	}


}
