from discord.ext import commands
import discord
import asyncio
import random
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

with open('./Assets/Commands/coin.json') as img:
    images = json.load(img)

class Coin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="coin",description="Flips an axolotl coin")
    async def coin(self, ctx: discord.ApplicationContext):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        async def heads(message):
            heads = discord.Embed(
                title="**Heads**",
                description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
                color=discord.Color.from_rgb(config['color'])
            )

            heads.set_image(url=images['heads'])

            heads.set_footer(
                text=f"{self.bot.user.name}   |   Version: {config['version']}",
                icon_url=self.bot.user.avatar
            )

            await message.edit_original_response(embed=heads)
        
        async def tails(message):
            tails = discord.Embed(
                title="**Tails**",
                description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
                color=discord.Color.from_rgb(config['color'])
            )

            tails.set_image(url=images['tails'])

            tails.set_footer(
                text=f"{self.bot.user.name}   |   Version: {config['version']}",
                icon_url=self.bot.user.avatar
            )

            await message.edit_original_response(embed=tails)

        flipping = discord.Embed(
            title="***Flipping***",
            description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
            color=discord.Color.from_rgb(config['color'])
        )

        flipping.set_image(url=images['flipping'])

        flipping.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        message = await ctx.respond(embed=flipping)

        await asyncio.sleep(3)

        flip = random.randrange(0,2)
        if (flip == 0): await heads(message)
        elif (flip == 1): await tails(message)


def setup(bot):
    bot.add_cog(Coin(bot))