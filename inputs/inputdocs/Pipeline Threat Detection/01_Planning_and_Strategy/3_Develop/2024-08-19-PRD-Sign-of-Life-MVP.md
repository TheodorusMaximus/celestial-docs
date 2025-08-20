---
title: "PRD: Sign-of-Life MVP"
date: 2024-08-19
aliases: [MVP PRD, Sign-of-Life PRD]
tags: [project/pipeline-threat-detection, type/permanent, domain/product, phase/develop]
status: [published]
moc: "[[01_Planning_and_Strategy/2024-08-19-Project-Framework-Double-Diamond]]"
---

# PRD: "Sign-of-Life" MVP

## 1. Background & Problem Statement

### 1.1. Background
VanGuard Pipeline Inspection provides real-time, in-cockpit methane leak detection. Their key differentiator is providing immediate, actionable intelligence to their operators during flight. Our discovery process (`Current-State-Analysis` MOC) revealed that while their methane detection is highly automated, the detection of physical threats to the pipeline right-of-way (e.g., digging, exposed pipe) relies on a manual, fatiguing visual scan by the operator.

### 1.2. Problem Statement
For a **VanGuard Pipeline Inspection Operator**, who is tasked with monitoring hundreds of miles of pipeline corridor, there is a need to **automatically detect potential physical threats in real-time**.

This is critical because the current process is prone to human error. An automated "second pair of eyes" would reduce the operator's cognitive load, increase the probability of detecting the highest-priority threats, and amplify VanGuard's core value proposition.

## 2. Goals & Hypotheses

This "Sign-of-Life" MVP is not intended to be an operational product. It is a targeted scientific experiment designed to answer the most fundamental questions and de-risk the project with minimal effort.

### 2.1. Primary Goal
To prove that a real-time, standalone, edge-computed computer vision system can be built on commodity hardware and successfully detect a proxy for the highest-priority threat.

### 2.2. Core Hypotheses to Validate
This MVP is designed to test the following core hypotheses, as detailed in our `Define-Phase-Synthesis-Matrix.md`:

*   **Architectural Hypothesis:** A standard laptop with a discrete GPU is powerful enough to run a YOLO-class model on a live video feed at an acceptable frame rate.
*   **Model Hypothesis:** A general-purpose, pre-trained object detection model (YOLOv8 on COCO) can detect a `truck` with sufficient reliability to serve as a proxy for an `excavator`.
*   **System Hypothesis:** The entire processing pipeline—from video capture to model inference to visual output—can be executed on a single, self-contained machine with no internet connectivity.
*   **Proxy Validity Hypothesis:** Visual similarity between trucks and excavators is sufficient for truck detection to reliably identify excavators in real-world scenarios.
*   **Domain Transfer Hypothesis:** Models trained on ground-level imagery can effectively detect objects in aerial imagery without significant performance degradation.
*   **Dual Threat Coverage Hypothesis:** Detection of both vehicle-type threats (excavators) and linear features (exposed pipes) can be validated using available detection capabilities from COCO/DOTA-pretrained models.
*   **Operator Integration Hypothesis:** A feedback mechanism can capture the essential operator validation needed to measure Actionable Intelligence Rate in future operational deployments.

## 3. Scope & Feature Requirements

Clarity on what we are *not* building is as important as what we are.

### 3.1. IN SCOPE: Feature Requirements
The system will be a single Python script that executes the following logic:

