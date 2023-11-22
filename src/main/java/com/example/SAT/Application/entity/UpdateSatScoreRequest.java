package com.example.SAT.Application.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSatScoreRequest {

	private String name;
	private int newSatScore;
	
}
