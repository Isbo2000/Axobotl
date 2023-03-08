from discord.ext import commands
from PIL import Image, ImageDraw, ImageFont
import discord
import Modules
import io

class Suntzu(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="suntzu",description="Puts a given string of text onto a Sun Tzu quote")
    @discord.option(name="text",description="Enter text to use",required=True)
    async def suntzu(self, ctx: discord.ApplicationContext, text: str):
        await ctx.defer()

        with Image.open("./Assets/Commands/suntzu/suntzu.jpg") as image:
            image.load()
        image.copy()

        font = "./Assets/Fonts/Questrial/Questrial-Regular.ttf"
        
        testim = Image.new('RGB', (image.width, image.height))

        width = ImageDraw.Draw(testim).textbbox((475,100), text, font=ImageFont.truetype(font,150))[2]
        size = round(150 / (width / image.width) * 0.55)
        size = size if size < 250 else 250

        height = image.height - ImageDraw.Draw(testim).textbbox((475,100), text, font=ImageFont.truetype(font,size))[3]
        height = round((height / 2) if height > 0 else height)

        ImageDraw.Draw(image).text((475,height), text, font=ImageFont.truetype(font,size))

        buffer = io.BytesIO()
        image.save(buffer,"PNG")
        buffer.seek(0)

        file = discord.File(buffer, "SunTzuFakeQuote.png")

        await Modules.Embeds(self.bot,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Suntzu(bot))