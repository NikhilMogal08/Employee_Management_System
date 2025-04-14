package com.data.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
   
    private String email;
    
    private String department;
    
    private String role;
    
    private double salary;
    
    String img;
    
    String password;

	public Employee() {
		super();
	}

	public Employee(Long id, String name, String email, String department, String role, double salary,String img) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.department = department;
		this.role = role;
		this.salary = salary;
		this.img=img;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
    
	public void setPassword(String password) {
        this.password = password;
    }

}
