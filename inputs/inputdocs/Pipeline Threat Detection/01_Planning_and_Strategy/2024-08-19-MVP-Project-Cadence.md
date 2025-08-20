---
title: "MVP Project Cadence"
date: 2024-08-19
aliases: [MVP Plan]
tags: [project/pipeline-threat-detection, type/permanent, domain/planning]
status: [draft]
moc: "[[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]"
---

# MVP Project Cadence

**Summary:** A proposed multi-stage plan for developing the Minimum Viable Product (MVP) for the pipeline threat detection system.

**Body:**
The project will follow a structured cadence to move from initial requirements to a pilot-ready system.

1.  **Kickoff:**
    *   Lock success criteria and business logic (objects to catch, boundaries, tolerances).
    *   Review camera, lens, and other hardware inputs.
2.  **Data & Labeling:**
    *   Acquire representative image frames.
    *   Label a short class list of target objects.
    *   Perform Quality Control (QC) and version the dataset.
    *   *Note: Dataset procurement is identified as the biggest initial challenge.*
3.  **Model v1:**
    *   Fine-tune a pretrained detector (e.g., YOLO family).
    *   Share simple, readable performance metrics.
4.  **Rules & Geofence:**
    *   Define a corridor buffer for the "trigger zone".
    *   Set dwell-time requirements for flagging objects.
    *   Establish per-object detection thresholds.
    *   Ensure all flagged objects are correlated with location data.
5.  **Operator UI & Alerts:**
    *   Develop a minimal application with image overlay and an alert table.
    *   Configure "hooks" for integration with the existing iPad monitoring app.
6.  **Pilots:**
    *   Validate the system on "unseen" training data.
    *   Scale to live sessions on aircraft.
7.  **(Optional) Edge Packaging:**
    *   Optimize the model for on-aircraft compute.
    *   Add logging and watchdog systems.

## Connections
*   [[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]
*   [[2024-08-19-Initial-Research-Tasks]]

## Open Questions
*   What is the tolerance for false alerts?
*   What are the specific objects we need to flag in the initial class list?
