const baseUrl = "https://ammar-notaty.herokuapp.com"

async function addNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData)

    })
    return response
}

async function updateNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData)

    })
    return response
}
async function deleteNote(noteID) {
    const response = await fetch(`${baseUrl}/notes/${noteID}`, {
        method: "DELETE",

    })
    return response
}

async function getNoteById(noteID) {
    const response = await fetch(`${baseUrl}/notes/${noteID}`, )
    return response.json()
}

async function getNotes(noteTitle) {
    let url = `${baseUrl}/notes`
    if (noteTitle) {
        url += `/?title=${noteTitle}`
    }
    const response = await fetch(url)
    return response.json()
}