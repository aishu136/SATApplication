package com.example.SAT.Application.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SatResult {

	@Id
	@Column(name="name")
	@Pattern(regexp="^[a-z A-z]*$",message="{name.pattern}")
	private String name;
	
	@Column(name="address")
	@Pattern(regexp="^[0-9 a-z A-z]*$",message="{address.pattern}")
	private String address;
	
	@Column(name="city")
	@Pattern(regexp="^[a-z A-z]*$",message="{city.pattern}")
	private String city;
	
	@Column(name="country")
	@Pattern(regexp="^[a-z A-z]*$",message="{country.pattern}")
	private String country;
	
	@Column(name="pincode")
	@Pattern(regexp="^[0-9]*$",message="{pincode.pattern}")
	private String pincode;
	
	@Column(name="satScore")
	@NotBlank(message= "{satScore.notBlank}")
	private int satScore;
	
	@Column(name="passed")
	private boolean passed;
	
}
