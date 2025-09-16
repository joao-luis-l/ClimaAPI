import React from 'react';
import Sunrise from './sunrise';
import Sunset from './Sunset';

const TempHora = ({ temperature2, sunrise, sunset }) => {
  const currentHour = new Date().getHours();
  const next12Hours = [];

  for (let i = currentHour; i < currentHour + 12; i++) {
    next12Hours.push(i % 24);
  }

  return (
    <div className='tempHora'>
      <div className='componenteTempHora' style={{ display: 'flex' }}>
        {next12Hours.map((hour, index) => (
          <div className="componenteInternoTempHora" key={index}>
            <span>{hour}:00</span><br /> {temperature2[hour]}°
          </div>
        ))}
      </div>

      {currentHour <= 12 && sunrise && <Sunrise sunrise={sunrise} />}
      {currentHour > 12 && sunset && <Sunset sunset={sunset} />}
    </div>
  );
};

export default TempHora;
