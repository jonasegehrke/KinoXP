package com.example.kinobackend.RESTController;

import com.example.kinobackend.model.Shift;
import com.example.kinobackend.model.Show;
import com.example.kinobackend.repos.ShiftRepository;
import com.example.kinobackend.repos.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ShiftRESTController {

    @Autowired
    ShiftRepository shiftRepository;

    @GetMapping("/shifts")
    public List<Shift> getAllCurrentShifts(){
        return shiftRepository.findAll();
    }

    @GetMapping("/shift/inspect/{id}")
    public Optional<Shift> inspectShift(@PathVariable int id){
        return shiftRepository.findById(id);
    }

    @PostMapping(value = "/shift", consumes = "application/json")
    public ResponseEntity<Shift> addShift(@RequestBody Shift shift){
        shiftRepository.save(shift);
        return new ResponseEntity<Shift>(shift, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/shift/{id}")
    public ResponseEntity<Shift> deleteShift(@PathVariable int id){
        shiftRepository.deleteById(id);
        return new ResponseEntity<Shift>(HttpStatus.OK);
    }

    @PutMapping(value = "/shift/update", consumes = "application/json")
    public ResponseEntity<Shift> updateShift(@RequestBody Shift shift){
        Optional<Shift> data = shiftRepository.findById(shift.getShiftId());
        if(data.isPresent()){
            Shift updatedShift = data.get();
            updatedShift.setDate(shift.getDate());
            updatedShift.setTime(shift.getTime());
            updatedShift.setEmployees(shift.getEmployees());
            shiftRepository.save(updatedShift);
        }
        return new ResponseEntity<>(shift, HttpStatus.OK);
    }
}
