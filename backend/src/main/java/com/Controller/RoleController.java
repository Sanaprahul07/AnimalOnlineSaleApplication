package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DTO.RoleDto;
import com.Service.RoleService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/role")
public class RoleController {
	
	@Autowired
	private RoleService roleService;
	
	@PostMapping("/add")
	public RoleDto addRole(@RequestBody RoleDto roleDto){

	    return roleService.addRole(roleDto);

	}
	@GetMapping("/getAll")
	public List<RoleDto> getAllRoles(){

	    return roleService.getAllRoles();

	}
	@GetMapping("/get/{id}")
	public RoleDto getRoleById(@PathVariable Long id){

	    return roleService.getRoleById(id);

	}
	
	@PutMapping("/update/{id}")
	public RoleDto updateRole(@PathVariable Long id,
	                          @RequestBody RoleDto roleDto) {

	    return roleService.updateRole(id, roleDto);

	}
	
	 @DeleteMapping("/delete/{id}")
	    public String deleteRole(@PathVariable Long id){
	        return roleService.deleteRole(id);
	    }

}
