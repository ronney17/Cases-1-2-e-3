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
        syncWait(2500)
        while (andarAtual != andarEscolhido) {
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
        console.log("Cheguei!" + " atual " + andarAtual + " escolhido " + andarEscolhido);
    })
}

function AbrirPorta() {
    document.getElementById("porta").style.display = "none";
    // document.getElementById("porta").classList.add("portaAbrindo")
    // document.getElementById("porta").classList.remove("portaFechando")
    console.log("abrindo")
}

function FecharPorta() {
    document.getElementById("porta").style.display = "block";
    document.getElementById("porta").classList.add("portaFechando")
    document.getElementById("porta").classList.remove("portaAbrindo")
    console.log("fechando")
}