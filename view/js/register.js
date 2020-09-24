function getData() {
  var username = document.getElementById("username").value;
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
    alert('Invalid password');
  }

  else if (password != passConfirm){
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
      url: "http://localhost:3000/users",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: () => {
        alert('User created');
        window.location.reload(false);
        document.location.href = "./login.html"
      },
      dataType: 'json',
      statusCode: {
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

$(document).ready(function () {
  $("#Cep").focusout(function () {
    var cep = $("#Cep").val();
    cep = cep.replace("-", "");

    var urlStr = "https://viacep.com.br/ws/" + cep + "/json/";

    $.ajax({
      url: urlStr,
      type: "get",
      dataType: "json",
      success: function (data) {
        $("#city").val(data.localidade);
        $("#uf").val(data.uf);
      },
      error: function (erro) {
        console.log(erro);
      }
    });
  });
});


function mostrarOcultarSenha() {
  var senha = document.getElementById("password");
  if (senha.type == "password") {
    senha.type = "text";
  } else {
    senha.type = "password";
  }
}

var input = document.getElementById("uf");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});