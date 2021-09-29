import Modal from './modal.js'

const modal = Modal()

const modalTitlle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//Abrir modal pelo botão excluir - open modal
// Pega todos os butões com a classe trash(excluir)
const checkButtons = document.querySelectorAll(".actions a.trash")
 //abrir a modal
checkButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false)) 
})

// Fechar a modal  aberto pelo botão excluir - close modal
// Pega todos os butões com a classe cancel(cancelar)
const checkButtonCancel = document.querySelectorAll(".buttons div.cancel")
//Fecha a modal
checkButtonCancel.forEach(button => {
    button.addEventListener("click", event => {
        modal.close()
    })
})


// Abrir a modal pelo botão marcar como lido
// Pega todos os butões com a classe check
const mark_as_read = document.querySelectorAll(".actions a.check")
 //abrir a modal
mark_as_read.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event))
})

// Fechar a modal aberta pelo botão marcar como lido - close modal
// Pega todos os butões com a classe cancel(cancelar)
checkButtonCancel = document.querySelectorAll(".buttons div.cancel")
//Fecha a modal
checkButtonCancel.forEach(button => {
    button.addEventListener("click", event => {
        modal.close()
    })
})

function handleClick(event, check = true){
    event.preventDefault()
    
    const roomId = document.querySelector("#room-id").dataset.id
    const action = check ? "check" : "delete"
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    // - Passando minhas váriavéis 
    form.setAttribute("action", `/question/${roomId}/${questionId}/${action}`)

    const text = check ? "Marcar como lida" : "Excluir"
    
    modalTitlle.innerHTML = check ? `${text} esta pergunta`:`${text} esta  pergunta`
    modalDescription.innerHTML = check ? `Tem certeza que deseja ${text.toLowerCase()} está pergunta?` : `Tem certeza que deseja ${text} está pergunta?`
    modalButton.innerHTML = check ? `Sim, ${text.toLowerCase()}` : `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    //abrir modal
    modal.open()
}