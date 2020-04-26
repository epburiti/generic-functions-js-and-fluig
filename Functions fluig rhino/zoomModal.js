  // carrega o dataset
        var settingsCentroCusto = {
            source: {
                url: '/api/public/ecm/dataset/search?datasetId=colleague&searchField=colleagueName&',
                contentType: 'application/json',
                root: 'content',
                pattern: '',
                limit: 5,
                offset: 0,
                patternKey: 'searchValue',
                limitkey: 'limit',
                offsetKey: 'offset'
            },
            displayKey: 'colleagueName',
            multiSelect: true,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {
                        'title': 'Nome',
                        'standard': true,
                        'search': 'true'
                    },
                    {
                        'title': 'Matricula',
                        'standard': true
                    },
                    {
                        'title': 'E-mail',
                        'standard': true
                    }
                ],
                renderContent: ['colleagueName', 'login', 'mail']
            }
        }

        // instancia o filter
        var filter = FLUIGC.filter('#nomeParticipantes', settingsCentroCusto);