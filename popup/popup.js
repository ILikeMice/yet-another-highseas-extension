function setkey() {
    chrome.storage.local.set({"api-key":"testing"}, () => {
        console.log("written!")
    })
}

window.onload = () => {
    let key = window.localStorage.getItem("YAHSE-userdata")
    let apiurl = ""
    let res = fetch(url, {
        "method": "GET",
        "headers": {
            "Authorization": "Basic " + key
        }
    })

}