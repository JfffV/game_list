const games = JSON.parse(localStorage.getItem("game")) || [];

function moveGame(name, direction) {
  games.forEach((game) => {
    if (game.name === name) {
      if (direction === `down`) {
        game.status = game.status - 1;
      } else if (direction === `up`) {
        game.status = game.status + 1;
      }
    }
    drawGames();
  });
}
function deletedGame(name) {
  games.forEach((game, index) => {
    if (game.name === name) {
      games.splice(index, 1);
    }
    drawGames();
  });
}
function drawGames(game) {
  let ToDo = "";
  let InProgresGames = "";
  let Done = "";
  document.querySelector("#colum_container_first").innerHTML = "";
  document.querySelector("#colum_container_second").innerHTML = "";
  document.querySelector("#colum_container_third").innerHTML = "";
  games.forEach((game) => {
    if (game.status === 0) {
      ToDo += document.querySelector(
        "#colum_container_first"
      ).innerHTML += `<ul class="list-group"> <li class="list-group-item active" aria-current="true"> <p class="game_name">${game.name}</p> <div class="arrow_button_first">  <button onclick="deletedGame('${game.name}')" type="button" class="btn btn-danger deletedGame" ><span class="glyphicon glyphicon-remove" aria-hidden="rue"></span></button> <button onclick="moveGame('${game.name}', 'up')" type="button" class="btn btn-primary arrow-button" > <span class="glyphicon glyphicon-arrow-right" aria-hidden="rue"></span>  </button></div> </li> </ul>`;
    } else if (game.status === 1) {
      InProgresGames += document.querySelector(
        "#colum_container_second"
      ).innerHTML += `<ul class="list-group"> <li class="list-group-item active" aria-current="true">   <div class="arrow_button"> <button onclick="moveGame('${game.name}', 'down')" type="button" class="btn btn-primary arrow-button"> <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>  </button> <p class = "game_name" >${game.name}</p>  <button onclick="deletedGame('${game.name}')" type="button" class="btn btn-danger deletedGame" ><span class="glyphicon glyphicon-remove" aria-hidden="rue"></span></button> <button onclick="moveGame('${game.name}', 'up')" type="button" class="btn btn-primary arrow-button"> <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> </button> </ul>`;
    } else if (game.status === 2) {
      Done += document.querySelector(
        "#colum_container_third"
      ).innerHTML += `<ul class="list-group"> <li class="list-group-item active" aria-current="true"> <div class="arrow_button_first">  <button onclick="moveGame('${game.name}', 'down')" type="button" class="btn btn-primary arrow-button"> <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> </button><button onclick="deletedGame('${game.name}')" type="button" class="btn btn-danger deletedGame_done" ><span class="glyphicon glyphicon-remove" aria-hidden="rue"></span></button>  </div> <p class = "game_name">${game.name}</p> </li> </ul>`;
    }
  });
  localStorage.setItem("game", JSON.stringify(games));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#button_for_add").addEventListener("click", () => {
    const gameName = document.querySelector(".form-control").value;
    const gameStatus = parseInt(document.querySelector(".form-select").value);
    if (gameName !== "" && gameStatus !== null) {
      if (games.some((existingGame) => existingGame.name === gameName)) {
        alert("Ця гра вже є в списку");
      } else {
        const newGame = { name: gameName, status: gameStatus };
        games.push(newGame);
        document.querySelector("#colum_container_first").innerHTML = "";
        document.querySelector("#colum_container_second").innerHTML = "";
        document.querySelector("#colum_container_third").innerHTML = "";
        drawGames();
      }
    }
  });
  drawGames();
});
