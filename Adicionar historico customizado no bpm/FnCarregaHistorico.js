document.addEventListener('DOMContentLoaded', function () {
  const spans = [14, 18, 35, 136, 33, 40, 50, 150, 152, 42, 142, 48, 57, 199, 19, 159, 211, 200];
  carregaUltimaAtualizacao(spans);
  carregaHistoricoEspecifico(spans);
  carregarHistoricoGeral(spans, "historicoGeral");
})

// parametro = array dos spans
function carregaUltimaAtualizacao(numeroPanels) {
  let campoHistorico = document.getElementById('historicoTodasAtividades');
  let valueHistorico = campoHistorico.tagName == "SPAN" ? campoHistorico.innerText : campoHistorico.value;

  try {

    JSON.parse(valueHistorico).forEach((element, index) => {
      if (numeroPanels.includes(element.atividade)) {
        let campos = document.getElementById(`span_atividade_${element.atividade}`);
        if (campos) {
          campos.innerText = factoryLineLastAtt(element);
        }
      }
    });
  } catch (error) {
    console.error("Erro ao exibir histórico");
  }
}

/**
 * @function factoryLine
 * @param {object} registro 
 * @return retorna chave e valor do objeto em forma de string
 */

function factoryLine(registro) {
  let keys = Object.keys(registro);
  let linha = "";

  keys.forEach((key, indice) => {

    if (key != "atividade") {
      linha += `${key}: ${registro[key]} ${indice != (keys.length - 1) ? "-" : ""} `;
    }
  });

  return linha;
}

function factoryLineLastAtt(registro) {
  return `${registro['data']} - ${registro['horario']} - ${registro['nome']}`;
}

/**
 * @function getUltimoRegistroPorAtividade
 * @param {Number[]} arrayHistorico array com todo historico
 * @param {Number} atividade numero da atividade que deseja
 * @return {String[]} ultima linha se houver, se não retorna undefined
 */

function getUltimoRegistroPorAtividade(arrayHistorico, atividade) {
  let historico = arrayHistorico.filter((elemento) => elemento.atividade === atividade);
  if (historico.length) {
    let lastRegister = factoryLine(historico[historico.length - 1]);
    return lastRegister
  }
  return undefined
}

/**
* @function getAllHistoricoPorAtividade
* @param {Number[]} arrayHistorico array com todo historico
* @param {Number} atividade numero da atividade que deseja
* @return {String[]} todo histórico se houver, se não retorna undefined
*/

function getAllHistoricoPorAtividade(atividade) {
  try {
    let campoHistorico = document.getElementById("historicoTodasAtividades");
    let conteudoHistorico = campoHistorico.tagName == "SPAN" ? campoHistorico.innerText : campoHistorico.value;
    let arrayHistorico = JSON.parse(conteudoHistorico);

    let historico = arrayHistorico.filter((elemento) => elemento.atividade === atividade);
    if (historico.length) {
      let allRegister = historico.map((e) => factoryLine(e));
      return allRegister
    }
  } catch (error) {
    console.error(error);
  }

  return undefined
}

/**
 * @function carregarHistoricoGeral carrega todo o histórico
 * @param {Number} atividades array de panels
 * @param {String} seletor id do campo que vai ser setado a string historico geral
 * @return {undefined}
 */

function carregarHistoricoGeral(atividades, seletor) {

  let historicoGeral = "";

  atividades.forEach((atividade) => {
    let linha = getAllHistoricoPorAtividade(atividade);

    let newLine = `<br> <b> ${getDescricaoAtividade(atividade.toString())} </b> <p>${linha != undefined ? linha : ""}</p>`;
    linha != undefined ? historicoGeral += newLine : "";
  })

  let campoHistoricoGeral = document.getElementById(seletor);

  try {
    campoHistoricoGeral.innerHTML = replaceAll(historicoGeral, ",", "<br>");
  } catch (error) {
    console.error(error);
  }

}

function carregaHistoricoEspecifico(spans) {
  spans.forEach((e) => {
    try {
      let historico = getAllHistoricoPorAtividade(e).toString();
      let campoHistorico = document.getElementById(`span_historico_${e}`);
      campoHistorico.innerHTML = replaceAll(historico, ",", "<br>");
    } catch (error) {
      console.error(error);
    }
  })
}

function replaceAll(string, de, para) {
  var str = string;
  var pos = str.indexOf(de);
  while (pos > -1) {
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return (str);
}

/**
 * @function getDescricaoAtividade carrega o nome do panel
 * @param {Number} Att numero da atividade
 * @return {String} titulo do panel da atividade
 */
function getDescricaoAtividade(Att) {
  var desc = '';

  switch (Att) {
    case "0":
    case "14":
    case "187":
      desc = "Solicitação de Demandas e projetos TI";
      break;
    case "18":
      desc = ("Aprovar solicitação");
      break;
    case "136":
      desc = ("Controlar demanda ou projeto");
      break;
    case "33":
      desc = ("Especificação");
      break;
    case "211":
      desc = ("Comitê técnico");
      break;
    case "142":
      desc = ("Controles internos");
      break;
    case "35":
      desc = ("Aprovar especificação");
      break;
    case "40":
      desc = ("Estimativa de valor");
      break;
    case "150":
      desc = ("Estimativa DESENV. interno");
      break;
    case "152":
      desc = ("Estimativa DESENV. Externo");
      break;
    case "42":
      desc = ("Aprovação da estimativa");
      break;
    case "48":
      desc = ("Planejamento de datas");
      break;
    case "159":
      desc = ("Engenharia");
      break;
    case "50":
      desc = ("Aprovação da engenharia");
      break;
    case "55":
      desc = ("Desenvolvimento");
      break;
    case "57":
      desc = ("Validar desenvolvimento(TI)");
      break;
    case "62":
      desc = ("Validar entrega(Área)");
      break;
    case "199":
      desc = ("Planejar publicação");
      break;
    case "200":
      desc = ("Providenciar publicação");
      break;
    case "144":
      desc = ("Publicação");
      break;
    default:
      desc = ("Publicação");
      break;
  }
  return desc;
}