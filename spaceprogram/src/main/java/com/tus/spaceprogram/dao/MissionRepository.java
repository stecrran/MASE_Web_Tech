package com.tus.spaceprogram.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tus.spaceprogram.model.Mission;




@Repository
public interface MissionRepository extends JpaRepository<Mission, Integer> {

	List<Mission> getMissionByOrbitor(String orbitor);

}
