const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

// ===============================
// CONFIGURACIÓN
// ===============================

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// ===============================
// CLIENTE
// ===============================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// ===============================
// COMANDOS
// ===============================

const commands = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Muestra los comandos del bot"),

  new SlashCommandBuilder()
    .setName("anti-raid")
    .setDescription("Controla el sistema anti-raid")
    .addSubcommand(sub =>
      sub
        .setName("activar")
        .setDescription("Activa el anti-raid")
    )
    .addSubcommand(sub =>
      sub
        .setName("desactivar")
        .setDescription("Desactiva el anti-raid")
    )
    .addSubcommand(sub =>
      sub
        .setName("estado")
        .setDescription("Muestra el estado del anti-raid")
    )
].map(command => command.toJSON());

// ===============================
// REGISTRAR COMANDOS
// ===============================

const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registrarComandos() {
  try {
    console.log("Registrando comandos...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("Comandos registrados correctamente.");
  } catch (error) {
    console.error(error);
  }
}

// ===============================
// BOT LISTO
// ===============================

client.once("ready", async () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  await registrarComandos();
});

// ===============================
// INTERACCIONES
// ===============================

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  // /help
  if (interaction.commandName === "help") {

    await interaction.reply({
      content:
        "🤖 **COMANDOS DEL BOT**\n\n" +
        "📚 `/help` — Muestra esta ayuda\n" +
        "🛡️ `/anti-raid activar` — Activa anti-raid\n" +
        "🛡️
