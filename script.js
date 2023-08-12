const text = document.querySelector("textarea")

const countBtn = document.querySelector("button")

const info = document.createElement("div")
const body = document.querySelector("body")
const options = document.querySelectorAll(".options input")








countBtn.addEventListener("click", () => {


    renderTable()

})


function renderTable() {
    info.innerHTML = ""


    options.forEach(input=>{
        console.log(input.dataset)
    })


    const words = text.value.trim().split(" ")
    const wordsCount = words.length

    const charactersCount = text.value.split('').filter(c => c !== ' ').length;

    const sentencesCount = text.value.split(".").length - 1;


    const spacesCount = text.value.split(' ').length - 1;

    info.innerHTML += `
     <div class="table_wrapper">
            <ul class="left">
                <h2 class="table_title">Name</h2>
                <li>Words</li>
                <li>characters (no spaces) </li>
                <li>Sentences</li>
                <li>Spaces</li>
            </ul>
        <ul class="right">
            <h2 class="table_title">Quantity</h2>
            <li>${wordsCount}</li>
            <li>${charactersCount}</li>
            <li>${sentencesCount}</li>
            <li>${spacesCount}</li>
        </ul>
        </div>

    `
    body.append(info)
}