const parseString = require("xml2js").parseString;
const fs = require("fs-extra");
const path = require("path");

const mapKey = process.env.MAP_KEY || "sku";
const fileDir = process.env.FILE_DIR || "./files";
const outputDir = process.env.OUTPUT_DIR || "./output";

// read files from folder
const processFiles = async () => {
  const files = await fs.readdir(fileDir);

  files.forEach(file => {
    fs.readFile(path.join(fileDir, file)).then(fileData => {
      parseString(fileData, function(err, result) {
        if (result && result.Definitions) {
          const convertedObject = result.Definitions.Definition[0].$[mapKey] ? {} : [];
          result.Definitions.Definition.forEach(definition => {
            // if mapKey not available just convert the definitions to normal objects and push them to an array
            if (result.Definitions.Definition[0].$[mapKey]) {
              convertedObject[definition.$[mapKey]] = definition.$;
            } else {
              convertedObject.push(definition.$);
            }
          });
          fs.outputJson(path.join(outputDir, `${file}.json`), convertedObject).then(() => {
            console.log(`${file}.json created.`);
          });
        }
      });
    });
  });
};

processFiles();
