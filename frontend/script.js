async function load_categories_notes(){
    const res = await fetch("http://127.0.0.1:5000/notes/category");
    const data = await res.json();
    console.log(data);
    const body = document.getElementById("categories")
    body.innerHTML = "";
    const allNotes = document.createElement("div");
    allNotes.textContent = "All Notes";
    allNotes.style.cursor = "pointer";  // show hand cursor
    allNotes.className = "category"
    body.appendChild(allNotes);
    allNotes.addEventListener("click", () =>  {
        // Remove active class from all categories
        document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
        // Add active class to clicked category
        allNotes.classList.add('active');
        load_notes();
    });
    data.forEach((note) =>{ // get category
        const div = document.createElement("div");
        div.style.cursor = "pointer";  // show hand cursor
        div.className = "category"
        div.addEventListener("click", () => {
            // Remove active class from all categories
            document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            div.classList.add('active');
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
