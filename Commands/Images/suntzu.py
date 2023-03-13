from discord.ext import commands
import discord
import Modules

class Suntzu(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="suntzu",description="Puts a given string of text onto a Sun Tzu quote")
    @discord.option(name="text",description="Enter text to use",required=True)
    async def suntzu(self, ctx: discord.ApplicationContext, text: str):
        await ctx.defer()

        image = await Modules.Images.load("./Assets/Commands/suntzu/suntzu.jpg")

        Modules.Images.add_textbox(image,text,(255,255,255),(400,150),(700,250))

        file = Modules.Images.save(image, "SunTzuFakeQuote.png")

        await Modules.Embeds(self.bot,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Suntzu(bot))