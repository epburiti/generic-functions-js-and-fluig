function beforeTaskComplete(colleagueId, nextSequenceId, userList) {

    var gson = new com.google.gson.Gson();

    var atividade = getValue("WKNumState");
    var nome = fnBuscarColleague(colleagueId, "colleagueName");
    
    var camposParaRegistrar = getArrayObjectCampos(atividade);
    log.info(" erick campos para registrar")
    log.dir(camposParaRegistrar)

    atividade = ajustaNumeroAtividade(atividade);

    var registroHistorico = {
        atividade: atividade,
        data: getDate(),
        horario: getHour(),
        nome: nome
    }


    if (camposParaRegistrar.length > 0) {
        // cria as propiedades do objeto
        for (var i = 0; i < camposParaRegistrar.length; i++) {
            registroHistorico[camposParaRegistrar[i]["nameHistorico"]] = hAPI.getCardValue(camposParaRegistrar[i]["name"]);
            log.info('aqui o ' + hAPI.getCardValue(camposParaRegistrar[i]["name"]))
        }
    }

    gravarRegistro(registroHistorico);

    function ajustaNumeroAtividade(atividade) {

   if(atividade == 187){
	   return 14;
   }

        return atividade;
    }

    function getArrayObjectCampos(atividade) {
  
    	if(atividade == 18){
    		// tabela pai x filho
    		var processo = getValue("WKNumProces");
    		var campos   = hAPI.getCardData(processo);
    		var contador = campos.keySet().iterator();

    		while (contador.hasNext()) {
    		    var id = contador.next();

    		    if (id.match('txtHomologador')) { // qualquer campo do Filho
    		        var campo = campos.get(id);
    		        var seq   = id.split("___");

    		        var nomeUsuario = campos.get("txtHomologador___" + seq[1]);
    		        
    		        if(nomeUsuario == nome){
    		        	log.info(" ENTROU NO IF")
    		        	
    		        	return [
    		        		  { name: "obsHomologador___"+seq[1], nameHistorico: "Observação"},
    		        		  { name: "radHomologador___"+seq[1], nameHistorico: "Aprovado"},
    		        ]
    		        }
    		     
    		    }
    		}
    	}

        return [];
    }

    function gravarRegistro(registro) {
        try {
            var historicoAntigo = hAPI.getCardValue("historicoTodasAtividades");

            var objectHistoricoAntigo = JSON.parse(historicoAntigo);
            objectHistoricoAntigo.push(registro);

            var newHistorico = gson.toJson(objectHistoricoAntigo);
            hAPI.setCardValue("historicoTodasAtividades", newHistorico);

        } catch (error) {
            hAPI.setCardValue("historicoTodasAtividades", error);
        }
    }

    function fnBuscarColleague(pLogin, pCampo) {
        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", pLogin, pLogin, ConstraintType.MUST);
        var campos = ['colleaguePK.colleagueId'];
        campos.push(pCampo);
        var dsColleague = DatasetFactory.getDataset("colleague", campos, new Array(c1), null);
        if (dsColleague.rowsCount <= 0) { return "não achou colaborador"; }
        retorno = dsColleague.getValue(0, pCampo);
        return retorno;
    }

    function getDate() {
        var data = new Date();

        var dia = data.getDate();
        var mesCorreto = (data.getMonth() + 1);
        var mes = mesCorreto < 10 ? "0" + mesCorreto : mesCorreto;
        var ano = data.getFullYear();


        return dia + "/" + mes + "/" + ano;
    }

    function getHour() {
        var data = new Date();
        var horaCorreta = data.getHours();
        var hora = horaCorreta < 10 ? "0" + horaCorreta : horaCorreta;
        var minCorreto = data.getMinutes();
        var min = minCorreto < 10 ? "0" + minCorreto : minCorreto;

        return hora + ":" + min;
    }

}


