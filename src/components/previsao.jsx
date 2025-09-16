

const Preciptation = (props) => {
  if(props.precipitationSumDay<5){
    return (
      <div className='componentPreciptation'>
          <p>Probabilidade de chuva 0%</p>
      </div>
    )
  }else if(props.precipitationSumDay>=5 && props.precipitationSumDay<25){
    return (
      <div className='componentPreciptation'>
          <p>Probabilidade de chuva 30%</p>
      </div>
    )
  }else if(props.precipitationSumDay>=25 && props.precipitationSumDay<50){
    return (
      <div className='componentPreciptation'>
          <p>Probabilidade de chuva 70%</p>
      </div>
    )
  }else{
    return (
      <div className='componentPreciptation'>
          <p>Probabilidade de chuva 90%</p>
      </div>
    )
  }
}

export default Preciptation