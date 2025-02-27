package com.tus.accounts.dto;

import lombok.Data;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data 
@Getter 
@Setter 
@ToString 
@AllArgsConstructor 
public class AccountsDto {

	private Long accountNumber;
	
	private String accountType;
	
	private String branchAddress;
}
