function getData() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email === "") {
    alert('Invalid email');
  }
  else if (password === "") {
    alert('Invalid password');
  }

  else {
    var data = {
      "email": email,
      "senha": password,
    };
    $.ajax({
      url: "http://localhost:3000/users/auth",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (data) {
        var auth = JSON.stringify(data.token)
        localStorage.setItem("auth", auth);
        document.location.href = "./listUsers.html"
        console.log(data)
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
    });
  }
}

// document.location.href = 

var input = document.getElementById("password");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

var input = document.getElementById("email");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

function mostrarOcultarSenha() {
  var senha = document.getElementById("password");
  if (senha.type == "password") {
    senha.type = "text";
  } else {
    senha.type = "password";
  }
}