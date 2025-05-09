import { fetchWrapper } from './fetchWrapper';

const baseUrl = '/api/strategie';

export const strategiaService = {
  createStrategia,
  getAllStrategie,
  getStrategiaById,
  deleteStrategia,
  getByNome,
  getTradesByStrategia,
  deleteIfEmpty,
  countTradesPerStrategia
};

// ────────────────
// CRUD BASE
// ────────────────

async function createStrategia(strategia) {
  return await fetchWrapper.post(baseUrl, strategia);
}

async function getAllStrategie() {
  return await fetchWrapper.get(baseUrl);
}

async function getStrategiaById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function deleteStrategia(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}`);
}

// ────────────────
// FUNZIONI CUSTOM
// ────────────────

async function getByNome(nome) {
  return await fetchWrapper.get(`${baseUrl}/nome/${nome}`);
}

async function getTradesByStrategia(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}/trades`);
}

async function deleteIfEmpty(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}/if-empty`);
}

async function countTradesPerStrategia() {
  return await fetchWrapper.get(`${baseUrl}/count-trades`);
}
