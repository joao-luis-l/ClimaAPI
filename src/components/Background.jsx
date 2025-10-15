import React from 'react'
import diaBom from '../assets/images/sol.png'
import noiteBoa from '../assets/images/noite.png'
import diaChuva from '../assets/images/solChuva.png'      
import noiteChuva from '../assets/images/noiteChuva.png' 
import diaNum from '../assets/images/solNub.png'       
import noiteNum from '../assets/images/noiteNub.png'

function Background(props) {
  const { precipitationSumDay, sunset, sunrise, cloudcover, currentHour } = props

  const hours = currentHour ?? new Date().getHours()

  const parseHour = (val, fallback) => {
    if (val == null) return fallback
    if (typeof val === 'number') {
      if (val > 24) return new Date(val * 1000).getHours()
      return Math.floor(val)
    }
    if (typeof val === 'string' && val.includes(':')) return parseInt(val.split(':')[0], 10)
    const parsed = parseInt(val, 10)
    return Number.isNaN(parsed) ? fallback : parsed
  }

  const horaSunrise = parseHour(sunrise, 6)
  const horaSunset = parseHour(sunset, 18)
  
  const cloudcoverHour = (cloudcover && cloudcover.length > 0) 
    ? (cloudcover[hours] ?? 0) 
    : 0
  
  const precipitacao = precipitationSumDay ?? 0
  const isNight = (hours >= horaSunset) || (hours < horaSunrise)

  console.log('🔍 DEBUG BACKGROUND:', {
    hours,
    horaSunrise,
    horaSunset,
    isNight,
    cloudcoverHour,
    precipitacao,
    resultado: isNight ? 'NOITE' : 'DIA'
  })

  // Noite com chuva
  if (cloudcoverHour > 40 && precipitacao >= 5 && isNight) {
    return (<div className='background'><img src={noiteChuva} alt="noite chuva" /></div>)
  }

  // Noite nublada
  if (cloudcoverHour > 40 && precipitacao < 5 && isNight) {
    return (<div className='background'><img src={noiteNum} alt="noite nublado" /></div>)
  }

  // Noite clara
  if (cloudcoverHour <= 40 && isNight) {
    return (<div className='background'><img src={noiteBoa} alt="noite clara" /></div>)
  }

  // Dia com chuva
  if (cloudcoverHour > 40 && precipitacao >= 5) {
    return (<div className='background'><img src={diaChuva} alt="dia chuva" /></div>)
  }

  // Dia nublado
  if (cloudcoverHour > 40 && precipitacao < 5) {
    return (<div className='background'><img src={diaNum} alt="dia nublado" /></div>)
  }

  // Dia claro
  return (<div className='background'><img src={diaBom} alt="dia claro" /></div>)
}

export default Background