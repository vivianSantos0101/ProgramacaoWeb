import axios from 'axios';

const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1';
const OPEN_METEO_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const OPEN_METEO_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getCountryInfo(nomePais: string) {
  try {
    const response = await axios.get(`${REST_COUNTRIES_URL}/name/${encodeURIComponent(nomePais)}`, {
      timeout: 10000,
    });
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
  } catch (error: any) {
    console.error('[REST Countries] Erro:', error.message);
    return null;
  }
}

export async function getWeatherData(cidade: string) {
  try {
    // Step 1: Geocode the city name to get coordinates
    const geoResponse = await axios.get(OPEN_METEO_GEO_URL, {
      params: { name: cidade, count: 1, language: 'pt' },
      timeout: 10000,
    });

    const results = geoResponse.data?.results;
    if (!results || results.length === 0) {
      console.warn(`[Open-Meteo] Cidade "${cidade}" nao encontrada no geocoding`);
      return null;
    }

    const location = results[0];
    const lat = location.latitude;
    const lon = location.longitude;
    const cityName = location.name || cidade;
    const countryCode = location.country_code?.toUpperCase() || '';

    // Step 2: Get current weather using coordinates
    const weatherResponse = await axios.get(OPEN_METEO_WEATHER_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
        timezone: 'auto',
      },
      timeout: 10000,
    });

    const current = weatherResponse.data?.current;
    if (!current) {
      return null;
    }

    // Map WMO weather codes to descriptions and icons
    const weatherDesc = getWeatherDescription(current.weather_code);
    const weatherIcon = getWeatherIcon(current.weather_code);

    return {
      temperatura: current.temperature_2m,
      sensacao: current.apparent_temperature,
      umidade: current.relative_humidity_2m,
      descricao: weatherDesc,
      icone: weatherIcon,
      vento: current.wind_speed_10m,
      cidade: cityName,
      pais: countryCode,
    };
  } catch (error: any) {
    console.error('[Open-Meteo] Erro:', error.message);
    return null;
  }
}

function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Céu limpo',
    1: 'Parcialmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro com geada',
    51: 'Garoa leve',
    53: 'Garoa moderada',
    55: 'Garoa intensa',
    56: 'Garoa congelante leve',
    57: 'Garoa congelante intensa',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva forte',
    66: 'Chuva congelante leve',
    67: 'Chuva congelante forte',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve forte',
    77: 'Granizo fino',
    80: 'Pancadas de chuva leves',
    81: 'Pancadas de chuva moderadas',
    82: 'Pancadas de chuva fortes',
    85: 'Pancadas de neve leves',
    86: 'Pancadas de neve fortes',
    95: 'Tempestade',
    96: 'Tempestade com granizo leve',
    99: 'Tempestade com granizo forte',
  };
  return descriptions[code] || 'Indisponível';
}

function getWeatherIcon(code: number): string {
  // Use simple weather icon URLs based on condition
  if (code === 0) return 'https://openweathermap.org/img/wn/01d@2x.png';
  if (code <= 2) return 'https://openweathermap.org/img/wn/02d@2x.png';
  if (code === 3) return 'https://openweathermap.org/img/wn/04d@2x.png';
  if (code <= 48) return 'https://openweathermap.org/img/wn/50d@2x.png';
  if (code <= 57) return 'https://openweathermap.org/img/wn/09d@2x.png';
  if (code <= 67) return 'https://openweathermap.org/img/wn/10d@2x.png';
  if (code <= 77) return 'https://openweathermap.org/img/wn/13d@2x.png';
  if (code <= 82) return 'https://openweathermap.org/img/wn/09d@2x.png';
  if (code <= 86) return 'https://openweathermap.org/img/wn/13d@2x.png';
  return 'https://openweathermap.org/img/wn/11d@2x.png';
}
