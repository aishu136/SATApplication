package com.example.SAT.Application.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SAT.Application.entity.RankResponse;
import com.example.SAT.Application.entity.SatResult;
import com.example.SAT.Application.entity.UpdateSatScoreRequest;
import com.example.SAT.Application.exceptions.DatabaseOperationException;
import com.example.SAT.Application.exceptions.DuplicateNameException;
import com.example.SAT.Application.exceptions.NameNotFoundException;
import com.example.SAT.Application.service.SatResultServiceImp;

@RestController
@RequestMapping("/api/sat-results")
public class SatResultController {

	private final SatResultServiceImp satResultService;
	
	@Autowired
	public SatResultController(SatResultServiceImp satResultService) {
		this.satResultService=satResultService;
	}
	
	@PostMapping("/insert")
	public ResponseEntity<String> insertSatResult(@Valid @RequestBody SatResult satResult) {
		try{
			satResultService.createSatResult(satResult);
			return ResponseEntity.ok("Data inserted succesfully");
		}catch(DuplicateNameException ex){
			return ResponseEntity.badRequest().body(ex.getMessage());
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Internal server error");
		}
		
	}
	
	@GetMapping("/view-all")
	public ResponseEntity<List<SatResult>> getAllSatResults(){
		try{
			List<SatResult>allSatResult=satResultService.getAllSatResults();
			return new ResponseEntity<>(allSatResult,HttpStatus.OK);
		}catch(DatabaseOperationException ex) {
			return ResponseEntity.status(500).body(null);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body(null);
		}
		
	}
	
	@GetMapping("/rank")
	public ResponseEntity<RankResponse> getRankByName(@RequestParam String name) {
		try {
		Integer rank = satResultService.getRankByName(name);
		return ResponseEntity.ok(new RankResponse(rank));
		}catch(NameNotFoundException ex) {
			return ResponseEntity.notFound().build();
		}catch(Exception ex) {
			return ResponseEntity.status(500).build();
		}
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateSatScoreByName(@RequestBody UpdateSatScoreRequest request) {
		try{
			satResultService.updateSatScoreByName(request.getName(), request.getNewSatScore());
			return ResponseEntity.ok("SAT score updated successfully");
		}catch(NameNotFoundException ex) {
			return ResponseEntity.status(404).body(ex.getMessage());	
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
	
	
	@DeleteMapping("/delete")
	public ResponseEntity<String>deleteSatResultByName(@RequestParam("name") String name){
		try
		{
			satResultService.deleteSatResultByName(name);
			return  ResponseEntity.ok("Record deleted successfully");
		}catch(NameNotFoundException ex) {
			return ResponseEntity.status(404).body("Record has not been deleted");
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Internal server error");
		}
	
	
	}
}
