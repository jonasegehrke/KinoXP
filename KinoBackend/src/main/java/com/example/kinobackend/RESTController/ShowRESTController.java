package com.example.kinobackend.RESTController;


import com.example.kinobackend.model.Show;
import com.example.kinobackend.repos.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ShowRESTController {

    @Autowired
    ShowRepository showRepository;

    @GetMapping("/shows")
    public List<Show> getAllCurrentShows(){
        return showRepository.findAll();
    }

    @GetMapping("/show/inspect/{id}")
    public Optional<Show> inspectShow(@PathVariable int id){
        return showRepository.findById(id);
    }

    @PostMapping(value = "/show", consumes = "application/json")
    public ResponseEntity<Show> addShow(@RequestBody Show show){
        showRepository.save(show);
        return new ResponseEntity<Show>(show, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/show/{id}")
    public ResponseEntity<Show> deleteShow(@PathVariable int id){
        showRepository.deleteById(id);
        return new ResponseEntity<Show>(HttpStatus.OK);
    }

    @PutMapping(value = "/show/update", consumes = "application/json")
    public ResponseEntity<Show> updateShow(@RequestBody Show show){
        Optional<Show> data = showRepository.findById(show.getShowId());
        if(data.isPresent()){
            Show updatedShow = data.get();
            updatedShow.setDate(show.getDate());
            updatedShow.setTime(show.getTime());
            updatedShow.setTheater(show.getTheater());
            updatedShow.setCalendarId(show.getCalendarId());
            showRepository.save(updatedShow);
        }
        return new ResponseEntity<>(show, HttpStatus.OK);
    }
}
