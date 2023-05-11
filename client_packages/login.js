let SpawnPoints = [
  { x: -425.517, y: 1123.62, z: 325.8544 },
  { x: -415.777, y: 1168.791, z: 325.854 },
  { x: -432.534, y: 1157.461, z: 325.854 },
  { x: -401.85, y: 1149.482, z: 325.854 },
];

let browsers = mp.browsers.new("package://CEF/index.html");
mp.gui.cursor.show(true, true);

mp.events.add("playerJoin", (player) => {
  mp.players.broadcast(
    `{#FFFFFF}SERVER: {#FF0000}${player.name} {#FFFF00}has joined the server.`
  );
});

mp.events.add("OnPlayerLogin", (username, password) => {
  mp.events.callRemote("OnPlayerLoginToServer", username, password);
});

mp.events.add("OnPlayerSuccessLogin", (user) => {
  // browsers = mp.browsers.new("package://CEF/select-character.html");
  // browsers.execute(`setUsername("${user}")`);
  // mp.gui.cursor.show(true, true);
  // mp.gui.chat.activate(false);
  // mp.gui.chat.show(false);
  browsers.destroy();
  mp.gui.chat.activate(true);
  mp.gui.cursor.show(false, false);
  mp.gui.chat.show(true);
  mp.gui.chat.push(
    `!{#FF0000}SERVER: {#AAAAAA}Welcome to the server, {#FFFF00}${user}!`
  );
});

mp.events.add("OnPlayerFailedLogin", (message) => {
  browsers.execute(`showError("${message}")`);
});
