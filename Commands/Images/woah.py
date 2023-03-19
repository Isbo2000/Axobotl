from discord.ext import commands
import discord
import Modules
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Woah(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="woah",description="Replies with a 'woah reaction meme'")
    @discord.option(name="text",description="Enter text to use",required=True)
    @discord.option(name="attachment",description="Attach image to use",required=True)
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def woah(self, ctx: discord.ApplicationContext, text: str, attachment: discord.Attachment):
        await ctx.defer()

        bg = await Modules.Images.load("./Assets/Commands/woah/woah.png")

        Modules.Images.add_textbox(bg,text,None,(0,-25),(300,100),max_size=50,target_size=20,center=False)

        image = await Modules.Images.load(attachment)

        image = image.resize((225,190))

        try:
            bg.paste(image,(350,375),image)
        
        except ValueError:
            bg.paste(image,(350,375))

        file = Modules.Images.save(bg,"Woah.png")

        await Modules.Embeds(self.bot,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Woah(bot))