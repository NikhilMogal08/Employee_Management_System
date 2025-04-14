package com.data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.data.entity.Employee;
import com.data.service.EmployeeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {

	@Autowired
    private EmployeeService employeeService;

    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/findbyid/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }
    
    @GetMapping("/findbyname/{name}")
    public List<Employee> getEmployeeByName(@PathVariable String name) {
        return employeeService.findByName(name);
    }
    
    @GetMapping("/findbydept/{dept}")
    public List<Employee> getEmployeeByDept(@PathVariable String dept) {
        return employeeService.findByName(dept);
    }
    
    @GetMapping("/findbyrole/{role}")
    public List<Employee> getEmployeeByRole(@PathVariable String role) {
        return employeeService.findByName(role);
    }
}