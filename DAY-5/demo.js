const url = 'http://localhost:3000/Books';
const editingMode = false;

async function getAllBooks(){
    const promiseRequest = await fetch(url);
    const bookList = await promiseRequest.json();
    const tableBody = document.getElementById("tableBody");
    
    bookList.forEach(book => {
        tableBody.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.bookTitle}</td>
            <td>${book.price.toLocaleString('en-US', { style:'currency', currency: 'USD'})}</td>
            <td>
                <button class="btn btn-warning" onclick="editBook('${book.id}','${book.bookTitle}','${book.price}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `;
    });
}

function toogleButtons(editingMode){
    const submitButton = document.getElementById('submit');
    const updateButton = document.getElementById('update');
    const cancelButton = document.getElementById('cancel');
    if(!editingMode){
        submitButton.style.display='inline';
        updateButton.style.display='none';
        cancelButton.style.display='none';
    }
    else{
        submitButton.style.display='none';
        updateButton.style.display='inline';
        cancelButton.style.display='inline';
    }
}

function editBook(bookId, bookTitle, price){
    document.getElementById('bookId').value = bookId;
    document.getElementById('bookTitle').value = bookTitle;
    document.getElementById('price').value = price;
    toogleButtons(true);
}

async function deleteBook(bookId){
    const deleteRecord = confirm(`Do you want delete the Book with ID ${bookId}?`);
    if(!deleteRecord) return;

    await fetch(`${url}/${bookId}`, { method: 'DELETE'});
    alert('Book deleted succesfully!');

    getAllBooks();
}