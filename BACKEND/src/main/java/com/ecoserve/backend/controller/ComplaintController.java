package com.ecoserve.backend.controller;

import com.ecoserve.backend.entity.Complaint;
import com.ecoserve.backend.service.ComplaintService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {


    private final ComplaintService complaintService;


    public ComplaintController(
            ComplaintService complaintService) {

        this.complaintService =
                complaintService;
    }


    // ==========================================
    // CREATE COMPLAINT
    // ==========================================

    @PostMapping
    public Complaint createComplaint(
            @RequestBody Complaint complaint) {

        return complaintService
                .createComplaint(complaint);
    }


    // ==========================================
    // GET ALL COMPLAINTS
    // ==========================================

    @GetMapping
    public List<Complaint> getAllComplaints() {

        return complaintService
                .getAllComplaints();
    }


    // ==========================================
    // GET ONE COMPLAINT
    // ==========================================

    @GetMapping("/{id}")
    public Complaint getComplaintById(
            @PathVariable Long id) {

        return complaintService
                .getComplaintById(id);
    }


    // ==========================================
    // UPDATE COMPLAINT
    // ==========================================

    @PutMapping("/{id}")
    public Complaint updateComplaint(
            @PathVariable Long id,
            @RequestBody Complaint complaint) {

        return complaintService
                .updateComplaint(
                        id,
                        complaint
                );
    }
}