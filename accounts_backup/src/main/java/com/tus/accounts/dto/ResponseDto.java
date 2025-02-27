package com.tus.accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class ResponseDto {

	private String statusCode;
	
	private String statusMsg;
	
//	public ResponseDto(String statusCode, String statusMsg) {
//		this.statusCode = statusCode;
//		this.statusMsg = statusMsg;
//	}
}
