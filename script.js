$(function(){
    getApi();
    $("#recipes").on("click", ".btn-danger", handleDelete)
    $("#addbtn").click(addRecipe)
});

function handleDelete(){
    let btn = $(this);
    let parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        error: function(response)
        {
            alert("API DELETE failed")
        },
        success: function(){
            getApi()
        }
    })
    }
function getApi(){
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method: "GET",
        error: function(response)
        {
            alert("Api fetch failed")
        },
        success: function(response){
            console.log(response);

            let recipes = $("#recipes");
            recipes.empty();

            for (let i = 0; i < response.length; i++) {
                recipes.append(`<div class = "recipe" data-id = "${response[i]._id}"><h3>${response[i].title}</h3><p><button  class = "btn btn-danger btn-sm float-right">Delete</button><button class = "btn btn-warning btn-sm float-right">Edit</button>${response[i].body}</p></div>`)
            }
        }
    })
}

function addRecipe(){
    let title = $("#title").val();
    let body = $("#Body").val();
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method: "POST",
        data: {title, body},
        error: function()
        {
            alert("API POST failed")
        },
        success: function(){
            console.log(response)
            getApi()
        }
    })
}