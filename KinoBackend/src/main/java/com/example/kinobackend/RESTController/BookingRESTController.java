package com.example.kinobackend.RESTController;

import com.example.kinobackend.model.Booking;
import com.example.kinobackend.model.Show;
import com.example.kinobackend.repos.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class BookingRESTController {

    @Autowired
    BookingRepository bookingRepository;

    @GetMapping("/bookings")
    public List<Booking> getAllCurrentBookings(){
        return bookingRepository.findAll();
    }

    @GetMapping("/booking/inspect/{id}")
    public Optional<Booking> inspectBooking(@PathVariable int id){
        return bookingRepository.findById(id);
    }

    @PostMapping(value = "/booking", consumes = "application/json")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking){
        bookingRepository.save(booking);
        return new ResponseEntity<Booking>(booking, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/booking/{id}")
    public ResponseEntity<Booking> deleteBooking(@PathVariable int id){
        bookingRepository.deleteById(id);
        return new ResponseEntity<Booking>(HttpStatus.OK);
    }

    @PutMapping(value = "/booking/update", consumes = "application/json")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking booking){
        Optional<Booking> data = bookingRepository.findById(booking.getBookingId());
        if(data.isPresent()){
            Booking updatedBooking = data.get();
            updatedBooking.setBookingNumber(booking.getBookingNumber());
            updatedBooking.setNumberOfSeats(booking.getNumberOfSeats());
            updatedBooking.setShow(booking.getShow());
            bookingRepository.save(updatedBooking);
        }
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @GetMapping("/booking/{search}")
    public List<Booking> bookingSearch(@PathVariable String search){
        return bookingRepository.findBookingByBookingNumber(search);
    }
}
