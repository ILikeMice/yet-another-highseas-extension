function savekey() {
    let key = document.getElementById("keyinput").value
    window.localStorage.setItem("YAHSE-userdata", key)
    console.log(window.localStorage.getItem("YAHSE-userdata"))
}

function togglepass() {
    if (document.getElementById("keyinput").type == "password") {
        document.getElementById("keyinput").type = "text"
    } else {
        document.getElementById("keyinput").type = "password"
    }
}

window.onload = () => {
    let key = window.localStorage.getItem("YAHSE-userdata")
    document.getElementById("keyinput").value = key
    document.getElementById("maindiv").style.height = screen.height - document.getElementById("welcometitle").offsetHeight + "px"
}