print("|\nInitializing...")

import discord
import pwinput
import json
import os

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

def asktoken():
    token = pwinput.pwinput("|\nPlease enter your token (it is only stored locally): ", "*")
    with open('./Assets/token.json', 'w') as tkn:
        json.dump(token, tkn)
    return checktoken()
def checktoken():
    if os.path.exists('./Assets/token.json'):
        with open('./Assets/token.json') as tkn:
            token = json.load(tkn)
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

    print(f"{ctx.author} used '/{ctx.command}' in {place}")

@bot.event
async def on_application_command_error(ctx: discord.ApplicationContext, error: discord.DiscordException):
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

    embed = discord.Embed(
        title="**Error:**",
        description=f"**Command:**\n{ctx.command.mention}\n**Place:**\n{place}\n{options}",
        color=discord.Color.from_rgb(255,0,0)
    )

    embed.set_author(
        name=f"{ctx.author}",
        url=f"https://www.discord.com/users/{ctx.author.id}/",
        icon_url=ctx.author.avatar
    )

    embed.add_field(
        name="Application Command raised an exception:",
        value=str(error).replace("Application Command raised an exception:",""),
        inline=False
    )

    embed.set_footer(
        text=f"{bot.user.name}   |   Version: {config['version']}",
        icon_url=bot.user.avatar
    )

    await dmlog.send(embed=embed)

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
            command = f.replace(".py","")
            bot.load_extension(".".join([path,command]))
            print(f"Registering command '{command}'")

    print("|\nLogging in...")
    bot.run(token)

except discord.LoginFailure:
    print("\nERROR: Invalid token\n")
    os.remove('./Assets/token.json')

except BaseException as error:
    print(f"\nERROR: {error}\n")