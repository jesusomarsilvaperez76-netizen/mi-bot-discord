econst {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "hola") {
      await interaction.reply(`👋 ¡Hola ${interaction.user}!`);
    }

    else if (interaction.commandName === "ping") {
      await interaction.reply(
        `🏓 Pong!\nLatencia: ${client.ws.ping} ms`
      );
    }

    else if (interaction.commandName === "ayuda") {
      const embed = new EmbedBuilder()
        .setTitle("🤖 Comandos disponibles")
        .setDescription(
          [
            "`/hola` — Saluda",
            "`/ping` — Latencia del bot",
            "`/ayuda` — Lista de comandos",
            "`/server` — Información del servidor",
            "`/avatar` — Muestra tu avatar"
          ].join("\n")
        );

      await interaction.reply({ embeds: [embed] });
    }

    else if (interaction.commandName === "server") {
      if (!interaction.guild) {
        return interaction.reply(
          "❌ Este comando solo funciona en un servidor."
        );
      }

      const embed = new EmbedBuilder()
        .setTitle(`📊 ${interaction.guild.name}`)
        .addFields(
          {
            name: "👥 Miembros",
            value: `${interaction.guild.memberCount}`,
            inline: true
          },
          {
            name: "🆔 ID",
            value: interaction.guild.id,
            inline: true
          }
        );

      await interaction.reply({ embeds: [embed] });
    }

    else if (interaction.commandName === "avatar") {
      const avatar = interaction.user.displayAvatarURL({
        size: 1024,
        extension: "png"
      });

      const embed = new EmbedBuilder()
        .setTitle(`🖼️ Avatar de ${interaction.user.username}`)
        .setImage(avatar);

      await interaction.reply({ embeds: [embed] });
    }

  } catch (error) {
    console.error(error);

    if (!interaction.replied) {
      await interaction.reply("❌ Ocurrió un error.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
