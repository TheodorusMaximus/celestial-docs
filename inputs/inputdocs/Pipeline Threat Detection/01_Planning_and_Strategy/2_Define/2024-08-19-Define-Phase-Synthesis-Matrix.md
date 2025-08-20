---
title: "Define Phase Synthesis Matrix"
date: 2024-08-19
aliases: [Define Matrix, Synthesis Matrix]
tags: [project/pipeline-threat-detection, type/permanent, domain/strategy, phase/define]
status: [published]
moc: "[[01_Planning_and_Strategy/2024-08-19-Project-Framework-Double-Diamond]]"
---

# Define Phase Synthesis Matrix

**Summary:** This document synthesizes all findings from the "Discover" phase into a structured matrix. It serves as the bridge between our broad research and a focused problem definition, ensuring every decision is traceable back to a specific insight. The goal is to distill our knowledge into core business questions, validate our foundational hypotheses, and define the minimal features required for a "Sign-of-Life" MVP.

**Body:**

---

## 1. Business & Strategy

This section focuses on the market positioning, user value, and strategic goals of the project.

| Source Artifact(s) | Key Insight / Finding | Core Business Question | Core Hypothesis to Validate | "Sign-of-Life" MVP Feature |
| :--- | :--- | :--- | :--- | :--- |
| `Competitive-Landscape.md` | Most competitors focus on post-flight data analysis and reporting. VanGuard's primary advantage is its real-time, in-cockpit methane detection workflow. | How can we introduce CV capabilities in a way that amplifies the existing real-time, "actionable intelligence" value proposition? | Providing CV-based threat alerts *in real-time during a flight* is a significant competitive differentiator and is more valuable to an operator than a post-flight report. | **Real-Time Display:** The system's output (video feed with detections) must be visible on a screen with minimal latency. |
| `Current-State-UI-UX.md` | The operator's primary non-methane-related task is a continuous, manual, and fatiguing visual scan of the terrain. | How can we measurably increase operator effectiveness by reducing the cognitive load of this manual scan? | An automated visual aid that flags potential threats will reduce operator fatigue and increase the probability of catching critical threats. | **Bounding Box Overlay:** (Serves as the "second pair of eyes" to directly address this pain point). |
| `Success-Criteria-MVP.md` | The ultimate success is not just detection, but "Actionable Intelligence," which balances high accuracy with an extremely low rate of false alerts to maintain operator trust. | How can we design the MVP to begin measuring the components of "Actionable Intelligence" from day one? | An operator will trust and use a system that doesn't constantly cry wolf. Feasibility is tied to minimizing nuisance alerts. | **Confidence Threshold:** The detection logic includes a configurable confidence score threshold to easily filter out low-confidence (likely false) detections. |

---

## 2. Hardware & System Architecture

This section addresses the physical components and high-level structure of the MVP system.

| Source Artifact(s) | Key Insight / Finding | Core Business Question | Core Hypothesis to Validate | "Sign-of-Life" MVP Feature |
| :--- | :--- | :--- | :--- | :--- |
| `Knowns-Needs-Constraints.md`, `Current-State-Hardware.md` | We are **not** constrained by VanGuard's existing Raspberry Pi. The MVP is to be a completely standalone hardware system for maximum speed and minimum integration risk. | What is the absolute simplest, fastest-to-deploy hardware configuration that can prove the core concept? | A standard, modern laptop with a discrete GPU is powerful enough to run a real-time YOLO-class model at an acceptable FPS for a proof-of-concept. | **Laptop-Based System:** The entire software stack runs on a consultant-provided laptop. |
| `Initial-Research-Tasks.md` | A laptop is for the MVP, but a production system will require a dedicated, rugged, embedded edge compute device (e.g., NVIDIA Jetson). | How do we ensure the software we write for the MVP can easily transition to production hardware? | The performance of a YOLO-class model on a laptop GPU is a reliable indicator of its potential performance on an embedded GPU like a Jetson. | **Performance Logging:** The script prints the model's inference time (in ms) or FPS to the console, establishing a baseline performance metric. |
| `Knowns-Needs-Constraints.md` | The system must be self-contained and have its own power, reinforcing the standalone nature of the MVP. | How do we validate the software's performance independent of the aircraft's specific power and data systems? | The core software's performance (model inference speed) can be benchmarked and validated on self-powered, off-the-shelf hardware. | **No Aircraft Integration:** The laptop runs on its own battery. No physical connection to the aircraft is required. |

---

## 3. Software & Integration

This section covers the software stack, data flow, and interaction with other systems (or lack thereof).

