package com.example.kinobackend.RESTController;

import com.example.kinobackend.model.Movie;
import com.example.kinobackend.repos.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MovieRESTController {

    @Autowired
    MovieRepository movieRepository;

    @GetMapping("/movies")
    public List<Movie> getAllCurrentMovies(){
        return movieRepository.findAll();
    }

    @PostMapping(value = "/movie", consumes = "application/json")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie){
        movieRepository.save(movie);
        return new ResponseEntity<Movie>(movie, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/movie/{id}")
    public ResponseEntity<Movie> deleteMovie(@PathVariable int id){
        movieRepository.deleteById(id);
        return new ResponseEntity<Movie>(HttpStatus.OK);
    }

}
