import { Fragment, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";

// Components
import DiaAtual from "./components/diaHoje";
import TempAtual from "./components/tempAtual";
import Min_Max from "./components/min_max";
import TempHora from "./components/tempHora";
import Precipitation from "./components/previsao";
import DiasDaSemana from "./components/diaSemana";
import Background from "./components/Background";
import IconeTemp from "./components/iconeTemp";

// Constants
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const INITIAL_CITY = "Porto Alegre";

// Utils
const formatTime = (date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);
};

function App() {
  // Estado consolidado
  const [inputValue, setInputValue] = useState(INITIAL_CITY);
  const [weatherData, setWeatherData] = useState({
    temperature2: [],
    tempHoraAtual: 0,
    min: 0,
    max: 0,
    minSemana: [],
    maxSemana: [],
    sunriseDate: new Date(),
    sunsetDate: new Date(),
    sunriseSemana: [],
    sunsetSemana: [],
    cloudcover: [],
    precipitationSumDay: 0,
    precipitationSum: [],
    precipitationProbDay: 0,
    precipitationProb: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar coordenadas
  const fetchCoordinates = async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: city,
          limit: 1,
          appid: API_KEY,
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("Cidade não encontrada. Verifique o nome.");
    }

    return response.data[0];
  };

  // Função para buscar dados do clima
  const fetchWeatherData = async (lat, lon) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall`,
      {
        params: {
          lat,
          lon,
          units: "metric",
          lang: "pt_br",
          exclude: "alerts",
          appid: API_KEY,
        },
      }
    );

    if (!response.data.hourly || !response.data.daily) {
      throw new Error("Não foi possível carregar os dados do clima.");
    }

    return response.data;
  };

  // Função para processar dados da API
  const processWeatherData = (data) => {
    const currentHour = new Date().getHours();
    const tempArr = data.hourly.map((h) => h.temp);

    return {
      temperature2: tempArr,
      tempHoraAtual: tempArr[currentHour] || 0,
      min: data.daily[0].temp.min,
      max: data.daily[0].temp.max,
      minSemana: data.daily.slice(1, 7).map((d) => d.temp.min),
      maxSemana: data.daily.slice(1, 7).map((d) => d.temp.max),
      sunriseDate: new Date(data.daily[0].sunrise * 1000),
      sunsetDate: new Date(data.daily[0].sunset * 1000),
      sunriseSemana: data.daily.map((d) => new Date(d.sunrise * 1000)),
      sunsetSemana: data.daily.map((d) => new Date(d.sunset * 1000)),
      cloudcover: data.hourly.map((h) => h.clouds),
      precipitationSumDay: data.daily[0].rain || 0,
      precipitationSum: data.daily.slice(1, 7).map((d) => d.rain || 0),
      precipitationProbDay: (data.daily[0].pop || 0) * 100,
      precipitationProb: data.daily.slice(1, 7).map((d) => (d.pop || 0) * 100),
    };
  };

  // Função principal para buscar dados
  const getData = useCallback(async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Buscar coordenadas
      const { lat, lon } = await fetchCoordinates(inputValue);

      // 2. Buscar dados do clima
      const data = await fetchWeatherData(lat, lon);

      // 3. Processar e atualizar estado
      const processedData = processWeatherData(data);
      setWeatherData(processedData);

      console.log("Dados carregados com sucesso:", processedData);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(err.message || "Ocorreu um erro ao buscar os dados da cidade.");
    } finally {
      setLoading(false);
    }
  }, [inputValue]);

  // Handler para tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getData();
    }
  };

  return (
    <Fragment>
      <Background
        precipitationSumDay={weatherData.precipitationSumDay}
        sunrise={formatTime(weatherData.sunriseDate)}
        sunset={formatTime(weatherData.sunsetDate)}
        cloudcover={weatherData.cloudcover}
      />

      <div className="body">
        <div className="mainEsq">
          <div className="inputPrincipal">
            <input
              className="city"
              placeholder=" 📍 Cidade"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Nome da cidade"
            />
            {loading && <span className="loading-text">Carregando...</span>}
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="infoMomento">
            <div className="infoMomentoSL">
              <div className="tempDiaEPrec">
                <div className="tempEPrec">
                  <div className="tempAtual">
                    <TempAtual temperature={weatherData.tempHoraAtual} />
                  </div>
                  <div className="diaAtual">
                    <DiaAtual />
                  </div>
                </div>
              </div>

              <div className="icon_min_max">
                <Min_Max min={weatherData.min} max={weatherData.max} />
                <Precipitation
                  precipitationSumDay={weatherData.precipitationSumDay}
                />
              </div>
            </div>
          </div>

          <h6 className="diaTempHora">Hoje</h6>
          <TempHora
            temperature2={weatherData.temperature2}
            sunrise={formatTime(weatherData.sunriseDate)}
            sunset={formatTime(weatherData.sunsetDate)}
          />
        </div>

        <div className="mainDir">
          <DiasDaSemana
            maxSemana={weatherData.maxSemana}
            minSemana={weatherData.minSemana}
            cloudcover={weatherData.cloudcover}
            precipitationProb={weatherData.precipitationProb}
            precipitationSum={weatherData.precipitationSum}
            sunriseSemana={weatherData.sunriseSemana}
            sunsetSemana={weatherData.sunsetSemana}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;