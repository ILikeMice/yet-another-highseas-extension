window.onload = () => {
    chrome.storage.local.get("shipdata", (res) => {
        console.log(res)
        let data = res["shipdata"]["value"]
        let dailyhours = 0
        let totalhours = 0
        let totaldoubloons = 0
        for (let i = 0; i < Object.keys(data); i++) {
            totalhours += data["value"][i][""]
        }
        
        document.getElementById("testspan").innerText = dailyhours;
    });
}