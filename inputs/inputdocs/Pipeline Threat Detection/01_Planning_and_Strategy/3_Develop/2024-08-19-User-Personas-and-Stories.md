---
title: "User Personas & Stories"
date: 2024-08-19
aliases: [Personas, User Stories]
tags: [project/pipeline-threat-detection, type/permanent, domain/product, phase/develop]
status: [published]
moc: "[[01_Planning_and_Strategy/3_Develop/2024-08-19-PRD-Sign-of-Life-MVP]]"
---

# User Personas & User Stories

**Summary:** This document establishes a deep, empathetic understanding of our primary user. It contains a detailed persona to guide our design and development decisions, ensuring we are building a solution that addresses real-world needs and pain points. It also translates the "Sign-of-Life" MVP's technical requirements into formal user stories.

**Body:**

---

## 1.0 Primary Persona: Alex "Eagle Eye" Rivera

| | |
| :--- | :--- |
| **Role** | Pipeline Surveillance Operator |
| **Age** | 38 |
| **Experience** | 6 years as a commercial drone pilot (infrastructure inspection), 3 years with VanGuard. FAA Part 107 certified. |
| **Quote** | *"My job is to find the needle in a thousand haystacks. The tech helps, but at the end of the day, it's on my eyes. I can't afford to miss anything."* |

### 1.1. Background & Demographics
Alex is a highly skilled professional, meticulous and detail-oriented by nature. Before joining VanGuard, Alex flew drones for cell tower and power line inspections, a job that honed an ability to spot small anomalies in complex environments from an aerial perspective. Alex is tech-savvy and comfortable operating the sophisticated sensor pod and iPad interface in the cockpit, but is not a software developer. Alex views technology as a tool to enhance professional capabilities, but is skeptical of anything that feels like a gimmick or adds unnecessary complexity to a mission-critical workflow. Alex lives a quiet life and values precision, reliability, and efficiency in all things.

### 1.2. The Work Environment
Alex's "office" is the co-pilot seat of a small aircraft, often for 3-5 hours at a time. The environment is noisy and subject to constant vibration, as detailed in our `Patent-Analysis`. The primary interface is the existing VanGuard iPad app, which is used to monitor the Optical Gas Imaging (OGI) sensor for methane leaks. The new "autotrack" feature has been a welcome addition, as it automates the task of keeping the camera aimed at the pipeline, freeing up mental bandwidth.

### 1.3. Goals & Motivations
*   **Primary Goal:** To successfully complete a pipeline survey with **zero missed methane leaks**. This is the core job-to-be-done and the primary measure of success.
*   **Secondary Goal:** To identify, document, and report any observable physical threats to the pipeline right-of-way, such as construction activity or erosion.
*   **Implicit Goal:** To maintain a high degree of confidence and reduce the anxiety that comes with the "fear of missing something." The responsibility is immense, and any tool that increases certainty is highly valued.
*   **Efficiency Goal:** To complete surveys efficiently and without unnecessary distractions or technical glitches that require deviation from the primary mission.

### 1.4. Frustrations & Pain Points
*   **Cognitive Fatigue:** As we identified in our `Project-Decision-Log-and-Strategy`, Alex's biggest pain point (after the core mission of finding leaks) is the **continuous, fatiguing visual scan** required to spot physical threats. Staring intently at a video feed of the ground for hours is mentally draining.
*   **The "Glance" Problem:** The need to monitor the OGI sensor data means Alex's eyes are often diverted from the visual feed. A threat might only be visible for a few seconds while Alex is looking at the other screen.
*   **Distrust of "Noisy" Systems:** From past experience with other technologies, Alex has a low tolerance for systems that generate a high rate of false positives. A tool that "cries wolf" is worse than no tool at all, as it adds to the cognitive load instead of reducing it. This directly informs our "Actionable Intelligence Rate" success metric from `Success-Criteria-MVP.md`.

---

## 2.0 "Sign-of-Life" MVP User Stories

