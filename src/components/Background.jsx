// src/components/Background.jsx
import diaBom from '../assets/backgrounds/diaSol.png'
import noiteBoa from '../assets/backgrounds/noiteBoaBc.png'
import diaChuva from '../assets/backgrounds/diaSol.png'      
import noiteChuva from '../assets/backgrounds/noiteBoaBc.png' 
import diaNum from '../assets/backgrounds/diaSol.png'       
import noiteNum from '../assets/backgrounds/noiteBoaBc.png'

function Background(props) {
  const { precipitationSumDay, sunset, sunrise, cloudcover } = props

  // hora atual como número (0..23)
  const hoje = new Date()
  const hours = hoje.getHours()

  // converte sunrise/sunset que podem vir como "HH:MM" ou número
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

  // pega cloudcover de forma robusta (index number ou string)
  const cloudcoverHour = (cloudcover && (cloudcover[hours] ?? cloudcover[String(hours)])) ?? 0

  // define se é noite: hora >= sunset OR hora < sunrise
  const isNight = (hours >= horaSunset) || (hours < horaSunrise)

  // regras visuais (ajuste thresholds se quiser)
  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) >= 5 && isNight) {
    return (<div className='background'><img src={noiteChuva} alt="noite chuva" /></div>)
  }

  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) < 5 && isNight) {
    return (<div className='background'><img src={noiteNum} alt="noite nublado" /></div>)
  }

  if ((cloudcoverHour <= 40) && isNight) {
    return (<div className='background'><img src={noiteBoa} alt="noite clara" /></div>)
  }

  // dia
  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) >= 5) {
    return (<div className='background'><img src={diaChuva} alt="dia chuva" /></div>)
  }

  if (cloudcoverHour > 40 && (precipitationSumDay ?? 0) < 5) {
    return (<div className='background'><img src={diaNum} alt="dia nublado" /></div>)
  }

  return (<div className='background'><img src={diaBom} alt="dia claro" /></div>)
}

export default Background
