'use strict'

const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const schemaLocation = [path.join(__dirname, "../schemas", "model-data-schema.json"),path.join(__dirname, "../schemas", "common-schema.json")];
const modelLocation = path.join(__dirname, "data/compliant-data-model.json");
//TODO : improves those tests by using a js test framework

// test models
const schema = [JSON.parse(fs.readFileSync(schemaLocation[0])),JSON.parse(fs.readFileSync(schemaLocation[1]))];

// schema
const model = JSON.parse(fs.readFileSync(modelLocation));

// initializing
const ajv =new Ajv({allErrors:true});

// compiling model
ajv.addSchema(schema);

const validate = ajv.getSchema("http://github.com/thc-tools/schemas/data-schema.json");

const isModelValide = validate(model);
console.log(validate.errors)
test("compliant model test => should be valid", ()=>{
    expect(isModelValide).toBe(true);
})