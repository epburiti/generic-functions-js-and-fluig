//======================================================================================
// Objetivo: Inverter uma data recebida. Se receber com / passa para -
// Convencionado que a data com separador / é no formato BR e com - é no formato EN
//======================================================================================
function fnInverteData(aux) {

  if (aux.indexOf('-') > 0) {
    aux = aux.split('-');
    separador = '/'; //novo separador
  } else if (aux.indexOf('/') > 0) {
    aux = aux.split('/');
    separador = '-'; //novo separador
  } else {
    return '';
  }

  aux = aux[2] + separador + aux[1] + separador + aux[0];

  return aux;

}