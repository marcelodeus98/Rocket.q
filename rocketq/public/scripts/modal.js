export default function Modal(){
    const selectorModal_Wrapper = document.querySelector('.modal-wrapper')
    function open(){
        selectorModal_Wrapper.classList.add("active")
    }
    function close(){
        selectorModal_Wrapper.classList.remove("active")
    }

    return{
        open,
        close
    } 
} 