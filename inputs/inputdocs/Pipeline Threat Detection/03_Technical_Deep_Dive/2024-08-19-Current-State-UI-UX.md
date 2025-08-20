---
title: "Current State: UI/UX"
date: 2024-08-19
aliases: [As-Is UI/UX, Operator Workflow]
tags: [project/pipeline-threat-detection, type/permanent, domain/technical]
status: [draft]
moc: "[[2024-08-19-MOC-Current-State-Analysis]]"
---

# Current State: UI/UX (User Interface / User Experience)

**Summary:** This document describes how operators (pilots, sensor operators) interact with the current system during a typical mission, based on website descriptions.

**Body:**

The user experience is centered around an iPad application designed for simplicity and real-time decision-making.

## Operator App Interface
The iPad app serves as the command center and simultaneously displays three key pieces of information:
1.  **Live Video Feed:** A clear view of the pipeline right-of-way from the pod's downward-facing camera.
2.  **Live Methane Readings:** Real-time Parts Per Million (PPM) data.
3.  **Live GPS Map:** Accurate tracking and recording of the aircraft's position and the detection area.

## Operator Workflow
1.  **Pre-Flight:**
    *   Likely involves loading mission data, including the **pipeline coordinate file (KMZ) that enables the autotrack feature.**
2.  **In-Flight (Normal Operations):**
    *   The operator **engages the "autotrack" mode**. The system automatically keeps the camera aimed at the pipeline corridor.
    *   The operator's primary task shifts from continuous manual aiming to **supervising the system**. They monitor the video feed and data readouts.
    *   The joystick is likely used for making minor corrections or temporarily taking manual control to inspect something off the direct pipeline path.
3.  **In-Flight (Leak Detection Event):**
    *   When an alert occurs, the operator likely disengages autotrack and uses the joystick for precise manual aiming to investigate the source.
4.  **Post-Flight:**
    *   The operator uses the iPad's sharing features to export the mission data as a KML/KMZ file.
    *   This file is then opened in Google Earth on another device to visualize the results.

## Key Learnings for CV Project
*   **Reduced Operator Focus (During Normal Ops):** The autotrack feature is a game-changer. It means the operator is not in a constant, high-focus aiming loop. Their cognitive load is lower during routine surveillance.
*   **Challenge vs. Opportunity:** This is a major opportunity. Because the operator is in a supervisory role, they will be more receptive to our threat alerts. An alert is less likely to be an unwelcome distraction and more likely to be a valuable piece of new information that directs their attention.
*   **Alerts Should Trigger Action:** A key part of our UX design should be how an operator interacts with an alert. A threat detection could trigger a state change, prompting the operator to take manual control to get a closer look, confirming or dismissing the threat.
