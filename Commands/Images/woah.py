from discord.ext import commands
from PIL import Image, ImageDraw, ImageFont
import discord
import Modules
import io

class Woah(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="woah",description="Replies with a 'woah reaction meme'")
    @discord.option(name="text",description="Enter text to use",required=True)
    @discord.option(name="attachment",description="Attach image to use",required=True)
    async def woah(self, ctx: discord.ApplicationContext, text: str, attachment: discord.Attachment):
        await ctx.defer()

        bg = await Modules.Images.load("./Assets/Commands/woah/woah.png")

        Modules.Images.add_textbox(bg,text,(0,0,0),(-40,2),(400,100),max_size=100,target_size=10)

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