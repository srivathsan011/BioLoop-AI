import type { MicroclimateData, MicroclimateForecastPoint } from '../types/bioloop.ts';

export function getMicroclimateForCoordinates(
  lat: number,
  lng: number,
  locality?: string,
  weatherOverride?: 'rain_imminent' | 'dry_clear' | 'wind_hazard' | 'high_humidity'
): MicroclimateData {
  // Determine preset conditions or coordinate based
  const isRainOverride = weatherOverride === 'rain_imminent' || (lat < 1 && lat > -2 && lng > 34); // Kenya default if tomato
  const isDryOverride = weatherOverride === 'dry_clear' || (lat > 30 && lng < -100);
  const isWindOverride = weatherOverride === 'wind_hazard';

  let temperatureC = 22.4;
  let relativeHumidityPct = 68;
  let leafWetnessDurationHours = 6.5;
  let windSpeedKmH = 9;
  let windGustsKmH = 14;
  let rainImminent = false;
  let nextRainExpectedInHours: number | null = null;
  let foliarWashOffRisk: 'low' | 'moderate' | 'critical' = 'low';
  let windDriftRisk: 'safe' | 'caution' | 'hazardous' = 'safe';
  let atmosphericSummary = 'Favorable spray window with moderate relative humidity and mild winds.';

  const forecast48h: MicroclimateForecastPoint[] = [];

  if (isRainOverride) {
    temperatureC = 19.8;
    relativeHumidityPct = 94;
    leafWetnessDurationHours = 12.8;
    windSpeedKmH = 16;
    windGustsKmH = 28;
    rainImminent = true;
    nextRainExpectedInHours = 3.2;
    foliarWashOffRisk = 'critical';
    windDriftRisk = 'caution';
    atmosphericSummary = 'ALERT: Heavy convective precipitation front arriving in ~3.2 hours (88% prob, 34mm expected). High wash-off risk: contact foliar fungicides applied now will be stripped before translaminar uptake.';

    const rainSchedule = [10, 45, 88, 92, 85, 60, 30, 20, 15, 10, 5, 5];
    const conds = ['Cloudy', 'Overcast', 'Heavy Downpour', 'Violent Storm', 'Thunderstorm', 'Light Rain', 'Overcast', 'Clearing', 'Partly Cloudy', 'Sunny', 'Clear', 'Clear'];
    for (let i = 0; i < 12; i++) {
      forecast48h.push({
        hour: `+${(i + 1) * 4}h`,
        tempC: Math.round(18 + Math.sin(i / 2) * 5),
        rainProbability: rainSchedule[i] || 10,
        condition: conds[i] || 'Clear',
      });
    }
  } else if (isWindOverride) {
    temperatureC = 27.2;
    relativeHumidityPct = 42;
    leafWetnessDurationHours = 1.2;
    windSpeedKmH = 29;
    windGustsKmH = 41;
    rainImminent = false;
    nextRainExpectedInHours = null;
    foliarWashOffRisk = 'low';
    windDriftRisk = 'hazardous';
    atmosphericSummary = 'HAZARD: Wind velocity (29 km/h, gusts 41 km/h) exceeds safe spraying threshold (15 km/h). Severe drift risk into neighboring sensitive vegetation and waterways.';

    for (let i = 0; i < 12; i++) {
      forecast48h.push({
        hour: `+${(i + 1) * 4}h`,
        tempC: Math.round(25 + Math.sin(i / 2) * 6),
        rainProbability: 5,
        condition: i < 4 ? 'High Gusts' : 'Breezy',
      });
    }
  } else if (isDryOverride) {
    temperatureC = 23.5;
    relativeHumidityPct = 38;
    leafWetnessDurationHours = 2.0;
    windSpeedKmH = 7;
    windGustsKmH = 11;
    rainImminent = false;
    nextRainExpectedInHours = null;
    foliarWashOffRisk = 'low';
    windDriftRisk = 'safe';
    atmosphericSummary = 'OPTIMAL: Arid, stable microclimate. 0% precipitation probability over next 72 hours. Ideal window for protective contact foliar deposition.';

    for (let i = 0; i < 12; i++) {
      forecast48h.push({
        hour: `+${(i + 1) * 4}h`,
        tempC: Math.round(21 + Math.sin(i / 2) * 4),
        rainProbability: 0,
        condition: 'Clear Skies',
      });
    }
  } else {
    // Standard mild or humid profile
    temperatureC = 24.1;
    relativeHumidityPct = 78;
    leafWetnessDurationHours = 8.5;
    windSpeedKmH = 11;
    windGustsKmH = 17;
    rainImminent = false;
    nextRainExpectedInHours = 38;
    foliarWashOffRisk = 'moderate';
    windDriftRisk = 'safe';
    atmosphericSummary = 'Moderate humidity with prolonged canopy dew. 36-hour dry window available before secondary front.';

    for (let i = 0; i < 12; i++) {
      forecast48h.push({
        hour: `+${(i + 1) * 4}h`,
        tempC: Math.round(22 + Math.sin(i / 2) * 3),
        rainProbability: i > 8 ? 60 : 15,
        condition: i > 8 ? 'Scattered Rain' : 'Partly Cloudy',
      });
    }
  }

  return {
    locality: locality || 'Regional Farm Basin',
    latitude: lat,
    longitude: lng,
    temperatureC,
    relativeHumidityPct,
    leafWetnessDurationHours,
    windSpeedKmH,
    windGustsKmH,
    solarRadiationWm2: 640,
    precipitationForecast48h: forecast48h,
    rainImminent,
    nextRainExpectedInHours,
    foliarWashOffRisk,
    windDriftRisk,
    atmosphericSummary,
  };
}
