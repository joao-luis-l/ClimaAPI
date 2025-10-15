import axios from 'axios';
import "./App.css";
import DiaAtual from "./components/diaHoje";
import { Fragment, useState } from "react";
import TempAtual from "./components/tempAtual";
import Min_Max from "./components/min_max";
import TempHora from "./components/tempHora";
import Precipitation from "./components/previsao";
import DiasDaSemana from "./components/diaSemana";
import Background from "./components/Background";
import IconeTemp from "./components/iconeTemp";

function App() {
  const [inputValue, setInputValue] = useState("Porto Alegre");
  const [temperature2, setTemperature2] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [minSemana, setMinSemana] = useState([]);
  const [maxSemana, setMaxSemana] = useState([]);
  const [sunriseDate, setSunrise] = useState(new Date());
  const [sunsetDate, setSunset] = useState(new Date());
  const [sunriseSemana, setSunriseSemana] = useState([]);
  const [sunsetSemana, setSunsetSemana] = useState([]);
  const [cloudcover, setCloudcover] = useState([]);
  const [precipitationSumDay, setPrecipitationSumDay] = useState(0);
  const [precipitationSum, setPrecipitationSum] = useState([]);
  const [precipitationProbDay, setPrecipitationProbDay] = useState(0);
  const [precipitationProb, setPrecipitationProb] = useState([]);
  const [tempHoraAtual, setTempHoraAtual] = useState(0);
  const [currentCityHour, setCurrentCityHour] = useState(new Date().getHours()); // ✅ NOVO STATE

  const formatter = new Intl.DateTimeFormat("pt-BR", { hour: "numeric", minute: "numeric", hour12: false });
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const getData = async () => {
    if (!inputValue) return;

    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=${API_KEY}`
      );

      if (!geoResponse.data || geoResponse.data.length === 0) {
        window.alert("Cidade não encontrada. Verifique o nome.");
        return;
      }

      const { lat, lon } = geoResponse.data[0];

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=alerts&appid=${API_KEY}`
      );

      const data = weatherResponse.data;
      console.log("DADOS DA API:", data);

      if (!data.hourly || !data.daily) {
        window.alert("Não foi possível carregar os dados do clima.");
        return;
      }

      // ✅ Pegar a hora atual da cidade pesquisada (não a hora local do navegador)
      const cityCurrentTime = new Date(data.current.dt * 1000);
      const cityHour = cityCurrentTime.getUTCHours(); // Hora UTC
      
      // Ajustar para o timezone da cidade
      const timezoneOffsetHours = data.timezone_offset / 3600; // offset em horas
      const adjustedHour = (cityHour + timezoneOffsetHours) % 24;
      
      console.log("⏰ HORA DA CIDADE:", {
        timestamp: data.current.dt,
        cityTime: cityCurrentTime.toISOString(),
        utcHour: cityHour,
        timezoneOffset: timezoneOffsetHours,
        adjustedHour: Math.floor(adjustedHour)
      });

      // States
      const tempArr = data.hourly.map(h => h.temp);
      setTemperature2(tempArr);
      setTempHoraAtual(tempArr[Math.floor(adjustedHour)]); // Usar hora ajustada
      setCurrentCityHour(Math.floor(adjustedHour)); // ✅ SETAR HORA DA CIDADE
      setMin(data.daily[0].temp.min);
      setMax(data.daily[0].temp.max);
      setMinSemana(data.daily.slice(1, 7).map(d => d.temp.min));
      setMaxSemana(data.daily.slice(1, 7).map(d => d.temp.max));
      setSunrise(new Date(data.daily[0].sunrise * 1000));
      setSunset(new Date(data.daily[0].sunset * 1000));
      setSunriseSemana(data.daily.map(d => new Date(d.sunrise * 1000)));
      setSunsetSemana(data.daily.map(d => new Date(d.sunset * 1000)));
      setCloudcover(data.hourly.map(h => h.clouds));
      setPrecipitationSumDay(data.daily[0].rain || 0);
      setPrecipitationSum(data.daily.slice(1, 7).map(d => d.rain || 0));
      setPrecipitationProbDay(data.daily[0].pop * 100);
      setPrecipitationProb(data.daily.slice(1, 7).map(d => d.pop * 100));

    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      window.alert("Ocorreu um erro ao buscar os dados da cidade.");
    }
  };

  return (
    <Fragment>
      <Background
        className='background'
        precipitationSumDay={precipitationSumDay}
        sunrise={formatter.format(sunriseDate)}
        sunset={formatter.format(sunsetDate)}
        cloudcover={cloudcover}
        currentHour={currentCityHour} // ✅ PASSAR HORA DA CIDADE
      />

      <div className="body">
        <div className="mainEsq">
          <div className="cloudsIcon">
            <img className="imageLogo" src="/public/vite.svg" />
          </div>
          <div className="inputPrincipal">
            <input
              className="city"
              placeholder=" &#x1F4CD; Cidade"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && getData()}
            />
          </div>

          <div className="infoMomento">
            <div className="infoMomentoSL">
              <div className="tempDiaEPrec">
                <div className="tempEPrec">
                  <div className="tempAtual">
                    <TempAtual temperature={tempHoraAtual} />
                  </div>
                  <div className="diaAtual">
                    <DiaAtual />
                  </div>
                </div>
              </div>
              <div className="icon_min_max">
                <IconeTemp
                  precipitationSumDay={precipitationSumDay}
                  cloudcover={cloudcover}
                  sunrise={formatter.format(sunriseDate)}
                  sunset={formatter.format(sunsetDate)}
                />
                <Min_Max min={min} max={max} />
                <Precipitation precipitationSumDay={precipitationSumDay} />
              </div>
            </div>
          </div>

          <h6 className="diaTempHora">Hoje</h6>
          <TempHora
            temperature2={temperature2}
            sunrise={formatter.format(sunriseDate)}
            sunset={formatter.format(sunsetDate)}
          />
        </div>

        <div className="mainDir">
          <DiasDaSemana
            maxSemana={maxSemana}
            minSemana={minSemana}
            cloudcover={cloudcover}
            precipitationProb={precipitationProb}
            precipitationSum={precipitationSum}
            sunriseSemana={sunriseSemana}
            sunsetSemana={sunsetSemana}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;