| Source Artifact(s) | Key Insight / Finding | Core Business Question | Core Hypothesis to Validate | "Sign-of-Life" MVP Feature |
| :--- | :--- | :--- | :--- | :--- |
| `Current-State-Software.md`, `MVP-Scope-Sign-of-Life.md` | The goal of the "Sign-of-Life" MVP is to de-risk the core CV capability, *not* to tackle the complex task of integrating with VanGuard's existing iPad application. | How can we demonstrate the core detection capability in the most direct way possible, without any custom UI development? | A simple window on a computer screen showing the video feed with bounding boxes drawn on it is sufficient to prove to stakeholders that the technology works. | **OpenCV Window Display:** The software uses a basic Python script (e.g., with OpenCV) to open a window that displays the camera feed. |
| `SOTA-CV-Models.md` | The Python ecosystem, specifically the `ultralytics` library for YOLO models and `OpenCV` for video handling, is the de-facto industry standard for rapid CV prototyping. | What is the lowest-effort, highest-velocity software stack for building this MVP? | Using a standard Python CV stack will allow for the creation of a working prototype in days, not weeks. | **Requirements.txt:** A simple `requirements.txt` file is created, pinning the versions of `ultralytics` and `opencv-python`, formalizing our stack choice. |
| `Academic-Research-Review.md` (Path Following paper), `Current-State-Software.md` | The existing system uses KMZ files and GPS to automatically track the pipeline. While our MVP won't integrate with this, we know location data is critical for future versions. | How can we lay a minimal software foundation for future geospatial integration? | The detection event (finding an object) can be structured as a simple data object, ready to be enriched with GPS coordinates later. | **Structured Detection Output:** When an object is detected, the script prints a simple message to the console (e.g., `Detection: truck, Confidence: 0.92, Box: [x,y,w,h]`). |

---

## 4. UI/UX (Operator Experience)

This section focuses on how the user will interact with and perceive the system's output.

| Source Artifact(s) | Key Insight / Finding | Core Business Question | Core Hypothesis to Validate | "Sign-of-Life" MVP Feature |
| :--- | :--- | :--- | :--- | :--- |
| `Current-State-UI-UX.md` | The operator's current process is a manual, fatiguing visual scan. The system should augment, not replace, their attention, acting as a "second pair of eyes." | What is the most primitive, non-distracting way to communicate a "hit" to the user? | A visual overlay directly on the object of interest is more intuitive and requires less cognitive switching than a separate data table or audible alert. | **Bounding Box Overlay:** When an object is detected, a simple, colored rectangle is drawn around it directly on the video feed in the display window. |
| `Success-Criteria-MVP.md` | Operator trust is paramount and is quickly eroded by a "noisy" system with too many false positives. | How can we give the user (and us as developers) a simple lever to control the system's sensitivity? | The model's confidence score is the most direct proxy for detection quality and can be used to easily tune the trade-off between recall and precision. | **Hardcoded Confidence Variable:** A single, easily changed variable exists at the top of the script (`CONFIDENCE_THRESHOLD = 0.75`) to control when a detection is displayed. |

---

## 5. Data & AI/ML Model

This section covers the specifics of the computer vision model and the data used to train/run it.

| Source Artifact(s) | Key Insight / Finding | Core Business Question | Core Hypothesis to Validate | "Sign-of-Life" MVP Feature |
| :--- | :--- | :--- | :--- | :--- |
| `Core-Hypotheses-Decomposition.md` | A pre-trained model won't have the exact `excavator` class, but it will have visually similar classes like `truck`. | Can we validate the end-to-end system using a proxy class before investing in custom labeling? | Detecting a `truck` with a pre-trained COCO model is a sufficient proxy to prove the technical viability of detecting an `excavator` with a future, fine-tuned model. | **Proxy Class Detection:** The system uses a standard YOLOv8 model and is configured to specifically look for and flag the `truck` class as a stand-in for `excavator`. |
| `SOTA-CV-Models.md`, `Academic-Research-Review.md` | The YOLO family of models is the industry standard for real-time object detection, offering the best balance of speed and accuracy for edge applications. | Do we need to conduct a bake-off of multiple model architectures for the "Sign-of-Life" MVP? | No. The feasibility of the entire project can be demonstrated using a single, well-supported, and representative model. YOLOv8 is the perfect candidate. | **Single Model Architecture:** The code is written to use one specific, well-documented model (YOLOv8) with no need for complex model-switching logic. |
| `Academic-Research-Review.md` (DOTA paper) | Large-scale public datasets for aerial imagery (like DOTA) exist and are crucial for building robust, production-grade models in this domain. | How do we de-risk the future "production" phase of the project? | By confirming that a clear path to a high-quality dataset exists, we validate the long-term viability of the project beyond the initial MVP. | **Documentation:** A note is added to the project's technical backlog confirming that the DOTA dataset will be the starting point for custom model training in a future phase. |
