let todoList = document.querySelector("#todo-list-content")

function validateSubmit() {
    let value = document.querySelector("#input").value
    if (value == "" || value == null) {
        window.alert("Campo em branco, bobinho kkk")
        return false
    }
    return true
}

function getTodoListData() {
    return fetch("/todo-list/api/")
        .then(responseStrean => responseStrean.json())
        .then(responseParsed => responseParsed.data)
}

function insert() {
    let input = document.querySelector("#input")
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            if (input.value.trim() != "" || input.value)
                fetch("/todo-list/api/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: input.value })
                })
                    .then(() => getTodoListData()
                        .then(data => {
                            todoList.innerHTML = ""
                            data.forEach(item => {
                                todoList.innerHTML +=
                                    `<div class="item">
                                        <p class="content">${item.task}</p>
                                        <div class="check-item" role="button" data-id="${item.id}">
                                            </div>
                                        </div>`
                            })
                            deleteTodoList();
                        })
                    )
                    .catch(err => window.alert(err.message))
            input.value = ""
        }
    });
}



function mountTodoList() {
    todoList.innerHTML = ""

    getTodoListData()
        .then(data => {
            data.forEach(item => {
                todoList.innerHTML +=
                    `<div class="item">
            <p class="content">${item.task}</p>
            <div class="check-item" role="button" data-id="${item.id}">
                </div>
            </div>`
            });
            deleteTodoList()
        })
}

function deleteTodoList() {

    let checkButtons = [].slice.call(document.querySelectorAll(".check-item"))

    checkButtons.forEach(button => {
        button.addEventListener("click", (e) => {

            const data = parseInt(button.dataset.id)

            if (typeof (data) == "number") {

                fetch("/todo-list/api/", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: data })
                }).then(() => window.location.reload())
                    .catch(err => window.alert(err.message))
            }

        })
    })
}

mountTodoList()
insert()