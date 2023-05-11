const bycript = require("bcryptjs");
const Database = require("./database/connection");
const SpawnPoints = require("./data/spawnpoints.json").SpawnPoints;

mp.events.add("OnPlayerLoginToServer", async (player, username, password) => {
  const db = await Database.connect();

  const [result] = await db.execute(
    "SELECT * FROM accounts WHERE username = ?",
    [username]
  );

  if (result.length) {
    if (bycript.compareSync(password, result[0].password)) {
      player.call("OnPlayerSuccessLogin", [result[0].username]);

      player.name = result[0].username;
      player.spawn(SpawnPoints[Math.floor(Math.random() * SpawnPoints.length)]);
      player.health = 100;
      player.adminRank = result[0].admin_rank;
    } else {
      player.call("OnPlayerFailedLogin", ["Password is incorrect."]);
    }
  } else {
    player.call("OnPlayerFailedLogin", ["Account is not registered."]);
  }
});

mp.events.add("playerDeath", (player) => {
  player.spawn(SpawnPoints[Math.floor(Math.random() * SpawnPoints.length)]);
  player.health = 100;
});
