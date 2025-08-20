---
title: "Threat Prioritization Analysis"
date: 2024-08-19
aliases: [Threat Matrix, Prioritization Criteria]
tags: [project/pipeline-threat-detection, type/permanent, domain/strategy]
status: [draft]
moc: "[[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]"
---

# Threat Prioritization Analysis

**Summary:** This document establishes the criteria and resulting prioritization for detecting various threats to pipeline integrity, defining the core focus for the MVP.

**Body:**

To logically scope the MVP, we must first prioritize the list of potential threats. This analysis documents the reasoning behind our focus.

### Prioritization Methodology

We will evaluate each potential threat against five key criteria:

1.  **Safety Risk:** Potential for injury or loss of life.
2.  **Environmental Impact:** Likelihood of causing significant environmental damage.
3.  **Operational Disruption:** Possibility of interrupting pipeline operations.
4.  **Detection Feasibility:** The relative ease of identifying the threat using aerial computer vision.
5.  **Regulatory Compliance:** The necessity of monitoring for this threat to adhere to legal standards.

### Threat Analysis & Prioritization

| Threat Class | Safety Risk | Env. Impact | Op. Disruption | Feasibility | Priority | Justification |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Excavators** | High | High | High | High | **NEED TO HAVE** | Represents the most immediate and catastrophic failure risk. |
| **Exposed Pipe** | High | High | High | High | **NEED TO HAVE** | A critical indicator of imminent failure due to corrosion or damage. |
| **Humans** | Moderate | Low | Low | Moderate | **NICE TO HAVE** | Important for security, but a secondary threat compared to direct damage. |
| **Campsites** | Moderate | Moderate | Low | Moderate | **NICE TO HAVE** | Indicates unauthorized presence; risks include fire or interference. |
| **Downed Trees** | Low | Low | Moderate | High | **NICE TO HAVE** | Primarily an access/maintenance issue, not a direct threat to integrity. |

### Conclusion for MVP Scope

The "NEED TO HAVE" classes—**Excavators** and **Exposed Pipes**—present the highest risk and a clear, high-value target for the MVP. Focusing on these two classes will provide the most significant leap in proactive threat detection for VanGuard. The "NICE TO HAVE" classes can be considered for subsequent versions of the model.

### Current State: Manual Observation

VanGuard's current process is reportedly reactive. They use handheld Optical Gas Imaging (OGI) cameras to inspect a leak *after* it has been identified by other means. This project's goal is to create a *proactive* system that detects the conditions that *lead* to leaks and failures.

## Connections
*   [[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]

## Open Questions
*   Does the VanGuard team agree with this prioritization of "Excavators" and "Exposed Pipes" as the primary, high-value targets for the MVP?
