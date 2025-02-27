package com.tus.books.controller;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.books.dao.BookRepository;
import com.tus.books.model.Book;


@RestController
@RequestMapping("/books")
public class BookController {

    private BookRepository bookRepo;
    
    @Autowired
    public void setWineRepo(BookRepository bookRepo) {
		this.bookRepo = bookRepo;
	}
    
    //or
    @GetMapping
    public ResponseEntity<List<Book>> getAllWines() {
        List<Book> books = (List<Book>) bookRepo.findAll();
        return ResponseEntity.ok(books); // Return 200 OK with the list of wines
    }

    // Get wine by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getWineById(@PathVariable int id) {
    	 Optional<Book> optionalWine = bookRepo.findById(id);
         if (optionalWine.isPresent()) {
             return ResponseEntity.ok(optionalWine.get());
         }
         return ResponseEntity.notFound().build();
    }

    @GetMapping("/search/{series}")
    public ResponseEntity<List<Book>> getBooksBySeries(@PathVariable String series) {
        List<Book> books = bookRepo.findBySeriesContaining(series);
        if (!books.isEmpty()) {
            return ResponseEntity.ok(books);
        }
        return ResponseEntity.notFound().build();
    }



	
}
