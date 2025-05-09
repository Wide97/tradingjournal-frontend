import { fetchWrapper } from './fetchWrapper';

const baseUrl = '/api/trader';

export const traderService = {
  createTrader,
  getAllTraders,
  getTraderById,
  deleteTrader,
  findByUsername,
  findByEmail,
  existsByEmail,
  existsByUsername,
  aggiornaCapitale,
  resettaCapitale,
  contaTrade,
  profittoTotale,
  winrate,
  resettaTutto
};

// ────── CRUD BASE ──────

async function createTrader(trader) {
  return await fetchWrapper.post(baseUrl, trader);
}

async function getAllTraders() {
  return await fetchWrapper.get(baseUrl);
}

async function getTraderById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function deleteTrader(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}`);
}

// ────── LOGIN / RICERCA ──────

async function findByUsername(username) {
  return await fetchWrapper.get(`${baseUrl}/username/${username}`);
}

async function findByEmail(email) {
  return await fetchWrapper.get(`${baseUrl}/email/${email}`);
}

async function existsByEmail(email) {
  return await fetchWrapper.get(`${baseUrl}/exists/email/${email}`);
}

async function existsByUsername(username) {
  return await fetchWrapper.get(`${baseUrl}/exists/username/${username}`);
}

// ────── CAPITALE ──────

async function aggiornaCapitale(id, variazione) {
  return await fetchWrapper.put(`${baseUrl}/${id}/aggiorna-capitale?variazione=${variazione}`);
}

async function resettaCapitale(id) {
  return await fetchWrapper.put(`${baseUrl}/${id}/resetta-capitale`);
}

// ────── ANALISI ──────

async function contaTrade(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}/conta-trade`);
}

async function profittoTotale(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}/profitto-totale`);
}

async function winrate(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}/winrate`);
}

// ────── RESET COMPLETO ──────

async function resettaTutto(id) {
  return await fetchWrapper.put(`${baseUrl}/${id}/resetta`);
}
