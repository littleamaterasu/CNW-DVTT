package com.cnweb36.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cnweb36.Service.Security.AccountDetails;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Repository.AccountRepository;

@Service
public class AccountDetailsService implements UserDetailsService {
    @Autowired
    AccountRepository accountRepository;

    @Override
    @Transactional
    public AccountDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	AccountEntity accountEntity = accountRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return AccountDetails.build(accountEntity);
    }

}