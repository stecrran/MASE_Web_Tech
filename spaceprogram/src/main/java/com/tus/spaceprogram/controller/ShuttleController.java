package com.tus.spaceprogram.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tus.spaceprogram.dao.ShuttleRepository;
import com.tus.spaceprogram.model.Shuttle;

@RestController
@RequestMapping("/shuttles")
public class ShuttleController {

	private ShuttleRepository shuttleRepository;

	public ShuttleController(ShuttleRepository shuttleRepository) {
		this.shuttleRepository = shuttleRepository;
	}

	// Get all shuttles
	@GetMapping
	public List<Shuttle> getAllShuttles() {
		return shuttleRepository.findAll();
	}

}