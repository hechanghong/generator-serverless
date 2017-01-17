# <%= projectName %>
<%= projectDescription %>

## CLI

### Create `env.json` file

```bash
    $ cp config/env.dev.json config/env.json
    # or
    $ cp config/env.prod.json config/env.json
```

Then edit `config/env.json`.

### Running locally

Uncomment the plugin section in `serverless.yml` then:

```bash
    $ sls offline
```

### Deploy project remotely

```bash
    $ bash bin/deploy.sh
```

### Deploy a function remotely

```bash
    $ sls deploy function -f api --region eu-west-1 
```

## Continuous Integration

### Creating tests

```bash
    $ sls create test -f functionName
```

More information on [serverless-mocha-plugin](https://github.com/SC5/serverless-mocha-plugin)

### Test with mocha

```bash
    $ npm test
```

### Run full CI Stack

```bash
    $ npm run -s ci
```

### Run Eslint

```bash
    $ npm run -s lint
```

### Run dependencies security check

```bash
    $ npm run -s security
```

## Miscellaneous

### Run Unit Test With Nyan Cat

```bash
  $ npm run -s test-nyan
```
