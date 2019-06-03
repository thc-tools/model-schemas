const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const schemaLocation = [path.join(__dirname, "../schemas", "model-data-schema.json"),path.join(__dirname, "../schemas", "common-schema.json")];
const modelLocation = path.join(__dirname, "data/non-compliant-data-model.json");
//TODO : improves those tests by using a js test framework

// test models
const schema = [JSON.parse(fs.readFileSync(schemaLocation[1], "utf-8"),),JSON.parse(fs.readFileSync(schemaLocation[0],"utf-8"))];

// schema
const model = JSON.parse(fs.readFileSync(modelLocation));



// initializing
const ajv =new Ajv({schemas: schema,allErrors:true});

const validate = ajv.getSchema("http://github.com/thc-tools/schemas/data-schema.json");
const isModelValide = validate(model);

test("non compliant model test => should not be valid", ()=>{
    expect(isModelValide).toBe(false);
});
