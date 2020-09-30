var user = JSON.parse(localStorage.getItem('user'));
profile = user[0].id;
var auth = localStorage.getItem('auth');
res = JSON.parse(auth);

function carregarUser() {
    $.ajax
        ({
            url: "http://localhost:3000/users/" + profile + "",
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                "Authorization": "Bearer " + res
            },
            error: function () {
                $("body").html(`<style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    text-align: center;
                }
                b {
                    font-size: 25px;
                }
                </style>`+
                    "<b>O servidor não conseguiu processar o pedido<b>" +
                    "<br>" +
                    "<button onclick=logout()>Back</button>"
                );
            },
            success: function (retorno) {

                $.each(retorno, function (i, res) {
                    var item = `
                    <div id=` + "req" + i + `>
                        <p>Name</p><input id="name" type="text" value="`+ res.name + `" disabled>
                        <p>Password</p><input class="password" type="password" id="password" disabled>
                        <img disabled class="image" onclick="mostrarOcultarSenha()" id="reveal"
                          src="./images/eye.svg"/>
                        <p>Password confirmation</p><input class="password" type="password" id="passwordConfirmation" disabled>                    
                        <p>Email</p><input id="email" type="text" value="`+ res.email + `" disabled>
                        <p>Cell number</p><input id="cellNumber" type="text" value="`+ res.cellNumber + `" disabled>
                        <p>City</p><input id="city" type="text" value="`+ res.city + `" disabled>
                        <p>UF</p><input id="uf" type="text" value="`+ res.uf + `" disabled>
                    </div>`
                    $("#userPerf").append(item);
                });
            },
            statusCode: {
                404: function () {
                    alert('Page not found');
                    window.location.reload(false);
                },

                401: function () {
                    alert('Unathorized');
                    document.location.href = "./login.html"
                },

                400: function () {
                    alert('Wrong password');
                },

                500: () => {
                    alert('Wrong email')
                }
            }
        });

}

function saveUser() {
    var username = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var passConfirm = document.getElementById("passwordConfirmation").value;
    var email = document.getElementById("email").value;
    var cellNumber = document.getElementById("cellNumber").value;
    var city = document.getElementById("city").value;
    var uf = document.getElementById("uf").value;
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    if (username === "") {
        alert('Invalid username');
    }
    else if (password === "") {
        alert('Insert your actual password and confirm');
    }

    else if (password != passConfirm) {
        alert('Passwords do not match')
    }

    else if (validateEmail(email) == false) {
        alert('Invalid email')
    }

    else {
        var data = {
            "name": username,
            "senha": password,
            "email": email,
            "cellNumber": cellNumber,
            "city": city,
            "uf": uf
        };
        $.ajax({
            url: "http://localhost:3000/users/" + profile + "",
            type: 'PUT',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + res
            },
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + res
            },
            dataType: 'json',
            statusCode: {
                200: function () {
                    alert('User Updated');
                    window.location.reload(true);
                },

                404: function () {
                    alert('Page not found');
                    window.location.reload(false);
                },

                400: function () {
                    alert('User already exist');
                },

                500: () => {
                    alert('Server error')
                    window.location.reload(false);
                }
            }
        });
    }
}

function editUser() {
    if (document.getElementById("name").disabled === true) {
        document.getElementById("name").disabled = false;
        document.getElementById("password").disabled = false;
        document.getElementById("passwordConfirmation").disabled = false;
        document.getElementById("reveal").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("cellNumber").disabled = false;
        document.getElementById("city").disabled = false;
        document.getElementById("uf").disabled = false;
        document.getElementById("saveUser").disabled = false;
        document.getElementById("editUser").innerHTML = 'Cancel';
    }
    else {
        document.getElementById("name").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("passwordConfirmation").disabled = true;
        document.getElementById("reveal").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("cellNumber").disabled = true;
        document.getElementById("city").disabled = true;
        document.getElementById("uf").disabled = true;
        document.getElementById("saveUser").disabled = true;
        document.getElementById("editUser").innerHTML = '<img src="./images/pencil.svg">Edit';
    }
}

function logout() {
    localStorage.setItem("auth", "");
    localStorage.setItem("user", "");
    document.location.href = "./login.html"
}

