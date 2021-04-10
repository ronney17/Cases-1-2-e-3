var andarAtual = prompt("Qual andar você esta? ");
console.log("Andar inicial: " + andarAtual);

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

function IrAté(andar) {

    let sentido;
    let andarEscolhido = andar;
    //console.log("Andar atual: " + andarAtual)

    if (andarEscolhido == andarAtual) {
        document.getElementById("painel").innerText = andarEscolhido;
        return "ja to nele"
    } else {
        if (andarEscolhido > andarAtual) {
            sentido = "cima"
        } else {
            sentido = "baixo"
        }
    }
    console.log("Sentido: " + sentido)

    // Em loop infinito
    FecharPorta();

    const porta = document.getElementById("porta");
    porta.addEventListener("animationend", () => {

        while (andarAtual != andarEscolhido) {
            syncWait(2000)
            if (sentido == "cima") {
                andarAtual++;
                document.getElementById("painel").innerText = "↑ " + andarAtual;
                console.log("Subindooooo")
            }
            else {
                andarAtual--;
                document.getElementById("painel").innerText = "↓ " + andarAtual;
                console.log("Descendoooo")
            }

            console.log("Andar atual: " + andarAtual)

        }

        AbrirPorta();

        console.log("Cheguei!");

    });
}

function AbrirPorta() {
    document.getElementById("porta").classList.remove("portaFechando")
    document.getElementById("porta").classList.add("portaAbrindo")
}

function FecharPorta() {
    document.getElementById("porta").classList.remove("portaAbrindo")
    document.getElementById("porta").classList.add("portaFechando")
}