from discord.ext import commands
import discord
import Modules

class Text(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="text",description="Puts a given string of text onto a transparent image")
    @discord.option(name="text",description="Enter text to use",required=True)
    @discord.option(name="amogus",description="The font is Among Us???",required=False)
    async def text(self, ctx: discord.ApplicationContext, text: str, amogus: bool = False):
        await ctx.defer()

        if amogus == True:
            max_size = 200
            font = "./Assets/Fonts/AmongUsFilled/AmongUsFilled-Regular.ttf"
        
        else:
            max_size = 250
            font = "./Assets/Fonts/Questrial/Questrial-Regular.ttf"

        image = Modules.Images.add_textbox(None,text,font=font,max_size=max_size)

        file = Modules.Images.save(image, "Text.png")

        await Modules.Embeds(self.bot,file=file).respond(ctx)

def setup(bot):
    bot.add_cog(Text(bot))