package com.example.SAT.Application.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SAT.Application.entity.SatResult;
import com.example.SAT.Application.exceptions.DatabaseOperationException;
import com.example.SAT.Application.exceptions.DuplicateNameException;
import com.example.SAT.Application.exceptions.NameNotFoundException;
import com.example.SAT.Application.repository.SatResultRepository;

@Service
public class SatResultServiceImp implements SatResultService  {
	
	private final SatResultRepository satResultRepository; 
	
	@Autowired
	public SatResultServiceImp(SatResultRepository  satResultRepository ) {
		this.satResultRepository =satResultRepository ;
	}
	
	@Override
	public SatResult createSatResult(SatResult satResult) {
		  if (satResultRepository.existsByName(satResult.getName())) {
	            throw new DuplicateNameException("Name " + satResult.getName() + " already exists");
	        }
		double passThreshold=0.30*1600;
		satResult.setPassed(satResult.getSatScore()>passThreshold);
		return satResultRepository.save(satResult);	
	}
	
	@Override
	public List<SatResult>getAllSatResults(){
		try {
		List<SatResult> data =  satResultRepository.findAll();
		
		if(data.isEmpty()) {
			throw new DatabaseOperationException("The table is empty");
		}
		return data;
		}catch(DatabaseOperationException ex) {
			throw new DatabaseOperationException("Error connecting the database");
		}
		
	}
	
	@Override
	public int getRankByName(String name) {
		SatResult record = satResultRepository.findByName(name);
        if(record == null) {
        	throw new NameNotFoundException("Name "+name+"not found");
        }
     // Retrieve all SatResults (You need to implement this method)
        List<SatResult> allSatResults = satResultRepository.findAll();

        // Sort SatResults by SAT score in descending order
        List<SatResult> sortedResults = allSatResults.stream()
                .sorted(Comparator.comparingDouble(SatResult::getSatScore).reversed())
                .collect(Collectors.toList());

        // Find the index of the target name in the sorted list
        int rank = sortedResults.indexOf(sortedResults.stream()
                .filter(result -> result.getName().equals(name))
                .findFirst()
                .orElse(null)) + 1;

        return rank;

	}
	
	@Override
	public SatResult updateSatScoreByName(String name, int newSatScore) {
		SatResult satResult=satResultRepository.findByName(name);
		double passThreshold=0.30*1600;
		if(satResult!=null) {
			satResult.setSatScore(newSatScore);
			satResult.setPassed(newSatScore>passThreshold);
			return satResultRepository.save(satResult);
		}else {
			throw new NameNotFoundException("Name "+ name+ "not found");
		}
	}
	
	@Override
	public void deleteSatResultByName(String name) {
		SatResult deleteByName=satResultRepository.findByName(name);
		if(deleteByName!=null) {
			satResultRepository.delete(deleteByName);
		}else {
		  throw new NameNotFoundException("Name:"+name+"not found");	
		}
		
	}


}
