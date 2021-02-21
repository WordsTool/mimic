const Ajv = require('ajv').default;
const ajvKeywords = require('ajv-keywords');

const schema = {
  type: 'array',
  uniqueItemProperties: ['url', 'name', 'id'],
  items: {
    uniqueItems: true,
    type: 'object',
    properties: {
      url: { type: 'string', minLength: 2, pattern: '\\{\\{phrase\\}\\}' },
      name: { type: 'string', minLength: 2 },
      id: { type: 'string', maxLength: 6, minLength: 6 },
    },
  },
};

module.exports = class ValidateDictionaryPlugin {
  constructor(dictionariesPath) {
    const ajv = new Ajv({
      $data: true,
      verbose: true,
    });
    ajvKeywords(ajv);
    this.ajv = ajv;
    try {
      // eslint-disable-next-line no-undef,global-require,import/no-dynamic-require
      this.dictionary = require(dictionariesPath);
    } catch (e) {
      console.error('Failed load dictionary');
      throw e;
    }
  }

  apply() {
    this.ajv.validate(schema, this.dictionary);
    if (this.ajv.errors) {
      console.error(this.ajv.errors);
      throw new Error('Wrong dictionary schema');
    } else {
      console.info('Dictionary schema is valid!');
    }
  }
};
