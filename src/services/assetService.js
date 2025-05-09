import { fetchWrapper } from './fetchWrapper';

const baseUrl = '/api/assets';

export const assetService = {
  createAsset,
  getAllAssets,
  getAssetById,
  getBySimbolo,
  getByTipo,
  getTradesByAssetId,
  clearTrades,
  deleteAsset
};

// ─────────────────────────────
// CREATE
// ─────────────────────────────
async function createAsset(asset) {
  return await fetchWrapper.post(baseUrl, asset);
}

// ─────────────────────────────
// READ
// ─────────────────────────────
async function getAllAssets() {
  return await fetchWrapper.get(baseUrl);
}

async function getAssetById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function getBySimbolo(simbolo) {
  return await fetchWrapper.get(`${baseUrl}/simbolo/${simbolo}`);
}

async function getByTipo(tipo) {
  return await fetchWrapper.get(`${baseUrl}/tipo/${tipo}`);
}

// ─────────────────────────────
// TRADES ASSOCIATI
// ─────────────────────────────
async function getTradesByAssetId(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}/trades`);
}

async function clearTrades(id) {
  return await fetchWrapper.put(`${baseUrl}/${id}/clear-trades`);
}

// ─────────────────────────────
// DELETE
// ─────────────────────────────
async function deleteAsset(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}`);
}
