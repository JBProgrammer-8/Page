function enviarWhatsapp(){
    let name = document.getElementById("nome").ariaValueMax;
    let mensage = document.getElementById("mensage").ariaValueMax;

    let text = `Olá Josué! Meu nome é ${name}. ${mensage}`;

    let number = "+5562985054112";

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}, "_blank"`);
}
console.log("Arquivo carregado");