'use strict'

const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const schemaLocation = path.join(__dirname, "../schemas", "model-data-schema.json");
const modelLocation = path.join(__dirname, "data/compliant-model.json");
//TODO : improves those tests by using a js test framework

// test models
const model = JSON.parse(fs.readFileSync(modelLocation));

// schema
const schema = JSON.parse(fs.readFileSync(schemaLocation));

// initializing
const ajv =new Ajv({allErrors:true});

// compiling model
const schemaValide = ajv.compile(schema);


const isModelValide = schemaValide(model);

test("compliant model test => should be valid", ()=>{
    expect(isModelValide).toBe(true);
})