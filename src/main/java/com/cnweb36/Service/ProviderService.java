package com.cnweb36.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Entity.ProviderDTO;
import com.cnweb36.DTO.Response.NoticeResponse;
import com.cnweb36.Entity.ProviderEntity;
import com.cnweb36.Repository.ProviderRepository;

@Service
public class ProviderService {

	@Autowired
	private ProviderRepository providerRepository;
	
	public NoticeResponse AddOrUpdateProvider(ProviderDTO providerDTO) {
		NoticeResponse noticeResponse=new NoticeResponse();
		ProviderEntity providerEntity=providerRepository.findByName(providerDTO.getName());
		if(providerEntity==null) {
			ProviderEntity newProviderEntity=new ProviderEntity();
			
			newProviderEntity.setName(providerDTO.getName());
			newProviderEntity.setInfo(providerDTO.getInfo());
			
			noticeResponse.setStatus(providerRepository.save(newProviderEntity).getId());
			noticeResponse.setContent("Create a provider");
		}else {
			providerEntity.setInfo(providerDTO.getInfo());
			
			noticeResponse.setStatus(providerRepository.save(providerEntity).getId());
			noticeResponse.setContent("Update a provider");
		}
		return noticeResponse;
	}
	
	public List<ProviderDTO> getListProvider() {
		List<ProviderDTO> listProvider=new ArrayList<>();
		for(ProviderEntity e: providerRepository.findAll()) {
			ProviderDTO ProviderDTO=new ProviderDTO();
			ProviderDTO.setId(e.getId());
			ProviderDTO.setInfo(e.getInfo());
			ProviderDTO.setName(e.getName());
			
			listProvider.add(ProviderDTO);
		}
		return listProvider;
	}
}
