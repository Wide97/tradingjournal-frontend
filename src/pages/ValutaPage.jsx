import { useEffect, useState } from "react";
import { valutaService } from "../services/valutaService";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import "../styles/pages/ValutaPage.scss";

export default function ValutaPage() {
  const [valute, setValute] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codice, setCodice] = useState("");
  const [nome, setNome] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchValute();
  }, []);

  const fetchValute = async () => {
    try {
      setLoading(true);
      const data = await valutaService.getAllValute();
      setValute(data);
    } catch (err) {
      alert("Errore nel recupero valute: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codice.trim() || !nome.trim() || !simbolo.trim()) return;

    try {
      if (editId) {
        await valutaService.createValuta({ id: editId, codice, nome, simbolo });
      } else {
        await valutaService.createValuta({ codice, nome, simbolo });
      }

      setCodice("");
      setNome("");
      setSimbolo("");
      setEditId(null);
      fetchValute();
    } catch (err) {
      alert("Errore nel salvataggio valuta: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Eliminare questa valuta?")) return;
    try {
      await valutaService.deleteValuta(id);
      fetchValute();
    } catch (err) {
      alert("Errore nell'eliminazione: " + err.message);
    }
  };

  const handleEdit = (valuta) => {
    setCodice(valuta.codice);
    setNome(valuta.nome);
    setSimbolo(valuta.simbolo);
    setEditId(valuta.id);
  };

  const cancelEdit = () => {
    setCodice("");
    setNome("");
    setSimbolo("");
    setEditId(null);
  };

  return (
    <div className="valuta-page container mt-4">
      <h2 className="text-center">💱 Gestione Valute</h2>

      <form onSubmit={handleSubmit} className="valuta-form my-4">
        <FormField
          label="Codice"
          value={codice}
          onChange={(e) => setCodice(e.target.value)}
        />
        <FormField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <FormField
          label="Simbolo"
          value={simbolo}
          onChange={(e) => setSimbolo(e.target.value)}
        />

        <div className="form-buttons">
          <PrimaryButton
            text={editId ? "Salva Modifiche" : "Aggiungi Valuta"}
            type="submit"
          />
          {editId && (
            <PrimaryButton
              text="Annulla"
              onClick={cancelEdit}
              className="secondary ms-2"
              type="button"
            />
          )}
        </div>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <div className="valute-list">
          {valute.map((v) => (
            <div key={v.id} className="valuta-card">
              <div>
                <strong>{v.codice}</strong> - {v.nome} ({v.simbolo})
              </div>
              <div>
                <PrimaryButton
                  text="Modifica"
                  onClick={() => handleEdit(v)}
                  className="warning btn-sm me-2"
                />
                <PrimaryButton
                  text="Elimina"
                  onClick={() => handleDelete(v.id)}
                  className="danger btn-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
