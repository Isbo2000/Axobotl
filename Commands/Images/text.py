from discord.ext import commands
from PIL import Image, ImageDraw, ImageFont
import discord
import Modules
import io

class Text(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="text",description="")
    @discord.option(name="text",description="",required=True)
    async def text(self, ctx: discord.ApplicationContext, text: str):
        await ctx.defer()

        with Image.open("./Assets/Commands/text/text.png") as image:
            image.load()
        image.copy()
        
        testim = Image.new('RGB', (image.width, image.height))

        width = ImageDraw.Draw(testim).textbbox((50,50), text, font=ImageFont.truetype("arial",100))[2]
        size = round(100 / (width / image.width) * 0.90)
        size = size if size < 250 else 250

        height = image.height - ImageDraw.Draw(testim).textbbox((50,50), text, font=ImageFont.truetype("arial",size))[3]
        height = round((height / 2) if height > 0 else height)

        ImageDraw.Draw(image).text((50,height), text, font=ImageFont.truetype("arial",size))

        buffer = io.BytesIO()
        image.save(buffer,"PNG")
        buffer.seek(0)

        file = discord.File(buffer, "Text.png")

        await Modules.Embeds(self.bot,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Text(bot))