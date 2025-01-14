package com.tus.accounts.dto;

import lombok.*;

@Data @Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class AccountsDto {

	private Long accountNumber;
	
	private String accountType;
	
	private String branchAddress;
}
