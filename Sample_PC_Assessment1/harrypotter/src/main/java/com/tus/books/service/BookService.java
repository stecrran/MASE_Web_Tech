package com.tus.books.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tus.books.dao.BookRepository;
import com.tus.books.model.Book;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepo;
	
	public List<Book> searchBooksBySeries(String searchText){
		return bookRepo.findBySeriesContaining(searchText);
	}
}
