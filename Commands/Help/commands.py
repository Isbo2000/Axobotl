from discord.ext.pages import Paginator, Page
from discord.ext import commands
import discord
import Modules
import json
import os

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="commands",description="Shows a list of commands")
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def commands(self, ctx: discord.ApplicationContext):
        title = "**Commands**"
        description="\n".join(config["description"])

        fields = []
        for (dirpath, dirnames, filenames) in os.walk("./Commands"):
            if ("__pycache__" in dirpath): continue
            cmds = ""
            for f in filenames:
                if (not f.endswith(".py")): break
                cog = self.bot.get_cog(f.replace(".py","").capitalize())
                for command in cog.walk_commands():
                    cmds = "\n".join([cmds, f"{command.mention} | {command.description}"])
            if (cmds == ""): continue
            fields.append({
                "name": f"{str(os.path.split(dirpath)[1])}:",
                "value": cmds
            })
        
        fields.sort(key=lambda f : f["name"])

        pages = []
        for field in fields:
            page = Page(embeds=[
                Modules.Embeds(self.bot,title=title,fields=[field],description=description).create()
            ])
            pages.append(page)
        
        await Paginator(pages).respond(ctx.interaction)

def setup(bot):
    bot.add_cog(Commands(bot))