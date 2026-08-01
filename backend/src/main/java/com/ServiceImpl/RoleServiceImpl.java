package com.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DTO.RoleDto;
import com.Entity.Role;
import com.Repository.RoleRepository;
import com.Service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public RoleDto addRole(RoleDto roleDto) {

		Role role = new Role();

		role.setRoleName(roleDto.getRoleName());
		role.setDescription(roleDto.getDescription());

		role = roleRepository.save(role);

		RoleDto response = new RoleDto();

		response.setId(role.getId());
		response.setRoleName(role.getRoleName());
		response.setDescription(role.getDescription());

		return response;

	}

	@Override
	public List<RoleDto> getAllRoles() {

	    List<Role> roles = roleRepository.findAll();

	    List<RoleDto> roleDtos = new ArrayList<>();

	    for (Role role : roles) {

	        RoleDto dto = new RoleDto();

	        dto.setId(role.getId());
	        dto.setRoleName(role.getRoleName());
	        dto.setDescription(role.getDescription());

	        roleDtos.add(dto);
	    }

	    return roleDtos;
	}

	@Override
	public RoleDto getRoleById(Long id) {

	    Role role = roleRepository.findById(id).orElse(null);

	    if (role == null) {
	        return null;
	    }

	    RoleDto roleDto = new RoleDto();

	    roleDto.setId(role.getId());
	    roleDto.setRoleName(role.getRoleName());
	    roleDto.setDescription(role.getDescription());

	    return roleDto;
	}

	@Override
	public RoleDto updateRole(Long id, RoleDto roleDto) {

	    Role role = roleRepository.findById(id).orElse(null);

	    if (role == null) {
	        return null;
	    }

	    role.setRoleName(roleDto.getRoleName());
	    role.setDescription(roleDto.getDescription());

	    role = roleRepository.save(role);

	    RoleDto response = new RoleDto();

	    response.setId(role.getId());
	    response.setRoleName(role.getRoleName());
	    response.setDescription(role.getDescription());

	    return response;
	}

	@Override
	public String deleteRole(Long id) {

	    Role role = roleRepository.findById(id).orElse(null);

	    if (role == null) {
	        return "Role Not Found";
	    }

	    roleRepository.delete(role);

	    return "Role Deleted Successfully";
	}

}
