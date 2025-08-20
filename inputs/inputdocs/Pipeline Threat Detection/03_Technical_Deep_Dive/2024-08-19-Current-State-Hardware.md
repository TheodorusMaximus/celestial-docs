---
title: "Current State: Hardware"
date: 2024-08-19
aliases: [As-Is Hardware]
tags: [project/pipeline-threat-detection, type/permanent, domain/technical]
status: [published]
moc: "[[2024-08-19-MOC-Current-State-Analysis]]"
---

# Current State: Hardware

**Summary:** This document details the physical hardware components for VanGuard's operations. It distinguishes between the existing OGI system, the proposed hardware for the production CV system, and the minimal hardware for the initial "Sign-of-Life" MVP.

**Body:**

---

## 1. Existing OGI System Hardware

This is the system currently in operation for methane detection.

*   **Sensor Pod:** Falcon-XL Gas Imaging Pod. The patent reveals a dual-shell, **vibration-isolated** design.
*   **Primary Sensor:** Optical Gas Imaging (OGI) sensor for methane detection.
*   **Video Camera:** A video camera is mounted coaxially with the laser, used for aiming the pod.
*   **On-board Computer:** A **Raspberry Pi** runs a local server for processing and communication.
*   **GPS Unit:** Provides real-time location data for geotagging.
*   **Operator Interface:** Apple iPad running a custom monitoring application, connected via Ethernet.
*   **Controls:** A joystick controls a motor to physically aim the internal scope assembly.

---

## 2. Proposed CV System Hardware (Phase 2 / Operational MVP)

This is the target hardware for a future, operational version of the threat detection system.

*   **Primary Camera:** [Sony ILX-LR1](https://www.bhphotovideo.com/c/product/1785754-REG/sony_ilx_lr1_industrial_camera.html) (61MP Full-Frame Sensor). This choice dictates the high resolution and quality of the video feed the production model will process.
*   **Primary Lens:** [Sony FE 24-70mm f/2.8 GM II Lens](https://www.amazon.com/dp/B82NM7LRM). The variable focal length provides operational flexibility, which the software may need to account for.
*   **Compute Unit:** TBD, with the **NVIDIA Jetson family** as the leading candidate. The selection of the specific model (e.g., Orin Nano vs. AGX Orin) will be based on the performance benchmarks from the Phase 1 MVP.

---

## 3. "Sign-of-Life" MVP Hardware (Phase 1)

This is the minimal hardware required to execute the initial proof-of-concept.

*   **Camera:** Standard USB Webcam to simulate the video feed.
*   **Computer:** A consultant-provided laptop with a discrete NVIDIA GPU.
*   **Power:** The laptop's internal battery.
*   **Key Principle:** The MVP is a **completely standalone system**, requiring zero integration with the aircraft's hardware, power, or data systems. This de-risks the initial development and allows for rapid validation of the core software.
