const text = document.querySelector("textarea")
const body = document.querySelector("body")
const options = [...document.querySelectorAll(".options input")]
const countBtn = document.querySelector("button")

const wordsObj = {
   name: "Words",
   check: true,
   quantity: 0,
}

const symbolsObj = {
   name: "symbols (no spaces)",
   check: false,
   quantity: 0,
}

const sentencesObj = {
   name: "Sentences (only dots)",
   check: false,
   quantity: 0,
}

const spacesObj = {
   name: "Spaces",
   check: false,
   quantity: 0,
}

let updatedValue = ""

let checkedInputs = document.querySelectorAll("input:checked")

function collectUpdatedValues() {
   checkedInputs.forEach((inp) => {
      if (inp.dataset.words) {
         const words = updatedValue.trim().split(" ")

         wordsObj.quantity = words.length
         if (updatedValue.trim() === "") {
            wordsObj.quantity = 0
         }
      }
      if (inp.dataset.symbols) {
         symbolsObj.quantity = updatedValue
            .split("")
            .filter((symbol) => symbol !== " ").length
      }

      if (inp.dataset.sentences) {
         sentencesObj.quantity = updatedValue.split(".").length - 1
      }

      if (inp.dataset.spaces) {
         spacesObj.quantity = updatedValue.split(" ").length - 1
      }
   })
}

text.addEventListener("keyup", (e) => {
   updatedValue = e.target.value
   collectUpdatedValues()
})

options.forEach((input) => {
   input.addEventListener("change", (e) => {
      checkedInputs = options.filter((item) => item.checked)

      collectUpdatedValues()

      if (e.target.checked && e.target.dataset.words) {
         wordsObj.check = true
      } else if (!e.target.checked && e.target.dataset.words) {
         wordsObj.check = false
      }

      if (e.target.checked && e.target.dataset.symbols) {
         symbolsObj.check = true
      } else if (!e.target.checked && e.target.dataset.symbols) {
         symbolsObj.check = false
      }

      if (e.target.checked && e.target.dataset.sentences) {
         sentencesObj.check = true
      } else if (!e.target.checked && e.target.dataset.sentences) {
         sentencesObj.check = false
      }

      if (e.target.checked && e.target.dataset.spaces) {
         spacesObj.check = true
      } else if (!e.target.checked && e.target.dataset.spaces) {
         spacesObj.check = false
      }
   })
})

const info = document.createElement("div")

function renderTable(data) {
   let countsList

   if (data.length > 0) {
      countsList = data
         .filter((item) => item.check && item.quantity > 0)
         .map(
            (item) => `<li class="row">
                          <span class="row_name">${item.name}</span>
                          <span class="row_quantity">${item.quantity}</span>
                       </li>`
         )
         .toString()
         .replaceAll(",", "")
   }

   const empty = data.filter((item) => item.quantity !== 0).length === 0
   const notChecked = data.filter((item) => item.check === false).length === options.length

   const showError = empty || notChecked || updatedValue.trim() === ""

   if (showError) {
      countsList = `<p class="error_msg">Please check any option or type text</p>`
   }

   info.innerHTML = `
        <ul class="table_wrapper">
           ${countsList}
        </ul>
    `
   body.append(info)
}

countBtn.addEventListener("click", () => {
   renderTable([wordsObj, symbolsObj, sentencesObj, spacesObj])
})
