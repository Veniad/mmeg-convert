const parseString = require("xml2js").parseString;
const fs = require("fs-extra");
const path = require("path");

const mapKey = "sku";
const fileDir = "./files";
const outputDir = "./output";

// read files folder
const process = async () => {
  const files = await fs.readdir(fileDir);
  
  files.forEach(file => {
    fs.readFile(path.join(fileDir, file)).then(fileData => {
      parseString(fileData, function(err, result) {
        if (result && result.Definitions) {
          const convertedObject = {};
          result.Definitions.Definition.forEach(definition => {
            convertedObject[definition.$[mapKey]] = definition.$;
          });
          fs.outputJson(path.join(outputDir, `${file}.json`), convertedObject).then(() => {
            console.log(`${file}.json created.`);
          });
        }
      });
    });
  });
};

process();
