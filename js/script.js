async function tempoFetch() {
  try {
    const previsaoResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&lat=-23.5489&lon=-46.6388&appid=44f9a91c22341695fdf890e256444a90"
    );
    const previsaoJson = await previsaoResponse.json();
    const descricao = previsaoJson["weather"][0].description;
    const tempMax = Math.ceil(previsaoJson["main"].temp_max);
    const tempMin = Math.floor(previsaoJson["main"].temp_min);
    const cidade = previsaoJson.name;
    const pais = previsaoJson["sys"].country;
    return {
      descricao,
      tempMax,
      tempMin,
      cidade,
      pais,
    };
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

const div = document.createElement("div");
div.innerHTML = "<h2 class='carregando' >Carregando Informações...</h2>";
const container = document.querySelector(".container");
container.appendChild(div);

setTimeout(() => {
  tempoFetch()
    .then((body) => body)
    .then((json) => {
      const tempoObj = json;
      const dataObj = getData();
      div.classList.add("previsao");
      div.innerHTML = `
      <div class="grid-dia">
      <p>${tempoObj.cidade}-${tempoObj.pais}</p>
      <span></span>
          <h2>${dataObj.dia < 10 ? "0" + dataObj.dia : dataObj.dia}/${
        dataObj.mes < 10 ? "0" + dataObj.mes : dataObj.mes
      }</h2>
        <span></span>
        <p>${dataObj.diaTexto}</p>
      </div>
        <div class="grid-descricao">
          <img src="./img/nuvem2.png" alt="">
          <p>${tempoObj.descricao}</p>
        </div>
        <div class="temperatura-maxima">
          <img src="./img/arrow.svg" alt="Icone de seta">
          <p>${tempoObj.tempMax}</p>
        </div>
        <span class="linha-divisao"></span>
        <div class="temperatura-minima">
          <img src="./img/arrow-min.svg" alt="Icone de seta">
          <p>${tempoObj.tempMin}</p>
        </div>
      `;
      container.appendChild(div);
    });
}, 400);
