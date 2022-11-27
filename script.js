const addNoteBtnEl = document.querySelector(".addNoteBtn");
const right_sideEl = document.querySelector(".right_side");
const note_titleEl = document.querySelector(".note_title");
const note_bodyEl = document.querySelector(".note_body");
const save_btnEl = document.querySelector(".save_btn");
const cross_btnEl = document.querySelector(".cross_btn");

const months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false;
let updateIndex;

addNoteBtnEl.addEventListener("click", ()=> {
	isUpdate = false;
	note_titleEl.value = "";
	note_bodyEl.value = "";
    right_sideEl.classList.remove("hide");
	note_titleEl.focus();
});

cross_btnEl.addEventListener("click", ()=>{
	isUpdate = false;
	note_titleEl.value = "";
	note_bodyEl.value = "";
    right_sideEl.classList.add("hide");
});

save_btnEl.addEventListener("click", () =>{
	if (note_titleEl.value || note_bodyEl.value) {
		let noteTitle = note_titleEl.value;
		let noteBody = note_bodyEl.value;

		let dateObj = new Date();
		let day = dateObj.getDate();
		let month = months[dateObj.getMonth()];
		let year = dateObj.getFullYear();

		let noteData = {
			title: noteTitle,
			body: noteBody,
			date: `${day} ${month} ${year}`
		}
		if (!isUpdate) {
			notes.push(noteData);
		} else {
			isUpdate = false;
			notes[updateIndex] = noteData;
		}
		localStorage.setItem("notes", JSON.stringify(notes));
		cross_btnEl.click();
		saveNotes();
	} else {
		alert("Please enter your note title and description");
		note_titleEl.focus();
	}
	
});

function saveNotes() {
	document.querySelectorAll(".noteList_item").forEach(note => note.remove());
	notes.forEach((note, index) => {
		let noteListTag = `<div class="noteList_item">
								<div class="noteList_item_title">${note.title}</div>
								<div class="noteList_item_body">${note.body}</div>
								<div class="noteList_item_bottom">
									<div class="noteList_item_bottom_btn_area">
										<img src="./assets/edit.svg" alt="trash" class="noteList_item_edit noteList_item_btn" onclick="updateNode(${index}, '${note.title}', '${note.body}')">
										<img src="./assets/trash.svg" alt="trash" class="noteList_item_trash noteList_item_btn" onclick="deleteNode(${index})">
									</div>
									<div class="noteList_item_time">${note.date}</div>
								</div>
							</div>`;
		addNoteBtnEl.insertAdjacentHTML("afterend", noteListTag);
	});
}
saveNotes();

function deleteNode(noteIndex) {
	notes.splice(noteIndex, 1);
	localStorage.setItem("notes", JSON.stringify(notes));
	saveNotes();
	cross_btnEl.click();
}

function updateNode(noteIndex, ttle, bdy) {
	isUpdate = true;
	updateIndex = noteIndex;
	addNoteBtnEl.click();
	note_titleEl.value = ttle;
	note_bodyEl.value = bdy;
}