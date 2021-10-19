package com.example.kinobackend.repos;

import com.example.kinobackend.model.KioskItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KioskItemRepository extends JpaRepository<KioskItem, Integer> {
}
