package com.tus.books.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name="books")
public class Book {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    private String title;

    private String author;

    private String illustrated;

    private double rrp;
    
    private double online;
    
    private String image;
    
    @Column(name = "imagemodal")
    private String imageModal;

    private String series;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getIllustrated() {
		return illustrated;
	}

	public void setIllustrated(String illustrated) {
		this.illustrated = illustrated;
	}

	public double getRrp() {
		return rrp;
	}

	public void setRrp(double rrp) {
		this.rrp = rrp;
	}

	public double getOnline() {
		return online;
	}

	public void setOnline(double online) {
		this.online = online;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public String getImageModal() {
		return imageModal;
	}

	public void setImageModal(String imageModal) {
		this.imageModal = imageModal;
	}

	
}

