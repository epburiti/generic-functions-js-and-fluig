let cep = await fetch('http://viacep.com.br/ws/01001000/json/', {
	method: 'GET',
	headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
	
});
let resultado = await cep.json()