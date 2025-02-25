package com.tus.cars.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.cars.dao.CarRepository;
import com.tus.cars.model.Car;

@RestController
@RequestMapping("/cars")
public class CarController {

	@Autowired
    private CarRepository carRepo;
	
    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    // Get all cars
    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Get car by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Optional<Car> car = carRepository.findById(id);
        if (car.isPresent()) {
            return ResponseEntity.ok(car.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get cars within a year range
    @GetMapping("search/{minYear}/{maxYear}")
    public List<Car> getCarByMinMaxYearSearch(@PathVariable int minYear, @PathVariable int maxYear) {
    	return carRepo.findByManufacturerYearBetween(minYear, maxYear);
    }
}