package com.example.kinobackend.repos;

import com.example.kinobackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findBookingByBookingNumber(String bookingNumber);
}
