import { useEffect, useState } from "react";
import { assetService } from "../services/assetService";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import "../styles/pages/AssetPage.scss";

function AssetPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simbolo, setSimbolo] = useState("");
  const [tipo, setTipo] = useState("");
  const [tradesMap, setTradesMap] = useState({});

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await assetService.getAllAssets();
      setAssets(data);
    } catch (error) {
      alert("❌ Errore nel recupero asset: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!simbolo.trim() || !tipo.trim()) {
      alert("⚠️ Compila entrambi i campi");
      return;
    }

    const newAsset = { simbolo, tipo };
    console.log("📤 Invio asset:", newAsset);

    try {
      await assetService.createAsset(newAsset);
      setSimbolo("");
      setTipo("");
      fetchAssets();
    } catch (error) {
      console.error("❌ Errore nella creazione asset:", error);
      alert("❌ Creazione asset fallita: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo asset?")) {
      await assetService.deleteAsset(id);
      fetchAssets();
    }
  };

  const handleClearTrades = async (id) => {
    if (window.confirm("Svuotare tutti i trade associati?")) {
      await assetService.clearTrades(id);
      fetchAssets();
    }
  };

  const toggleTrades = async (id) => {
    if (tradesMap[id]) {
      setTradesMap((prev) => ({ ...prev, [id]: null }));
    } else {
      const trades = await assetService.getTradesByAssetId(id);
      setTradesMap((prev) => ({ ...prev, [id]: trades }));
    }
  };

  return (
    <div className="asset-page">
      <Card>
        <h2 className="text-center mb-3">Gestione Asset</h2>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Simbolo"
            name="simbolo"
            type="text"
            value={simbolo}
            onChange={(e) => setSimbolo(e.target.value)}
            placeholder="Es: EUR/USD"
            required
          />

          <FormField
            label="Tipo"
            name="tipo"
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Es: Forex, Crypto..."
            required
          />

          {/* ✅ USO CORRETTO DEL COMPONENTE */}
          <PrimaryButton type="submit" text="Aggiungi Asset" />
        </form>
      </Card>

      {loading ? (
        <Spinner />
      ) : (
        assets.map((asset) => (
          <Card key={asset.id}>
            <div className="asset-info">
              <p>
                <strong>Simbolo:</strong> {asset.simbolo}
              </p>
              <p>
                <strong>Tipo:</strong> {asset.tipo}
              </p>
            </div>

            <div className="actions mt-3">
              <button
                className="btn secondary"
                onClick={() => toggleTrades(asset.id)}
              >
                {tradesMap[asset.id] ? "Nascondi Trades" : "Vedi Trades"}
              </button>
              <button
                className="btn danger"
                onClick={() => handleDelete(asset.id)}
              >
                Elimina
              </button>
              <button
                className="btn secondary"
                onClick={() => handleClearTrades(asset.id)}
              >
                Clear Trades
              </button>
            </div>

            {tradesMap[asset.id] && (
              <div className="trades mt-3">
                <h4>Trades associati:</h4>
                {tradesMap[asset.id].length === 0 ? (
                  <p className="text-muted">Nessun trade.</p>
                ) : (
                  <ul>
                    {tradesMap[asset.id].map((trade) => (
                      <li key={trade.id}>
                        {new Date(trade.dataAcquisto).toLocaleDateString()} -{" "}
                        {trade.tipologia}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
}

export default AssetPage;
