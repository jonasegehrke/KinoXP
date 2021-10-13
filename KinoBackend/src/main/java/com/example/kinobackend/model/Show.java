package com.example.kinobackend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

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
    private String theater;

    @ManyToOne
    @JoinColumn(name = "id")
    private Movie movie;

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
