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
        const result = data
        console.log(result)

        $.ajax
        ({
          url: "http://localhost:3000/projects",
          type: "GET",
          contentType: 'application/json',
          dataType: 'json',
          headers: {
            "Authorization": "Bearer " + result.token
          },
          success: function () {
            alert('Thanks for your comment!');
          }
        });

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
          alert('Server error')
          window.location.reload(false);
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

function mostrarOcultarSenha() {
  var senha = document.getElementById("password");
  if (senha.type == "password") {
    senha.type = "text";
  } else {
    senha.type = "password";
  }
}