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
public class Theater {

    @Id
    @GeneratedValue
    private int theaterId;
    private boolean big;
    private int availableSeats;

    @OneToMany
    @JoinColumn(name = "show_id")
    @JsonBackReference
    private Set<Show> shows = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Theater theater = (Theater) o;
        return theaterId == theater.theaterId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(theaterId);
    }
}
