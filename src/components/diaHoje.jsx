function DiaAtual() {
  const diaSemana = new Array ("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");
  const hoje = new Date;

  return (
    <div>
      {diaSemana[hoje.getDay()]}
    </div>
  )

}

export default DiaAtual;