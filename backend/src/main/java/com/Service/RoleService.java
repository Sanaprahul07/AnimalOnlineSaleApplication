package com.Service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.DTO.RoleDto;

@Repository
public interface RoleService {
	
	RoleDto addRole(RoleDto roleDto);

    List<RoleDto> getAllRoles();

    RoleDto getRoleById(Long id);

    RoleDto updateRole(Long id, RoleDto roleDto);

    String deleteRole(Long id);

}
