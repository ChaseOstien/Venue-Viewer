const keyInput = document.getElementById('keyword');
const button = document.getElementById('submitButton');
let searchParam = document.getElementById('keyword').value;
keyInput.addEventListener('input', inputChecked);
keyInput.addEventListener('blur', inputChecked);
button.addEventListener('click', checkInput);

async function checkInput() {

    if (searchParam.trim() === '') {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
    return;
    } 

async function inputChecked () {
    
        button.disabled = false;
    };