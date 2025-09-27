async function load_notes(){
    const res = await fetch("http://127.0.0.1:5000/notes");
    const data = await res.json();
    console.log(data);
    const body = document.getElementById("categories")
    body.innerHTML = "";
    data.forEach((note) =>{
        const div = document.createElement("div");
        div.textContent= note.body;
        body.appendChild(div);
    })
}

load_notes();