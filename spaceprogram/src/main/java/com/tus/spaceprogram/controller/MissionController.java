package com.tus.spaceprogram.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tus.spaceprogram.dao.MissionRepository;
import com.tus.spaceprogram.model.Mission;

@RestController
@RequestMapping("/missions")
public class MissionController {

	private MissionRepository missionRepository;

	public MissionController(MissionRepository missionRepository) {
		this.missionRepository = missionRepository;
	}

	// Get all missions
	@GetMapping
	public List<Mission> getAllMissions() {
		return missionRepository.findAll();
	}

	// Get mission by ID
	@GetMapping("/{id}")
	public ResponseEntity<Mission> getMissionById(@PathVariable int id) {
		Optional<Mission> mission = missionRepository.findById(id);
		if (mission.isPresent()) {
			return ResponseEntity.ok(mission.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Get mission for a particular orbitor (e.g. Atlantis)
	@GetMapping("/search/{orbitor}")
	public List<Mission> findByMissionName(@PathVariable("orbitor") String orbitor) {
		return missionRepository.getMissionByOrbitor(orbitor);

	}

}