function getData(){

    const xhr = new XMLHttpRequest(); 
    xhr.open("GET", "http://localhost:3000/books"); 
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200){
        console.log(xhr.responseText);  

        let books = JSON.parse(xhr.responseText);
        
        let tableBody = document.getElementById("bookTable");
        $("#bookTable").html("");

        books.forEach((book) => {
          const row = `
            <tr>
              <th scope="row">${book.count}</th>
              <td class="td_title" onclick="location.href='./view_server.html'">${book.title}</td>
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






function bbb(){

    const xhr = new XMLHttpRequest(); 
    xhr.open("POST", "http://localhost:3000/students"); 
    xhr.setRequestHeader("content-type", "application/json;chatset=UTF-8");

    let data = {name:'name1', age:12};

    xhr.send(JSON.stringify(data));
    xhr.onload = () => { 
        if(xhr.status === 201){
            alert(JSON.stringify(xhr.response));
        }
        //document.getElementById("demo").innerHTML = this.responseText; 
    } 
}
