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
    
      let dphclasses = ["redbg", "orangebg", "yellowbg", "greenbg", "brightgreenbg", "brightgreenbg"]
      let dphclass = dphclasses[Math.round((shipdoubloons / shiphours) / 5)  - 1]
      console.log(Math.round((shipdoubloons / shiphours) ))
      ship.getElementsByClassName("flex flex-wrap items-start gap-2 text-sm")[0].insertAdjacentHTML("beforeend", 
        `<span id="${id + "-dph"}" class="inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false " data-sentry-component="Pill" data-sentry-source-file="pill.tsx" style="vertical-align: middle;">
          <img alt="doubloons" loading="lazy" width="16" height="20" decoding="async" data-nimg="1" src="https://icons.hackclub.com/api/icons/hackclub-dark/bank-circle" style="color: transparent;">
          <span class="inline-block py-1"> ${Math.round((shipdoubloons / shiphours-5)/2)} / 10</span>
        </span>`)
      
      ship.getElementsByClassName("flex flex-wrap items-start gap-2 text-sm")[0].insertAdjacentHTML("beforeend", 
        `<span id="${id + "-dph"}" class="inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 ${dphclass} border-gray-500/10 false " data-sentry-component="Pill" data-sentry-source-file="pill.tsx" style="vertical-align: middle;">
          <img alt="doubloons" loading="lazy" width="16" height="20" decoding="async" data-nimg="1" src="/_next/static/media/doubloon.fd63888b.svg" style="color: transparent;">
          <span class="inline-block py-1">${(shipdoubloons / shiphours).toFixed(1)} db/h</span>
        </span>`)
      

    } catch (err) {
      // error fixer 3000
    }
  }
}

function addoverview() {
  if (document.getElementById("YAHSE-overview")) {
    return
  }
  let shipdiv = document.querySelector("div.space-y-4.mt-8")
  let overviewtitle = document.createElement("h2")
  overviewtitle.className = "text-center text-2xl text-blue-500"
  overviewtitle.innerText = "Ship Overview"

  let overviewdiv = document.createElement("div")
  overviewdiv.id = "YAHSE-overview"
  overviewdiv.className = "overview rounded-lg bg-card text-card-foreground shadow-sm bg-blend-color-burn flex flex-col sm:gap-2 sm:flex-row items-start sm:items-center p-4  transition-colors duration-200"
  
  let totalships = document.createElement("div")
  totalships.className = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-150  bg-[#9AD9EE] text-black h-10 px-4 py-2 bg-blend-color-burn"
  let ships = JSON.parse(window.localStorage.getItem("cache.ships"))
  
  let shipcount = 0
  let doublooncount = 0
  let hourcount = 0
  for (let i = 0; i < Object.keys(ships["value"]).length; i++) {
    doublooncount += ships["value"][i]["doubloonPayout"]
    hourcount += ships["value"][i]["hours"]
    console.log(doublooncount, ships["value"][i]["doubloonPayout"], ships["value"][i]["title"])
    if (ships["value"][i]["reshippedFromId"] == null) {
      shipcount++
    }
  }
  totalships.innerText = "Total Ships: " + shipcount
  totalships.insertAdjacentHTML("afterbegin", `<img alt="doubloons" loading="lazy" height="30" width="20" decoding="async" data-nimg="1" src=https://icons.hackclub.com/api/icons/hackclub-dark/send style="color: transparent;">`)

  

  let totaldoubloondiv = document.createElement("div")
  totaldoubloondiv.className = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-150  bg-[#9AD9EE] text-black h-10 px-4 py-2 bg-blend-color-burn"
  totaldoubloondiv.innerText = "Total Doubloons from Ships: " + doublooncount
  totaldoubloondiv.insertAdjacentHTML("beforeend", `<img alt="doubloons" loading="lazy" width="16" height="20" decoding="async" data-nimg="1" src="/_next/static/media/doubloon.fd63888b.svg" style="color: transparent;">`)

  let totalhoursdiv = document.createElement("div")
  totalhoursdiv.className = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-150  bg-[#9AD9EE] text-black h-10 px-4 py-2 bg-blend-color-burn"
  totalhoursdiv.innerHTML = "Total Hours:  "
  totalhoursdiv.insertAdjacentHTML("beforeend", `<svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="clock" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20" height="20" style="display: inline-block; vertical-align: middle;"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z"></path><path d="M15.64 17a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z"></path><path d="M21.702 19.502a1 1 0 0 1-1.366.366l-5.196-3a1 1 0 0 1 1-1.732l5.196 3a1 1 0 0 1 .366 1.366z"></path></g></svg>`)
  totalhoursdiv.innerHTML += hourcount.toFixed(1) + " hours"

  let dphdiv = document.createElement("div") 
  dphdiv.className = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-150  bg-[#9AD9EE] text-black h-10 px-4 py-2 bg-blend-color-burn"
  dphdiv.innerHTML = "Average DPH: " + (doublooncount / hourcount).toFixed(1) + " db/h"
  
  console.log(shipdiv)

  overviewdiv.appendChild(totalhoursdiv)
  overviewdiv.appendChild(totaldoubloondiv)
  overviewdiv.appendChild(totalships)
  overviewdiv.appendChild(dphdiv)
  
  
  shipdiv.insertAdjacentElement("afterbegin", overviewdiv)
  

  shipdiv.insertAdjacentElement("afterbegin", overviewtitle)
  console.log("overview")
}

function addwindowstats() {
  if (!document.getElementById("YAHSE-windowdph")) {
    let shiptitle = document.querySelector("h2.text-3xl.font-bold").innerText
    let pillcontainer = document.querySelector("div.flex.items-center.gap-4.mt-4")
    console.log(shiptitle)
    let dphpill = `<span id="YAHSE-windowdph" class="inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 bg-white/15 text-white " data-sentry-component="Pill" data-sentry-source-file="pill.tsx" style="vertical-align: middle;"><img alt="doubloons" loading="lazy" width="16" height="20" decoding="async" data-nimg="1" src="/_next/static/media/doubloon.fd63888b.svg" style="color: transparent;"><span class="inline-block py-1">16 db/h</span></span>`
    pillcontainer.insertAdjacentHTML("beforeend", dphpill)
  }
}

async function load() {
    console.log("HIGHSEAS!!!!", window.location.pathname)
    let doubloonspan = await waitForElementToExist(".mr-2")
    let doublooncount = Number(doubloonspan.innerText.split(" ")[0])
    console.log(doublooncount)

    let shipdata = JSON.parse(window.localStorage.getItem("cache.ships"))
    chrome.storage.local.set({ "shipdata": shipdata }, function(){
      console.log("data saved yippie")
    }); 
    
    for (let i = 0; i < Object.keys(shipdata["value"]).length; i++) {
      console.log(shipdata["value"][i])
      if (window.location.pathname == "/shipyard") {
        adddph(`shipped-ship-${i}-shipped`, shipdata["value"])
        
      }
    }
    console.log(shipdata)
}

function checkitems() {
  if (document.querySelector("div.flex.items-center.gap-4.mt-4")) {
    addwindowstats()
  }
  
  addoverview()
  let shipdata = JSON.parse(window.localStorage.getItem("cache.ships"))
  for (let i = 0; i < Object.keys(shipdata["value"]).length; i++) {
    adddph(`shipped-ship-${i}-shipped`, shipdata["value"])
    
    
  }
}

window.onload = () => {
  load()
  setInterval(checkitems, 1000)
}