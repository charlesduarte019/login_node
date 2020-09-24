var user = JSON.parse(localStorage.getItem('user'));
profile = user[0].id;
var auth = localStorage.getItem('auth');
res = JSON.parse(auth);

function carregarItens() {
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
                button {
                    box-sizing: border-box;
                    width: 100%;
                    margin: 0 0 1em;
                    padding: 1em 3em 1em 1.5em;
                    border: 1px solid #cccccc;
                    border-radius: 1.5em;
                    background: #fff;
                    resize: none;
                    outline: none;
                    color: #898989;
                }
                
                button:hover {
                    background-color: #898989;
                    color: #efefef;
                    border: 1px solid #efefef;
                }
                </style>`+
                    "<b>O servidor não conseguiu processar o pedido<b>" +
                    "<br>" +
                    "<button onclick=logout()>Back</button>"
                );
            },
            success: function (retorno) {

                $.each(retorno, function (i, sensor) {
                    var item = "<div id=" + "req" + i + "><p><b>Nome:</b> " + sensor.name +
                        "</p><p><b>Email.:</b> " + sensor.email +
                        "</p><p><b>Contato:</b> " + sensor.cellNumber +
                        "</p></div>";
                    $("#listaTemp").append(item);
                });
                $("h2").html("Carregado");

            },
            statusCode: {
                404: function () {
                    alert('Page not found');
                    window.location.reload(false);
                },

                400: function () {
                    alert('Wrong password');
                },

                500: () => {
                    alert('Wrong email')
                }
            }
            //  beforeSend: function(){}
        });

}

function logout() {
    localStorage.setItem("auth", "");
    localStorage.setItem("user", "");
    document.location.href = "./login.html"
}