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
public class Shift {

    @Id
    @GeneratedValue
    private int shiftId;
    private String date;
    private String time;
    private String employees;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shift schedule = (Shift) o;
        return shiftId == schedule.shiftId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(shiftId);
    }
}
