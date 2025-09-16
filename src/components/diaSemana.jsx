



function DiasSemana(props) {
  const {
    maxSemana,
    minSemana,
    precipitationSum,
    cloudcover
  } = props;

  let hours = 12;
  let cloudcoverHour = []
  const diaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const hoje = new Date();
  const diaDaSemanaAtual = hoje.getDay();
  const diasDaSemana = [];
  let i = (diaDaSemanaAtual + 1) % 7;

  while (diasDaSemana.length < diaSemana.length - 1) {
    diasDaSemana.push(diaSemana[i]);
    i = (i + 1) % 7;
    hours+=24
   cloudcoverHour.push(cloudcover[hours])
  }

  return (
    <Fragment>
      <div className="bodyDiasDaSemana">
        {Array.isArray(diasDaSemana) &&
        Array.isArray(minSemana) &&
        Array.isArray(cloudcoverHour) &&
        Array.isArray(maxSemana) ? (
          diasDaSemana.map((dia, index) => {
            let icone;

            if (
              cloudcoverHour[index]> 40 && precipitationSum[index] >= 5
            ) {
              icone = (
                <div className="animationIconSemana">
                  <Lottie animationData={diaChuva} />
                </div>
              );
            } else if (
              cloudcoverHour[index]> 40 && precipitationSum[index] < 5
            ) {
              icone = (
                <div className="animationIconSemana">
                  <Lottie animationData={diaNum} />
                </div>
              );
            } else {
              icone = (
                <div className="animationIconSemana">
                  <Lottie animationData={diaBom} />
                </div>
              );
            }

            return (
              <div className="divDiasDaSemana" key={index}>
                <div className="headerSemana">{icone}
                  <h6 className="pDiaDaSemana">{dia}</h6></div>
                <div className="componenteMinMaxSemana">
                  <div className="divTempMinSemana">{minSemana[index]}°</div>-
                  <div className="divTempMaxSemana">{maxSemana[index]}°</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Valores de temperatura máxima não estão disponíveis.</div>
        )}
      </div>
    </Fragment>
  );
}

export default DiasSemana;