package com.tus.accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor // @AllArgs does not seem to work. I've added the constructor
public class ResponseDto {

	private String statusCode;
	
	private String statusMsg;
	
	public ResponseDto(String statusCode, String statusMsg) {
		this.statusCode = statusCode;
		this.statusMsg = statusMsg;
	}
}
