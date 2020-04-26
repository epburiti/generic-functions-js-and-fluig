var renomearArquivo = function (description, id) {
  var dados = {
    "id": id,//parent folder id  REQUIRED
    "description": description//document's description  REQUIRED

  };
  return $.ajax({
    method: "POST",
    url: "/api/public/ecm/document/updateDescription",
    data: JSON.stringify(dados),
    contentType: "application/json",
    async: false,
    error: function (x, e) {
      console.error("Atualizar Descrição")
      console.log(x);
      console.log(e);
      if (x.status == 500) {
        alert("renomearArquivo: Erro Interno do Servidor: entre em contato com o Administrador.");
      }
    }, beforeSend: function () {

    }
  });
};
renomearArquivo("teste", 29720);