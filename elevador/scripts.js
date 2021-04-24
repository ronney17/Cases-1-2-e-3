var andarAtual = 0;
console.log("Andar inicial: " + andarAtual);

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

function IrAte(andar) {

    let sentido;
    let andarEscolhido = andar;
    document.getElementById("painel").style.display = "none";
    document.getElementById("painel2").style.display = "inline-block";

    if (andarEscolhido == andarAtual) {
        document.getElementById("painel2").innerText = andarEscolhido;
        return "ja to nele"
    } else {
        if (andarEscolhido > andarAtual) {
            document.getElementById("painel2").innerHTML = "↑ ";
            sentido = "cima"
        } else {
            document.getElementById("painel2").innerHTML = "↓ ";
            sentido = "baixo"
        }
    }
    console.log("Sentido: " + sentido)

    const porta = document.getElementById("porta");
    porta.addEventListener("animationend", () => {

    while (andarAtual != andarEscolhido) {
        syncWait(2000)
        if (sentido == "cima") {
            andarAtual++;
            document.getElementById("painel2").innerHTML = andarAtual;
            document.getElementById("painel2").style.backgroundColor = "black";
            console.log("Subindooooo")
        }
        else {
            andarAtual--;
            document.getElementById("painel2").innerHTML = andarAtual;
            document.getElementById("painel2").style.backgroundColor = "black";
            console.log("Descendoooo")
        }

        console.log("Andar atual: " + andarAtual)

    }   
    AbrirPorta();

    }, {once: true});


    FecharPorta();
    console.log("Cheguei!" + " atual " + andarAtual + " escolhido " + andarEscolhido);
    document.getElementById("painel2").style.backgroundColor = "green";

}

function AbrirPorta() {
    document.getElementById("porta").classList.remove("portaFechando")
    document.getElementById("porta").classList.add("portaAbrindo")
}

function FecharPorta() {
    document.getElementById("porta").classList.remove("portaAbrindo")
    document.getElementById("porta").classList.add("portaFechando")
}

