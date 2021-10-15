package com.example.kinobackend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

@Setter
@Getter
@ToString

@Entity
public class Booking {

    @Id
    @GeneratedValue
    private int bookingId;
    private String bookingNumber;
    private int numberOfSeats;
    private boolean paid;

    @ManyToOne
    @JoinColumn(name = "show_id")
    private Show show;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return bookingId == booking.bookingId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingId);
    }
}
