---
title: "Initial Research Tasks"
date: 2024-08-19
aliases: [Next Steps, Research Plan]
tags: [project/pipeline-threat-detection, type/permanent, domain/planning]
status: [idea]
moc: "[[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]"
---

# Initial Research Tasks

**Summary:** The immediate parallel workstreams to de-risk the project and establish feasibility for the MVP.

**Body:**

1.  **Hardware Feasibility:**
    *   **Goal:** Evaluate on-aircraft compute options capable of running a YOLOv10-class detector.
    *   **Actions:** Outline required tech specs, identify suitable hardware.
2.  **Dataset Plan:**
    *   **Goal:** Address the light in-house dataset by exploring three acquisition paths in parallel.
    *   **Actions:**
        *   **Buy:** Review and test a sample from an available annotated dataset. Follow up on pricing/procurement.
        *   **License:** Contact teams about licensing their models for local/on-plane use. Investigate cloud viability vs. real-time goals.
        *   **Augment:** Assess open-source aerial data to prime/fine-tune the model. Acknowledge challenges like seasonality. The initial focus is on the 80% solution.
3.  **KMZ Integration:**
    *   **Goal:** Ensure detections can be evaluated "near the line" from the start.
    *   **Actions:** Load the client's KMZ file, stand up early geofencing, and confirm that video data can be married to location data.

## Connections
*   [[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]
*   [[2024-08-19-MVP-Project-Cadence]]

## Open Questions
*   What is the pricing and sample availability for the purchasable dataset?
*   Are there existing models for license that fit the on-plane, real-time use case?
*   What is the specific format and update frequency of the location data from the existing leak detection system?
