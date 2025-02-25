package com.tus.cars.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tus.cars.model.Car;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

	// custom query for min / max year search
	//List<Car> findByMinMaxYear(int minYear, int maxYear);
	List<Car> findByManufacturerYearBetween(int minYear, int maxYear);  // the method name needs to follow naming conventions for the variables
																		// @Param manufacturerYear

	/*
	 * Here's how the method naming works:
    findBy → This is a standard prefix used in Spring Data JPA to indicate a query method.
    ManufacturerYear → This corresponds to an entity field (e.g., a field named manufacturerYear in the Car entity).
    Between → This is a keyword recognized by Spring Data JPA that generates a query checking if a value is within a given range.
	 */

}
