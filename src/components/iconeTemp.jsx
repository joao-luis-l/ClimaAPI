import chuvaDia from '../assets/icons/chuvaDia.png'
import noiteChuva from '../assets/icons/chuvaNoite.png'
import noiteNub from '../assets/icons/noiteNub.png'
import noiteBoa from '../assets/icons/noiteBoa.png'
import diaNub from '../assets/icons/diaNub.png'
import diaBom from '../assets/icons/diaBom.png'



function IconeTemp(props) {
  const { precipitationSumDay, sunset, sunrise, cloudcover } = props
  const hoje = new Date()
  const hours = hoje.getHours().toString().padStart(2, '0')
  const horaSunrise = sunrise.split(':')[0]
  const horaSunset = sunset.split(':')[0]
  const cloudcoverHour = cloudcover[hours]

  let animationData = null

  if (cloudcoverHour> 40 && precipitationSumDay >= 5 && hours >= horaSunset && hours > horaSunrise) {
    animationData = noiteChuva
  } else if (cloudcoverHour> 40 && precipitationSumDay < 5 && hours >= horaSunset && hours > horaSunrise) {
    animationData = noiteNub
  } else if (cloudcoverHour< 40 && precipitationSumDay <= 3 && hours >= horaSunset && hours > horaSunrise) {
    animationData = noiteBoa
  } else if (cloudcoverHour> 40 && precipitationSumDay >= 5 && hours < horaSunset && hours >= horaSunrise) {
    animationData = chuvaDia
  } else if (cloudcoverHour> 40 && precipitationSumDay < 5 && hours < horaSunset && hours >= horaSunrise) {
    animationData = diaNub
  } else {
    animationData = diaBom
  }
 
}

export default IconeTemp