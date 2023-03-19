from discord.ext import commands
import discord
import Modules
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Crttv(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="crttv",description="Puts a given image onto a crttv")
    @discord.option(name="attachment",description="Attach image to use",required=True)
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def crttv(self, ctx: discord.ApplicationContext, attachment: discord.Attachment):
        await ctx.defer()

        bg = await Modules.Images.load("./Assets/Commands/crttv/bg.png")

        fg = await Modules.Images.load("./Assets/Commands/crttv/fg.png")

        image = await Modules.Images.load(attachment)

        image = image.resize((255,200))

        try:
            bg.paste(image,(85,105),image)
        
        except ValueError:
            bg.paste(image,(85,105))
        
        bg.paste(fg,(37,39),fg)

        file = Modules.Images.save(bg,"CRTTV.png")

        await Modules.Embeds(self.bot,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Crttv(bot))