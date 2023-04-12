# LightWindCSS

*LightWindCSS, is a class based dynamic class generator based on a json config file.*

## Config file

The config file is devided into 5 sections:

```json
{
    "values": {
      "<name>": { "<key>": "<value>", ".." }
    },
    "screens": {
      "<name>": { "min" : "<value|null>", "max" : "<value|null>" }
    },
    "selectors": {
      "<name>": { "selector": "<css_selector>" }
    },
    "proprieties": {
      "valueOnly": {
        "<name>": { "css": "<css_content>" },
      },
      "valueKey": {
        "<name>": { "propriety": ["<prop_name>"], "valuesDefault": "<name_of_value_shortcut|null>" }
      }
    }
}
```

## Example

Here is an example of a class structure:

`[dark]` : `[selector,..]` : `[name]` > `<value>`

- `[]` : is optional
- `<>` : is nececarry

For more example go [here](https://cssthreads.github.io/LightWindCSS/test/)
