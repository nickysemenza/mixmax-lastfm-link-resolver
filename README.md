# Last.fm Mixmax link resolver

This will expand last.fm urls to a short preview.

![Demo](http://i.imgur.com/xhvFMQ8.gif =250x)

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl https://localhost:9146/resolver?url=http%3A%2F%2Flast.fm%2Fuser%2F14nicholasse --insecure
```

## Why do we run it in https locally?

Mixmax slash command APIs are required to be served over https. This is because they are queried directly from the Mixmax client in the browser (using AJAX) that's running on an HTTPS domain. Browsers forbid AJAX requests from https domains to call http APIs, for security. So we must run an https server with a locally-signed certificate.

See [here](http://developer.mixmax.com/docs/integration-api-appendix#local-development-error-neterr_insecure_response) for how to fix the **ERR_INSECURE_RESPONSE** error that you might get in Chrome.

## Installing to Mixmax
Add the resolver to the dashboard: https://app.mixmax.com/dashboard/settings/integrations
Use `last.fm/user/[^\/]+$` for the regex and `https://localhost:9146/resolver` for resolver url
