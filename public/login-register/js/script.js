function validateSubmit() {
    let inputs = [].slice.call(document.querySelectorAll(".input"))
    let value = inputs[0].value && inputs[1].value
    if (value) {
        return true
    }
    else {
        window.alert("Preencha todos os campos!")
        return false
    }

}