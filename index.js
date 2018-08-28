const Discord = require("discord.js");
const client = new Discord.Client();
const {get} = require ("snekfetch");
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const Client = new Discord.Client();

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write();
var prefix = "ub!!";
client.login(process.env.TOKEN);

client.on('message', message => {
    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
      db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
      var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
      console.log(userxpdb);
      var userxp = Object.values(userxpdb)
      console.log(userxpdb);
      console.log(`Nombre D'xp: ${userxp[1]}`)

      db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

      if (message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
        .setTitle(`Stat des XP de ${message.author.username}`)
        .setColor('RANDOM')
        .setDescription('Affichage Des XP')
        .addField("XP:", `${xpfinal[1]} xp`)
        .setFooter("Amuse toi :p")
        .setTimestamp()
        message.channel.send({embed: xp_embed});
      }

    }
  });
      
client.on(`message`, message => {
    
    if(message.content === "ub!!Ping"){
        message.reply("pong :ping_pong: ");
        console.log('Le bot dit pong !');
    }
});

client.on("guildMemberAdd", member => {
  var role = member.guild.roles.find('name', 'membres');
  member.addRole(role)
})

client.on("message", (message) => {
      
    if(message.content.startsWith(prefix + "sondage"))  {
      message.delete(message.author);
      let args = message.content.split(" ").slice(1);
      let thingToEcho = args.join(" ")
      let embed = new Discord.RichEmbed()
      
      .setDescription("Sondage")
      .addField(thingToEcho, "Répondre avec 🇦(Oui) ou 🇧(Non)")
      .setColor('RANDOM')
      .setThumbnail()
      .setTimestamp()
      .setFooter(`Demandé par ${message.author.tag}`)
      message.channel.send({embed})
      .then(function (message){
        message.react('🇦')
        message.react('🇧')
      }).catch(function(){

      });
    }
});

client.on("message", (message) => {
      
  if(message.content.startsWith(prefix + "annonce"))  {
    message.delete(message.author);
    let args = message.content.split(" ").slice(1);
    let thingToEcho = args.join(" ")
    let embed = new Discord.RichEmbed()
    
    .setDescription("annonce")
    .addField(thingToEcho, "Répondre avec 🇦 si vous avez compris l'annonce ou  🇧 si vous avez pas compris l'annonce")
    .setColor('RANDOM')
    .setThumbnail()
    .setTimestamp()
    .setFooter(`Demandé par ${message.author.tag}`)
    message.channel.send({embed})
    .then(function (message){
      message.react('🇦')
      message.react('🇧')
    }).catch(function(){

    });
  }
});

  
client.on('ready', () => {
    client.user.setPresence({ game: { name: `ub!!help| cree par Jean0| serveurs : ${client.guilds.size}| ${client.users.size} users`}})
    console.log("Le bot est pret !")
});



client.on(`message`, message => {
    if(message.content === prefix + "avatar"){
        var avatar_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Avatar")
        .setImage(message.author.avatarURL)
        .setDescription("Affiche Ton avatar")
        .setFooter(client.user.avatarURL)
        console.log("Un utilisateur a effectuer la commande avatar")
    message.channel.send(avatar_embed)
    }
});
   
