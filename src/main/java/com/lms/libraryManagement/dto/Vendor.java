package com.lms.libraryManagement.dto;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vid;
    private String name;

    @OneToMany(mappedBy = "vendor",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            targetEntity = VendorBook.class)
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonbTransient
    private Collection<VendorBook> vendorBooks = new ArrayList<VendorBook>();

    public Collection<VendorBook> getVendorBooks() {
        return vendorBooks;
    }

    public void setVendorBooks(Collection<VendorBook> vendorBooks) {
        this.vendorBooks = vendorBooks;
    }

    public int getVid() {
        return vid;
    }

    public void setVid(int vid) {
        this.vid = vid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
