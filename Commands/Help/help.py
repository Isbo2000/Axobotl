from discord.ext import commands
import discord
import Modules
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Help(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="help",description="Shows helpful information about the bot")
    async def help(self, ctx: discord.ApplicationContext):
        credits = self.bot.get_command('credits')
        cmds = self.bot.get_command('commands')

        title = "**Help Menu**"
        description = "\n".join(config["description"])

        fields = [{
            "name": "\n",
            "value": (
                f"{cmds.mention} | {cmds.description}"
                f"\n\n{credits.mention} | {credits.description}\n"
            )
        }]

        await Modules.Embeds(self.bot,title=title,fields=fields,description=description).respond(ctx)

def setup(bot):
    bot.add_cog(Help(bot))