var auth = localStorage.getItem('auth');
res = JSON.parse(auth)
console.log(res)

function carregarItens() {
    $.ajax
        ({
            url: "http://localhost:3000/users",
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                "Authorization": "Bearer " + res
            },
            success: function (retorno) {

                $.each(retorno, function (i, sensor) {
                    var item = "<div id=" + "req" + i + "><p><b>Nome:</b> " + sensor.name + "</p><p><b>Temp.:</b> " + sensor.password + "</p><p><b>Mac:</b> " + sensor.email + "</p></div>";
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
    document.location.href = "./login.html"
}