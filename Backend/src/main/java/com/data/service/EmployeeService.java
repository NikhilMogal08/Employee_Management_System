package com.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.data.entity.Employee;
import com.data.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
    private EmployeeRepository employeeRepository;
    
    public String save(Employee e) {
    	employeeRepository.save(e);
    	return "Employee record added successfully";
    }
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElse(null);
    }
    
    public List<Employee> findByName(String name){
    	return employeeRepository.findByName(name);
    }
    
    public List<Employee> findByDepartment(String dept){
    	return employeeRepository.findByDepartment(dept);
    }
    
    public List<Employee> findByRole(String role){
    	return employeeRepository.findByRole(role);
    }
    
    public String deletebyid(long id) {
    	employeeRepository.deleteById(id);
    	return "Record deleted successfully";
    }
    
    public String update(long id,Employee newemp) {
    	Employee existingemp=employeeRepository.findById(id).orElse(null);
    	
    	if(existingemp==null) {
    		return "exisitng record not found to update";
    	}
    	if(newemp.getName()==null&&newemp.getEmail()==null
    			&&newemp.getDepartment()==null&&newemp.getRole()==null
    			&&newemp.getSalary()==0.0) {
    		return "New record is empty";
    	}
    	if(newemp.getName()!=null) {
    		existingemp.setDepartment(newemp.getName());
    	}
    	if(newemp.getDepartment()!=null) {
    		existingemp.setDepartment(newemp.getDepartment());
    	}
    	if(newemp.getEmail()!=null) {
    		existingemp.setEmail(newemp.getEmail());
    	}
    	if(newemp.getRole()!=null) {
    		existingemp.setRole(newemp.getRole());
    	}
    	if(newemp.getSalary()!=0.0) {
    		existingemp.setSalary(newemp.getSalary());
    	}
    	if(newemp.getImg()!=null) {
    		existingemp.setImg(newemp.getImg());
    	}
    	employeeRepository.save(existingemp);
    	return "Record updated successfully";
    }
    public Employee findByEmailAndPassword(String email, String password) {
        return employeeRepository.findByEmailAndPassword(email, password);
    }

}