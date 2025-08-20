---
title: "Market Research: State-of-the-Art CV Models (Detailed)"
date: 2024-08-19
aliases: [SOTA Models, YOLO Review]
tags: [project/pipeline-threat-detection, type/permanent, domain/research, phase/discover]
status: [draft]
moc: "[[01_Planning_and_Strategy/2024-08-19-Project-Framework-Double-Diamond]]"
---

# Market Research: State-of-the-Art CV Models (Detailed)

**Summary:** This document provides a detailed analysis of potential models, datasets, and research relevant to our project, ranking each for its immediate value.

**Body:**

---

### 1. Model: `Ashegh-Sad-Warrior/yolo_aerial_detection_`

*   **Link:** [https://huggingface.co/Ashegh-Sad-Warrior/yolo_aerial_detection_](https://huggingface.co/Ashegh-Sad-Warrior/yolo_aerial_detection_)
*   **Type:** Object Detection Model (YOLO architecture)
*   **Synopsis:** This is a fine-tuned YOLO model explicitly trained for aerial object detection. While the model card is sparse on details about its training data, it represents a direct, practical application of the exact technology we propose to use.
*   **Relevance to Project:**
    *   **Ranking:** **High**
    *   **Justification:** This is the most relevant type of artifact for our project. It serves as a direct proof-of-concept that YOLO models can be effectively fine-tuned for aerial surveillance. It is a critical exhibit that validates our core technical approach. While we would not use this specific model in production without knowing its training data and performance, it is a perfect example of the *kind* of model we will build.

---

### 2. Model: `phungtienthanh2004/Road-Segmentation-for-Aerial-Image`

*   **Link:** [https://huggingface.co/phungtienthanh2004/Road-Segmentation-for-Aerial-Image](https://huggingface.co/phungtienthanh2004/Road-Segmentation-for-Aerial-Image)
*   **Type:** Image Segmentation Model
*   **Synopsis:** This is a model trained to perform semantic segmentation on aerial images, specifically to identify and outline roads. Segmentation provides a pixel-level mask of an object, which is more detailed than an object detector's bounding box.
*   **Relevance to Project:**
    *   **Ranking:** **Medium**
    *   **Justification:** While we are focused on object detection, not segmentation, this model is relevant for two reasons. First, it deals with the same challenges of aerial imagery (lighting, perspective). Second, the ability to segment linear features like roads is analogous to segmenting the pipeline right-of-way, which could be a powerful contextual feature for a future version of our system.

---

### 3. Model: `Thalirajesh/Aerial-Drone-Image-Segmentation`

*   **Link:** [https://huggingface.co/Thalirajesh/Aerial-Drone-Image-Segmentation](https://huggingface.co/Thalirajesh/Aerial-Drone-Image-Segmentation)
*   **Type:** Image Segmentation Model
*   **Synopsis:** Similar to the road segmentation model, this is a general-purpose model for segmenting various classes in drone imagery.
*   **Relevance to Project:**
    *   **Ranking:** **Medium**
    *   **Justification:** The relevance is the same as the road segmentation model. It provides a useful technical reference for how other practitioners are solving problems in the aerial domain, even if the specific task is different.

---

### 4. Model & Paper: `kvuong2711/checkpoint-aerial-mast3r` & `AerialMegaDepth`

*   **Links:**
    *   [https://huggingface.co/kvuong2711/checkpoint-aerial-mast3r](https://huggingface.co/kvuong2711/checkpoint-aerial-mast3r)
    *   [https://arxiv.org/abs/2504.13157](https://arxiv.org/abs/2504.13157)
    *   [https://aerial-megadepth.github.io/](https://aerial-megadepth.github.io/)
*   **Type:** 3D Reconstruction Model & Associated Research
*   **Synopsis:** This is a state-of-the-art research project focused on creating 3D models of scenes by combining aerial and ground-level imagery. It is a complex model designed for view synthesis and 3D reconstruction, not real-time 2D object detection.
*   **Relevance to Project:**
    *   **Ranking:** **Low**
    *   **Justification:** The technology is impressive but solves a completely different problem. 3D reconstruction is not within the scope of our MVP. This is a good example of advanced academic research that is not yet applicable to our immediate, practical goal.

---

### 4.1 Model: `kvuong2711/checkpoint-aerial-dust3r`

*   **Link:** [https://huggingface.co/kvuong2711/checkpoint-aerial-dust3r](https://huggingface.co/kvuong2711/checkpoint-aerial-dust3r)
*   **Type:** 3D Reconstruction Model
*   **Synopsis:** This model is another component of the `AerialMegaDepth` research project, alongside `MASt3R`. It specializes in dense 3D reconstruction.
*   **Relevance to Project:**
    *   **Ranking:** **Low**
    *   **Justification:** Same as its sibling model, this is advanced 3D vision technology that falls outside the scope of our 2D object detection needs for the MVP.

---

### 5. Model & Dataset: `luisml77/gemma-aerial-12b` & `aeriald_o3_500`

*   **Links:**
    *   [https://huggingface.co/luisml77/gemma-aerial-12b](https://huggingface.co/luisml77/gemma-aerial-12b)
    *   [https://huggingface.co/datasets/luisml77/aeriald_o3_500](https://huggingface.co/datasets/luisml77/aeriald_o3_500)
*   **Type:** Large Language Model (LLM) & Supporting Dataset
*   **Synopsis:** This is an advanced system where a large language model (Google's Gemma) has been fine-tuned to understand the content of an aerial image and generate natural language descriptions of it (a task called "referring expression generation").
*   **Relevance to Project:**
    *   **Ranking:** **Low**
    *   **Justification:** This represents a different branch of AI capabilities. Our goal is to **detect** ("there is an excavator here") not **describe** ("there is a yellow excavator with its arm extended next to a pile of dirt"). While fascinating, it is not relevant to our core MVP requirement.

---

### 6. Other Models & Datasets (VQA, FloodNet, Manipulation)

*   **Links:**
    *   `takara-ai/pixtral_aerial_VQA_adapter` (Visual Question Answering)
    *   `datasets/takara-ai/FloodNet_2021` (Flood Segmentation Dataset)
    *   `jackzeng-robotics/decentralized_aerial_manipulation_marl` (Robotic Arm Control)
*   **Synopsis:** These resources are all for highly specialized tasks that are far outside the scope of our project.
*   **Relevance to Project:**
    *   **Ranking:** **None**
    *   **Justification:** These solve fundamentally different problems (Q&A, flood mapping, robotics) and offer no direct value to our 2D object detection task.
