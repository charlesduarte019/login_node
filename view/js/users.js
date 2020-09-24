var user = JSON.parse(localStorage.getItem('user'));
profile = user[0].id;
var auth = localStorage.getItem('auth');
res = JSON.parse(auth);

function carregarItens() {
    $.ajax
        ({
            url: "http://localhost:3000/users/"+ profile +"",
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                "Authorization": "Bearer " + res
            },
            error: function() {
                $("h2").html("O servidor não conseguiu processar o pedido");
            },
            success: function (retorno) {

                $.each(retorno, function (i, sensor) {
                    var item = "<div id=" + "req" + i + "><p><b>Nome:</b> " + sensor.name + "</p><p><b>Email.:</b> " + sensor.email + "</p><p><b>Contato:</b> " + sensor.whatsapp + "</p></div>";
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