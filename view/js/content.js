var page = 1
var search = ""
var pagina = 'http://localhost:3000/market?page=' + page;

function getRequest() {
  $.ajax({
    type: 'get',
    url: pagina,
    dataType: 'json',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        var content = `
    <div>
    <a href="`+ data[i].id + `">
    <img src="`+ data[i].filename + `">
    </a>
    <h2>`+ data[i].title + `</h2>
    <p>`+ data[i].description + `</p>
    <h3>R$`+ data[i].price + `</h3>
    </div>
  `;
        $('#tbody').append(content);
      }
    },
    statusCode: {
      404: function () {
        alert('page not found');
      },

      400: function () {
        alert('bad request');
      },

      500: () => {
        alert('server error')
      }
    }
  })
}

function prevButton() {
  if (page == 2) {
    document.getElementById("prev").disabled = true;
  }
  else {
    document.getElementById("next").disabled = false;
  }
  if (page > 1 & page <= 10) {
    page = page - 1;
    document.getElementById("tbody").innerHTML = ""
    getRequest();
  }
}

function nextButton() {
  if (page == 8) {
    document.getElementById("next").disabled = true;
  }
  else {
    document.getElementById("prev").disabled = false;
  }
  if (page >= 1 & page < 9) {
    page = page + 1;
    document.getElementById("tbody").innerHTML = ""
    getRequest();
  }
};




var input = document.getElementById("valor");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

function capturar() {
  search = document.getElementById('valor').value;

  if (!search) {
    window.location.reload(false);
  }

  else {
    toString(pagina = 'http://localhost:3000/market/' + search,);
      document.getElementById("tbody").innerHTML = "";
    document.getElementById("next").disabled = true;
    getRequest(); 
  }
}



function fruits() {
  type = "fruit"
  toString(pagina = 'http://localhost:3000/market/type/' + type,)
  document.getElementById('tbody').innerHTML="";
  getRequest();
};

function dairy() {
  type = "dairy"
  toString(pagina = 'http://localhost:3000/market/type/' + type,)
  document.getElementById('tbody').innerHTML="";
  getRequest();
};

function vegetable() {
  type = "vegetable"
  toString(pagina = 'http://localhost:3000/market/type/' + type,)
  document.getElementById('tbody').innerHTML="";
  getRequest();
};

// url: 'http://localhost:3000/market/type/' + type,