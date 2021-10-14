package com.example.kinobackend.RESTController;

import com.example.kinobackend.model.Show;
import com.example.kinobackend.model.Theater;
import com.example.kinobackend.repos.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class TheaterRESTController {

    @Autowired
    TheaterRepository theaterRepository;

    @GetMapping("/theaters")
    public List<Theater> getAllCurrentTheaters(){
        return theaterRepository.findAll();
    }

    @GetMapping("/theater/inspect/{id}")
    public Optional<Theater> inspectTheater(@PathVariable int id){
        return theaterRepository.findById(id);
    }

    @PostMapping(value = "/theater", consumes = "application/json")
    public ResponseEntity<Theater> addTheater(@RequestBody Theater theater){
        theaterRepository.save(theater);
        return new ResponseEntity<Theater>(theater, HttpStatus.CREATED);
    }
}
