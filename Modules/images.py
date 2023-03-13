from PIL import Image, ImageDraw, ImageFont
import discord
import io

class Images:
    """
    Easier way of working with PIL images
    
    Images() => None
        .load(
            image: str | bytes | discord.Attachment
        ) => Image.Image

        .add_textbox(
            image: Image.Image | None,
            text: str,
            location: (x: int, y: int) | None = (0, 0),
            textbox_size: (width: int, height: int) | None,
            font: str | None = "Questrial",
            max_size: int | None = "250"
        ) = > Image.Image

        .save(
            image: Image.Image,
            filename: str | None = "Image.png"
        ) => discord.File()
    """
    async def load(image: str | bytes | discord.Attachment):
        """
        .load(
            image: str | bytes | discord.Attachment
        ) => Image.Image

        Open a given image into a Image.Image object
        """

        if isinstance(image, bytes):
            image = io.BytesIO(image)

        if isinstance(image, discord.Attachment):
            i = await image.read()
            image = io.BytesIO(i)

        with Image.open(image) as img:
            img.load()
        
        return img.copy()
    
    def add_textbox(
            image: Image.Image | None,
            text: str,
            location: tuple[int,int] | None = None,
            textbox_size: tuple[int,int] | None = None,
            font: str | None = None,
            max_size: int = 250
        ):
        """
        .add_textbox(
            image: Image.Image | None,
            text: str,
            location: (x: int, y: int) | None = (0, 0),
            textbox_size: (width: int, height: int) | None,
            font: str | None = "Questrial",
            max_size: int | None = "250"
        ) = > Image.Image

        Create textbox with given text and add it to a given image
        """

        if font == None: font = "./Assets/Fonts/Questrial/Questrial-Regular.ttf"; max_size = 250

        with Image.open("./Assets/Commands/text/text.png") as textbox:
            textbox.load()
        textbox.copy()

        if textbox_size:
            textbox = textbox.resize(textbox_size)
        
        testimg = Image.new('RGB', (textbox.width, textbox.height))

        width = ImageDraw.Draw(testimg).textbbox((50,50), text, font=ImageFont.truetype(font,100))[2]
        size = round(100 / (width / textbox.width) * 0.90)
        size = size if size < max_size else max_size

        height = textbox.height - ImageDraw.Draw(testimg).textbbox((50,50), text, font=ImageFont.truetype(font,size))[3]
        height = round((height / 2) if height > 0 else height)

        ImageDraw.Draw(textbox).text((50,height), text, font=ImageFont.truetype(font,size))

        if image == None:
            return textbox
        
        else:
            image.paste(textbox,location if location else (0,0),textbox)
            return image
    
    def save(image: Image.Image, filename: str | None = None):
        """
        .save(
            image: Image.Image,
            filename: str | None = "Image.png"
        ) => discord.File()

        Save a given image as a discord.File() object with the given filename
        """

        buffer = io.BytesIO()
        image.save(buffer,"PNG")
        buffer.seek(0)

        return discord.File(buffer, filename if filename else "Image.png")
    
    