package com.cnweb36.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnweb36.DTO.Entity.ProviderDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Service.ProviderService;

//@CrossOrigin(origins = "${cnweb36.crossOrigin}", maxAge = 3600)
@RestController
@RequestMapping("/provider")
public class ProviderAPI {

	@Autowired
	private ProviderService providerService;
	
	@PostMapping("/post")
	@PreAuthorize("hasRole('ROLE_ADMIN_2') or hasRole('ROLE_ADMIN_3') or hasRole('ROLE_ADMIN_1')")
	public NoticeResponse AddProduct(@RequestBody ProviderDTO providerDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		try {
			return providerService.AddOrUpdateProvider(providerDTO);
		} catch (Exception e) {
			noticeResponse.setStatus(-1l);
			noticeResponse.setContent(e.getMessage());
			return noticeResponse;
		}
	}
	
	@GetMapping("/get")
	public List<ProviderDTO> getListProvider() {
		return providerService.getListProvider();
	}
}
