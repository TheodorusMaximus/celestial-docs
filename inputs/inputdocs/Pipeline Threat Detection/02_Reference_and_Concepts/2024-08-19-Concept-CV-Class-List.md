---
title: "Concept: CV Class and Class List"
date: 2024-08-19
aliases: [Class List, Object Class]
tags: [project/pipeline-threat-detection, type/permanent, domain/concept]
status: [complete]
moc: "[[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]"
---

# Concept: Computer Vision Class and Class List

**Summary:** This note defines the foundational concepts of "class" and "class list" for non-technical stakeholders in the context of this computer vision project.

**Body:**

### What is a "Class"?

In computer vision, a **"class"** is simply a **category label** for a specific type of object we want the AI model to learn to recognize. It's the name we give to a group of objects that look similar.

*   For example, if we want to find excavators, the class is `excavator`.
*   If we want to find sections of pipe that have become uncovered, the class could be `exposed_pipe`.

The AI can only identify the specific classes it has been trained on.

### What is a "Class List"?

A **"class list"** is the complete list of all the classes the model is trained to detect. This list defines the entire scope of what the AI is capable of "seeing". If an object type is not on this list, the model will be blind to it.

### MVP Class List for This Project

Based on our [[2024-08-19-Threat-Prioritization-Analysis]], we have determined that the class list for the MVP will be focused on the two highest-risk threats:

1.  `excavator`
2.  `exposed_pipe`

Focusing on this small, high-value list ensures the MVP delivers the maximum impact by solving the most critical problems first.

## Connections
*   [[2024-08-19-MOC-Pipeline-Threat-Detection-Project]]
*   [[2024-08-19-Threat-Prioritization-Analysis]]
