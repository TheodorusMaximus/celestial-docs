---
title: "Current State: Software"
date: 2024-08-19
aliases: [As-Is Software]
tags: [project/pipeline-threat-detection, type/permanent, domain/technical]
status: [published]
moc: "[[03_Technical_Deep_Dive/2024-08-19-MOC-Current-State-Analysis]]"
---

# Current State: Software

**Summary:** This document details the software systems, data formats, and data flows of VanGuard's current operational technology.

**Body:**

---

## 1. Core Software Components
*   **On-board Firmware:** Custom firmware running on the sensor pod's hardware manages the motors, sensors, and raw data processing.
*   **On-board Server:** A server application runs on the **Raspberry Pi**, communicating with the firmware. Its primary job is to process sensor data and serve it to the iPad app.
*   **Operator Interface:** A custom **Apple iPad application** serves as the primary display and control interface for the operator in the cockpit.

## 2. Data Formats & Communication
*   **Communication Protocol:** The iPad and Raspberry Pi communicate over a direct **Ethernet connection** using a proprietary protocol.
*   **Geospatial Data Format:** The system uses **KMZ files** (a zipped version of KML) to store and load pipeline route and flight path data. This is a standard Google Earth format.
*   **Data Export:** The system can export survey results as **CSV files** or **KMZ files** for post-flight analysis in tools like Google Earth.

## 3. Key Feature: "Autotrack" System

The "autotrack" feature is a critical software component that automates the aiming of the sensor pod.

### 3.1. Data Flow & Processing
The software follows a simple, linear data flow:
1.  **KMZ Data:** A pre-loaded KMZ file containing the pipeline's route is stored locally on the system.
2.  **GPS Input:** The system receives a constant stream of GPS coordinates for the aircraft's current location.
3.  **Control Loop:** The on-board server/firmware runs a continuous control loop that compares the aircraft's current GPS location to the pipeline's path in the KMZ file.
4.  **Motor Control:** The software sends commands to the pod's motors to adjust the camera's aim, keeping it pointed at the pipeline corridor on the ground.
5.  **Video Stream:** The video feed is sent to the iPad for the operator to monitor.

### 3.2. Operator Interaction
*   **Supervisory Role:** The operator's primary role is to supervise the autotrack system and monitor the OGI sensor feed for methane alerts.
*   **Manual Override:** The operator can take manual control of the camera at any time using a joystick to investigate a specific area more closely. This is the expected workflow when a methane leak or a visual anomaly is detected.
