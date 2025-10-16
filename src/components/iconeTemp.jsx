import { useMemo } from 'react';
import chuvaDia from '../assets/icons/chuvaDia.png';
import noiteChuva from '../assets/icons/chuvaNoite.png';
import noiteNub from '../assets/icons/noiteNub.png';
import noiteBoa from '../assets/icons/noiteBoa.png';
import diaNub from '../assets/icons/diaNub.png';
import diaBom from '../assets/icons/diaBom.png';

function IconeTemp({ precipitationSumDay, sunset, sunrise, cloudcover }) {
  const iconeAtual = useMemo(() => {
    const hoje = new Date();
    const hours = hoje.getHours();

    // Parse robusto de horas
    const parseHour = (val, fallback) => {
      if (val == null) return fallback;
      if (typeof val === 'string' && val.includes(':')) {
        return parseInt(val.split(':')[0], 10);
      }
      const parsed = parseInt(val, 10);
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    const horaSunrise = parseHour(sunrise, 6);
    const horaSunset = parseHour(sunset, 18);
    const cloudcoverHour = cloudcover?.[hours] ?? 0;

    // Determina se é noite
    const isNight = hours >= horaSunset || hours < horaSunrise;

    // Lógica de seleção do ícone
    if (cloudcoverHour > 40 && precipitationSumDay >= 5 && isNight) {
      return noiteChuva;
    }

    if (cloudcoverHour > 40 && precipitationSumDay < 5 && isNight) {
      return noiteNub;
    }

    if (cloudcoverHour <= 40 && isNight) {
      return noiteBoa;
    }

    // Dia
    if (cloudcoverHour > 40 && precipitationSumDay >= 5) {
      return chuvaDia;
    }

    if (cloudcoverHour > 40 && precipitationSumDay < 5) {
      return diaNub;
    }

    return diaBom;
  }, [precipitationSumDay, sunset, sunrise, cloudcover]);

  return (
    <div className="divIconeTemp">
      <img
        src={iconeAtual}
        alt="Ícone do clima atual"
        className="pixel-icon pixel-icon-animated"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export default IconeTemp;