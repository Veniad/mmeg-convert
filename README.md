# mmeg-convert
Converts all files with definitions from xml to JSON format and maps the data by a specific map key.

You also have a few env variables to set up if needed:

* MAP_KEY: the property by which the objects will be mapped. If the mapKey is not available it will be generated as normal objects and pushed to an array. (default: sku)
* FILE_DIR: the location of the files you want to convert. (default: ./files)
* FILE_DIR: the location of the converted files. (default: ./output)

If it's required I plan to implement more options. e.g.: to combine files with the same purpose (like rune definitions).
