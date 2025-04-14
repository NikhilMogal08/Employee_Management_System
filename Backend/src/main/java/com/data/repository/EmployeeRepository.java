package com.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.data.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
	public List<Employee> findByName(String name);
	public List<Employee> findByRole(String role);
	public List<Employee> findByDepartment(String dept);
	public Employee findByEmailAndPassword(String email, String password);
}
