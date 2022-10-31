# Flowershow Default Template

Flowershow default app template. Uses Next.JS with Tailwind and MDX.

Includes instructions on how to rapidly customize the site.

## Testing

We use playwright for functional testing focused on the rendering of the markdown.

To test:

```
./testsetup.sh
npm run build
# now run the server in the background
npm run start

# now run tests
playwright test

# now teardown
./testteardown.sh
```
