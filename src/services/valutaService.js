import { fetchWrapper } from './fetchWrapper';

const baseUrl = '/api/valute';

export const valutaService = {
  createValuta,
  getAllValute,
  getValutaById,
  deleteValuta,
  getByCodice,
  existsByCodice,
  getSimboloByCodice,
  getAllOrdered
};

// ────── CRUD BASE ──────

async function createValuta(valuta) {
  return await fetchWrapper.post(baseUrl, valuta);
}

async function getAllValute() {
  return await fetchWrapper.get(baseUrl);
}

async function getValutaById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function deleteValuta(id) {
  return await fetchWrapper.del(`${baseUrl}/${id}`);
}

// ────── EXTRA ──────

async function getByCodice(codice) {
  return await fetchWrapper.get(`${baseUrl}/codice/${codice}`);
}

async function existsByCodice(codice) {
  return await fetchWrapper.get(`${baseUrl}/codice/${codice}/exists`);
}

async function getSimboloByCodice(codice) {
  return await fetchWrapper.get(`${baseUrl}/codice/${codice}/simbolo`);
}

async function getAllOrdered() {
  return await fetchWrapper.get(`${baseUrl}/ordered`);
}
