*   **Evidence from Discovery:**
    *   **The Core Risk:** Our `Core-Hypotheses-Decomposition.md` identifies "Data Acquisition" as a primary risk.
    *   **The Academic Foundation:** The `Academic-Research-Review.md` highlighted the **DOTA dataset**, proving that large-scale, public aerial imagery datasets are a cornerstone of modern CV in this domain.
    *   **Multiple Data Tiers:** We have access to a hierarchy of data sources: low-fidelity but abundant **satellite imagery**, high-fidelity **aerial imagery** from the plane, and potentially ultra-high-fidelity **drone imagery**.
    *   **The Goal:** The `Threat-Prioritization-Analysis.md` defines our target classes (`excavator`, `exposed_pipe`), which necessitates a custom fine-tuning dataset.
*   **Decision Framework & Multi-Stage Strategy:** We will adopt a phased data strategy that leverages the different tiers of data fidelity appropriately.

    *   **Stage 1: Foundational Pre-training (Leveraging Low-Fidelity, High-Quantity Data).**
        *   **Action:** We will use large, public, academic datasets composed of **satellite and generic aerial imagery** (e.g., DOTA, xView) to pre-train our base model.
        *   **Rationale:** This teaches the model the fundamental visual features of aerial scenes (textures, lighting, perspective) using vast, affordable datasets. This is the most cost-effective way to build a robust baseline model.

    *   **Stage 2: Human-in-the-Loop Fine-Tuning (Leveraging High-Fidelity, High-Relevance Data).**
        *   **Action:** We will implement the "Active Collection" strategy to capture **aerial imagery from the VanGuard plane** specifically when an operator identifies a real threat.
        *   **Rationale:** This focuses our expensive labeling efforts exclusively on the highest-value, most relevant data, captured with the exact sensor and perspective that the final system will use.

    *   **Stage 3: The Continuous Learning Flywheel.**
        *   **Action:** Operator feedback on real-world alerts will be used to continuously curate and improve the fine-tuning dataset.
        *   **Rationale:** Creates a virtuous cycle where system performance improves with use, adapting to new conditions and improving its "Actionable Intelligence Rate" (`Success-Criteria-MVP.md`).

*   **Risks & Pivot Points:**
    *   **Risk:** The domain gap between satellite/public data and VanGuard's specific camera feed is too large, leading to poor pre-training.
    *   **Pivot:** We will rely more heavily on "Active Collection" from the start and investigate using **ultra-high-fidelity drone data** to create a smaller, but more specific, initial fine-tuning set.
    *   **Risk:** Low event frequency yields insufficient fine-tuning data from the aircraft.
