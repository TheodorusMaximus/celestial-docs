---
title: "Project Decision Log & Strategy"
date: 2024-08-19
aliases: [Decisions, Project Strategy, MVP Decisions]
tags: [project/pipeline-threat-detection, type/permanent, domain/strategy, phase/define]
status: [published]
moc: "[[01_Planning_and_Strategy/2_Define/2024-08-19-Define-Phase-Synthesis-Matrix]]"
---

# Project Decision Log & Strategy

**Summary:** This document serves as the single, authoritative record of the key strategic and technical decisions shaping the project. It covers both the immediate "Sign-of-Life" MVP and the forward-looking "Operational MVP" (Phase 2). Each decision is presented as a brief, outlining the context, evidence from our research, options, and strategic rationale to ensure every choice is deliberate and traceable.

**Body:**

Our methodology is one of **strategic reduction**: we distill broad research into a focused plan. The goal is to define the minimal experiments required to validate our most critical hypotheses at each stage.

---
## "Sign-of-Life" MVP (Phase 1) Decision Briefs

The following decisions are all made through the lens of one guiding principle: **What is the fastest, lowest-effort path to generating a signal that proves our core concept is viable?**

---

### Decision Brief #1: The "Proxy Class" Strategy

*   **Priority:** **CRITICAL**
*   **Context:** Our `Threat-Prioritization-Analysis.md` identifies `excavator` as the single most important threat to detect. However, our `SOTA-CV-Models.md` analysis confirms that the standard, pre-trained YOLO model (trained on the COCO dataset) has no `excavator` class. This creates a direct conflict between the MVP's primary business goal and its technical starting point.
*   **Evidence from Discovery:**
    *   **Need:** `excavator` detection is a "NEED TO HAVE" (`Threat-Prioritization-Analysis.md`).
    *   **Constraint:** Our "Sign-of-Life" scope is designed to prove feasibility *before* a major data collection effort (`Core-Hypotheses-Decomposition.md`).
    *   **Tool Capability:** The off-the-shelf tool recognizes `truck`, which is often visually similar to an excavator in an aerial view.
*   **Decision Framework:** How do we prove the system's value against the #1 threat without the massive upfront cost of custom model training?
    *   **Option A: The Proxy Class Strategy.** We configure the YOLO model to specifically detect the `truck` class, treating it as a functional substitute for an `excavator` for the purposes of this initial test.
    *   **Option B: The Mini Fine-Tune Strategy.** We pause development to source, label, and train a new model on a small dataset of excavators.
*   **Strategic Rationale & Recommendation:** We select **Option A: The Proxy Class Strategy.** The core hypothesis we are testing is not "Can AI detect an excavator?" (academic and industry research has already proven this). The critical, unanswered question for VanGuard is, "Can we build a *real-time, standalone system on simple hardware* that forms a viable foundation for a future product?" The Proxy Class strategy deliberately defers the complexity of custom training to focus all our effort on answering this more fundamental architectural question. It allows us to validate the entire end-to-end pipeline (camera -> code -> model -> display) with maximum velocity.
*   **Implications:** The MVP will be configured to detect `trucks`. This decision and its rationale must be clearly communicated to all stakeholders to set correct expectations for the demo.

---

### Decision Brief #2: Explicitly Targeting Operator Cognitive Load

*   **Priority:** **HIGH**
*   **Context:** Our initial business case focused on market differentiation. While correct, it overlooked the direct, human-centric value proposition for the system's primary user.
*   **Evidence from Discovery:**
    *   **Pain Point:** The operator's current workflow is a "manual, fatiguing visual scan" (`Current-State-UI-UX.md`).
    *   **Opportunity:** The new autotrack feature frees up the operator's hands and eyes, creating a perfect opportunity to introduce an automated visual assistant.
*   **Decision Framework:** How do we frame the purpose of the MVP to achieve maximum stakeholder buy-in?
    *   **Option A: Add the "Cognitive Load" Insight.** We formally add the reduction of operator fatigue as a primary project driver.
*   **Strategic Rationale & Recommendation:** We select **Option A.** Technology is most successful when it solves a real human problem. By framing the system as a tool to reduce cognitive load and act as an automated "second pair of eyes," we move from a purely technical "feature" to a compelling "solution." This user-centric framing is more powerful and provides a clearer metric for success in future iterations (e.g., "Did we reduce the operator's need to manually scan?").
*   **Implications:** This insight will be added to our `Define-Phase-Synthesis-Matrix.md` to ensure our core business case is explicitly user-centric.

---

### Decision Brief #3: Establishing the Production Hardware Path & Performance Baseline

