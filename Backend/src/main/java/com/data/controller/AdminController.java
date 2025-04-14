package com.data.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.data.entity.Employee;

import com.data.service.EmployeeService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
	
	@Autowired
    private EmployeeService empService;

	@GetMapping("/hi")
    public String greet() {
    	return "Hello";
    }

    @GetMapping("/getallemp")
	public List<Employee>getAllEmployees()
	{
		return empService.getAllEmployees();
	}
	@PostMapping("/saveemp")
	public String saveEmployee(@RequestBody Employee employee)
	{
		return empService.save(employee);
	}
	@GetMapping("/findemp/{id}")
	public Employee getEmployeeById(@PathVariable Long id)
	{
		return empService.getEmployeeById(id);
	}
	
	@GetMapping("/findbyname/{name}")
	public List<Employee>findempbyname(@PathVariable String name)
	{
		return empService.findByName(name);
	}
	
	@GetMapping("/findbydept/{dept}")
	public List<Employee>findbydept(@PathVariable String dept)
	{
		return empService.findByDepartment(dept);
	}
	@GetMapping("/findbyrole/{role}")
	public List<Employee>findbyroll(@PathVariable String role)
	{
		return empService.findByRole(role);
	}
	@DeleteMapping("/delete/{id}")
	public void deleteEmployee(@PathVariable Long id)
	{
	     empService.deletebyid(id);
	}
	@PutMapping("/update/{id}")
	public void updateById(@PathVariable Long id,@RequestBody Employee employee) {
		empService.update(id, employee);
		
	}
    
    
}
