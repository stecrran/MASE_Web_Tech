package com.tus.accounts.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data 
@Getter 
@Setter 
@ToString 
@AllArgsConstructor 
@NoArgsConstructor
public class AccountsDto {

	@NotEmpty(message = "AccountNumber can not be null or empty")
	@Pattern(regexp = "(^$|[0-9]{10}", message = "AccountNumber must be 10 digits")
	private Long accountNumber;
	
	@NotEmpty(message = "AccountType can not be null or empty")
	private String accountType;
	
	@NotEmpty(message = "BranchAddress can not be null or empty")
	private String branchAddress;
}
