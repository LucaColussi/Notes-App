async function load_categories_notes(){
    const res = await fetch("http://127.0.0.1:5000/notes/category");
    const data = await res.json();
    console.log(data);
    const body = document.getElementById("categories")
    body.innerHTML = "";
    data.forEach((note) =>{ // get category
        const div = document.createElement("div");
        div.textContent = "Click me";
        div.style.cursor = "pointer";  // show hand cursor
        div.className = "category"
        div.addEventListener("click", () => {
            load_notes_by_categories(note)
        });
        div.textContent = note.category;
        body.appendChild(div);
    })
}

async function load_notes(){
    const res = await fetch("http://127.0.0.1:5000/notes");
    const data = await res.json();
    const body = document.getElementById("notes-container")
    body.innerHTML = "";  // Clear only the notes, not the search
    data.forEach((note) =>{ 
        const div = document.createElement("div");
        div.className = "note"
        const title = document.createElement("p");
        title.textContent = note.title;

        const text = document.createElement("p");
        text.textContent = note.body;

        title.className = "title";
        div.appendChild(title);
        div.appendChild(text);
        
        body.appendChild(div);
    })
}
async function load_notes_by_categories(note){
        const res = await fetch(`http://127.0.0.1:5000/notes/${note.category}`);
        const data = await res.json();
        const body = document.getElementById("notes-container")
        body.innerHTML = "";  // Clear only the notes, not the search
        data.forEach((note) =>{ 
            const div = document.createElement("div");
            div.className = "note"

            const title = document.createElement("p");
            title.textContent = note.title;

            const text = document.createElement("p");
            text.textContent = note.body;

            title.className = "title";
            div.appendChild(title);
            div.appendChild(text);        
            body.appendChild(div);
        })


}
document.addEventListener("DOMContentLoaded", () => {
  load_notes();
  load_categories_notes();
});
