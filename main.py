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
        print("|\nLogging in...")
        return token
    else:
        return asktoken()

bot = discord.Bot(
    intents=discord.Intents.default(),
    activity=discord.Activity(
        name=config["activity"]["name"],
        type=config["activity"]["type"]
    )
)

@bot.event
async def on_ready():
    print(f"|\nLogged in {bot.user}\n|")



try:
    print("|\nChecking for token...")
    bot.run(checktoken())
except Exception:
    print("|\nERROR: Invalid token\n|")
    os.remove('./Assets/token.json')