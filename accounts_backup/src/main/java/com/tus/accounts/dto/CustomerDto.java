package com.tus.accounts.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data 
@Getter 
@Setter 
@ToString 
public class CustomerDto {

	private String name;
	
	private String email;
	
	private String mobileNumber;
}
