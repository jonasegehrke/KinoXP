package com.example.kinobackend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;


@Setter
@Getter
@ToString

@Entity
public class KioskItem {

    @Id
    @GeneratedValue
    private int id;
    private int price;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof KioskItem)) return false;
        KioskItem kioskItem = (KioskItem) o;
        return id == kioskItem.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
