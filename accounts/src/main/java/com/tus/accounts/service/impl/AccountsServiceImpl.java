package com.tus.accounts.service.impl;

import org.springframework.stereotype.Service;

import com.tus.accounts.dto.CustomerDto;
import com.tus.accounts.repository.AccountsRepository;
import com.tus.accounts.repository.CustomerRepository;
import com.tus.accounts.service.IAccountsService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountsServiceImpl implements IAccountsService {
	// framework will automatically autowire as one single constructor
	private AccountsRepository accountsRepository;
	private CustomerRepository customerRepository;
	
	//@Override
	public void createAccount(CustomerDto customerDto) {
		// TODO
	}
}
