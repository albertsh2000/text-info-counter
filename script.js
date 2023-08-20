const text = document.querySelector("textarea")
const body = document.querySelector("body")
const options = [...document.querySelectorAll(".options input")]
const countBtn = document.querySelector("button")


const wordsObj = {
    name: "Words",
    check: true,
    quantity: 0
}

const charactersObj = {
    name: "Characters (no spaces)",
    check: false,
    quantity: 0
}

const sentencesObj = {
    name: "Sentences",
    check: false,
    quantity: 0
}

const spacesObj = {
    name: "Spaces",
    check: false,
    quantity: 0
}


let updatedValue = ""


let checkedInputs = document.querySelectorAll("input:checked")

function allValues() {
    checkedInputs.forEach(inp => {
        if (inp.dataset.words) {
            const words = updatedValue.trim().split(" ")

            wordsObj.quantity = words.length
            if(updatedValue === ""){
                wordsObj.quantity = 0
            }
            


        }
        if (inp.dataset.characters) {
            charactersObj.quantity = updatedValue.split('').filter(c => c !== ' ').length

        }

        if (inp.dataset.sentences) {
            sentencesObj.quantity = updatedValue.split(".").length - 1;
        }

        if (inp.dataset.spaces) {
            spacesObj.quantity = updatedValue.split(' ').length - 1;
        }


    })
}

text.addEventListener("keyup", (e) => {
    updatedValue = e.target.value
    allValues()
})


options.forEach(input => {

    input.addEventListener("change", (e) => {

        checkedInputs = options.filter(item => item.checked)

        allValues()


        if (e.target.checked && e.target.dataset.words) {
            wordsObj.check = true
        } else if(!e.target.checked && e.target.dataset.words) {
            wordsObj.check = false
        }

        if (e.target.checked && e.target.dataset.characters) {
            charactersObj.check = true
        } else if(!e.target.checked && e.target.dataset.characters){
            charactersObj.check = false
        }

        
        if (e.target.checked && e.target.dataset.sentences) {
            sentencesObj.check = true
        } else if(!e.target.checked && e.target.dataset.sentences) {
            sentencesObj.check = false
        }

        if (e.target.checked && e.target.dataset.spaces) {
            spacesObj.check = true
        } else if(!e.target.checked && e.target.dataset.spaces) {
            spacesObj.check = false
        }

    })


})




const info = document.createElement("div")

function renderTable(data) {


    let countsList

    if (data.length > 0) {

        countsList = data.filter(item => item.check)
            .map(item => `<li><span class="name">${item.name}</span><span class="quantity">${item.quantity}</span>`)
            .toString()
            .replaceAll(',', '')
    }

    info.innerHTML = `
     <div class="table_wrapper">
        <ul class="right">
           ${countsList}
        </ul>
        </div>

    `

    body.append(info)


}

countBtn.addEventListener("click", () => {

    renderTable([wordsObj, charactersObj, sentencesObj, spacesObj])

})