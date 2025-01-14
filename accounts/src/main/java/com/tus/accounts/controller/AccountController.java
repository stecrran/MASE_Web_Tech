package com.tus.accounts.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.accounts.constants.AccountConstants;
import com.tus.accounts.dto.CustomerDto;
import com.tus.accounts.dto.ResponseDto;


@RestController
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AccountController {

	@PostMapping
	public ResponseEntity<ResponseDto> createAccount(@RequestBody CustomerDto customerDto){
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ResponseDto(AccountConstants.STATUS_201,AccountConstants.MESSAGE_201));
	}

}
