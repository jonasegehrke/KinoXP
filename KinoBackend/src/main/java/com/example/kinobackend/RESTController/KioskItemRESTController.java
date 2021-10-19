package com.example.kinobackend.RESTController;

import com.example.kinobackend.model.KioskItem;
import com.example.kinobackend.repos.KioskItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class KioskItemRESTController {
    @Autowired
    KioskItemRepository kioskItemRepository;

    @GetMapping("/kiosk-items")
    public List<KioskItem> getAllKioskItems(){
        return kioskItemRepository.findAll();
    }

    @PostMapping(value = "/kiosk-item", consumes = "application/json")
    public ResponseEntity<KioskItem> addKioskItem(@RequestBody KioskItem kioskItem){
        kioskItemRepository.save(kioskItem);
        return new ResponseEntity<KioskItem>(kioskItem, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/kiosk-item/{id}")
    public ResponseEntity<KioskItem> deleteKioskItem(@PathVariable int id){
        kioskItemRepository.deleteById(id);
        return new ResponseEntity<KioskItem>(HttpStatus.OK);
    }

    @PutMapping(value = "/kiosk-item/update", consumes = "application/json")
    public ResponseEntity<KioskItem> updateKioskItem(@RequestBody KioskItem kioskItem){
        Optional<KioskItem> data = kioskItemRepository.findById(kioskItem.getId());
        if(data.isPresent()){
            KioskItem updateKioskItem  = data.get();
            updateKioskItem.setName(kioskItem.getName());
            updateKioskItem.setPrice(kioskItem.getPrice());
            kioskItemRepository.save(updateKioskItem);
        }
        return new ResponseEntity<>(kioskItem, HttpStatus.OK);
    }

}
