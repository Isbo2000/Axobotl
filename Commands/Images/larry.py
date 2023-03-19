from discord.ext import commands
import discord
import Modules
import random
import json
import re

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

with open('./Assets/Commands/larry/larry.json') as rpl:
    replies = json.load(rpl)

class Larry(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="larry",description="Larry!!")
    @discord.option(name="prompt",description="Talk to Larry",required=False)
    @commands.cooldown(1,2,commands.BucketType.member)
    async def crttv(self, ctx: discord.ApplicationContext, prompt: str = ""):
        await ctx.defer()

        larry = await Modules.Images.load("./Assets/Commands/larry/larry.jpg")

        text = prompt.lower()
        length = len(re.findall(r"[\w']+", text))

        responses = []

        if length > 20:
            responses = ["Too long, didnt read :P"]
        
        else:
            for specific in replies["specific"]:
                if len([trigger for trigger in specific["triggers"] if trigger in text]) == len(specific["triggers"]):
                    responses = specific["responses"]

            if responses == []:
                if text == "":
                    responses = ["Can you say something??"]
                else:
                    for general in replies["general"]:
                        if general["length"] <= length:
                            for response in general["responses"]:
                                responses.append(response)
        
        response = random.choice(responses)

        Modules.Images.add_textbox(larry,response,(255,255,255),(4,50),(470,250),max_size=150)

        title = (f'> "{prompt}"' if len(prompt) < 250 else f'> "{prompt[:249]}..."' ) if not prompt == "" else ""

        file = Modules.Images.save(larry,"Larry.png")

        await Modules.Embeds(self.bot,title=title,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Larry(bot))