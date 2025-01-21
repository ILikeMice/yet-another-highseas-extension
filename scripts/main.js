function adddph(id) {
    let ship = document.getElementById(id)
    console.log(id)
    let button = document.createElement("button")
    button.innerText = "SHIPPPPP"
    ship.getElementsByClassName("flex flex-wrap items-start gap-2 text-sm")[0].appendChild(button)
}

function waitForElementToExist(selector) { // "borrowed" from stackoverflow because I couldnt find another way
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
  
      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
  
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    });
  }

window.onload = async () => {
    console.log("HIGHSEAS!!!!")
    await new Promise((res) => setTimeout(res, 10000)); // some script updates the ships thrice at load, ugly fix but hopefully ill find something in the future
    let doubloonspan = await waitForElementToExist(".mr-2")
    let doublooncount = Number(doubloonspan.innerText.split(" ")[0])
    console.log(doublooncount)

    let shipdata = JSON.parse(window.localStorage.getItem("cache.ships"))
    for (let i = 0; i < Object.keys(shipdata["value"]).length; i++) {
      console.log(shipdata["value"][i])
    }
        
    console.log(shipdata)

    for (let i = 0; i < Object.keys(shipdata); i++) {
        adddph(`ship-${i}-shipped`)
    }

}