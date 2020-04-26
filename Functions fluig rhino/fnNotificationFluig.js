var obj = {
    "moduleKey": "TESTE",
    "descriptionKey": "Atualização Cadastral teste"
}

WCMAPI.Create({
    url: '/api/public/alert/module/create',
    contentType: "application/json",
    dataType: "application/json",
    data: obj,
    success: function () { }
})

WCMAPI.Create({
    url: '/api/public/alert/module/findVoList',
    contentType: "application/json",
    dataType: "application/json",
    type: "GET",
    success: function (response) {
        console.log(response)
    }
})


var obj2 = {
    "eventKey": 'Notificacao_TESTE', // Unique key that represents the event
    "required": "false", // It indicates if this event is required. If true, the user cannot configure to do not receive alerts about this event
    "descriptionKey": 'Notificação de Atualização Cadastral (MEMBRO)', // Key used to obtain the description in I18n
    "singleDescriptionKey": " ", // Key used to obtain the description of the user's action in I18n
    "groupDescriptionKey": "", // Key used to obtain the description of the multi user's action in I18n
    "eventIcon": "", // the event icon
    "moduleId": 12, // Module of this event belongs
    "grouped": "false", // It indicates if the alert can be grouped by action and object
    "canRemove": "false", // It indicates if the alert can be removed
    "removeAfterExecAction": "false", // It indicates if the alert will be removed after execute the action
    "onlyAdmin": "false", // It indicates if this event is valid only for admin users
}

WCMAPI.Create({
    url: '/api/public/alert/event/createEvent',
    contentType: "application/json",
    dataType: "application/json",
    data: obj2
});

var obj3 = {
    "eventKey": "Notificacao_TESTE",
    "loginReceiver": "admin",
    "object": {
        "alertObjectId": "1",
        "alertObjectClass": "com.fluig.Class",
        "alertObjectTypeDescriptionKey": "${nome} realizou uma atualização Cadastral.",
        "alertObjectDescription": "",
        "alertObjectLink": "",
        "alertObjectDetailKey": ""
    }
};

WCMAPI.Create({
    url: '/api/public/alert/service/sendNotification',
    contentType: "application/json",
    dataType: "application/json",
    data: obj3,
    success: function () { alert("teste") },
    error: function (e) { console.log(e) }
});

var obj = {
    "eventKey": "notificacao_TESTE2",
    "loginReceiver": "admin",
    "object": {
        "alertObjectId": "1",
        "alertObjectClass": "com.fluig.Class",
        "alertObjectTypeDescriptionKey": "${nome} realizou uma atualização Cadastral.",
        "alertObjectDescription": " ",
        "alertObjectLink": " ",
        "alertObjectDetailKey": ""
    }
};

WCMAPI.Create({
    url:'/api/public/alert/service/sendNotification',
    contentType: "application/json",
    dataType: "application/json",
    data: obj,
success: function(){ alert("teste")},
error: function(e){ console.log(e)}
});