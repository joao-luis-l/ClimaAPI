import chuvaDia from '../assets/icons/chuvaDia.png';
import diaNum from '../assets/icons/diaNub.png';
import diaBom from '../assets/icons/diaBom.png';


function DiasSemana(props) {
  const { maxSemana, minSemana, precipitationSum, cloudcover } = props;

  let hours = 12;
  let cloudcoverHour = [];
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
    hours += 24;
    cloudcoverHour.push(cloudcover[hours]);
  }

  return (
    <>
      <div className="bodyDiasDaSemana">
        {Array.isArray(diasDaSemana) &&
        Array.isArray(minSemana) &&
        Array.isArray(cloudcoverHour) &&
        Array.isArray(maxSemana) ? (
          diasDaSemana.map((dia, index) => {
            let iconeSrc;

            if (cloudcoverHour[index] > 40 && precipitationSum[index] >= 5) {
              iconeSrc = chuvaDia;
            } else if (cloudcoverHour[index] > 40 && precipitationSum[index] < 5) {
              iconeSrc = diaNum;
            } else {
              iconeSrc = diaBom;
            }

            return (
              <div className="divDiasDaSemana" key={index}>
                <div className="headerSemana">
                  <img className="animationIconSemana" src={iconeSrc} alt="Ícone do clima" />
                  <h6 className="pDiaDaSemana">{dia}</h6>
                </div>
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
    </>
  );
}

export default DiasSemana;
