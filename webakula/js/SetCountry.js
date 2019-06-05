function setCountryInField(item) {
    const value = item.innerHTML;
    const div = document.getElementById("select");
    const list = document.getElementsByClassName("select-options");
    list[0].style.visibility = "hidden";
    div.innerHTML = value;
}

function showList() {
    const list = document.getElementsByClassName("select-options");
    list[0].style.visibility = "visible";
}
