async function tempoFetch() {
  try {
    const previsaoResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&lat=-23.5489&lon=-46.6388&appid=44f9a91c22341695fdf890e256444a90"
    );
    const previsaoJson = await previsaoResponse.json();
    const descricao = previsaoJson["weather"][0].description;
    const tempMax = Math.floor(previsaoJson["main"].temp_max);
    const tempMin = Math.floor(previsaoJson["main"].temp_min);
    const cidade = previsaoJson.name;
    const pais = previsaoJson["sys"].country;
  } catch (error) {
    console.log(error);
  }
}

const getData = () => {
  const data = new Date();
  const diaNum = data.getDay();
  const mes = data.getMonth() + 1;
  const dia = data.getDate();
  let diaTexto = "Seg";
  if (diaNum === 0) {
    diaTexto = "Domingo";
  } else if (diaNum === 1) {
    diaTexto = "Segunda";
  } else if (diaNum === 2) {
    diaTexto = "Terça";
  } else if (diaNum === 3) {
    diaTexto = "Quarta";
  } else if (diaNum === 4) {
    diaTexto = "Quinta";
  } else if (diaNum === 5) {
    diaTexto = "Sexta";
  } else if (diaNum === 6) {
    diaTexto = "Sábado";
  }
  return {
    diaTexto,
    dia,
    mes,
  };
};

tempoFetch();
