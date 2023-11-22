package com.example.SAT.Application.service;

import java.util.List;

import com.example.SAT.Application.entity.SatResult;

public interface SatResultService {

	public SatResult createSatResult(SatResult satResult);
	public List<SatResult>getAllSatResults();
	public int getRankByName(String name); 
	public SatResult updateSatScoreByName(String name, int newSatScore);
	public void deleteSatResultByName(String name);
}
