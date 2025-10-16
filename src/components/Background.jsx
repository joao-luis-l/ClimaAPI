import { useState, useEffect, useMemo } from 'react';
import diaBom from '../assets/images/sol.png';
import noiteBoa from '../assets/images/noite.png';
import diaChuva from '../assets/images/sol.png';
import noiteChuva from '../assets/images/noite.png';
import diaNum from '../assets/images/sol.png';
import noiteNum from '../assets/images/noite.png';

function Background({ precipitationSumDay, sunset, sunrise, cloudcover }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState(null);

  // Determina qual background usar
  const backgroundImage = useMemo(() => {
    const hoje = new Date();
    const hours = hoje.getHours();

    // Parse das horas de forma robusta
    const parseHour = (val, fallback) => {
      if (val == null) return fallback;
      if (typeof val === 'number') {
        if (val > 24) return new Date(val * 1000).getHours();
        return Math.floor(val);
      }
      if (typeof val === 'string' && val.includes(':')) {
        return parseInt(val.split(':')[0], 10);
      }
      const parsed = parseInt(val, 10);
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    const horaSunrise = parseHour(sunrise, 6);
    const horaSunset = parseHour(sunset, 18);

    // Pega cloudcover de forma robusta
    const cloudcoverHour =
      (cloudcover && (cloudcover[hours] ?? cloudcover[String(hours)])) ?? 0;

    // Define se é noite
    const isNight = hours >= horaSunset || hours < horaSunrise;

    // Lógica de seleção do background
    if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) >= 5 && isNight) {
      return noiteChuva;
    }

    if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) < 5 && isNight) {
      return noiteNum;
    }

    if (cloudcoverHour <= 40 && isNight) {
      return noiteBoa;
    }

    // Dia
    if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) >= 5) {
      return diaChuva;
    }

    if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) < 5) {
      return diaNum;
    }

    return diaBom;
  }, [precipitationSumDay, sunset, sunrise, cloudcover]);

  // Preload da imagem para transição suave
  useEffect(() => {
    if (!backgroundImage) return;

    setIsLoaded(false);
    const img = new Image();

    img.onload = () => {
      setCurrentBg(backgroundImage);
      setIsLoaded(true);
    };

    img.onerror = () => {
      console.error('Erro ao carregar background:', backgroundImage);
      setCurrentBg(backgroundImage);
      setIsLoaded(true);
    };

    img.src = backgroundImage;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [backgroundImage]);

  return (
    <div className="background" role="presentation" aria-hidden="true">
      {currentBg && (
        <img
          src={currentBg}
          alt=""
          className="pixel-art"
          loading="eager"
          decoding="async"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      )}
    </div>
  );
}

export default Background;