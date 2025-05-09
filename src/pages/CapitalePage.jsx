import { useEffect, useState } from "react";
import { capitaleService } from "../services/capitaleService";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import "../styles/pages/CapitalePage.scss";

function CapitalePage() {
  const traderId = localStorage.getItem("traderId");
  const [capitali, setCapitali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valore, setValore] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!traderId) {
      alert("Trader non loggato.");
      return;
    }
    fetchCapitali();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCapitali = async () => {
    try {
      setLoading(true);
      const data = await capitaleService.getAllByTrader(traderId);
      console.log("📊 Capitali ricevuti:", data);
      setCapitali(data);
    } catch (error) {
      alert("Errore nel recupero dei capitali: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!date || !valore) return;

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

  return (
    <div className="capitale-page">
      <h2 className="text-center">📈 Il tuo Capitale</h2>

      <form onSubmit={handleAdd} className="capitale-form">
        <FormField
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <FormField
          label="Valore (€)"
          type="number"
          value={valore}
          onChange={(e) => setValore(e.target.value)}
        />
        <PrimaryButton type="submit" text="Aggiungi" />
      </form>

      <hr className="divider" />

      {loading ? (
        <Spinner />
      ) : (
        <div className="capitale-list">
          {capitali.length === 0 ? (
            <p className="text-center">Nessun capitale presente.</p>
          ) : (
            capitali.map((cap) => (
              <div key={cap.id} className="capitale-item">
                <p>
                  <strong>{cap.data}</strong> — {cap.valore.toFixed(2)} €{" "}
                  {typeof cap.variazione === "number" &&
                    cap.variazione !== 0 &&
                    `(Δ ${cap.variazione.toFixed(2)})`}
                </p>
                <PrimaryButton
                  onClick={() => handleDelete(cap.id)}
                  danger
                  text="Elimina"
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CapitalePage;
