from discord.ext import commands
import discord
import Modules
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

with open('./Assets/credits.json') as crd:
    credits = json.load(crd)

class Credits(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="credits",description="View the credits")
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def credits(self, ctx: discord.ApplicationContext):
        title = "**Credits**"
        description = "\n".join(config["description"])

        fields = []
        for credit in credits:
            fields.append({
                "name": "\u200B\n",
                "value": f"<@{credit['id']}>|`{await self.bot.fetch_user(credit['id'])}`\n{credit['description']}"
            })

        await Modules.Embeds(self.bot,title=title,fields=fields,description=description).respond(ctx)

def setup(bot):
    bot.add_cog(Credits(bot))