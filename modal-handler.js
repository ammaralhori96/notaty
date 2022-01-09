function openAddModal() {
    var modal = document.getElementById("addNoteModal")
    var closeSpan = document.getElementById("closeAdd")
    var cancelButton = document.getElementById("cancelAddNoteBtn")

    clearAddModal()

    modal.style.display = "block"
    closeSpan.onclick = () => {
        modal.style.display = "none";
    }
    cancelButton.onclick = () => {
        modal.style.display = "none";
    }
}

function clearAddModal() {
    document.getElementById("addTitle").value = ""
    document.getElementById("addContent").value = ""
    document.getElementById("addError").innerHTML = ""
}

function saveNewNote() {
    var titleStr = document.getElementById("addTitle").value
    var contentStr = document.getElementById("addContent").value
    var noteData = { title: titleStr, content: contentStr };
    addNote(noteData)
        .then(response => {
            if (response.ok) {

                var modal = document.getElementById("addNoteModal")
                modal.style.display = "none";
                response.json().then(json => {
                    var newNoteId = json["_id"];
                    updateNotesTable(newNoteId)
                })
            } else {
                response.text().then(error => { document.getElementById("addError").innerHTML = error; })
                    .catch(erorr => {
                        console.log(erorr)
                        document.getElementById("addError").innerHTML = error
                    })

            }
        })



    modal.style.display = "block"
    closeSpan.onclick = () => {
        modal.style.display = "none";
    }
    cancelButton.onclick = () => {
        modal.style.display = "none";
    }
}

function openEditModal(noteID) {
    var modal = document.getElementById("editNoteModal")
    var closeSpan = document.getElementById("closeEdit")
    var cancelButton = document.getElementById("cancelEditNoteBtn")

    clearAddModal()

    modal.style.display = "block"
    closeSpan.onclick = () => {
        modal.style.display = "none";
    }
    cancelButton.onclick = () => {
        modal.style.display = "none";
    }

    loadNoteData(noteID)
}

function loadNoteData(noteID) {
    var modal = document.getElementById("editNoteModal")
    var noteIdAttribute = document.createAttribute("noteid")
    noteIdAttribute.value = noteID
    modal.setAttributeNode(noteIdAttribute)
    getNoteById(noteID).then(data => {
        document.getElementById("editTitle").value = data["title"]
        document.getElementById("editContent").value = data["content"]
    })
}

function saveEditNote() {
    var modal = document.getElementById("editNoteModal")
    const noteId = modal.getAttribute("noteid")
    const titleStr = document.getElementById("editTitle").value
    const contentStr = document.getElementById("editContent").value
    const noteData = { _id: noteId, title: titleStr, content: contentStr }
    updateNote(noteData).then(response => {
        if (response.ok) {

            var modal = document.getElementById("editNoteModal")
            modal.style.display = "none";
            updateNotesTable(noteId)

        } else {
            response.text().then(error => { document.getElementById("editError").innerHTML = error; })
                .catch(erorr => {
                    document.getElementById("editError").innerHTML = error;
                })
        }

    })


}