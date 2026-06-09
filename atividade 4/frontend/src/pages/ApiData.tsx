import { useState } from 'react';
import { externalApi, CountryInfo, WeatherData } from '../services/api';

export default function ApiData() {
  const [paisNome, setPaisNome] = useState('');
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loadingPais, setLoadingPais] = useState(false);
  const [errorPais, setErrorPais] = useState('');

  const [cidadeNome, setCidadeNome] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [errorWeather, setErrorWeather] = useState('');

  const buscarPais = async () => {
    if (!paisNome.trim()) return;
    setLoadingPais(true);
    setErrorPais('');
    setCountryInfo(null);
    try {
      const res = await externalApi.getPaisInfo(paisNome);
      setCountryInfo(res.data);
    } catch (err: any) {
      setErrorPais(err.response?.data?.error || 'País não encontrado');
    } finally {
      setLoadingPais(false);
    }
  };

  const buscarClima = async () => {
    if (!cidadeNome.trim()) return;
    setLoadingWeather(true);
    setErrorWeather('');
    setWeatherData(null);
    try {
      const res = await externalApi.getClima(cidadeNome);
      setWeatherData(res.data);
    } catch (err: any) {
      setErrorWeather(err.response?.data?.error || 'Clima indisponível');
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <div className="page">
      <div className="breadcrumb"><a href="/">Início</a> <span>/</span> <span>APIs Externas</span></div>
      <h1>APIs Externas</h1>
      <p className="page-subtitle">Consulte informações de países via REST Countries e dados de clima via Open-Meteo.</p>

      <div className="api-grid" style={{ marginTop: '1.5rem' }}>
        {/* Country Info Card */}
        <div className="card">
          <h2>Informações do País</h2>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>Bandeira, capital, moeda, idiomas e mais dados geográficos</p>

          <div className="search-bar">
            <div className="form-group">
              <input
                value={paisNome}
                onChange={(e) => setPaisNome(e.target.value)}
                placeholder="Ex: Brazil, Japan, France..."
                onKeyDown={(e) => e.key === 'Enter' && buscarPais()}
              />
            </div>
            <button className="btn btn-primary" onClick={buscarPais} disabled={loadingPais} style={{ height: '42px' }}>
              {loadingPais ? '...' : 'Buscar'}
            </button>
          </div>

          {errorPais && <div className="alert alert-error" style={{ marginTop: '0.75rem' }}>{errorPais}</div>}

          {loadingPais && (
            <div className="loading-skeleton" style={{ marginTop: '1rem' }}>
              Buscando informações do país...
            </div>
          )}

          {countryInfo && (
            <div className="country-info">
              <div className="country-flags">
                {countryInfo.bandeira && <img src={countryInfo.bandeira} alt="Bandeira" className="flag-img" />}
                {countryInfo.brasao && <img src={countryInfo.brasao} alt="Brasão" className="flag-img" style={{ maxHeight: '70px' }} />}
              </div>
              <div className="info-grid">
                <div><strong>Nome Oficial:</strong> {countryInfo.nomeOficial}</div>
                <div><strong>Capital:</strong> {countryInfo.capital}</div>
                <div><strong>Região:</strong> {countryInfo.regiao}</div>
                <div><strong>Sub-região:</strong> {countryInfo.subregiao}</div>
                <div><strong>População:</strong> {countryInfo.populacao.toLocaleString('pt-BR')}</div>
                <div><strong>Área:</strong> {countryInfo.area.toLocaleString('pt-BR')} km²</div>
                <div><strong>Moedas:</strong> {countryInfo.moedas}</div>
                <div><strong>Idiomas:</strong> {countryInfo.idiomas}</div>
                <div><strong>Fuso Horário:</strong> {countryInfo.fusoHorario}</div>
                <div><strong>DDI:</strong> {countryInfo.ddi}</div>
              </div>
              {countryInfo.mapa && (
                <a href={countryInfo.mapa} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Ver no Google Maps
                </a>
              )}
            </div>
          )}
        </div>

        {/* Weather Card */}
        <div className="card">
          <h2>Clima</h2>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>Temperatura, umidade e vento de qualquer cidade do mundo</p>

          <div className="search-bar">
            <div className="form-group">
              <input
                value={cidadeNome}
                onChange={(e) => setCidadeNome(e.target.value)}
                placeholder="Ex: São Paulo, Tokyo, London..."
                onKeyDown={(e) => e.key === 'Enter' && buscarClima()}
              />
            </div>
            <button className="btn btn-primary" onClick={buscarClima} disabled={loadingWeather} style={{ height: '42px' }}>
              {loadingWeather ? '...' : 'Buscar'}
            </button>
          </div>

          {errorWeather && <div className="alert alert-warning" style={{ marginTop: '0.75rem' }}>{errorWeather}</div>}

          {loadingWeather && (
            <div className="loading-skeleton" style={{ marginTop: '1rem' }}>
              Buscando dados climáticos...
            </div>
          )}

          {weatherData && (
            <div className="weather-info">
              <div className="weather-main">
                {weatherData.icone && <img src={weatherData.icone} alt="Clima" />}
                <div>
                  <strong>{weatherData.cidade}</strong>
                  {weatherData.pais && <span className="text-muted">, {weatherData.pais}</span>}
                  <p className="weather-desc">{weatherData.descricao}</p>
                </div>
                <span className="weather-temp">{Math.round(weatherData.temperatura)}°C</span>
              </div>
              <div className="info-grid">
                <div><strong>Sensação:</strong> {Math.round(weatherData.sensacao)}°C</div>
                <div><strong>Umidade:</strong> {weatherData.umidade}%</div>
                <div><strong>Vento:</strong> {weatherData.vento} m/s</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
