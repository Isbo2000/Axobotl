import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Embeds:
    """
    Embeds(bot: discord.Bot, **args) => discord.Embed()
        .send(
            user: discord.User | discord.TextChannel
        )
        .respond(
            ctx: discord.ApplicationContext,
            ephemeral: bool = False
        )
        .edit(
            msg: discord.Interaction | discord.WebhookMessage
        )

    Create, send, and edit discord embed objects
    """
    def __init__(
            self,
            bot: discord.Bot,
            title: str = "",
            description: str | None = None,
            color: list = config['color'],
            fields: list = [],
            image: str | None = None,
            file: discord.File | None = None,
            author: dict | None = None,
            thumbnail: str | None = None
        ):
        """
        Creates a discord embed object

        fields = {
            "name": str,
            "value": str,
            (optional) "inline": bool
        }

        color = [r: int, g: int, b: int]

        author = {
            "name": str,
            (optional) "icon_url": str,
            (optional) "url": str
        }
        """

        if not color:
            color = config['color']
            
        self.bot = bot
        self.title = title
        self.color = discord.Color.from_rgb(int(color[0]),int(color[1]),int(color[2]))

        if file:
            self.image = f"attachment://{file.filename}"
            self.file = file
        else:
            self.image = image
            self.file = None
            
        self.author = author
        self.thumbnail = thumbnail

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"
        sauce = "https://github.com/Isbo2000/Axobotl"

        if description:
            self.description = description
            descript = {"name":"","value":f"[Invite Me!]({invite})   |   [Join Server!]({server})   |   [View Code!]({sauce})"}
            if fields:
                fields.append(descript)
            else: fields = [descript]
        else:
            self.description = f"[Invite Me!]({invite})   |   [Join Server!]({server})   |   [View Code!]({sauce})"
        
        self.fields = fields
        
        embed = discord.Embed(
            title=self.title,
            description=self.description,
            color=self.color
        )

        for field in self.fields if self.fields else [None]:
            if not field: continue

            if "inline" in field:
                inline = field["inline"]
            else: inline = False

            embed.add_field(
                name=field['name'],
                value=field['value'],
                inline=inline
            )
        
        if self.image:
            embed.set_image(url=self.image)

        if self.author:
            if "icon_url" in self.author:
                icon_url = self.author["icon_url"]
            else: icon_url = discord.Embed.Empty

            if "url" in self.author:
                url =  self.author["url"]
            else: url = ""

            embed.set_author(
                name=self.author["name"],
                url = url,
                icon_url=icon_url
            )
        
        if self.thumbnail:
            embed.set_thumbnail(self.thumbnail)

        embed.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        self.embed = embed
    
    async def send(self, place: discord.User | discord.TextChannel):
        """
        Sends the created embed object
        """
        return await place.send(embed=self.embed)
    
    async def respond(self, ctx: discord.ApplicationContext, ephemeral: bool = False):
        """
        Responds with the created embed object
        """
        try:
            if self.file: return await ctx.respond(embed=self.embed,ephemeral=ephemeral,file=self.file)
            else: return await ctx.respond(embed=self.embed,ephemeral=ephemeral)

        except discord.NotFound:
            return await ctx.channel.send(embed=self.embed,delete_after=10 if ephemeral else None)
    
    async def edit(self, msg: discord.Interaction | discord.WebhookMessage):
        """
        Edits the sent embed message
        """
        if isinstance(msg, discord.Interaction):
            if self.file: return await msg.edit_original_response(embed=self.embed,file=self.file)
            else: return await msg.edit_original_response(embed=self.embed)
        
        elif isinstance(msg, discord.WebhookMessage):
            if self.file: return await msg.edit(embed=self.embed,file=self.file)
            else: return await msg.edit(embed=self.embed)
