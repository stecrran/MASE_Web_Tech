package com.tus.spaceprogram.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tus.spaceprogram.model.Shuttle;



@Repository
public interface ShuttleRepository extends JpaRepository<Shuttle, Integer> {

}
