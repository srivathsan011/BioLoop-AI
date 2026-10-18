# BioLoop AI
### Autonomous Closed-Loop Agronomic Pathology & Localized Supply-Chain Fulfillment

> **Google Cloud & Gemini AI Hackathon Submission**  
> **Live Deployment:** [https://ais-pre-3mjtuqdx6nlr3h63mllaul-660546122278.asia-northeast1.run.app](https://ais-pre-3mjtuqdx6nlr3h63mllaul-660546122278.asia-northeast1.run.app)  
> **Development Environment:** [https://ais-dev-3mjtuqdx6nlr3h63mllaul-660546122278.asia-northeast1.run.app](https://ais-dev-3mjtuqdx6nlr3h63mllaul-660546122278.asia-northeast1.run.app)

---

## 1. Executive Summary & UN SDG Alignment

Modern agricultural technology suffers from a critical last-mile disconnect: **AI models classify diseases in a vacuum, but smallholder farmers operate in complex, volatile physical environments.** 

Traditional agricultural applications take a leaf photo and output an isolated probability label (e.g., *"Late Blight — 92%"*). To a farmer facing impending rain, depleted local agrovet shops, and limited capital, a static text classification is clinically accurate yet practically useless. Spraying standard contact fungicides right before a monsoon storm results in **85% to 95% active ingredient wash-off**, leading to wasted household income, toxic soil leaching, and catastrophic crop loss.

**BioLoop AI** transforms agricultural AI from passive classification into an **autonomous, closed-loop agentic workflow**. Powered by Google's Gemini multimodal models and Google Cloud Run, BioLoop evaluates fine-grained visual pathology markers, autonomously triggers hyper-local weather verification via function calling, halts chemical sprays when rain is imminent to eliminate wash-off, checks physical inventories at regional cooperatives, and issues a verified, immediately actionable procurement order with a QR pickup pass.

```
       [Visual Pathology] ──► [Microclimate Validation] ──► [Supply Routing] ──► [Procurement Pass]
       Multimodal Gemini      Rain / Wind Wash-Off Gate      Cooperative Mesh     Verified QR Pickup
```

---

### Alignment with United Nations Sustainable Development Goals (SDGs)

BioLoop AI is engineered around the UN 2030 Agenda for Sustainable Development:

| UN SDG | Goal Target | BioLoop AI Mechanism & Tangible Impact |
| :--- | :--- | :--- |
| **SDG 2: Zero Hunger** | **Target 2.3 & 2.4:** Double smallholder productivity and ensure sustainable food production systems resilient to climate shocks. | Protects staple crop yields (potatoes, tomatoes, bananas, maize) by replacing trial-and-error chemical application with precision dosage calculated directly for the farmer's acreage. Prevents pathogen-induced total crop failure. |
| **SDG 12: Responsible Consumption & Production** | **Target 12.4:** Environmentally sound management of chemicals and reduction of chemical releases into air, water, and soil. | Eliminates unnecessary and mistimed pesticide spraying. By enforcing **Dynamic Wash-Off Overrides**, contact chemicals are blocked before heavy rainfall, preventing tens of thousands of liters of fungicide runoff from entering local watersheds. |
| **SDG 13: Climate Action** | **Target 13.1:** Strengthen resilience and adaptive capacity to climate-related hazards and extreme weather. | Smallholders bear the brunt of erratic climate patterns. BioLoop's microclimate validation dynamically adapts treatment strategies in real time (e.g., pivoting to root drenches or scheduling early-dawn low-drift windows when wind exceeds safe thresholds). |
| **SDG 15: Life on Land** | **Target 15.3 & 15.5:** Halt land degradation, restore degraded soil, and protect biodiversity. | Prioritizes biological antagonists (e.g., *Trichoderma viride*, *Bacillus subtilis*) over heavy synthetic chemicals whenever environmental conditions allow, protecting beneficial soil microbes and pollinator populations. |

---

## 2. Core Pillars of Sustainability & Impact

### A. Ecological Sustainability: Eliminating Agrochemical Leaching
When contact chemicals like Mancozeb or Chlorothalonil are applied within 4 hours of a 25mm rainfall event, over 90% washes off into topsoil and local rivers. This causes:
- Destruction of beneficial soil mycorrhizae and earthworm populations.
- Toxic copper and heavy-metal accumulation in agricultural river basins.
- Accelerated pathogen resistance due to sublethal, diluted foliar residues.

BioLoop AI introduces the **Foliar Wash-Off Risk Index**. If convective storms are detected, standard foliar sprays are automatically overridden and delayed, or substituted with translaminar systemic uptake and biological root inoculants.

### B. Economic Sustainability: Protecting Smallholder Margins
In rural farming economies, agrochemicals constitute up to **35% of operational input costs**. Wasted spray rounds severely threaten household food security. By matching exact farm acreage with local cooperative package sizes and pre-negotiated inventory allocations, BioLoop AI prevents over-purchasing and eliminates wasted input expenditure.

### C. Social Equity: Bridging the Agronomist Shortage
In developing agricultural belts, the ratio of extension agronomists to farmers often exceeds **1:3,000**. BioLoop acts as an always-accessible field extension specialist, democratizing enterprise-grade pathology diagnosis, application timing, tank-mix safety guidelines, and personal protective equipment (PPE) compliance.

---

## 3. How the Application Operates: 4-Step Closed-Loop Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. Multimodal Ingestion                         │
│   • Leaf Specimen Photo (Upload or 5 Benchmark Suites)                 │
│   • Conversational Field History & Audio Voice Dictation               │
│   • Farm Metadata: GPS Basin Coordinates & Acreage Sizing              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                  2. Explainable Pathology Engine                       │
│   • Multimodal Marker Pinpointing (Chlorotic Halos, Necrosis, Pustules)│
│   • Shannon Visual Entropy Computation (0.00 – 1.00)                   │
│   • Uncertainty Flag & Agronomist Review Fallback Gate                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│             3. Agentic Environmental & Supply Orchestration            │
│   • Tool Call: fetch_microclimate_data(lat, lng, locality)             │
│     └─► Wash-Off Hazard Check: Rain < 4h? ──► DYNAMIC OVERRIDE         │
│   • Tool Call: check_cooperative_inventory(active_ingredients, radius) │
│     └─► Stock Verification & Autonomous Re-Routing on Depletion        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    4. Prescriptive Fulfillment                         │
│   • Actionable Mitigation Card (Dosage, Tank Mix, PHI, REI, PPE)       │
│   • Verified Cooperative Procurement Order & Printable QR Voucher      │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Multimodal Context Ingestion
- Accepts high-resolution crop imagery from mobile cameras or custom files.
- Ingests conversational field history (onset date, symptom progression, observed showers).
- Integrated voice note recorder with client audio capture and transcript processing.
- Configurable farm parameters: crop type, acreage slider (0.5 to 20+ acres), and regional coordinates.

### 2. Explainable Pathology Engine & Visual Entropy Gate
- Rather than a black-box percentage, the agent isolates localized biological markers with normalized spatial coordinates:
  - **Marginal Chlorotic Halos:** Active phytotoxin diffusion borders.
  - **Water-Soaked Necrotic Lesions:** Acute cellular collapse from oomycete mycelia.
  - **Concentric Target Rings:** Characteristic Alternaria bullseye sporulation.
  - **Vein-Parallel Necrotic Collapse & Shredding:** Banana Sigatoka foliar breakdown.
- **Visual Entropy Evaluation:** Evaluates self-consistency across candidate etiologies. If visual cues are ambiguous or indicative of concurrent infections (e.g., dual viral mosaic + fungal Septoria), the system trips `uncertainty_flag = true`, safely halting autonomous chemical recommendations and opening the **Agronomist Fallback Review Protocol** with laboratory PCR testing vouchers.

### 3. Agentic Environmental & Supply Orchestration
The agent runs an autonomous multi-turn reasoning loop using Google AI tools:
- **`fetch_microclimate_data`**: Evaluates ambient temperature, relative humidity, leaf wetness duration (hours), wind velocity/gusts, and a 48-hour precipitation forecast profile.
  - *Dynamic Wash-Off Override:* If rain is imminent (< 4 hours, > 60% probability), contact foliar sprays are prohibited. The agent dynamically pivots to systemic root zone drenching, biological antagonism (*Trichoderma viride*), or calculates the next dry weather window.
  - *Wind Drift Postponement:* If gusts exceed 25 km/h, daytime spraying is deferred to early dawn (05:45 AM) to prevent off-target drift.
- **`check_cooperative_inventory`**: Real-time cross-referencing of government-registered commercial brands, active ingredients, formulations, stock availability, and unit pricing across authorized regional agricultural cooperatives within 15 km.
  - *Autonomous Re-Routing:* If a primary fungicide is depleted, the agent re-routes fulfillment to a secondary cooperative stocking bio-certified or equivalent systemic alternatives.

### 4. Prescriptive Fulfillment & Verified Pickup Pass
Synthesizes pathology, weather, and inventory into an actionable **Mitigation Card**:
- Tailored water volume and tank-mixing dilution calculated for the farmer's specific acreage.
- Step-by-step phased application schedule (Immediate, Primary Window, 48h Follow-up).
- Pre-harvest interval (PHI) and re-entry interval (REI) safety windows.
- **One-Click Reservation:** Generates a cryptographic pickup voucher with order ID, cooperative contact info, and a QR code for instant counter redemption.

---

## 4. Benchmark Agricultural Evaluation Scenarios

BioLoop AI includes five pre-configured benchmark scenarios representing critical global crops and edge cases:

| Case ID | Crop & Region | Target Pathology | Weather Profile | Agentic Decision & Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Tomato**<br>Nakuru, Kenya | Late Blight<br>(*Phytophthora infestans*) | Convective storm front in 3.2h (88% rain probability, 34mm). | **Dynamic Wash-Off Override:** Cancels contact foliar Mancozeb; pivots to systemic *Ridomil Gold MZ* root drench + *Trichoderma* soil inoculation. |
| **02** | **Potato**<br>Salinas Valley, USA | Early Blight<br>(*Alternaria solani*) | Clear skies, 0% rain, low humidity. | **Foliar Clearance:** Standard protective contact spray (*Bravo Weather Stik*) approved for immediate morning application. |
| **03** | **Tomato**<br>Nashik, India | Dual Infection<br>(*ToMV + Septoria*) | High humidity, intermittent drizzle. | **Uncertainty Flag Tripped:** High visual entropy (0.79). Halts chemical spray; activates bio-security quarantine and lab PCR submission pass. |
| **04** | **Coffee**<br>Huila, Colombia | Coffee Leaf Rust<br>(*Hemileia vastatrix*) | High leaf wetness (14h), mountainous mist. | **Supply Re-Routing:** Primary copper protectant out of stock; autonomously re-routes to secondary biological depot for *Bacillus subtilis* (*Serenade ASO*). |
| **05** | **Maize**<br>Eldoret, Kenya | Northern Corn Blight<br>(*Exserohilum turcicum*) | High wind gusts (38 km/h), dry afternoon. | **Drift Postponement Gate:** Prohibits afternoon boom spray to prevent pasture drift; schedules calm early dawn window (05:45 AM). |
| **Custom** | **Banana**<br>Plantation Corridors | Black Sigatoka<br>(*Pseudocercospora fijiensis*) | Variable tropical showers. | **Custom Image Ingestion:** Isolates marginal chlorotic halo bands and lamina tearing; allocates systemic triazole (*Tilt 250 EC*) and mineral spray oil. |

---

## 5. Technical Stack & Deployment Architecture

* **Frontend Framework:** React 19 SPA running on Vite 8.
* **Styling & Typography:** Tailwind CSS v4, DM Sans typographic hierarchy, JetBrains Mono for telemetry.
* **Full-Stack Runtime:** Node.js 22 (LTS) running Express with Vite middlewares mounted in development.
* **AI Model & SDK:** `@google/genai` (v2.4.0) with model `gemini-3.8-flash`.
* **Tool Orchestration:** Gemini Function Declarations (`fetch_microclimate_data`, `check_cooperative_inventory`) executed over multi-turn server-side sessions.
* **Deployment Target:** Containerized and hosted on **Google Cloud Run** on port 3000.
* **Icons & Visuals:** `lucide-react`, high-fidelity anatomical SVG biological renders, `canvas-confetti` for fulfillment feedback.

---

## 6. Getting Started & Local Development

### Prerequisites
- Node.js version 20+ or 22+
- npm (Node Package Manager)
- A Google Gemini API Key (configured in `.env` or Google AI Studio Secrets)

### Installation
```bash
# Clone repository
git clone https://github.com/your-repo/bioloop-ai.git
cd bioloop-ai

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and insert your GEMINI_API_KEY
```

### Running Locally
```bash
# Start full-stack development server (Express + Vite on port 3000)
npm run dev

# Open browser
# Navigate to: http://localhost:3000
```

### Production Build
```bash
# Compile production bundle
npm run build

# Start production server
npm start
```

---

## 7. Competition Summary & Hackathon Judging Matrix

| Judging Dimension | Weight | BioLoop AI Architecture Implementation |
| :--- | :---: | :--- |
| **Google AI Models Integration** | Mandatory | Entire cognitive workflow runs server-side on **Gemini 3.8 Flash** via `@google/genai`. Multimodal reasoning directly powers fine-grained symptom isolation and visual entropy scoring. |
| **Agentic Framework Implementation** | Mandatory | Operates as a true multi-turn autonomous agent using Function Calling (Tools). The agent autonomously decides when to check weather, how to adapt when wash-off risk is detected, and routes local supply inventory. |
| **Technical Complexity & Robustness** | **40%** | Zero-shot multimodal symptom localization, Shannon entropy gating, deterministic safety overrides, real-time tool execution traces, and containerized Cloud Run deployment. |
| **Social, Economic & Environmental Impact** | **25%** | Eliminates chemical runoff into soil/waterways (SDG 12 & 15), protects smallholder crop yields and household food security (SDG 2), and builds resilience against extreme weather events (SDG 13). |

---

*BioLoop AI — Bridging the gap between digital crop diagnosis and physical agro-supply fulfillment.*
