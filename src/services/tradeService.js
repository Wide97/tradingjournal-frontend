import { fetchWrapper } from './fetchWrapper';

const baseUrl = '/api/trades';

export const tradeService = {
  createTrade,
  getAllTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
  getByTraderId,
  getProfittoTotale,
  getWinrate,
  getMyTrades,
  getMyWinrate,
  getMyProfittoTotale
};

// ──────────────── CRUD BASE ────────────────

async function createTrade(trade) {
  return await fetchWrapper.post(baseUrl, trade);
}

async function getAllTrades() {
  return await fetchWrapper.get(baseUrl);
}

async function getTradeById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function updateTrade(id, trade) {
  return await fetchWrapper.put(`${baseUrl}/${id}`, trade);
}

async function deleteTrade(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}`);
}

// ──────────────── FILTRI / ANALISI ────────────────

async function getByTraderId(traderId) {
  return await fetchWrapper.get(`${baseUrl}/trader/${traderId}`);
}

async function getProfittoTotale(traderId) {
  return await fetchWrapper.get(`${baseUrl}/trader/${traderId}/profitto`);
}

async function getWinrate(traderId) {
  return await fetchWrapper.get(`${baseUrl}/trader/${traderId}/winrate`);
}

// ──────────────── UTENTE LOGGATO (via JWT) ────────────────

async function getMyTrades() {
  return await fetchWrapper.get(`${baseUrl}/me`);
}

async function getMyWinrate() {
  return await fetchWrapper.get(`${baseUrl}/me/winrate`);
}

async function getMyProfittoTotale() {
  return await fetchWrapper.get(`${baseUrl}/me/profitto`);
}
