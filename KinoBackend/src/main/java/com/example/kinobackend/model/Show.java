package com.example.kinobackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Setter
@Getter
@ToString

@Entity
public class Show {

    @Id
    @GeneratedValue
    private int showId;
    private String date;
    private String time;

    @ManyToOne
    @JoinColumn(name = "id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "theater_id")
    private Theater theater;

    @OneToMany
    @JoinColumn(name = "show_id")
    @JsonBackReference
    private Set<Booking> bookings = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Show show = (Show) o;
        return showId == show.showId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(showId);
    }
}
