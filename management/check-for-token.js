let config = require("../assets/data/config.json");
const fs = require("fs");

if (config.token !== "") {
  console.log();
  console.log(
    "IMPORTANT: the token in the config file wasn't set to an empty string"
  );

  config.token = "";
  let data = JSON.stringify(config, null, 4);
  fs.writeFileSync("assets/data/config.json", data);

  console.log("Config file contents changed; token removed");
  console.log();
}
