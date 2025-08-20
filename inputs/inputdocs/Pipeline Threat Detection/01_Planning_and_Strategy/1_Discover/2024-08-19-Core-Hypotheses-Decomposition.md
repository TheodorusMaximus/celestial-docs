---
title: "Core Hypotheses Decomposition"
date: 2024-08-19
aliases: [Project Hypotheses, Decomposition Tree]
tags: [project/pipeline-threat-detection, type/permanent, domain/strategy, phase/discover]
status: [draft]
moc: "[[01_Planning_and_Strategy/2024-08-19-Project-Framework-Double-Diamond]]"
---

# Core Hypotheses Decomposition

**Summary:** This document breaks down the project's foundational assumptions into a tree of testable hypotheses. It serves as a roadmap for our discovery and validation efforts, ensuring we address the biggest risks and uncertainties first.

**Body:**

This decomposition follows the "Build the Right Thing" / "Build the Thing Right" model.

### **Level 0: The Core Belief**

*   **Hypothesis:** Adding a real-time, on-board computer vision system to VanGuard's existing platform will provide a significant, valuable, and usable enhancement to their pipeline surveillance operations by proactively detecting physical threats.

---

### **Level 1: "Build the Right Thing" (Problem/Value Hypotheses)**

*These hypotheses test whether we are solving a real and valuable problem for the user.*

*   **1.1 Value Hypothesis:**
    *   **Statement:** The proactive detection of our chosen threat classes (`excavator` and `exposed_pipe`) provides a sufficient leap in safety and risk reduction to justify the investment in this project.
    *   **Validation:** Requires direct confirmation from VanGuard leadership. Does this align with their strategic priorities and risk assessment?

*   **1.2 User Hypothesis:**
    *   **Statement:** The automated CV alerts can be integrated into the operator's supervisory workflow in a way that enhances their situational awareness without causing distraction or increasing cognitive load.
    *   **Validation:** Requires user interviews and workflow analysis. Our proposed UI/UX must be validated against their actual in-flight experience.

*   **1.3 Usability Hypothesis:**
    *   **Statement:** An operator, upon receiving a CV alert, will have sufficient information (e.g., a bounding box on the video, a threat category) to immediately assess the situation and decide on a course of action (e.g., log the event, take manual control to investigate).
    *   **Validation:** Requires user feedback on proposed UI mockups and prototypes.

---

### **Level 2: "Build the Thing Right" (Solution/Feasibility Hypotheses)**

*These hypotheses test whether we are capable of building a robust and effective solution.*

*   **2.1 Technical Feasibility Hypothesis:**
    *   **Statement:** It is technically possible to deploy a **standalone, real-time CV system** on VanGuard's aircraft.
    *   **Sub-Hypotheses (must all be true):**
        *   **2.1.1 Video Access:** We can acquire a stable video stream from **our own dedicated, high-quality camera.** (Significantly de-risked).
        *   **2.1.2 On-board Compute:** A GPU-enabled SFF computer (e.g., NVIDIA Jetson) provides a viable platform for our standalone MVP. (Remains a key hypothesis to test).
        *   **2.1.3 Power & Space:** There is sufficient power (ideally from a dedicated battery), physical space, and cooling to support our standalone hardware. (This is now a primary physical, rather than electrical, integration question).

*   **2.2 Data Acquisition Hypothesis:**
    *   **Statement:** We can acquire a dataset of sufficient size, quality, and relevance to train a model that can meet our performance targets within the project's timeframe and budget.
    *   **Validation:** Requires executing the "buy, license, augment" strategy and evaluating the resulting dataset against a pre-defined quality rubric (e.g., number of images, class balance, image quality, annotation accuracy).

*   **2.3 Modeling Process Hypothesis:**
    *   **Statement:** We have access to the necessary tools, expertise, and computational resources to efficiently train, fine-tune, and package a YOLO-class model for on-board deployment.
    *   **Validation:** Requires a successful training run on a sample dataset that produces a functional model. This includes quantifying the time and cloud computing costs required.

*   **2.4 Model Performance & Generalization Hypothesis:**
    *   **Statement:** A single, fine-tuned object detection model can achieve our target 85% Actionable Intelligence Rate across the diverse environmental conditions (seasons, lighting, geography) of VanGuard's operational areas.
    *   **Validation:** Requires rigorous testing of the trained model against validation datasets that specifically include these diverse conditions. May require collecting geographically and seasonally varied data.

*   **2.5 Integration Hypothesis (Post-MVP):**
    *   **Statement:** (Post-MVP) It is possible to integrate the outputs of our standalone system with the existing iPad application.
    *   **Validation:** Requires future technical discovery with the VanGuard team. **This is not a requirement for the initial MVP.**
