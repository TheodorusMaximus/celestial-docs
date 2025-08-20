---
title: "Current State: User Stories (PRD)"
date: 2024-08-19
aliases: [As-Is User Stories, Existing PRD]
tags: [project/pipeline-threat-detection, type/permanent, domain/technical]
status: [draft]
moc: "[[2024-08-19-MOC-Current-State-Analysis]]"
---

# Current State: User Stories (PRD)

**Summary:** This document reverse-engineers a simple Product Requirements Document (PRD) from VanGuard's existing system by defining its functionality in the form of user stories. This is based on information from their public website.

**Body:**

This exercise helps clarify the core jobs-to-be-done that the current system accomplishes, providing a baseline for our new functionality.

## Epic: Automated Pipeline Leak Detection

*   **As an** operator, **I want to** load a pipeline map before my flight, **so that** the system knows the intended patrol route.
*   **As a** system, **I want to** use the aircraft's GPS and the pipeline map to automatically aim the sensor pod at the corridor, **so that** the operator is freed from constant manual control.
*   **As an** operator, **I want to** supervise the live video feed and data readouts while the system is in autotrack mode, **so that** I can maintain situational awareness.
*   **As an** operator, **I want to** be able to seamlessly take manual joystick control at any time, **so that** I can override automation to investigate specific points of interest.
*   **As a** pilot/operator, **I want to** monitor a live video feed, methane data, and a GPS map on a single iPad screen, **so that** I have complete situational awareness during my patrol.
*   **As a** pilot/operator, **I want to** use a joystick to precisely aim the methane sensor while looking at the video feed, **so that** I can ensure accurate scanning of the pipeline right-of-way.
*   **As a** sensor system, **I want to** correlate all methane readings with GPS coordinates in real-time, **so that** every piece of data is actionable.
*   **As an** operator, **I want to** receive an immediate and clear alert on my screen when a methane leak is detected, **so that** I can be instantly aware of a potential issue.
*   **As an** operator, **I want to** easily export the entire mission's data log as a KMZ file directly from my iPad, **so that** I can perform a simple and streamlined post-flight analysis in Google Earth.

## Key Learnings for CV Project
*   **Core Value Proposition:** The system's value is in providing **highly automated, real-time intelligence** with a simple workflow. The goal is to maximize the operator's effectiveness by reducing manual workload.
*   **Framing Our Addition:** Our CV system is a new layer of automated intelligence that runs in parallel to the methane detection.
    *   **New User Story Example:** "As an operator supervising an automated patrol, I want to be alerted to physical threats on the ground automatically, so that my attention is drawn to potential issues I might otherwise miss."
*   **Simplicity is Key:** The success of their current system appears to be its simplicity ("no complex post-flight analysis"). Our system must not betray this principle. Threat alerts should be clear, and the data export should be just as simple as the existing one.
