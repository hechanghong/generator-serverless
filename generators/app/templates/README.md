# <%= projectName %>
<%= projectDescription %>

## CLI

### Create `.env` file

```bash
    $ cp config/.env.dev config/.env
    # or
    $ cp config/.env.prod config/.env
```

### Running locally

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
### Run dependencies security check

```bash
    $ npm run -s security
```
