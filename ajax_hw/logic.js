function getData(){

    const xhr = new XMLHttpRequest(); 
    xhr.open("GET", "http://localhost:3000/books"); 
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200){
        console.log(xhr.responseText);  

        let books = JSON.parse(xhr.responseText);
        sessionStorage.setItem("booksData", JSON.stringify(books));

        let tableBody = document.getElementById("bookTable");
        $("#bookTable").html("");

        books.forEach((book) => {
          const row = `
            <tr>
              <th scope="row">${book.count}</th>
              <td class="td_title" onclick="viewBookDetails('${book.id}')">${book.title}</td>
              <td>${book.author}</td>
              <td>${book.publisher}</td>
              <td>${book.year}</td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      }else{
        alert("데이터 불러오는데 실패함!")
      }
    }

}

function viewBookDetails(bookId) {
    sessionStorage.setItem("selectedBookId", bookId);
    location.href = "./view_server.html";
  }

function postData(){

    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/books");
    xhr.setRequestHeader("content-type", "application/json;chatset=UTF-8");

    let count = $("#create_book_number").val();
    let title = $("#create_book_title").val();
    let author = $("#create_book_author").val();
    let publisher = $("#create_book_pub").val();
    let year = $("#create_book_year").val();

    let newBook = {
        count: parseInt(count),
        title: title,
        author: author,
        publisher: publisher,
        year: parseInt(year)
    };


    xhr.send(JSON.stringify(newBook));

}

function buttonClicked(){
  const selectedBookId = sessionStorage.getItem("selectedBookId");
  updateData(selectedBookId)
}

function updateData(id){
  let count = $("#edit_book_number").val();
  let title = $("#edit_book_title").val();
  let author = $("#edit_book_author").val();
  let publisher = $("#edit_book_pub").val();
  let year = $("#edit_book_year").val();

  let newBook = {
      count: parseInt(count),
      title: title,
      author: author,
      publisher: publisher,
      year: parseInt(year)
  };

  fetch(`http://localhost:3000/books/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
   body: JSON.stringify(newBook) 
  })
    .then(response => {
    if (response.ok) {
      alert("도서 정보가 성공적으로 수정되었습니다.");
    } else {
      alert("도서 정보를 수정하는 데 실패했습니다.");
    }
  })
  .catch(error => console.error("Error:", error));
}

function deleteButtonClicked(){
  const selectedBookId = sessionStorage.getItem("selectedBookId");
  deleteData(selectedBookId)
  console.log(selectedBookId)
}



function deleteData(id){
  fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      alert("도서 정보가 성공적으로 삭제되었습니다.");
    } else {
      alert("도서 정보를 삭제하는 데 실패했습니다.");
    }
  })
  .catch(error => console.error("Error:", error));

}
