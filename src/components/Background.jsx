import diaBom from '../assets/backgrounds/diaSol.png'





function Background(props) {
  const { precipitationSumDay, sunset, sunrise, cloudcover } = props
  const hoje = new Date()
  const hours = hoje.getHours().toString().padStart(2, '0')

  const horaSunrise = sunrise.split(':')[0]
  const horaSunset = sunset.split(':')[0]
  const cloudcoverHour = cloudcover[hours]

  if (cloudcoverHour> 40 && precipitationSumDay >= 5 && hours >= horaSunset && hours > horaSunrise) {
    return (<div className='background'>
    <img src={noiteChuva} />
  </div>)
  } else if (cloudcoverHour> 40 && precipitationSumDay < 5 && hours >= horaSunset && hours > horaSunrise) {
    return (<div className='background'>
    <img src={noiteNum} /></div>)
  } else if (cloudcoverHour< 40 && precipitationSumDay <= 3 && hours >= horaSunset && hours > horaSunrise) {
    return (<div className='background'>
    <img src={noiteBoa} /></div>)
  } else if (cloudcoverHour> 40 && precipitationSumDay >= 5 && hours < horaSunset && hours >= horaSunrise) {
    return (<div className='background'>
    <img src={diaChuva} /></div>)
  } else if (cloudcoverHour> 40 && precipitationSumDay < 5 && hours < horaSunset && hours >= horaSunrise) {
    return (<div className='background'>
    <img src={diaNum} /></div>)
  } else {
    return (<div className='background'>
      <img src={diaBom} /></div>)
  }
}

export default Background