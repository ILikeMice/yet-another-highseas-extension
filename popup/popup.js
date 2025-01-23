function setkey() {
    chrome.storage.local.set({"api-key":"testing"}, () => {
        console.log("written!")
    })
}

window.onload = () => {
    chrome.storage.local.get("api-key", (res) => {
        console.log(res)
        document.getElementById("keyinput").value = res["api-key"]
    })
}
