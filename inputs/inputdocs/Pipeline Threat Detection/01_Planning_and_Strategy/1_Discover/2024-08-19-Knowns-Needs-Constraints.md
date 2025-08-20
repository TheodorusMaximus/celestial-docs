---
title: "Knowns, Needs, and Constraints"
date: 2024-08-19
aliases: [Project Constraints, Givens]
tags: [project/pipeline-threat-detection, type/permanent, domain/strategy, phase/discover]
status: [published]
moc: "[[01_Planning_and_Strategy/2024-08-19-Project-Framework-Double-Diamond]]"
---

# Knowns, Needs, and Constraints

**Summary:** This document serves as a central repository for the foundational facts, user needs, and technical constraints of the project. It is a living document that will be updated as we learn more.

**Body:**

### Technical Needs & Constraints
*   The system must perform all processing on an **edge device** with no reliance on cloud connectivity.
*   The Phase 2 / production system must be deployable on a **rugged, embedded computer** (e.g., NVIDIA Jetson).
*   The Phase 2 / production system must be able to process a high-resolution video feed from a **Sony ILX-LR1 camera** with a **Sony FE 24-70mm lens**.
*   For the Phase 1 MVP, the system must be a **standalone hardware/software package** (laptop, webcam) to minimize integration risk.

*   **Platform:** The system must be deployed on Cessna (172, 182, 206) and helicopter airframes.
*   **Hardware Environment:**
    *   The system must integrate with the existing Falcon-series sensor pod.
    *   The pod is a sensitive, vibration-isolated, motorized mechanical system. Physical additions are a significant engineering challenge.
    *   There is an existing, downward-facing, coaxial video camera whose feed is the primary target for our system.
*   **Compute Environment:**
    *   All processing must happen on-board the aircraft ("at the edge").
    *   **The MVP will use its own dedicated, GPU-enabled computer.** The existing Raspberry Pi is not a constraint.
    *   The MVP system should ideally have its own **independent power source.**
*   **Software Environment:**
    *   The primary user interface for the MVP will be a simple display connected to our dedicated computer, **not** an integration with the existing iPad app. This is a key de-risking decision.

### 2. User (Operator) Needs & Knowns

*   **Primary Task:** The operator's role is to supervise the automated "autotrack" system.
*   **Cognitive Load:** The operator's focus is lower during routine patrol but becomes very high when they take manual control to investigate an alert (either methane or a future CV alert).
*   **Core Need:** The system must provide a clear, unambiguous signal without causing unnecessary distraction. It must enhance, not hinder, the operator's supervisory role.
*   **Mental Model:** Operators are used to seeing data (video, GPS, sensor readings) integrated on a single screen and reviewing geospatial data in Google Earth post-flight.

### 3. Business Constraints & Knowns

*   **Certification:** All on-board hardware and software will be subject to FAA/EASA certification. This process is long, rigorous, and a major project dependency.
*   **Value Proposition:** The core value of the existing system is providing real-time, automated intelligence with a simple workflow. Our addition must align with this "simplicity first" principle.

## Connections
*   This document synthesizes findings from our [[03_Technical_Deep_Dive/2024-08-19-MOC-Current-State-Analysis]].
