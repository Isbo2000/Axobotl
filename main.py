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
    print(f"{ctx.author} used '/{ctx.command}' in {ctx.guild.name}")

try:
    print("|\nChecking for token...")
    token = checktoken()

    print("|")
    path = ""
    for (dirpath, dirnames, filenames) in os.walk("./Commands"):
        if path: path = ".".join([path,str(os.path.split(dirpath)[1])])
        else: path = str(os.path.split(dirpath)[1])
        for f in filenames:
            if (f.endswith(".pyc")): break
            command = f.replace(".py","")
            bot.load_extension(".".join([path,command]))
            print(f"Registering command '{command}'")

    print("|\nLogging in...")
    bot.run(token)

except discord.LoginFailure:
    print("|\nERROR: Invalid token\n")
    os.remove('./Assets/token.json')

except BaseException as error:
    print(f"|\nERROR: {error}\n")