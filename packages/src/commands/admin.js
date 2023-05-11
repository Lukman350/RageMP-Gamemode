const notAllowedMessage = `!{#FF0000}ERROR: !{#EEEEEE}You are not an admin.`;
const setFormattedMessage = (subject, message) =>
  `!{#FF0000}${subject}: !{#EEEEEE}${message}`;

mp.events.addCommand("sethp", (player, health) => {
  if (!player.adminRank) return player.outputChatBox(notAllowedMessage);

  if (!health)
    return player.outputChatBox(
      setFormattedMessage("ERROR", "You must specify a health value.")
    );

  player.health = health > 100 ? 100 : health;
  player.outputChatBox(
    setFormattedMessage(
      "SETHP",
      `Your health has been set to !{#FFFF00}${health}`
    )
  );
});

mp.events.addCommand("veh", (player, fullText, vehicleName) => {
  if (!player.adminRank) return player.outputChatBox(notAllowedMessage);

  const vehicle = mp.vehicles.new(mp.joaat(vehicleName), player.position, {
    heading: player.heading,
  });

  player.putIntoVehicle(vehicle, 0);

  player.outputChatBox(
    setFormattedMessage(
      "VEHICLE",
      `You have spawned a !{#FFFF00}${vehicleName}}`
    )
  );
});
