# Axobotl

```
≽(^.^)≼     |------------------------------------|
 /(   )/<>  |     A multi-purpose axolotl bot    |
   (   )    |          Made by Isbo2000          |
    (  )    |------------------------------------|
```

# How to run

Make sure you know how to use the command line and have git and node installed.

Clone the repo:

```sh
git clone https://github.com/Isbo2000/Axobotl.git
cd Axobotl
```

Install the dependencies:

```sh
npm install
```

Put your token into when it prompts you (here's a [guide on how to get a token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token))

Run the bot:

```sh
npm start
```

# Development and deployment

This project is written in typescript. You can transpile everything to javascript by using:

```sh
npm run build
```

This will create a directory `build/`, and put the transpiled code there while preserving the file structure. `assets/` will be just copied over, any code that's in `assets/` doesn't get transpiled, thus, put all of your utilities into `utils/`. After transpiling, you can start your code by running:

```sh
node build/Index.js
```

This is what `npm run start` does. It just combines `npm run build` and `node build/Index.js`

However, if you're developing the bot you generally don't want to work with transpiled code because it makes debugging a lot more difficult. To make development easier we use `ts-node`. Run the project in development mode with it using:

```sh
npm run dev
```

# Larry

![Larry](assets/imagecommands/larry/Larry.png)
