const resultado = document.querySelector('.resultado')
const input = document.querySelector('.texto')

input.addEventListener('click', (e) => {
    resultado.innerHTML = ''
    input.value = ''
})

document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('enviar')){
        const texto = input.value;
        verificarCpf(texto)
    }
})



function verificarCpf (cpf) {
    let cpfOriginal = cpf.replace(/\D/g, '')
    let param = 11
    let param2 = 12
    let primeiroDigito = 0
    let segundoDigito= 0
    // formatação do cpf
    let cpfLimpo = cpf.replace(/\D+/g, '').substr(0, 9)// >>  /\D+/g  << expressão regular que seleciona tudo menos números

    if (cpf === '111.111.111-11' || cpf === '000.000.000-00' || cpf == ''){
        resultado.innerHTML = 'Número inválido'
        resultado.style.color = 'rgb(255, 0, 0)';
        resultado.style.fontSize  = 'xx-large';
        return
    } else {
        // verificação penúltimo dígito
        for(valor of cpfLimpo) {
            param -= 1
            conta = valor * param
            primeiroDigito += conta 
        }
        const verificado1 = (11 - (primeiroDigito % 11)) > 9 ? 0 : (11 - (primeiroDigito % 11))
        const cpfDigito = cpfLimpo + verificado1

        // verificação último digito
        for(valor of cpfDigito) {
            param2 -= 1
            conta = valor * param2
            segundoDigito += conta
        }
        const verificado2 = (11 - (segundoDigito % 11)) > 9 ? 0 : (11 - (segundoDigito % 11))
        if((cpfDigito + verificado2) === cpfOriginal){
            resultado.innerHTML = 'CPF Válido'
            resultado.style.color = 'rgb(62, 218, 0)';
            resultado.style.fontSize  = 'xx-large';
        } else {
            resultado.innerHTML = 'CPF Inválido'
            resultado.style.color = 'rgb(255, 0, 0)';  
            resultado.style.fontSize  = 'xx-large';
        }
    }
}