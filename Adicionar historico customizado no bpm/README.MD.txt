### Histórico vipal


Requisitos:

    Arquivos: carregaHistorico.js && beforeTaskComplete

    Front end:

        no arquivo carregaHistorico -> colocar array de numeros da atividade

        campo no html histórico geral:
            <input type="text" name="historicoTodasAtividades" id="historicoTodasAtividades" class="form-control" readonly value="[]" />

        campo de ultimo registro do panel:
            deve ser um span com name "span_atividade_" + numeroAtividade
            exemplo:   
                <span id="span_atividade_4"></span> - Ultimo registro da atividade
                <span id="span_historico_4"></span> - Historico especifico

	-getDescricaoAtividade: Alterar o retorno cases para o Titulo do panel e o case para o numero da Atividade.
	

    Backend:

        Alterar as seguintes funções:
            -ajustaNumeroAtividade -> colocar se necessário "substituir" a atividade onde sera gravado no historico
            -getArrayObjectCampos-> colocar array de objetos que possui dois atributos:
                name e nameHistorico
                o atributo name é o nome do seu campo no formulário e o nameHistorico é como ele deve aparecer

		

**para utilizar o historico na Tabela pai x Filho: https://forum.fluig.com/2386-pai-filho-evento-workflow