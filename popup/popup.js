window.onload = () => {
    chrome.storage.local.get("shipdata", (res) => {
        console.log(res)
        document.getElementById("testspan").innerText = res["shipdata"];
    });
}