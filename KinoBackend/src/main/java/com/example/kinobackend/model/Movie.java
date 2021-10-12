package com.example.kinobackend.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

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

