// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", function(){
    fetchQuote()
    document.getElementById("new-quote-form").addEventListener("submit", addNewQuote)
    
})

function fetchQuote(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(res => res.json())
    .then(json => json.forEach(quote => renderQuote(quote)))
}

function renderQuote(e){
    // debugger
    const getQuote = document.getElementById("quote-list")
    const createLi = document.createElement("li")
    createLi.classList.add("quote-card")
    createLi.id = e.id
    getQuote.append(createLi)
    const createBlockquote = document.createElement("blockquote")
    createBlockquote.classList.add("blockquote")
    createLi.appendChild(createBlockquote)
    const createP = document.createElement("p")
    createP.dataset.md = e.id
    createP.innerText = e.quote
    createBlockquote.append(createP)
    const createFooter = document.createElement("footer")
    createFooter.innerText = e.author
    createFooter.classList.add("blockquote-footer")
    createBlockquote.append(createFooter)
    const createBr = document.createElement("br")
    createBlockquote.append(createBr)

    const createSuccessBtn = document.createElement("button")
    createSuccessBtn.classList.add("btn-success")
    createSuccessBtn.innerText = "Likes: "
    const createSpan = document.createElement("span")
    createSpan.innerText = 0
    createSuccessBtn.append(createSpan)
    createBlockquote.appendChild(createSuccessBtn)
    // createSuccessBtn.addEventListener("click", addLike)
    
    const createDangerBtn = document.createElement("button")
    createDangerBtn.classList.add("btn-danger")
    createDangerBtn.innerText = "Delete"
    createBlockquote.append(createDangerBtn)
    createDangerBtn.addEventListener("click", (e) => deleteQuote(e, createLi.id))
}

function addNewQuote(e){
    e.preventDefault()
    const getQuote = document.getElementById("new-quote").value
    const getAuthor = document.getElementById("author").value

    const data = {
        "quote": getQuote,
        "author": getAuthor
    }

    renderQuote(data)
}

function deleteQuote(e, createLiId){
    e.preventDefault()
    const deleteLi = e.target.parentElement.parentElement
    
    let data = {
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json"
        }
    }

    fetch(`http://localhost:3000/quotes/${createLiId}`, data)
    .then(res => {
        if(res.ok){
            deleteLi.remove()
        }
    })
}

// function addLike(e){
//     // debugger
//     // let createId = e.target.parentElement.parentElement.id
//     fetch("http://localhost:3000/likes", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: {
//             "quoteId": 1,
//             "create_at": 0
//         }
//     })
//     .then(res => res.json())
//     .then(json => console.log(json))


// }