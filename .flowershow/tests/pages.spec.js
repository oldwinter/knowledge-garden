// const { test, expect } = require('@playwright/test');
// const { MarkdownPage } = require('./markdown-page');

// test.describe('Pages', () => {
// Test if index page exists and is from markdown
// test("index.md @ root", async ({ page, baseURL }) => {
//   const Page = new MarkdownPage(page)
//   await Page.goto('/')
//   await Page.getData(page)
//   expect(Page.props.url).toBe('');
//   expect(Page.props._raw.sourceFilePath).toBe('index.md')
// });
// Test for nested index.md routes
// test('Nested index routes [docs/index.md]', async ({ page, baseURL }) => {
//   const Page = new MarkdownPage(page);
//   await Page.goto("/docs");
//   await Page.getData(page);
//   expect(Page.props.url).toBe("docs");
//   expect(Page.props._raw.sourceFilePath).toBe("docs/index.md");
// })
// });
