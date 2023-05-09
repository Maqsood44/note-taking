    //THIS FUNCTION IS USED TO SHOW THE NOTES ON DOCUMENT WINDOW
let showNotes = () => {
    // Get notes form local storage
    let notes = localStorage.getItem("notes")
    if (notes == null) { //chack if there is no note in local storage
        noteObj = [] // create an empty array
    }
    else {
        noteObj = JSON.parse(notes) //convert the array into object of array
    }
    noteObj.reverse() // Reverse the array to arear new added note on top
    let HTML = ""
    if (noteObj.length != null) { // If note/s is/are available in local storage
        noteObj.forEach((t, i) => {  // create a card for each note
            HTML += `<div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${t.title}</h5>
                <p class="card-text">${t.note}</p>
                <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>`
        });
    }
    if (noteObj.length != 0) { 
        document.getElementById("noteList").innerHTML = HTML // apear all the card on document
    }
    else {
        document.getElementById("noteList").innerHTML = "<h5 style='color: #495959;'>You have no Note</h5>"
    }
}
showNotes()

// THIS FUNCTION IS USED TO ADD NEW NOTE INTO LOCAL STORAGE
document.getElementById("addNote").addEventListener("click", () => {
    const obj = {
        title: document.getElementById("titleText").value,
        note: document.getElementById("noteText").value
    }
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    noteObj.push(obj)

    localStorage.setItem("notes", JSON.stringify(noteObj)) //create string from array of objects and set it into local storage
    titleText.value = "" // Claar the input field
    noteText.value = ""
    showNotes() 
})
 //THIS FUNCTION IS USED TO DELETE NOTE FROM LOCAL STORAGE
let deleteNote = (e) => {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    noteObj.splice(e, 1) //Remove the target note from local storage
    localStorage.setItem("notes", JSON.stringify(noteObj)) // update the LS
    showNotes()
}
 
//THIS FUNCTION IS USED TO SEARCH NOTE.
let search = document.getElementById("searchInput")
search.addEventListener("input", () => {
    input = search.value.toLowerCase() //Change the input into lowerCase
    let cards = document.getElementsByClassName("card") // Get all the cards from document
    Array. from(cards).forEach(function(elem){ //chack for all cards one by one
        let titleText = elem.getElementsByTagName("h5")[0].innerText.toLowerCase(); //Convert the title of note to match with input
        let noteText = elem.getElementsByTagName("p")[0].innerText.toLowerCase(); //Convert the description of note to match with input
        if (noteText.includes(input) || titleText.includes(input)){ //if the given input include in title or description
            elem.style.display = "block" //only show that note card and hide the rest of cards
        }
        else{
            elem.style.display = "none" //otherwise hide all the cards
        }
    })
})
