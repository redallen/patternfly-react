module.exports = {
  lint: {
    include: [
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-plugin-markdown',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'prettier'
    ]
  },
  jest: {
    include: [
      '@babel/core',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-decorators',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
      'babel-jest',
      'enzyme',
      'enzyme-adapter-react-16',
      'enzyme-to-json',
      'jest',
      'jest-cli',
      'mutation-observer'
    ]
  }
};
