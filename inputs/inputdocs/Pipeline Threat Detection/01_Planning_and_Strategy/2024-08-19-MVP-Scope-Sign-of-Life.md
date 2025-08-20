---
title: "MVP Scope: The 'Sign-of-Life' Test"
date: 2024-08-19
aliases: [Tracer Bullet MVP, Quickest MVP]
tags: [project/pipeline-threat-detection, type/permanent, domain/strategy, domain/planning]
status: [draft]
moc: "[[00_Project_Hub/2024-08-19-MOC-Pipeline-Threat-Detection-Project]]"
---

# MVP Scope: The "Sign-of-Life" Test

**Summary:** This document defines the scope for a minimal, rapid-development MVP. Its goal is not operational reliability, but to serve as a technical feasibility demonstration to de-risk the project's core assumptions.

**Body:**

The purpose of this MVP is to be the quickest possible "sign of life." It is designed to answer the most critical technical questions with the minimum possible investment of time and resources.

### Core Objective

To prove that we can successfully access the pod's live video feed, process it on an on-board computer, run a real-time object detection model, and display the results during flight.

### "Sign-of-Life" MVP Components

1.  **Hardware:**
    *   **Scope:** A non-permanent, high-performance laptop or Small Form-Factor (SFF) PC secured in the aircraft cabin.
    *   **Defer:** Selection, procurement, and certification of permanent on-aircraft compute hardware.

2.  **Model & Dataset:**
    *   **Scope:** A standard, pre-trained YOLO object detection model (e.g., trained on COCO).
    *   **Defer:** All custom dataset acquisition (buy, license, augment) and model fine-tuning.

3.  **Software & Rules:**
    *   **Scope:** A simple script to ingest the video stream and run the model. The only rule is to draw a bounding box for any detected object above a basic confidence threshold.
    *   **Defer:** Geofencing, dwell-time, custom alert logic, and KMZ/CSV export.

4.  **User Interface:**
    *   **Scope:** A basic display window on the test computer showing the video feed with rendered bounding boxes.
    *   **Defer:** Integration with the production iPad application.

### Success Criterion

The success of this MVP is binary and absolute:

> **Success is the capture of a screen recording from the on-board computer during flight that clearly shows the live video feed with rendered bounding boxes correctly identifying one or more ground objects (e.g., a vehicle or person).**

Achieving this milestone provides the foundational confidence needed to proceed with the more operationally-focused MVP defined in the `[[01_Planning_and_Strategy/2024-08-19-Success-Criteria-MVP]]` document.

## Connections
*   This is a precursor to the main MVP defined in [[01_Planning_and_Strategy/2024-08-19-Success-Criteria-MVP]].
*   It directly informs the [[03_Technical_Deep_Dive/2024-08-19-MOC-Current-State-Analysis]] by forcing the discovery of the video feed access method.
