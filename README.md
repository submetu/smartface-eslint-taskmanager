# eslint-plugin-smartface-cloud

Smartface cloud 2.0 development linter

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-smartface-cloud`:

```
$ npm install eslint-plugin-smartface-cloud --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-smartface-cloud` globally.

## Usage

Add `smartface-cloud` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "smartface-cloud"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "smartface-cloud/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





