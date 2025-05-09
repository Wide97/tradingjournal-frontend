import { fetchWrapper } from './fetchWrapper';

const baseUrl = '/api/capitale';

export const capitaleService = {
  createCapitale,
  getAll,
  getById,
  deleteById,
  getByTraderAndDate,
  getAllByTrader,
  addNewCapitale,
  deleteAllByTrader
};

// ────────────────
// CRUD BASE
// ────────────────

async function createCapitale(capitale) {
  return await fetchWrapper.post(baseUrl, capitale);
}

async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function deleteById(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}`);
}

// ────────────────
// FUNZIONI AGGIUNTIVE
// ────────────────

async function getByTraderAndDate(traderId, date) {
  return await fetchWrapper.get(`${baseUrl}/trader/${traderId}/date/${date}`);
}

async function getAllByTrader(traderId) {
  return await fetchWrapper.get(`${baseUrl}/trader/${traderId}`);
}

async function addNewCapitale(traderId, date, valore) {
  const params = new URLSearchParams({
    traderId,
    date,
    valore
  });
  return await fetchWrapper.post(`${baseUrl}/add?${params.toString()}`);
}

async function deleteAllByTrader(traderId) {
  return await fetchWrapper.del(`${baseUrl}/trader/${traderId}`);
}
