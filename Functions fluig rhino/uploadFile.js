function addNewChildOnTable(folderId) {

    $("[name^=visualizar___]").attr("disabled", true);
    //atribui variavel com a fun��o de carregamento FLUIGC : https://style.fluig.com/javascript.html
    var loading = FLUIGC.loading(window);
    $('[name^=upload___]').fileupload({
        dataType: 'json', // OBS: ATRIBUI��O JSON NECESSARIA PARA CARREGAR ARQUIVOS COM PADRAO DE NOME UTF-8
        start: () => { loading.show(); }, // inicializa loading de pagina
        done: (e, data) => {
            if (data.result) {
                var file = data.result.files[0];

                var index = e.target.id.split('___')[1];
                //var url = e.target.parentElement.offsetParent.parentElement.nextElementSibling.childNodes[1].childNodes[1];
                var url = null;
                saveDocuments(file, index, folderId);
            }

        },
        fail: (e, data) => {
            console.log(e);
        },
        stop: () => { loading.hide(); } //finaliza loading FLUIGC com hide()
    });
}

//salva documentos
function saveDocuments(file, index, folderId) {

    $.ajax({
        url: 'http://devfluig.iv2.com.br/api/public/ecm/document/createDocument',
        method: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            "description": file.name,
            "parentId": folderId,
            "attachments": [{
                "fileName": file.name
            }]
        })
    }).done((result) => {
        //setting dos campos do formulario
        $('#adicionado___' + index).val(file.name);
        $('#codanexo___' + index).val(result.content.id);
        //url.href = gerarLinkArquivo(result.content.id);
        $('#hidden_documentId___' + index).val(result.content.id);
        $("#visualizar___" + index).removeAttr("disabled");
        // mensagem de sucesso FLUIGC: https://style.fluig.com/javascript.html
        FLUIGC.toast({
            title: 'Sucesso: ',
            message: 'Arquivo ' + file.name + ' publicado com sucesso.',
            type: 'success'
        });
    }).fail((result) => {
        // mensagem de ERRO FLUIGC: https://style.fluig.com/javascript.html
        FLUIGC.toast({
            title: 'Falha: ',
            message: 'N�o foi possivel publicar o arquivo.',
            type: 'danger'
        });
        console.log(result);

    });
    // $('[name^="visualizar' + type + '___"]').click((e) => {
    //     var documentId = $(e.target).siblings()[0].value;
    //     var versao = 1000
    //     openDocument(documentId, versao)
    // });
}
//fun��o responsavel por pegar id do documento (id documento setadada dentro do campo hide no formulario)
function o(e) {
    var documentId = e.nextElementSibling.value;
    // var link = "webdownload?documentId="+documentId+"&version=1000&tenantId=1&replication=false"
    // e.offsetParent.nextSibling.nextElementSibling.children[0].childNodes[1].href = gerarLinkArquivo(documentId);
    var versao = 1000;
    openDocument(documentId, versao);
}

//fun��o responsavel por bloquear teclas digitadas no select
function LockTab(Event) { return false; }


//abre o documento
function openDocument(docId, docVersion) {
    var parentOBJ;

    if (window.opener) {
        parentOBJ = window.opener.parent;
    } else {
        parentOBJ = parent;
    }

    var cfg = {
        url: "/ecm_documentview/documentView.ftl",
        maximized: true,
        title: "Visualizador de Documentos",
        callBack: function () {
            parentOBJ.ECM.documentView.getDocument(docId, docVersion);
        },
        customButtons: []
    };
    parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
}

//deleta documento da pasta pelo id
//Alterado a url do chamado para usar as apis do document - 02/01/2020 - Ariel Zart
function deleteDocument(idDoc) {

    var url = "http://devfluig.iv2.com.br/api/public/ecm/document/remove";

    $.ajax(url, {
        async: false,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "id": idDoc
        }),
        success: function (data) {
            FLUIGC.toast({
                title: 'Sucesso: ',
                message: "Arquivo Deletado",
                type: 'success'
            });
        },
        error: function (e) {
            FLUIGC.toast({
                title: 'Erro: ',
                message: "Erro ao deletar arquivo",
                type: 'danger'
            });
            console.log(e);
        }
    });
}

//gera o link Raiz do documento para download
function gerarLinkArquivo(idDoc) {
    var link;
    var url = '/api/public/2.0/documents/getDownloadURL/' + idDoc;
    var obj = {};
    var params = JSON.stringify(obj);

    $.ajax(url, {
        async: false,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: params,

        success: function (data) {
            link = data.content;
        },
        error: function (e) {
            console.log(e);
        },
    });

    return link;
}
//VISUALIZA OS DOCUMENTOS AP�S PASSAR A ATIVIDADE ATUAL
function visualizarDocument(e) {
    var documentId = $(e).siblings()[0].value;
    var versao = 1000
    openDocument(documentId, versao)
}