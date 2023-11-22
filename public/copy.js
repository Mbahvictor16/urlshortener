const copyBtn = document.querySelector(".copy")
const url = document.querySelector(".url")


copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(url.innerText)
    copyBtn.textContent = ""
    copyBtn.textContent = "copied!"
})