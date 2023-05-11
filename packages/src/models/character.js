const Characters = {
  load: (player, data) => {
    const character = JSON.parse(data);
    player.setVariable("character", character);
    player.model = mp.joaat(character.model);
    player.spawn(character.position);
  },
};
