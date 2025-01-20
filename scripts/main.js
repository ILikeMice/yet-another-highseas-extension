window.onload = () => {
    console.log("HIGHSEAS!!!!")
    let doublooncount = Number(document.getElementsByClassName("mr-2")[0].innerText)
    console.log(doublooncount)

    console.log(document.getElementsByClassName)

    let counter = 0
    let scanning = true
    let ships = []
    console.log(scanning, ships, counter)
    while (scanning  == true) {
        console.log(counter)
        if (document.getElementById(`shipped-ship-${counter}-shipped`) != null) {
            ships.push(document.getElementById(`shipped-ship-${counter}-shipped`))
            console.log(document.getElementById(`shipped-ship-${counter}-shipped`).getElementsByClassName("inline-block py-1")[1].innerHTML)
        } else {
            scanning = false
        }
        counter++
    }
    console.log(ships)
}