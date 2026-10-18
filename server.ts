import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { runBioLoopAgent } from './src/services/geminiAgent.ts';
import { getMicroclimateForCoordinates } from './src/services/microclimateService.ts';
import { checkCooperativeInventory, generateProcurementOrder, REGIONAL_COOPERATIVE_STOCKS } from './src/services/cooperativeService.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BioLoop AI Autonomous Agronomic Engine',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    activeModel: 'gemini-3.8-flash',
    supportedFeatures: [
      'multimodal_visual_pathology',
      'visual_entropy_evaluation',
      'hyperlocal_microclimate_override',
      'cooperative_inventory_routing',
      'agentic_closed_loop_fulfillment',
    ],
  });
});

// Autonomous diagnosis & fulfillment orchestration endpoint
app.post('/api/agent/diagnose', async (req, res) => {
  try {
    const {
      imageBase64,
      presetCaseId,
      cropType = 'Tomato (Solanum lycopersicum)',
      locality = 'Nakuru County, Kenya',
      latitude = -0.3031,
      longitude = 36.08,
      acreage = 3.5,
      historyNote = 'Expanding water-soaked lesions observed after monsoon showers.',
      audioTranscript,
      weatherOverride,
    } = req.body;

    const plan = await runBioLoopAgent({
      imageBase64,
      presetCaseId,
      cropType,
      locality,
      latitude: Number(latitude),
      longitude: Number(longitude),
      acreage: Number(acreage) || 1,
      historyNote,
      audioTranscript,
      weatherOverride,
    });

    res.json({ success: true, plan });
  } catch (err: any) {
    console.error('Diagnosis agent error:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'Agent reasoning loop encountered an unexpected condition.',
    });
  }
});

// Standalone microclimate endpoint
app.get('/api/microclimate', (req, res) => {
  const lat = Number(req.query.lat) || -0.3031;
  const lng = Number(req.query.lng) || 36.08;
  const locality = (req.query.locality as string) || 'Nakuru County';
  const weatherOverride = req.query.override as any;

  const data = getMicroclimateForCoordinates(lat, lng, locality, weatherOverride);
  res.json(data);
});

// Standalone cooperative inventory check
app.post('/api/inventory/check', (req, res) => {
  const { activeIngredients = [], locality, treatmentMode } = req.body;
  const items = checkCooperativeInventory(activeIngredients, locality, treatmentMode);
  res.json({ items });
});

// Reserve cooperative procurement order
app.post('/api/order/reserve', (req, res) => {
  const { cropType, acreage, selectedItemId, farmerName } = req.body;
  const item = REGIONAL_COOPERATIVE_STOCKS.find((i) => i.id === selectedItemId) || REGIONAL_COOPERATIVE_STOCKS[0];
  const order = generateProcurementOrder(cropType || 'Tomato', acreage || 2.0, item, farmerName);
  res.json({ success: true, order });
});

// Mount Vite middleware in development or serve static files in production
async function startServer() {
  const distPath = path.resolve(process.cwd(), 'dist');

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BioLoop AI Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
