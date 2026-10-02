package com.ecoserve.backend.repository;

import com.ecoserve.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}