client.on(`message`, message => {

    if(message.content === "Re"){
        message.reply("nard X)")
        console.log('Le bot dit nard X)')
    }

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Voici mes commandes d'aide X)")
        .setThumbnail(message.author.avatarURL)
        .setDescription("Je suis un bot moderation voici mes commandes disponible !")
        .addField("ub!!help", "Affiche ce menu de tout les commandes du bot")
        .addField("N'oubliez pas de mettre le prefix avant chaque commandes que vous effectuer", "Prefix(ub!!)")
        .addField(":tools:moderation.help", "Affiche l'aide pour la moderation")
        .addField(":tada:fun.help", "Affiche l'aide pour le fun")
        .addField(":gear:utilitaires.help", "Affiche l'aide pour les commandes utilitaires comme par exemple(infobot donne les infos sur le bot)")
        .addField(":bookmark_tabs:vcs.help", "Affiche l'aide pour le vcs d'ultrabot")
        .addField(":loudspeaker:annonce.help", "Affiche l'aide pour la commande d'annonce")
        .addField(":package:package.help", "Affiche l'aide pour l'autorole")
        .setFooter("Menu d'aide - moderation")
        .setTimestamp()
        message.channel.sendMessage(help_embed);
        console.log("Un utilisateur a effectuer la commande d'aide !")
    }
    
    if(message.content === prefix + "moderation.help"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Voici mes commandes :tools:moderation.help")
      .setThumbnail(message.author.avatarURL)
      .addField("ub!!kick", "kick un utilisateur !")
      .addField("ub!!ban", "ban un utilisateur !")
      .addField("ub!!mute", "empeche quelq'un de parler et l'utilisateur va rester mute jusqu'a vous le unmuter parce que j'ai pas le timer")
      .addField("ub!!unmute", "redonne la voix a la personne que vous avez mute")
      .addField("ub!!clear nombre", "supprime le nombre de message que vous avez indiquer maximum message a effacer avec ce commande(100) et les message doit date de [moins de 14 jours]")
      .addField("ub!!warn(mentionner un utilisateur + raison)", "Donne un avertissement a la personne que vous avez warn")
      .addField("ub!!listwarns(mentionner un utilisateur)", "vous permez de voir les warns de la personne que vous avez mentionner")
      .addField("ub!!removewarns(mentionner un utilisateur + Le numero du warn)", "vous permez de retire le numero du warn que vous avez indiquer")
      .setFooter("Menu d'aide - moderation")
      .setTimestamp()
      message.channel.sendMessage(help_embed);
      console.log("Un utilisateur a effectuer la commande moderation")
    }

    if(message.content === prefix + "fun.help"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Voici mes commandes :tada:fun")
      .setThumbnail(message.author.avatarURL)
      .addField("ub!!Ping", "Le bot repond pong !")
      .addField("Re", "Le bot repond nard X)")
      .addField("ub!!say", "Le bot dit tout ce que vous voulez qu'il dises")
      .addField("ub!!8ball", "Le bot te repond une reponse random")
      .addField("ub!!.ping", "Le bot donne le temp de latence de votre serveur")
      .addField("ub!!avatar", "Affiche votre avatar")
      .addField("ub!!randomchat", "Le bot vous donnes des images ou des gifs de chat avec cet commande")
      .addField("ub!!xp", "Affche votre taux d'xp avec le bot")
      .addField("ub!!dog", "Affiche des gifs de chiens")
      .setFooter("Menu d'aide - fun")
      .setTimestamp()
      message.channel.sendMessage(help_embed);
      console.log("Un utilisateur a effectuer la commande fun")
    }
    
    if(message.content === prefix + "utilitaires.help"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Voici mes commandes :gear:utilitaires")
      .setThumbnail(message.author.avatarURL)
      .addField("ub!!Statistiques", "Le bot envoie des info sur votre profil !")
      .addField("ub!!infoserveur", "Donne des infos sur le serveur !")
      .addField("ub!!infobot","Donne des infos sur le bot")
      .addField("ub!!serverlist", "Affiche tout les serveurs que je fait partie et le nombre de membres des serveurs")
      .addField("ub!!sondage", "Vous devez d'ecrire votre sondage et le bot le fait a votre place")
      .setFooter("Menu d'aide - utilitaires")
      .setTimestamp()
      message.channel.sendMessage(help_embed);
      console.log("Un utilisateur a effectuer la commande utilitaires")
    }

    if(message.content === prefix + "vcs.help"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Voici l'aide pour mon :bookmark_tabs:vcs")
      .setThumbnail(message.author.avatarURL)
      .addField("Vous devez creer un salon est renomé le", "(vcs-ultrabot) !")
      .addField("ub!!vcs(votre message)", "commande a utiliser dans le salon(vcs-ultrabot)")
      .setFooter("vcs-ultrabot corporation")
      .setTimestamp()
      message.channel.sendMessage(help_embed);
      console.log("un utilisateur a effectuer la commande de vcs")
    }

    if(message.content === prefix + "annonce.help"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Voici l'aide pour la commande :loudspeaker:annonce")
      .setThumbnail(message.author.avatarURL)
      .addField("Vous devez faire une commande pour l'annonce", "commande a utiliser pour l'annonce ub!!annoce(le message)")
      .setFooter("annonce-ultrabot corporation")
      .setTimestamp()
      message.channel.sendMessage(help_embed);
      console.log("un utilisateur a effectuer la commande d'annonce")
    }
    
    if(message.content === prefix + "package.help"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Voici l'aide pour la commande :package:package")
      .setThumbnail(message.author.avatarURL)
      .addField("Si vous voulez un autorole automatique quand quelq'un rejoin votre serv svp", "créer un nouveau role et renomé le membres")
      .setFooter("package-ultrabot corporation")
      .setTimestamp()
      message.channel.sendMessage(help_embed);
      console.log("un utilisateur a effectuer la commande package")
    }

    if(message.content.startsWith(prefix + 'say')) { 

     if(message.channel.type === "dm") return;

     if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply(":x: Desoler mais vous n'avez pas la permission de faire ce commande !").catch(console.error);

     
         var args = message.content.split(" ").slice(1).join(" ");
         
         if(!args) return message.channel.send(":x: Vous voulez rien me faire dire");

         message.delete()

         message.channel.send(`${args}`)
    }

    if(message.content === prefix + "infoserveur"){ 
        var info_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL)
        .setTitle("Voici les infos sur le serveur !")
        .addField("ID :id: ", `${client.user.id}`)
        .addField("Nom du discord", message.guild.name)
        .addField("Le serveur discord a ete cree le", message.guild.createdAt)
        .addField("Vous avez rejoin le serveur le", message.member.joinedAt)
        .addField("Region", message.guild.region)
        .addField("Owner : ", message.guild.owner.user.username)
        .addField("Owner ID: ", message.guild.owner.id)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Humains", message.guild.members.filter(member => !member.user.bot).size)
        .addField("Bots", message.guild.members.filter(member => member.user.bot).size)
        .addField("Nombre de categories et salons", message.guild.channels.size)
        .addField("Nombre de roles", message.guild.roles.size)
        .setFooter("Info - sur le serveur")
        .setTimestamp()
        message.channel.sendMessage(info_embed)
        console.log("Un utilisateur a effectuer la commande d'infoserveur !")
    }

    if(message.content === prefix + "infobot"){
        var info_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL)
        .setTitle("Les infos sur le bot")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .addField(":clock5: Uptime", Math.round(client.uptime / (1000 * 60 * 60)) + "Heures, " + Math.round(client.uptime / (1000 * 60)) % 60 + "Minutes, et" + Math.round(client.uptime / 1000) % 60 + "Secondes", true)
        .addField("Nombre de serveur sur lequel je suis", `${client.guilds.size}`)
        .addField("Nombre d'users", `${client.users.size}`)
        .addField("Cree par", "[♛Jean0™㋡ 💎#1070]")
        .addField("Le bot a ete cree le", "15/05/18")
        .addField("Version du bot", "1.0.2")
        .addField("voici mon serveur de secours", "https://discord.gg/qDNz4NM")
        .addField("Voici mon lien pour m'inviter dans ton serveur ou a partager", "https://discordapp.com/oauth2/authorize?client_id=450449433344344064&scope=bot&permissions=1677016263")
        .addField("Si vous aimez le bot svp est ce que vous pouvez l'upvote sur ce lien ca me ferras beaucoup plaisir et merci pour l'upvote si vous l'avait fait ^^", "https://discordbots.org/bot/450449433344344064")
        .addField("Vous pouvez retrouver le bot sur ce lien aussi", "https://bots.discord.pw/bots/450449433344344064")
        .setFooter("Info - sur le bot")
        .setTimestamp()
        message.channel.sendMessage(info_embed)
        console.log("Un utilisateur a effectuer la commande d'infobot !")
    }

    if(message.content.startsWith(prefix + "dog")) {

      var chien = [
    
        "https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif",
        "https://media.giphy.com/media/YTXujdmJn3iOVZhMlQ/giphy.gif",
        "https://media.giphy.com/media/14wXMGbHjXK2k0/giphy.gif",
        "https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif",
        "https://media.giphy.com/media/Pn1gZzAY38kbm/giphy.gif",
        "https://media.giphy.com/media/WLbtNNR5TKJBS/giphy.gif"
      ];

      var gif = chien[Math.floor(Math.random() * chien.length)];

      var dog_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(':dog: Chien :')
      .setImage(gif)
      //.setThumbnail(gif)
      .setFooter(`Chien Demandé par ${message.author.tag}`)
      .setTimestamp()
      message.channel.send(dog_embed);
    }

  


    if(message.content.startsWith(prefix + "kick")) { 
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send(":x: Vous n'avez pas la permission pour kick un utilisateur !");

        if(message.mentions.users.size === 0) { 
            return message.channel.send(":x: Vous devez mentionner un utilisateur")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) { 
            return message.channel.send(":x: Je ne sais pas si l'utilisateur existe :/")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) { 
            return message.channel.send(":x: Je n'ai pas la permission pour kick");
        }

        kick.kick().then(member => { 
            message.channel.send(`:white_check_mark: ${member.user.username} est kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) { 
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: Vous n'avez pas la permission pour ban un utilisateur !");

        if(message.mentions.users.size === 0) { 
            return message.channel.send(":x: Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) { 
            return message.channel.send(":x: Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) { 
            return message.channel.send(":x: Je n'ai pas la permission pour ban");
        }
        ban.ban().then(member => { 
            message.channel.send(`:white_check_mark: ${member.user.username} est ban par ${message.author.username} !`)
        } 

        )
    }
 
    if(message.content.startsWith(prefix + "clear")) {
      if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission pour utiliser cet commande !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send(":x: Tu dois preciser un nombre de messages a supprimer !")
        message.channel.bulkDelete(args[0]).then(() => { 
            message.channel.send(`:white_check_mark: ${args[0]} messages ont ete supprimer !`);
            })
    }

    if (message.content.startsWith(prefix + "mute")) {
  
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: Il te faut la permission GÉRER LES ROLES")
        let member = message.mentions.members.first();
        if(!member) return message.channel.send(':x: Vous avez oubliez le @[utilisateur] ou vous avez pas la permission');
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: Je peux pas mute cet utilisateur");
        let channels = message.guild.channels.array()
        for (var i=0; i < channels.length; i++) {
          channels[i].overwritePermissions(member, {SEND_MESSAGES: false})
            .catch(er => {message.channel.send("je suis pas bien.."); i = channels.length;});
        }
        message.channel.send(member.displayName + " vient d'être mute par " + message.member.displayName)
      }

      if (message.content.startsWith(prefix + "unmute")) {

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: Il te faut la permission GÉRER LES ROLES")
        let member = message.mentions.members.first();
        if(!member) return message.channel.send(':x: Vous avez oubliez le @ ou vous avez pas la permission');
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: Je peux pas mute cet utilisateur");
        let channels = message.guild.channels.array()
        for (var i=0; i < channels.length; i++) {
          channels[i].overwritePermissions(member, {SEND_MESSAGES: true})
            .catch(er => {message.channel.send("je suis pas bien.."); i = channels.length;});
        }
        message.channel.send(member.displayName + " vient d'être unmute par " + message.member.displayName)
      }

      var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur dsl je peut pas executer votre commande**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous devez mentionnée un utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti avec succès sur le serveur**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur dsl je peut pas executer votre commande**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"listwarns")||message.content===prefix+"listwarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur dsl je peut pas executer votre commande**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn sur le serveur :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn sur le serveur :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"listwarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"listwarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur dsl je peut pas executer votre commande**");
 
    }
 
  }
 

 
 
  if (message.content.startsWith(prefix+"removewarns")||message.content===prefix+"removewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur dsl je peut pas executer votre commande**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès sur le serveur l'ami!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès sur le serveur l'ami!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"removewarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"removewarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"removewarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur dsl je peut pas executer votre commande**");
 
    }
 
  }


      if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
           case "statistiques":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("RANDOM")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField("Date de creation de l'utilisateur :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages prives ! Tu viens de recevoir tes statistiques !")
        message.author.send({embed: stats_embed});
        break;

        case "8ball":
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if(!tte){
            return message.reply(":x: Merci de me poser une question :8ball:")};

            var replys = [
                "Oui",
                "Non",
                "Je ne sais pas",
                "Peut etre"
            ];
            
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setDescription(":8ball: 8ball")
            .addField("Question", tte)
            .addField("Reponse", reponse)
            .setColor("RANDOM")
            .setTimestamp()
            .addField("Demandé par", `${message.author.username}`)
        message.channel.sendEmbed(bembed)
        break;
        
        case ".ping":
        message.channel.sendMessage('Temp de latence avec le serveur: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
        break;

        case "serverlist":
        message.channel.send(client.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
        break;

        case "randomchat":
        try {
            get('https://aws.random.cat/meow').then(res => {
                const embed = new Discord.RichEmbed()
                .setDescription(":cat: Images des chats")
                .setImage(res.body.file)
                .setColor("RANDOM")
                .addField("Demandé par", `${message.author.username}`)
                .setTimestamp()
                return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send(error.stack);
    }
        break;

        case "vcs":
        let xoargs = message.content.split(" ").slice(1);
        let xo03 = xoargs.join(" ")
        var xo02 = message.guild.channels.find('name', 'vcs-ultrabot');
        if(!xo02) return message.reply("Le channel vcs-ultrabot est introuvable l'ami")
        if(message.channel.name !== 'vcs-ultrabot') return message.reply("La commande que tu doit executer dans vcs-ultrabot")
        if(!xo03) return message.reply("Merci d'écrire une message a envoyer a la globalité des discords l'ami !")
        var embedglobal = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Message global de vcs-ultrabot")
        .addField("Pseudo de l'utilisateur qui a effectuer la commande", message.author.username + "#" + message.author.discriminator, true)
        .addField("Le serveur d'ou provient le message", message.guild.name, true)
        .addField("Le message", xo03)
        .setFooter("vcs-ultrabot corporation")
        .setTimestamp()
        client.channels.findAll('name', 'vcs-ultrabot').map(channel => channel.send(embedglobal))
        break;
       }
    });
