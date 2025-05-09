// src/pages/CapitalePage.jsx
import { useEffect, useState } from "react";
import { capitaleService } from "../services/capitaleService";
import { traderService } from "../services/traderService";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import "../styles/pages/CapitalePage.scss";

function CapitalePage() {
  const [capitali, setCapitali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valore, setValore] = useState("");
  const [date, setDate] = useState("");
  const [traderId, setTraderId] = useState("");
  const [traderList, setTraderList] = useState([]);

  useEffect(() => {
    fetchTraders();
  }, []);

  useEffect(() => {
    if (traderId) fetchCapitali();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traderId]);

  const fetchTraders = async () => {
    try {
      const data = await traderService.getAll();
      setTraderList(data);
      if (data.length > 0) setTraderId(data[0].id);
    } catch (error) {
      alert("Errore nel caricamento dei trader: " + error.message);
    }
  };

  const fetchCapitali = async () => {
    try {
      setLoading(true);
      const data = await capitaleService.getAllByTrader(traderId);
      setCapitali(data);
    } catch (error) {
      alert("Errore nel caricamento dei capitali: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!valore || !date || !traderId) return;

    try {
      await capitaleService.addNewCapitale(traderId, date, parseFloat(valore));
      setValore("");
      setDate("");
      fetchCapitali();
    } catch (error) {
      alert("Errore nell'aggiunta del capitale: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confermi la cancellazione?")) return;

    try {
      await capitaleService.deleteById(id);
      fetchCapitali();
    } catch (error) {
      alert("Errore nella cancellazione: " + error.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Vuoi davvero eliminare tutti i capitali del trader?")) return;

    try {
      await capitaleService.deleteAllByTrader(traderId);
      fetchCapitali();
    } catch (error) {
      alert("Errore nella cancellazione massiva: " + error.message);
    }
  };

  return (
    <div className="capitale-page">
      <h2>📈 Gestione Capitale</h2>

      <form onSubmit={handleAdd} className="capitale-form">
        <FormField
          label="Trader"
          type="select"
          value={traderId}
          onChange={(e) => setTraderId(e.target.value)}
          options={traderList.map((t) => ({ value: t.id, label: t.username }))}
        />
        <FormField label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <FormField label="Valore (€)" type="number" value={valore} onChange={(e) => setValore(e.target.value)} />
        <PrimaryButton type="submit">Aggiungi</PrimaryButton>
      </form>

      <PrimaryButton onClick={handleDeleteAll} danger>
        Elimina tutti i capitali del trader
      </PrimaryButton>

      {loading ? (
        <Spinner />
      ) : (
        <div className="capitale-list">
          {capitali.length === 0 ? (
            <p>Nessun capitale presente.</p>
          ) : (
            capitali.map((cap) => (
              <div key={cap.id} className="capitale-item">
                <p><strong>{cap.data}</strong> — {cap.valore.toFixed(2)} € {cap.variazione !== 0 && `(Δ ${cap.variazione.toFixed(2)})`}</p>
                <PrimaryButton onClick={() => handleDelete(cap.id)} danger>
                  Elimina
                </PrimaryButton>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CapitalePage;
