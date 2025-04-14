package com.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user_info")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int uid;
	String username;
	String email;
	long contactno;
	String password;
	String urole;
	public User() {
		super();
	}
	public User(int uid, String username, String email, long contactno, String password, String urole) {
		super();
		this.uid = uid;
		this.username = username;
		this.email = email;
		this.contactno = contactno;
		this.password = password;
		this.urole = urole;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public long getContactno() {
		return contactno;
	}
	public void setContactno(long contactno) {
		this.contactno = contactno;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUrole() {
		return urole;
	}
	public void setUrole(String urole) {
		this.urole = urole;
	}
	
	
}
