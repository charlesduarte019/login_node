function getData() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var whatsapp = document.getElementById("whatsapp").value;
  var city = document.getElementById("city").value;
  var uf = document.getElementById("uf").value;

   var data = {
     "name": username,
     "senha": password,
     "email": email,
     "whatsapp": whatsapp,
     "city": city,
     "uf": uf
   };
   console.log(data)
  $.ajax({
    url: "http://localhost:3000/users",
    type: 'POST',
    contentType:'application/json',
    data: JSON.stringify(data),
    dataType:'json',
    statusCode: {
      404: function () {
        alert('Page not found');
        window.location.reload(false);
      },

      400: function () {
        alert('User already exist');
        window.location.reload(false);
      },

      500: () => {
        alert('Server error')
        window.location.reload(false);
      }
    }
  });
}