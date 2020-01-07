function fnBuscarDataHora(tipo) {
  //=======================================================================================
  // Chamada: buscaDataHora("data") ou buscaDataHora("hora");
  // Retorna data no formato dd/mm/aaaa
  // Retorna hora no formato HH:MM
  //=======================================================================================
  var fullDate = new Date();

  //formata a hora
  var hora = fullDate.getHours();
  var minuto = fullDate.getMinutes();
  if (hora <= 9) { hora = "0" + hora; }
  if (minuto <= 9) { minuto = "0" + minuto; }
  var hrRetorno = hora + ":" + minuto;

  //formata a data
  var dia = fullDate.getDate().toString();
  if (dia.length == 1) { dia = "0" + dia; }
  var mes = (fullDate.getMonth() + 1).toString();
  if (mes.length == 1) { mes = "0" + mes; }
  var dtRetorno = dia + "/" + mes + "/" + fullDate.getFullYear();

  if (tipo == "data") { return dtRetorno; }
  if (tipo == "hora") { return hrRetorno; }
}