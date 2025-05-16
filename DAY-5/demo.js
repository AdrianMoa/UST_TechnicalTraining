const url = 'http://localhost:3000/Books';

async function getAllBooks(){
    const bookList = (await fetch(url)).json();
    const tableBody = document.getElementById("tableBody");
    
    bookList.forEach(book => {
        tableBody.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.bookTitle}</td>
            <td>${book.price}</td>
            <td>
                <button class="btn btn-warning" onclick="editBook('${book.id}')" />
                <button class="btn btn-danger" onclick="deleteBook('${book.id}')" />
            </td>
        </tr>
        `;
    });
}