These user stories translate the technical requirements from our PRD into a user-centric format. Note that for this internal-facing MVP, some stories are from the perspective of the "Consultant" (us) who is building and demonstrating the proof-of-concept.

| ID | User Story | Acceptance Criteria |
| :--- | :--- | :--- |
| **C-01** | As a **Consultant**, I want to **run the entire detection system on my laptop**, so that I can **rapidly develop and demonstrate the core technology without requiring aircraft access.** | 1. The application starts and runs from a single Python script. <br> 2. All dependencies are managed in a `requirements.txt` file. |
| **C-02** | As a **Consultant**, I want to **use a standard USB webcam as the video input**, so that I can **easily simulate a live video feed for testing and demonstration.** | 1. The script successfully initializes the default system webcam. <br> 2. The video from the webcam is displayed on screen. |
| **A-01** | As **Alex the Operator**, I want to **see a visual box drawn in real-time around potential construction vehicles**, so that **my attention is automatically drawn to high-priority threats.** | 1. The system uses a pre-trained YOLOv8 model. <br> 2. The model is configured to detect the `truck` class as a proxy. <br> 3. A colored rectangle is drawn on the video feed around any detected `truck`. |
| **A-02** | As **Alex the Operator**, I want to **view the system's output on a simple, unobstructed screen**, so that I can **quickly and clearly see what the system is detecting.** | 1. The script opens a single OpenCV window. <br> 2. The window displays the live video feed from the webcam. |
| **C-03** | As a **Consultant**, I want to **easily adjust the system's detection sensitivity**, so that I can **tune the demo to effectively show detections while minimizing obvious false positives.** | 1. A `CONFIDENCE_THRESHOLD` variable is present at the top of the script. <br> 2. Only detections with a score above this threshold are displayed. |
| **C-04** | As a **Consultant**, I want to **measure the system's processing speed on my hardware**, so that I can **capture a performance baseline to make an evidence-based recommendation for Phase 2 hardware.** | 1. The script calculates the time taken for model inference on each frame. <br> 2. The inference time or FPS is printed to the console for each frame processed. |
| **C-05** | As a **Consultant**, I want to **prove the system works entirely offline**, so that I can **validate the core hypothesis of a self-contained, edge-compute solution.** | 1. The script is tested and confirmed to be fully functional with all the laptop's network interfaces (Wi-Fi, Ethernet) disabled. |
| **C-06** | As a **Consultant**, I want to **validate that truck detection can identify excavators**, so that I can **prove the proxy strategy underlying the entire business model.** | 1. System tested against 10+ excavator images/videos. <br> 2. Achieves ≥70% detection rate on excavator imagery using truck class. <br> 3. False negative analysis documented for proxy strategy refinement. |
| **C-07** | As a **Consultant**, I want to **test detection performance on aerial imagery**, so that I can **validate domain transfer from ground-level training data.** | 1. System tested on 5+ aerial imagery samples containing vehicles. <br> 2. Performance comparison between ground-level and aerial detection documented. <br> 3. Maintains ≥50% detection performance on aerial vs ground imagery. |
| **A-03** | As **Alex the Operator**, I want to **provide feedback on detection accuracy**, so that I can **help calibrate the system for operational reliability.** | 1. Simple keyboard interface for Confirm (C) / Dismiss (D) feedback. <br> 2. Feedback logged with detection event for analysis. <br> 3. Running accuracy statistics displayed during session. |
| **A-04** | As **Alex the Operator**, I want to **see detection of both equipment and infrastructure threats**, so that I can **evaluate the system's coverage of critical pipeline threats.** | 1. System demonstrates detection capabilities for both vehicle-type threats (trucks as excavator proxy) and linear infrastructure objects. <br> 2. Different colored bounding boxes for different threat categories. <br> 3. Class label displayed with each detection. |
| **C-08** | As a **Consultant**, I want to **generate structured detection logs**, so that I can **analyze performance and prepare for Phase 2 GPS integration.** | 1. All detections saved as JSON with timestamp, coordinates, confidence. <br> 2. Log includes operator feedback for each detection event. <br> 3. Session summary statistics generated automatically. |