*   **Priority:** **MEDIUM**
*   **Context:** The MVP will be built on a laptop for speed, but the final product will require a specialized, rugged embedded computer (e.g., NVIDIA Jetson). We must ensure the MVP work is a stepping stone, not a dead end.
*   **Evidence from Discovery:**
    *   **MVP Scope:** The system must be standalone, making a laptop the logical choice (`Knowns-Needs-Constraints.md`).
    *   **Production Need:** A future system must be integrated into the aircraft (`Initial-Research-Tasks.md`).
*   **Decision Framework:** How do we ensure the MVP's technical results are relevant to future production decisions?
    *   **Option A: Add the "Hardware Path" Insight.** We formally document the laptop-to-embedded-system path and add a requirement for the MVP to log its performance.
*   **Strategic Rationale & Recommendation:** We select **Option A.** The purpose of a "Sign-of-Life" MVP is to generate data that informs the next step. By measuring the model's performance (e.g., frames per second) on the laptop's GPU, we create the **first critical performance baseline.** This data point will be invaluable for sizing and selecting the more expensive embedded hardware for the next phase, turning a future guess into an evidence-based decision.
*   **Implications:** The MVP software must include a simple mechanism to log or print its inference speed. This is now a formal requirement.

---

### Decision Brief #4: Formalizing the Software Stack

*   **Priority:** **MEDIUM**
*   **Context:** While implied, we have not formally selected the specific software libraries for the MVP. A clear decision is needed to enable development.
*   **Evidence from Discovery:**
    *   **Model Choice:** The YOLO family is our target model architecture (`SOTA-CV-Models.md`).
    *   **Ecosystem:** The `ultralytics` Python library is the official and most direct way to use YOLO models. `OpenCV` is the industry standard for handling video feeds in Python.
*   **Decision Framework:** What is the lowest-friction, highest-velocity software stack for building this MVP?
    *   **Option A: Add the "Stack Choice" Insight.** We formally select Python, `ultralytics`, and `opencv-python` as our stack.
*   **Strategic Rationale & Recommendation:** We select **Option A.** There is no value in re-inventing the wheel for this MVP. By choosing the standard, well-documented, and officially supported libraries, we leverage the work of thousands of developers and ensure the fastest possible path from concept to code. This choice minimizes technical risk and maximizes development speed.
*   **Implications:** A `requirements.txt` file will be created for the project, making this decision explicit and the development environment reproducible.

---
## "Operational MVP" (Phase 2) Decision Briefs

The following briefs outline the strategic decisions for the next phase, which will follow a successful "Sign-of-Life" test. They address the critical challenges of data acquisition, hardware selection, and user interface integration.

---

### Decision Brief #5 (Expanded): The Data Acquisition & Model Training Strategy

*   **Priority:** **CRITICAL (for Phase 2)**
*   **Topic:** Moving beyond the "Proxy Class" strategy requires a deliberate, multi-stage approach to building a high-performance, custom-trained model. This is the most significant undertaking in the project and requires a robust strategy.
*   **Evidence from Discovery:**
    *   **The Core Risk:** Our `Core-Hypotheses-Decomposition.md` identifies "Data Acquisition" as a primary risk. The `Initial-Research-Tasks.md` noted from the start that the client's dataset is "light."
    *   **The Academic Foundation:** The `Academic-Research-Review.md` highlighted the **DOTA dataset**, proving that large-scale, public aerial imagery datasets are a cornerstone of modern CV in this domain. This provides a clear starting point for teaching a model the *fundamentals* of aerial imagery.
    *   **The Goal:** The `Threat-Prioritization-Analysis.md` defines our target classes (`excavator`, `exposed_pipe`), which are not present in generic datasets. This necessitates a custom, fine-tuning dataset.
*   **Decision Framework & Multi-Stage Strategy:** Instead of a single choice, we must adopt a phased data strategy.

    *   **Stage 1: Foundational Pre-training.**
        *   **Action:** We will leverage a large, public, academic dataset like **DOTA** to "pre-train" our base model.
        *   **Rationale:** This step is crucial and de-risks the entire process. It teaches the model the fundamental visual features of aerial imagery—common textures, lighting conditions, camera angles, and object scales—before it ever sees a single image from VanGuard. This is analogous to teaching a student to read before asking them to analyze complex literature. It dramatically reduces the amount of custom data we will need later.

    *   **Stage 2: Human-in-the-Loop Fine-Tuning.**
        *   **Action:** We will implement the **"Active Collection" (Human-in-the-Loop) Strategy.** An operator-controlled "Capture Event" button will be added to the system.
        *   **Rationale:** This directly addresses the "rare event" problem. As noted in the `Current-State-UI-UX.md`, operators are experts at spotting anomalies. By empowering them to flag these events, we transform them from passive users into active participants in the data collection process. This is vastly more efficient than passively recording and manually reviewing terabytes of uneventful footage.

    *   **Stage 3: The Continuous Learning Flywheel.**
        *   **Action:** We will design the system so that every operator interaction with an alert becomes a potential data point. When a detection is confirmed as a "true positive" or flagged as a "false positive," this feedback is logged.
        *   **Rationale:** This creates a virtuous cycle. The model's real-world performance generates the very data needed to improve it. This is the only sustainable, long-term path to building a model that adapts to new conditions (like seasonal changes) and continuously improves its "Actionable Intelligence Rate" (`Success-Criteria-MVP.md`).

