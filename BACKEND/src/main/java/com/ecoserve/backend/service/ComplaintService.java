package com.ecoserve.backend.service;

import com.ecoserve.backend.entity.Complaint;
import com.ecoserve.backend.repository.ComplaintRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }


    // ==========================================
    // CREATE COMPLAINT
    // ==========================================

    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }


    // ==========================================
    // GET ALL COMPLAINTS
    // ==========================================

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }


    // ==========================================
    // GET COMPLAINT BY ID
    // ==========================================

    public Complaint getComplaintById(Long id) {

        return complaintRepository
                .findById(id)
                .orElse(null);
    }


    // ==========================================
    // UPDATE COMPLAINT
    // ==========================================

    public Complaint updateComplaint(
            Long id,
            Complaint updatedComplaint) {

        Complaint existingComplaint =
                complaintRepository
                        .findById(id)
                        .orElse(null);


        if (existingComplaint == null) {
            return null;
        }


        // Update title only when provided
        if (updatedComplaint.getTitle() != null) {

            existingComplaint.setTitle(
                    updatedComplaint.getTitle()
            );
        }


        // Update description only when provided
        if (updatedComplaint.getDescription() != null) {

            existingComplaint.setDescription(
                    updatedComplaint.getDescription()
            );
        }


        // Update category only when provided
        if (updatedComplaint.getCategory() != null) {

            existingComplaint.setCategory(
                    updatedComplaint.getCategory()
            );
        }


        // Update location only when provided
        if (updatedComplaint.getLocation() != null) {

            existingComplaint.setLocation(
                    updatedComplaint.getLocation()
            );
        }


        // Update status only when provided
        if (updatedComplaint.getStatus() != null) {

            existingComplaint.setStatus(
                    updatedComplaint.getStatus()
            );
        }


        // Update email only when provided
        if (updatedComplaint.getEmail() != null) {

            existingComplaint.setEmail(
                    updatedComplaint.getEmail()
            );
        }


        // Update priority only when provided
        if (updatedComplaint.getPriority() != null) {

            existingComplaint.setPriority(
                    updatedComplaint.getPriority()
            );
        }


        return complaintRepository.save(
                existingComplaint
        );
    }
}