package com.example.SAT.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SAT.Application.entity.SatResult;

public interface SatResultRepository extends JpaRepository<SatResult,Long> {

	SatResult findByName(String name);
	void deleteByName(String name);
	boolean existsByName(String name);
}
