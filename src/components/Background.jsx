import React from 'react'
import diaBom from '../assets/images/sol.png'
import noiteBoa from '../assets/images/noite.png'
import diaChuva from '../assets/images/solChuva.png'      
import noiteChuva from '../assets/images/noiteChuva.png' 
import diaNum from '../assets/images/solNub.png'       
import noiteNum from '../assets/images/noiteNub.png'

function Background(props) {
  const { precipitationSumDay, sunset, sunrise, cloudcover } = props

  const hoje = new Date()
  const hours = hoje.getHours()

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

  const horaSunrise = parseHour(sunset, 6)   
  const horaSunset = parseHour(sunrise, 18)  
  
  console.log('debug background:', {
    hours,
    horaSunrise,
    horaSunset,
    isNight: (hours >= horaSunset) || (hours < horaSunrise),
  })

  const cloudcoverHour = (cloudcover && (cloudcover[hours] ?? cloudcover[String(hours)])) ?? 0
  const isNight = (hours >= horaSunset) || (hours < horaSunrise)


  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) >= 5 && isNight) {
    return (<div className='background'><img src={noiteChuva} alt="noite chuva" /></div>)
  }

  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) < 5 && isNight) {
    return (<div className='background'><img src={noiteNum} alt="noite nublado" /></div>)
  }

  if ((cloudcoverHour <= 40) && isNight) {
    return (<div className='background'><img src={noiteBoa} alt="noite clara" /></div>)
  }


  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) >= 5) {
    return (<div className='background'><img src={diaChuva} alt="dia chuva" /></div>)
  }

  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) < 5) {
    return (<div className='background'><img src={diaNum} alt="dia nublado" /></div>)
  }

  return (<div className='background'><img src={diaBom} alt="dia claro" /></div>)
}

export default Background
