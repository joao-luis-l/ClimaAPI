
import React from 'react';
import Sunrise from './sunrise';
import Sunset from './Sunset';

const TempHora = ({ temperature2, sunrise, sunset, currentHour }) => {
  // Usa a hora da cidade pesquisada, não a hora local
  const cityHour = currentHour ?? new Date().getHours();
  const next12Hours = [];

  for (let i = cityHour; i < cityHour + 12; i++) {
    next12Hours.push(i % 24);
  }

  return (
    <div className='tempHora'>
      <div className='componenteTempHora' style={{ display: 'flex' }}>
        {next12Hours.map((hour, index) => (
          <div className="componenteInternoTempHora" key={index}>
            <span>{hour}:00</span><br /> {temperature2[hour]?.toFixed(0) ?? '--'}°
          </div>
        ))}
      </div>

      {cityHour <= 12 && sunrise && <Sunrise sunrise={sunrise} />}
      {cityHour > 12 && sunset && <Sunset sunset={sunset} />}
    </div>
  );
};

export default TempHora;