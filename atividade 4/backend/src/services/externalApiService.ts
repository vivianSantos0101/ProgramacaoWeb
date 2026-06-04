import axios from 'axios';

const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1';
const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';

export async function getCountryInfo(nomePais: string) {
  try {
    const response = await axios.get(`${REST_COUNTRIES_URL}/name/${encodeURIComponent(nomePais)}`);
    if (response.data && response.data.length > 0) {
      const country = response.data[0];
      return {
        nomeOficial: country.name?.official || '',
        capital: country.capital?.[0] || '',
        regiao: country.region || '',
        subregiao: country.subregion || '',
        populacao: country.population || 0,
        area: country.area || 0,
        bandeira: country.flags?.svg || country.flags?.png || '',
        brasao: country.coatOfArms?.svg || '',
        mapa: country.maps?.googleMaps || '',
        fusoHorario: country.timezones?.[0] || '',
        moedas: country.currencies
          ? Object.values(country.currencies as Record<string, { name: string; symbol: string }>).map((c: any) => `${c.name} (${c.symbol || ''})`).join(', ')
          : '',
        idiomas: country.languages
          ? Object.values(country.languages as Record<string, string>).join(', ')
          : '',
        ddi: country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getWeatherData(lat: number, lon: number) {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'sua_api_key_openweather') {
    return null;
  }
  try {
    const response = await axios.get(`${OPENWEATHER_URL}/weather`, {
      params: { lat, lon, appid: OPENWEATHER_API_KEY, units: 'metric', lang: 'pt_br' },
    });
    return {
      temperatura: response.data.main?.temp,
      sensacao: response.data.main?.feels_like,
      umidade: response.data.main?.humidity,
      descricao: response.data.weather?.[0]?.description,
      icone: `https://openweathermap.org/img/wn/${response.data.weather?.[0]?.icon}@2x.png`,
      vento: response.data.wind?.speed,
      cidade: response.data.name,
    };
  } catch {
    return null;
  }
}

export async function getPaisCompleto(nomePais: string) {
  const countryInfo = await getCountryInfo(nomePais);
  return countryInfo;
}