function mostrarOcultarSenha() {
    var senha = document.getElementById("password");
    if (senha.type == "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}

function createProject() {
    document.getElementById("listProjects").innerHTML = `
    <p>Title</p><input id="title" type="text">
    <p>Description</p><input id="description" type="text">
    <p>Date</p><input type="date" id="date">
    <button id="createProject" onclick="saveProject()">Create project</button>
    <button onclick="carregarProjetos()">Cancel</button>
    `
}

function saveProject() {
    var user = JSON.parse(localStorage.getItem('user'));
    var userId = user[0].id
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    if (title === "") {
        alert('Invalid title');
    }
    else if (description === "") {
        alert('Invalid description');
    }
    else if (date === "") {
        alert('Invalid date');
    }

    else {
        var data = {
            "id": userId,
            "title": title,
            "description": description,
            "date": date
        };
        $.ajax({
            url: "http://localhost:3000/projects",
            type: 'POST',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + res
            },
            data: JSON.stringify(data),
            success: () => {
                alert('Project created');
                window.location.reload(true);
            },
            dataType: 'json',
            statusCode: {
                404: function () {
                    alert('Page not found');
                    window.location.reload(false);
                },

                400: function () {
                    alert('Error');
                },

                500: () => {
                    alert('Server error')
                    window.location.reload(false);
                }
            }
        });
    }
}

function carregarProjetos() {
    document.getElementById("listProjects").innerHTML = "";
    $.ajax
        ({
            url: "http://localhost:3000/projects/" + profile + "",
            type: "GET",
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + res
            },
            dataType: 'json',
            headers: {
                "Authorization": "Bearer " + res
            },
            error: function () {
                $("body").html(`<style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    text-align: center;
                }
                b {
                    font-size: 25px;
                }
                </style>`+
                    "<b>O servidor não conseguiu processar o pedido<b>" +
                    "<br>" +
                    "<button onclick=logout()>Back</button>"
                );
            },
            success: function (retorno) {

                $.each(retorno, function (i, res) {
                    var item = `
                    <div id="req"`+ i + `">
                        <input id="project`+ i + `" type="text" value="` + res.project_id + `" hidden>
                        <p>Title</p><input id="title`+ i + `" type="text" value="` + res.title + `" disabled>
                        <p>Description</p><input id="description`+ i + `" type="text" value="` + res.description + `" disabled>
                        <p>Date</p><input id="date`+ i + `" type="text" value="` + res.date + `" disabled>
                        <div style="display: grid; grid-template-columns: auto auto auto;">
                        <button id="saveProject`+ i + `" onclick="updateProject(id=` + i + `)" disabled>Save edit</button>
                        <button id="deleteProject`+ i + `" onclick="deleteProject(id=` + i + `)" disabled>Delete project</button>
                        <button id="editProject" onclick="editProject(id=`+ i + ` )"><img src="./images/pencil.svg"></button>
                        </div>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>`
                    $("#listProjects").append(item);
                });
            },
            statusCode: {
                404: function () {
                    alert('Page not found');
                    window.location.reload(false);
                },

                401: function () {
                    alert('Unathorized');
                    document.location.href = "./login.html"
                },

                400: function () {
                    alert('Wrong password');
                },

                500: () => {
                    alert('Wrong email')
                }
            }
        });

}

function editProject(id) {
    if (document.getElementById("saveProject" + id).disabled === true) {
        document.getElementById("title" + id).disabled = false;
        document.getElementById("description" + id).disabled = false;
        document.getElementById("date" + id).disabled = false;
        document.getElementById("saveProject" + id).disabled = false;
        document.getElementById("deleteProject" + id).disabled = false;
    }
    else{
        document.getElementById("title" + id).disabled = true;
        document.getElementById("description" + id).disabled = true;
        document.getElementById("date" + id).disabled = true;
        document.getElementById("saveProject" + id).disabled = true;
        document.getElementById("deleteProject" + id).disabled = true;
    }
}


function deleteProject(id){
    var project = document.getElementById("project" + id).value;

    $.ajax({
        url: "http://localhost:3000/projects/" + project,
        type: 'DELETE',
        headers: {
            "Authorization": "Bearer " + res
        },
        statusCode: {
            200: function () {
                alert('Project deleted');
                window.location.reload(true);
            },

            404: function () {
                alert('Page not found');
                window.location.reload(false);
            },

            400: function () {
                alert('Project error');
            },

            500: () => {
                alert('Server error')
                window.location.reload(false);
            }
        }
    });
}

function updateProject(id){
    var project = document.getElementById("project" + id).value;

    var title = document.getElementById("title" + id).value
    var description = document.getElementById("description" + id).value
    var date = document.getElementById("date" + id).value

    if (title === "") {
        alert('Invalid title');
    }
    else if (description === "") {
        alert('Insert one valid description');
    }
    else if (date === "") {
        alert('Insert one valid date');
    }

    else {
        var data = {
            "title": title,
            "description": description,
            "date": date
        };
        $.ajax({
            url: "http://localhost:3000/projects/" + project,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + res
            },
            dataType: 'json',
            statusCode: {
                200: function () {
                    alert('Project updated');
                    window.location.reload(true);
                },

                404: function () {
                    alert('Request error');
                    window.location.reload(false);
                },

                400: function () {
                    alert('Project error');
                },

                500: () => {
                    alert('Server error')
                    window.location.reload(false);
                }
            }
        });
    }
}