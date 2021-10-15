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
public class Movie {
        @Id
        @GeneratedValue
        private int id;
        private String title;
        private String genre;
        private int ageLimit;
        private int movieDuration;
        private String artist;

        @OneToMany
        @JoinColumn(name = "id")
        @JsonBackReference
        private Set<Show> shows = new HashSet<>();

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (!(o instanceof Movie)) return false;
                Movie movie = (Movie) o;
                return id == movie.id;
        }

        @Override
        public int hashCode() {
                return Objects.hash(id);
        }
}

