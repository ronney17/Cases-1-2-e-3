/* Implementar um analisador léxico, considerando uma gramática qualquer e utilizando
qualquer linguagem de programação. O analisador deve ser capaz de:
1- Fazer a análise léxica de sequencias de comandos (pedaços de códigos);
2- Mostrar tokens,
3- Tabela símbolos,
4- Eliminação de caracteres em branca,
5- Comentários. 
6- Ao ser executado, deve-se exibir o código fonte de entrada e a análise léxica sendo feita.
Grámatica: JAVASCRIPT
*/

function analisar() {
	let tipoToken = "nada";         	// Identifica o tipo de char do token atual
	let tokenAtual = "";     			// Guarda o conjunto de caracteres do token atual
	let linhaComentario = false;    	// Identificador de comentário de linha
	let blocoComentario = false;   		// Identificador de comentário em bloco
	let auxiliarBlocoComentario = "";   // String auxiliar para encontrar o fim de um bloco de comentário
	let aspasAbertas = false;   		// Identificador de abertura de aspas
	let tipoDasAspas = ""   			// Identifica qual tipo de aspa abriu o literal
	let barraInvertida = true;      	// Auxiliar pra identificar o uso de uma barra invertida em uma string

	const codigo = document.getElementById("entrada").value;
	document.getElementById("saida").value = "";
	criaHeaderDaTabela();
	

	for (char of codigo) {
		if (aspasAbertas) {
			tokenAtual += char;

			if (!barraInvertida && char == tipoDasAspas) {
				aspasAbertas = !aspasAbertas;
				tipoToken = "literal";
				tokenAtual = checkToken(tokenAtual, tipoToken);
			}

			if (!barraInvertida && char == '\\')
				barraInvertida = true;
			else
				barraInvertida = false;

			tipoToken = "delimitador";

		} else if (blocoComentario) {
			if (char == "*") {
				auxiliarBlocoComentario = "*";
			} else {
				auxiliarBlocoComentario += char;
			}

			tokenAtual += char;
			if (auxiliarBlocoComentario == '*/') {
				blocoComentario = false;
				tipoToken = "comentario";
				tokenAtual = checkToken(tokenAtual, tipoToken);
			}

		} else if (linhaComentario) {
			if (char == "\n" || char == "\r") {
				linhaComentario = false;
				tipoToken = "comentario";
				tokenAtual = checkToken(tokenAtual, tipoToken);
			} else {
				tokenAtual += char;
			}

		} else if (char == "\n" || char == "\r") {

		} else {
			if (!eEspaco(char)) {

				if (!eOperador(char)) {

					if (!eDelimitador(char)) {

						if (!eNumero(char)) {
							if (char == "." && eNumero(tokenAtual)) {
								tokenAtual += char;
								tipoToken = "constante";
							} else {
								if (tipoToken != "letra")
									tokenAtual = checkToken(tokenAtual, tipoToken);

								tokenAtual += char;
								tipoToken = "letra";
							}

						} else if (eNumero(tokenAtual[0]) && eNumero(char)) {
							tokenAtual += char;
							tipoToken = "constante";

						} else {
							tokenAtual = checkToken(tokenAtual, tipoToken);
							tokenAtual += char;
							tipoToken = "constante";

						}

					} else {
						if (char == '"' || char == '\'') {
							tipoDasAspas = char;
							tokenAtual = char;
							aspasAbertas = !aspasAbertas;
						} else {
							tokenAtual = checkToken(tokenAtual, tipoToken);
							tokenAtual += char;
							tipoToken = "delimitador";
							tokenAtual = checkToken(tokenAtual, tipoToken);
						}

					}

				} else if (operators.includes(tokenAtual[0])) {
					tokenAtual += char;
					tipoToken = "operador";
					if (eLinhaDeComentario(tokenAtual))
						linhaComentario = true;
					if (eBlocoDeComentario(tokenAtual))
						blocoComentario = true;

				} else {
					tokenAtual = checkToken(tokenAtual, tipoToken);
					tokenAtual += char;
					tipoToken = "operador";

				}

			} else {
				tokenAtual = checkToken(tokenAtual, tipoToken);
				tipoToken = "nada";
			}

		}
	}

	if (tokenAtual.startsWith("//") && !(tokenAtual.endsWith("\r") || tokenAtual.endsWith("\n"))) {
		linhaComentario = false;
		tipoToken = "comentario";
		tokenAtual = checkToken(tokenAtual, tipoToken);
	}

	if (tokenAtual != '')
		checkToken(tokenAtual, tipoToken);
}

function eLinhaDeComentario(token) {
	return token === '//';
}

function eBlocoDeComentario(token) {
	return token === '/*';
}

function eEspaco(char) {
	return char === ' ';
}

function eOperador(char) {
	return operators.includes(char);
}

function eDelimitador(char) {
	return delimiters.includes(char)
}

function eNumero(char) {
	var numero = parseInt(char);
	return Number.isInteger(numero);
}

function checkToken(current_token, tipoToken) {
	current_token = current_token.replace("\n", " ");
	if (current_token != '') {
		switch (tipoToken) {
			case "nada":
				break;

			case "comentario":
				insertTable(current_token, 'Comentário');
				break;

			case "letra":
				if (reservedWords.includes(current_token)) {
					insertTable(current_token, 'Palavra Reservada');
				} else if (current_token != "\n") {
					insertTable(current_token, 'Identificador');
				}
				break;

			case "operador":
				if (current_token == '=')
					insertTable(current_token, 'Atribuição');
				else
					insertTable(current_token, 'Operador');
				break;

			case "constante":
				insertTable(current_token, 'Constante Numérica');
				break;

			case "literal":
				insertTable(current_token, 'Constante Literal');
				break;

			case "delimitador":
				if (current_token == ',')
					insertTable(current_token, 'Separador');
				else if (current_token == ';')
					insertTable(current_token, 'Terminal');
				else if (current_token == '(' || current_token == '{' || current_token == '[')
					insertTable(current_token, 'Delimitador - Abertura');
				else if (current_token == ')' || current_token == '}' || current_token == ']')
					insertTable(current_token, 'Delimitador - Fechamento');
				else
					insertTable(current_token, 'Delimitador');
				break;

		}
	}

	return '';
}

function insertTable(id, token_type) {
	var token = "";
  switch(token_type) {
    case 'Identificador':
    case 'Constante Numérica':
    case 'Constante Literal':
      token = `<${token_type}, ${id}>`;
      break;

    case 'Comentário':
      token = `< ${token_type} , ${id} >`;
      id = 'Comentário';
      break;

    default:
      token = `< ${id} , >`;
      break;
  }

	document.getElementById("saida").value += `${token};\t ${id};\t ${token_type}\n`;
	document.getElementById("tabela-simbolos").innerHTML += `<tr class=""><td>${id}</td><td>${token_type}</td></tr>`
}

function limpar() {
	document.getElementById("entrada").value = "";
	document.getElementById("saida").value = "";
	criaHeaderDaTabela();
}

function criaHeaderDaTabela(params) {
	document.getElementById("tabela-simbolos").innerHTML = "<thead><tr class=\"topicos\"><td>Lexema</td><td>Descrição</td></tr></thead>";	
}