| Feature ID | Requirement | Rationale / Decision Brief Ref. |
| :--- | :--- | :--- |
| `SOL-01` | **Laptop-Based System:** The entire application must run on a standard laptop. | The fastest path to proving the concept without hardware dependencies. (Brief #3) |
| `SOL-02` | **Webcam Video Input:** The system will use a standard USB webcam as its video source. | Simulates a live video feed without requiring aircraft integration. |
| `SOL-03` | **Pre-trained YOLOv8 Model:** The system will use the standard, off-the-shelf `yolov8n.pt` model from the `ultralytics` library. | De-risks the project by deferring custom data collection and training. (Brief #1) |
| `SOL-04` | **Proxy Class Detection:** The script will be configured to *only* detect and process the `truck` class (COCO Class ID: 7). | The core of our "Proxy Class Strategy" to validate the system against a stand-in for the #1 threat. (Brief #1) |
| `SOL-05` | **OpenCV Window Display:** The system will display the live webcam feed in a simple OpenCV window. | The most primitive way to visualize the system's output. (From Synthesis Matrix) |
| `SOL-06` | **Bounding Box Overlay:** When a `truck` is detected above a set confidence, a rectangle will be drawn around it on the video display. | The minimal UI to communicate a "hit" and prove the system is working. (From Synthesis Matrix) |
| `SOL-07` | **Configurable Confidence Threshold:** A single variable at the top of the script will control the minimum confidence score for a detection to be displayed. | Allows for easy tuning of system sensitivity to manage false positives. (From Synthesis Matrix) |
| `SOL-08` | **Performance Logging:** The script will print the inference time (in ms or FPS) for each frame to the console. | Establishes the critical performance baseline needed for Phase 2 hardware selection. (Brief #3) |
| `SOL-09` | **Offline Execution:** The script must be fully functional with all network interfaces disabled. | Validates the core "edge compute" hypothesis. (From Synthesis Matrix) |
| `SOL-10` | **Excavator Proxy Validation:** The system must be tested against 10+ excavator images/videos to validate the truck-as-excavator proxy hypothesis. | Critical validation that truck detection can reliably identify excavators, addressing the core business assumption underlying the proxy strategy. (Audit Finding #1) |
| `SOL-11` | **Feedback Simulation Mechanism:** Include a mechanism to log simulated operator feedback (Confirm/Dismiss) for each detection event. | Establishes foundation for measuring 85% Actionable Intelligence Rate and bridges MVP to operational success criteria. (Audit Finding #2) |
| `SOL-12` | **Secondary Threat Class Detection:** Configure system to detect visible linear infrastructure objects (pipes, cables) using available detection capabilities. | Validates detection approach for exposed pipe threats using available model classes. Based on DOTA dataset research showing linear feature detection capabilities. (Audit Finding #3) |
| `SOL-13` | **Aerial Domain Transfer Test:** Demonstrate detection performance on 5+ aerial imagery samples to validate domain transfer from ground-level to aerial perspective. | De-risks the biggest project assumption: that ground-trained models work on aerial imagery. (Audit Finding #4) |
| `SOL-14` | **Structured Detection Output:** Format all detection events as JSON with timestamp, confidence, bounding box coordinates for future GPS integration. | Creates integration pathway for Phase 2 geospatial features without architectural rework. (Audit Finding #5) |

### 3.2. OUT OF SCOPE
*   **No custom model training or data labeling.**
*   **No detection of classes beyond available COCO/DOTA-pretrained capabilities.**
*   **No integration with VanGuard's iPad app or other hardware.**
*   **No user interface beyond the basic OpenCV window and feedback simulation.**
*   **No audio alerts or notifications.**
*   **No persistent data storage beyond structured logging for analysis.**
*   **No geofencing or GPS coordinate integration.** (This is the primary goal of the Phase 2 / Operational MVP).

## 4. Technical Specifications

As per our `Project-Decision-Log-and-Strategy.md`, the technical stack is explicitly defined to maximize velocity.

*   **Hardware:** A modern laptop with a discrete NVIDIA GPU.
*   **Language:** Python 3.9+
*   **Core Libraries:**
    *   `ultralytics`: For the YOLOv8 model.
    *   `opencv-python`: For video capture and display.
*   **Deliverable:** A single, well-commented Python script and a `requirements.txt` file.

## 5. Success Metrics

Success for this enhanced "Sign-of-Life" MVP combines technical functionality with business validation foundations.

### 5.1. Technical Success Metrics (Binary)
*   **Primary Technical Metric:** The system successfully runs and displays a live video feed with bounding boxes drawn around detected `trucks` and `bicycles`.
*   **Performance Baseline Metric:** Console output logs consistent inference speed (>10 FPS) providing Phase 2 hardware selection data.
*   **Offline Validation Metric:** System operates fully without network connectivity.

### 5.2. Business Validation Metrics (Foundational)
*   **Proxy Validation Metric:** System demonstrates ≥70% detection rate on excavator test imagery using truck class detection.
*   **Domain Transfer Metric:** System maintains ≥50% detection performance on aerial imagery samples compared to ground-level performance.
*   **Dual Threat Coverage Metric:** System detects both vehicle-type objects (trucks) and linear features (bicycles) in test scenarios.
*   **Feedback Foundation Metric:** Structured logging captures all detection events with simulated operator feedback for future AIR measurement.

## 6. MVP Scoping Methodology & Decision Architecture

### 6.1. How the Enhanced MVP Was Scoped

The enhanced MVP follows a **"Minimum Viable Validation"** philosophy that balances rapid development with comprehensive risk mitigation. The scoping was driven by the intersection of three critical frameworks:

**A. Risk-Driven Prioritization** (from `Core-Hypotheses-Decomposition.md`):
- **Data Acquisition Risk:** Addressed by SOL-10 (proxy validation) and SOL-13 (domain transfer)
- **Technical Feasibility Risk:** Addressed by SOL-01 through SOL-09 (original scope)
- **Business Value Risk:** Addressed by SOL-11 (feedback mechanism) and SOL-12 (dual threat coverage)

**B. Atomic Decision Points** (from `Define-Phase-Synthesis-Matrix.md`):
Each requirement represents the smallest possible experiment that yields maximum strategic information:
- SOL-10: Tests the fundamental assumption underlying the entire proxy strategy
- SOL-11: Establishes the measurement infrastructure for operational success
- SOL-12: Validates that the approach scales to multiple threat types
- SOL-13: De-risks the most critical domain gap (ground→aerial)
- SOL-14: Prevents architectural technical debt in Phase 2

**C. Scalability Foundation** (from `Success-Criteria-MVP.md`):
Each new requirement creates a foundation for Phase 2 scaling rather than throwaway validation:
- Feedback mechanism → 85% Actionable Intelligence Rate measurement
- Structured output → GPS/KMZ integration pathway
- Dual class detection → Multi-threat operational system
- Domain testing → Aerial dataset strategy validation

### 6.2. Key Questions Answered by Enhanced MVP

The enhanced MVP transforms from a pure technical proof-of-concept into a **business-technical validation bridge** that answers:

**Strategic Questions:**
1. **Proxy Viability** (SOL-10): "Can truck detection reliably identify excavators?" 
   - *Scales to*: Custom model training strategy and data requirements
2. **Market Validation** (SOL-11): "Can we measure operator value systematically?"
   - *Scales to*: 85% AIR measurement and product-market fit validation
3. **Threat Coverage** (SOL-12): "Does the approach work for multiple threat types?"
   - *Scales to*: Comprehensive pipeline threat detection system

**Technical Questions:**
4. **Domain Transfer** (SOL-13): "Do ground-trained models work on aerial imagery?"
   - *Scales to*: Dataset acquisition strategy and model architecture decisions
5. **Integration Architecture** (SOL-14): "Can we build Phase 2 on Phase 1 foundations?"
   - *Scales to*: Production system architecture and VanGuard integration

### 6.3. Atomic Decision Hierarchy & Scaling Logic

Each requirement was designed to be the **smallest possible experiment** that unlocks the next tier of development:

**Tier 1: Technical Viability** (SOL-01 to SOL-09)
- *Decision*: Can real-time CV run on edge hardware?
- *Scales to*: NVIDIA Jetson hardware selection and performance optimization

**Tier 2: Business Model Validation** (SOL-10, SOL-11)
- *Decision*: Does the core business hypothesis hold?
- *Scales to*: Product development and operator training programs

**Tier 3: Market Expansion** (SOL-12, SOL-13)
- *Decision*: Can the approach scale to comprehensive threat detection?
- *Scales to*: Market sizing and competitive differentiation strategy

**Tier 4: Integration Readiness** (SOL-14)
- *Decision*: Can Phase 2 build on Phase 1 without rework?
- *Scales to*: VanGuard partnership terms and technical integration timeline

### 6.4. Requirement Interconnectedness & Validation Logic

The requirements form an integrated validation network rather than isolated tests:

```
SOL-10 (Proxy Test) ←→ SOL-13 (Domain Test)
    ↓                      ↓
SOL-11 (Feedback) ←→ SOL-12 (Dual Threats)
    ↓                      ↓
    SOL-14 (Integration Foundation)
```

**Validation Dependencies:**
- SOL-10 success enables SOL-12 (if truck→excavator works, bicycle→pipe likely works)
- SOL-11 + SOL-12 together provide comprehensive AIR measurement foundation
- SOL-13 validates that SOL-10 results transfer to operational environment
- SOL-14 ensures all validation data scales to production system

**Failure Mode Analysis:**
- If SOL-10 fails: Pivot to custom dataset strategy immediately (reduces 6-month risk)
- If SOL-13 fails: Focus on aerial-specific training data (AIDCON dataset prioritization)
- If SOL-11 fails: Operator interface design requires fundamental rethinking
- If SOL-12 fails: Scope Phase 2 to vehicle threats only (reduces complexity)

This architecture ensures that every hour spent on the MVP generates maximum strategic value for Phase 2 decision-making while maintaining the rapid development velocity essential for early-stage validation.

## 7. Research Foundation & Competitive Reality

### 7.1. SOTA Model Integration (from `Academic-Research-Review.md`)

**YOLOv8 Selection Validated by Research:**
- ACM paper demonstrates 93.8% mAP@0.5 for vehicle detection in aerial imagery using YOLOv5s 
- Inference speed >60 FPS on NVIDIA RTX 3090, confirming real-time viability
- Single-stage detectors (YOLO family) identified as dominant choice for real-time aerial applications

**Available Model Resources:**
- Hugging Face model `Ashegh-Sad-Warrior/yolo_aerial_detection_` provides direct proof-of-concept for aerial YOLO fine-tuning
- Road segmentation models (`phungtienthanh2004/Road-Segmentation-for-Aerial-Image`) demonstrate aerial linear feature detection capability

### 7.2. Dataset Strategy Grounded in Research (from `SOTA-CV-Models.md` & `Academic-Research-Review.md`)

**COCO Dataset Reality:**
- Class 7: truck (confirmed available for excavator proxy)
- NO excavator, construction equipment, or exposed pipe classes in standard COCO 80 classes
- Truck→excavator proxy strategy is necessary, not optional

**DOTA Dataset Foundation:**
- 15 classes including "large-vehicle" and "small-vehicle" containing construction equipment examples
- 0.1-1m per pixel resolution (matches VanGuard operational range)
- Oriented bounding boxes (OBB) better for vehicle detection from aerial perspective
- Identified as "foundational element" for Phase 2 modeling strategy

**Alternative Dataset Options (from web research):**
- AIDCON dataset: 9,563 construction machines across 9 categories including excavators
- xView dataset: 60 classes including excavator, construction site, engineering vehicle
- Directly addresses identified "biggest project risk: data acquisition"

### 7.3. Competitive Validation (from `Competitive-Landscape.md` & web research)

**Overwatch Imaging Benchmark:**
- Real-time edge processing with AI-powered sensors (proven commercial viability)
- 115,000 nm²/hour coverage from 40,000 feet at 400 knots
- Automated Sensor Operator (ASO) software with low-SWaP GPU requirements
- Primary focus: maritime/border security (market differentiation opportunity for pipeline corridors)

**Market Reality:**
- Most competitors focus on post-flight analysis (DNV/Raptor, FlyScan)
- Real-time on-board AI represents significant competitive advantage
- $2.5B drone pipeline inspection market growing at 23.24% CAGR validates opportunity

### 7.4. Technical Architecture Validation

**Edge Computing Precedent:**
- VanGuard's existing autotrack system uses computer vision pipeline following (Canny edge detection + Hough Transform)
- Falcon pod already contains vibration-isolated camera system with motorized control
- iPad interface demonstrates successful real-time operator integration

**Performance Baselines from Research:**
- Academic standard: >10 FPS for real-time classification
- Industry benchmark: 93.8% mAP@0.5 for vehicle detection achievable with proper training data
- Commercial proof: Overwatch systems achieve wide-area automated detection operationally

### 7.5. Risk Mitigation Based on Research

**Data Acquisition Risk:**
- DOTA pre-training reduces custom labeling requirements (primary mitigation)
- AIDCON dataset provides excavator-specific training data if proxy strategy fails
- Academic research confirms dataset curation is "single greatest challenge"

**Domain Transfer Risk:**
- Multiple academic papers validate aerial CV success with proper training data
- Available aerial-specific models on Hugging Face demonstrate feasibility
- DOTA dataset specifically designed for aerial domain challenges

**Technical Performance Risk:**
- 93.8% mAP benchmark from peer-reviewed research provides concrete target
- >60 FPS performance demonstrated on comparable hardware
- YOLO architecture validated as industry standard by comprehensive survey research

This research foundation ensures the MVP tests validated assumptions rather than untested hypotheses, significantly reducing Phase 2 risk while maintaining rapid development velocity.
