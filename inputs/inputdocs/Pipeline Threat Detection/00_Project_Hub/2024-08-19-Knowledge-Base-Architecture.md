---
title: "Knowledge Base Architecture"
date: 2024-08-19
aliases: [Folder Structure, Wiki Architecture]
tags: [project/pipeline-threat-detection, type/meta, domain/knowledge-management]
status: [complete]
moc: "[[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]"
---

# Knowledge Base Architecture

**Summary:** This document outlines the purpose and philosophy behind the folder structure of this project's knowledge base.

**Body:**

A well-defined structure is essential for maintaining clarity and accessibility of information as the project grows. The folder system is organized by the function and permanence of the information contained within. The numerical prefixes ensure a consistent and logical sort order.

### Folder Breakdown

*   `00_Project_Hub/`
    *   **Purpose:** The central entry point for the project. Contains the main Map of Content (MOC), project charters, and the most critical top-level documents. Anyone joining the project should start here.

*   `01_Planning_and_Strategy/`
    *   **Purpose:** To house documents related to the project's direction and execution. This includes project plans, strategic analyses (like our [[2024-08-19-Threat-Prioritization-Analysis]]), and roadmaps.

*   `02_Reference_and_Concepts/`
    *   **Purpose:** A library for "evergreen" or foundational knowledge that provides context but does not change frequently. This is for company profiles, definitions of key terms (like our [[2024-08-19-Concept-CV-Class-List]]), and background information.

*   `03_Technical_Deep_Dive/`
    *   **Purpose:** For the core technical substance of the project. It holds the "As-Is" analysis of the current state and will contain all future "To-Be" architectural designs, hardware specifications, software choices, and model details.

*   `04_Meetings_and_Discussions/`
    *   **Purpose:** An archive for notes and summaries from specific points in time, such as stakeholder meetings, syncs, and important email communications.

*   `99_Meta/`
    *   **Purpose:** For documents *about* the project, rather than *of* the project. This includes this architecture document, agent prompts, and other meta-level configurations.
