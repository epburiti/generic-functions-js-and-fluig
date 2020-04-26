function fnBuscarColleague(pLogin, pCampo) {
  /******************************************************************************************************
    Objetivo: Retornar uma informação do colaborador que está no dataset colleague
              Isso evita trafegar todos os campos do dataset colleague quando precisamos apenas de 1
  
    001 - 30/08/2014 - Denilson Silva 
  
  ********************************************************************************************************/
  var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", pLogin, pLogin, ConstraintType.MUST);
  var campos = ['colleaguePK.colleagueId'];
  campos.push(pCampo);
  var dsColleague = DatasetFactory.getDataset("colleague", campos, new Array(c1), null);
  if (dsColleague.rowsCount <= 0) { return "não achou colaborador"; }
  retorno = dsColleague.getValue(0, pCampo);
  return retorno;
}
