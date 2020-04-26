function fnBuscarDataHora(tipo) {
  var fullDate = new Date();

  if (tipo == "hora") {
    var hora = fullDate.getHours();
    var minuto = fullDate.getMinutes();
    if (hora <= 9) { hora = "0" + hora; }
    if (minuto <= 9) { minuto = "0" + minuto; }
    var hrRetorno = hora + ":" + minuto;
    return hrRetorno;
  }

  if (tipo.substr(0, 4) == "data") {
    var dia = fullDate.getDate().toString();
    if (dia.length == 1) { dia = "0" + dia; }
    var mes = (fullDate.getMonth() + 1).toString();
    if (mes.length == 1) { mes = "0" + mes; }

    if (tipo == "data") {
      var dtRetorno = dia + "/" + mes + "/" + fullDate.getFullYear();
      return dtRetorno;
    }

    if (tipo == "dataMesExtenso") {
      if (mes.length == 1) { mes = "0" + mes; }
      if (mes == '01') { mesExtenso = ' de Janeiro de ' }
      if (mes == '02') { mesExtenso = ' de Fevereiro de ' }
      if (mes == '03') { mesExtenso = ' de Março de ' }
      if (mes == '04') { mesExtenso = ' de Abril de ' }
      if (mes == '05') { mesExtenso = ' de Maio de ' }
      if (mes == '06') { mesExtenso = ' de Junho de ' }
      if (mes == '07') { mesExtenso = ' de Julho de ' }
      if (mes == '08') { mesExtenso = ' de Agosto de ' }
      if (mes == '09') { mesExtenso = ' de Setembro de ' }
      if (mes == '10') { mesExtenso = ' de Outubro de ' }
      if (mes == '11') { mesExtenso = ' de Novembro de ' }
      if (mes == '12') { mesExtenso = ' de Dezembro de ' }
      var dtExtensoRetorno = dia + mesExtenso + fullDate.getFullYear();
      return dtExtensoRetorno;
    }

  }
}