*   **Risks & Pivot Points:**
    *   **Risk:** Low event frequency yields insufficient fine-tuning data.
    *   **Pivot:** If active collection is too slow, we will explore **synthetic data generation** (creating realistic 3D scenes of excavators) or conduct **targeted data collection flights** over known construction zones.
    *   **Risk:** Data labeling is slow, expensive, or inconsistent.
    *   **Pivot:** We will investigate **semi-supervised learning**, where the model makes an initial guess, and human labelers only need to correct it, which is much faster than labeling from scratch.

---

### Decision Brief #6 (Expanded): The In-Flight Hardware Selection

*   **Priority:** **HIGH (for Phase 2)**
*   **Topic:** The laptop used in the "Sign-of-Life" MVP must be replaced with a rugged, reliable, and powerful embedded computer for in-flight operations.
*   **Evidence from Discovery:**
    *   **The Environment:** The `Patent-Analysis` details a "vibration-isolated, dual-shell" pod. This is a direct confirmation that the operational environment is physically demanding and requires more than consumer-grade hardware.
    *   **The Task:** Our `Define-Phase-Synthesis-Matrix.md` now includes a requirement for **Performance Logging**. The Frames Per Second (FPS) baseline we establish on the laptop's GPU is the primary technical specification that will drive our selection.
*   **Decision Framework:** What is the lowest-risk, highest-value hardware platform for long-term success?
    *   **Option A: NVIDIA Jetson Family.** The industry standard for edge AI.
    *   **Option B: AI-Accelerated Raspberry Pi.** A more DIY approach, potentially less robust.
    *   **Option C: Ruggedized Intel NUC.** Powerful but often larger and more power-hungry.
*   **Strategic Rationale & Recommendation:** We will architect our software for **Option A: the NVIDIA Jetson ecosystem.** The choice is based on more than just performance. NVIDIA provides a mature and extensive software ecosystem (**CUDA, TensorRT**) specifically for optimizing AI models to run faster on their hardware. By targeting the Jetson platform, we are not just choosing a piece of hardware; we are buying into a complete optimization and deployment toolchain that will significantly accelerate development and improve performance in the long run. The performance logs from the MVP will tell us *which* Jetson to buy (e.g., a modest Orin Nano or a powerful AGX Orin).

---

### Decision Brief #7 (Expanded): The Operator Alerting & UI Strategy

*   **Priority:** **HIGH (for Phase 2)**
*   **Topic:** An OpenCV window is a developer tool, not a product. We must define a clean, scalable, and user-centric method for delivering alerts to the operator.
*   **Evidence from Discovery:**
    *   **The Existing Workflow:** The operator's world is the iPad app (`Current-State-UI-UX.md`). Forcing them to look at a second, unrelated screen would increase, not decrease, their cognitive load.
    *   **The Goal:** The `Success-Criteria-MVP.md` emphasizes the "Actionable Intelligence Rate." A good UI is essential for this. It must allow the operator to quickly understand an alert and, crucially, provide feedback (e.g., dismiss a false positive) to feed our "Continuous Learning Flywheel."
*   **Decision Framework:** How do we deliver alerts without disrupting the operator's workflow?
    *   **Option A: Standalone "Alert Tablet".** A separate, dedicated screen for our system.
    *   **Option B: Develop a Minimal, Local API Endpoint.** Our system provides a "data feed" of alerts that the existing iPad app can consume.
*   **Strategic Rationale & Recommendation:** We strongly recommend **Option B.** This is a fundamental architectural decision that promotes modularity and clean separation of concerns. Our system's job is to be the world's best at detecting threats and providing that information via a stable, well-defined API "contract." The VanGuard iPad app's job is to be the world's best interface for their operators. The API allows each system to do its job without creating messy dependencies. This enables parallel development and empowers the VanGuard team to integrate the alerts in the most native and effective way for their users (e.g., a subtle banner, a haptic buzz, an entry in an event log).
