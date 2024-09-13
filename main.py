print("|\nInitializing...")

from discord.ext import commands
from dotenv import load_dotenv
import datetime
import discord
import Modules
import pwinput
import json
import sys
import os

if not sys.version_info >= (3, 10):
    print("|\nPlease upgrade python to the latest version or at least version 3.10 to run this program!")
    sys.exit()

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

def asktoken():
    token = pwinput.pwinput("|\nPlease enter your token (it is only stored locally): ", "*")
    with open('./.env', 'w') as env:
        env.write("TOKEN="+token)
    return checktoken()
def checktoken():
    if os.path.exists('./.env'):
        load_dotenv()
        token = os.getenv('TOKEN')
        print("|\nToken found!")
        return token
    else:
        return asktoken()

bot = discord.Bot(
    description="\n".join(config["description"]),
    owner_id=config["owner"],
    intents=discord.Intents.default(),
    activity=discord.Activity(
        name=config["activity"]["name"],
        type=config["activity"]["type"]
    )
)

@bot.event
async def on_ready():
    print(f"|\nLogged in {bot.user}")
    print("|\n|\nPress 'ctr+c' to quit")
    print("|\nLogs:\n")

@bot.after_invoke
async def after_invoke(ctx: discord.ApplicationContext):
    if ctx.guild: place = ctx.guild.name
    else: place = "DMs"

    print(f"{ctx.author} used '/{ctx.command}' in {place} at {datetime.datetime.now().strftime('%m-%d-%Y %I:%M:%S %p')}")

@bot.event
async def on_application_command_error(ctx: discord.ApplicationContext, error: discord.DiscordException):
    if isinstance(error, commands.CommandOnCooldown):
        timestamp = str(datetime.datetime.now().timestamp()+ctx.command.cooldown.get_retry_after()).split('.')[0]

        title = "This command is on cooldown :("
        description = f"You can use {ctx.command.mention} again <t:{timestamp}:R>"
        color = [255,0,0]

        fields = [{
            "name": f"The cooldown is `{str(ctx.command.cooldown.per).split('.')[0]} seconds`",
            "value": ""
        }]

        await Modules.Embeds(
            bot,
            title=title,
            description=description,
            fields=fields,
            color=color
        ).respond(ctx, ephemeral=True)
    
    elif isinstance(error, commands.BotMissingPermissions):
        title = "Necessary permissions missing :("
        description = f"The bot does not have the required permissions to run this command\nOR is unable to due to role hierarchy"
        color = [255,0,0]

        permissions = ""
        for permission in error.missing_permissions:
            permissions = "\n".join([permissions,permission])

        fields = [{
            "name": "Possible missing permissions:",
            "value": permissions
        }]

        await Modules.Embeds(
            bot,
            title=title,
            description=description,
            fields=fields,
            color=color
        ).respond(ctx, ephemeral=True)

    else:
        print(f"\nERROR: {error}\n")

        dmlog = await bot.fetch_user(bot.owner_id)

        if ctx.guild: place = ctx.guild.name
        else: place = "DMs"

        options = "**Selected:**"
        for option in ctx.selected_options if ctx.selected_options else [None]:
            options = "\n".join([
                options,
                f"{option['name']}: `{str(option['value'])}`" if option else "None"
            ])
        
        options = "\n".join([options,"**Not selected:**\n"])
        for option in ctx.unselected_options if ctx.unselected_options else [None]:
            options = (
                ", ".join([options,str(option.name)])
            ) if option and not options.endswith("\n") else (
                "".join([options,str(option.name)])
            ) if option else (
                "".join([options, "None"])
            )
        
        try:
            command = ctx.command.mention
        except AttributeError:
            command = f"`/{ctx.command.name}`"

        title = "**Command Error**"
        description = f"**Command:**\n{command}\n**Place:**\n{place}\n{options}"
        color = [255,0,0]

        fields = [{
            "name": "**Error:**",
            "value": str(error).replace("Application Command raised an exception:","")
        }]

        author = {
            "name": ctx.author,
            "url": f"https://www.discord.com/users/{ctx.author.id}/",
            "icon_url": ctx.author.avatar
        }

        await Modules.Embeds(
            bot,
            title=title,
            description=description,
            color=color,
            fields=fields,
            author=author
        ).send(dmlog)

try:
    print("|\nChecking for token...")
    token = checktoken()

    print("|")
    for (dirpath, dirnames, filenames) in os.walk("./Commands"):
        if ("__pycache__" in dirpath): continue
        cdirpath = str(os.path.split(dirpath)[1])
        path = ".".join(["Commands",cdirpath]) if not cdirpath == "Commands" else cdirpath
        for f in filenames:
            if (f.endswith(".pyc")): break
            file = f.replace(".py","")
            bot.load_extension(".".join([path,file]))
            cog = bot.get_cog(file.capitalize())
            for command in cog.walk_commands():
                print(f"Registering command '/{command}'")

    print("|\nLogging in...")
    bot.run(token)

except discord.LoginFailure:
    print("\nERROR: Invalid token\n")
    os.remove('./Assets/token.json')

except BaseException as error:
    print(f"\nERROR: {error}\n")