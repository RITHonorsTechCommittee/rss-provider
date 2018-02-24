document.addEventListener('DOMContentLoaded', onLoad, false);

function onLoad() {
    var newDate = new Date();
    newDate.setDate(newDate.getDate() + 14);
    document.getElementById('date').value = `${newDate.getFullYear()}-${('00' + (newDate.getMonth() + 1)).slice(-2)}-${('00' + newDate.getDate()).slice(-2)}`;
}