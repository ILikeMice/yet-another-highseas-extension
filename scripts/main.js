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

function adddph(id, data) {
  let ship = document.getElementById(id)
  
  if (!document.getElementById(`${id}-dph`)) {
    try {
      let shipname = ship.getElementsByClassName("text-xl font-semibold text-left mb-2 sm:block hidden")[0].innerText
      let shipdoubloons = 0
      let shiphours = 0
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (data[i]["title"] == shipname) {
          shipdoubloons += data[i]["doubloonPayout"]
          shiphours += data[i]["hours"]
        }
      }
      
      console.log(id)
    
      ship.style.backgroundColor = "rgb(44, 213, 15)"
      ship.getElementsByClassName("flex flex-wrap items-start gap-2 text-sm")[0].insertAdjacentHTML("beforeend", 
      `<span id="${id + "-dph"}" class="inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 greenbg border-gray-500/10 false " data-sentry-component="Pill" data-sentry-source-file="pill.tsx" style="vertical-align: middle;">
        <img alt="doubloons" loading="lazy" width="16" height="20" decoding="async" data-nimg="1" src="/_next/static/media/doubloon.fd63888b.svg" style="color: transparent;">
        <span class="inline-block py-1">${(shipdoubloons / shiphours).toFixed(2)} db/h</span>
      </span>`)
    } catch (err) {
      // error fixer 3000
    }
  }
}
async function load() {
    console.log("HIGHSEAS!!!!")
    let doubloonspan = await waitForElementToExist(".mr-2")
    let doublooncount = Number(doubloonspan.innerText.split(" ")[0])
    console.log(doublooncount)

    let shipdata = JSON.parse(window.localStorage.getItem("cache.ships"))
    for (let i = 0; i < Object.keys(shipdata["value"]).length; i++) {
      console.log(shipdata["value"][i])
      adddph(`shipped-ship-${i}-shipped`, shipdata["value"])
    }
    console.log(shipdata)
}

function checkitems() {
  let shipdata = JSON.parse(window.localStorage.getItem("cache.ships"))
  for (let i = 0; i < Object.keys(shipdata["value"]).length; i++) {
    adddph(`shipped-ship-${i}-shipped`, shipdata["value"])
  }
}

window.onload = () => {
  load()
  setInterval(checkitems, 1000)
}