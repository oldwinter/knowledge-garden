const { test, expect } = require("@playwright/test");
const { MarkdownPage } = require("./markdown-page");

test.describe.parallel("wiki links", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/markdownFeatures");
    await Page.getData();
  });

  test("parses a wiki link", async ({ page }) => {
    const link = page.locator("#wikiLink > p > a");
    await link.click();
    await expect(page).toHaveURL("/fixturepage");
  });

  test("parses a wiki link with custom divider", async ({ page }) => {
    const link = page.locator("#wikiLink-custom > p > a");
    await expect(link).toContainText("Fixture Page");
    await link.click();
    await expect(page).toHaveURL("/fixturepage");
  });

  test("parses a wiki link with header", async ({ page }) => {
    const link = page.locator("#wikiLink-heading > p > a");
    await link.click();
    await expect(page).toHaveURL("/fixturepage#planned-features");
  });

  test("parses a wiki link with header and custom divider", async ({
    page,
  }) => {
    const link = page.locator("#wikiLink-heading-custom > p > a");
    await expect(link).toContainText("🚧 working on");
    await link.click();
    await expect(page).toHaveURL("/fixturepage#planned-features");
  });

  test("link to image file", async ({ page }) => {
    const link = page.locator("#wikiLink-image > p > img");
    await expect(link).toHaveAttribute("src", "/assets/images/parktest.png");
  });
});

test.describe.parallel("dashes & ellipse", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/markdownFeatures");
    await Page.getData();
  });

  test("nDash", async ({ page }) => {
    await expect(page.locator("#endash > p")).toContainText("–");
  });

  test("mDash", async ({ page }) => {
    await expect(page.locator("#emdash > p")).toContainText("—");
  });

  test("ellipse", async ({ page }) => {
    await expect(page.locator("#ellipse > p")).toContainText("…");
  });
});

test.describe.parallel("commonMark", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/markdownFeatures");
    await Page.getData();
  });

  test("thematic break", async ({ page }) => {
    const breaks = page.locator("#break > hr");
    await expect(breaks).toHaveCount(3);
  });

  test("headings", async ({ page }) => {
    await expect(page.locator("#headings > h1")).toContainText("Heading 1");
    await expect(page.locator("#headings > h2")).toContainText("Heading 2");
    await expect(page.locator("#headings > h3")).toContainText("Heading 3");
  });

  test("emphasis", async ({ page }) => {
    await expect(page.locator("#emphasis > p > strong").nth(0)).toContainText(
      "I'm Bold!"
    );
    await expect(page.locator("#emphasis > p > strong").nth(1)).toContainText(
      "I'm Bold!"
    );
    await expect(page.locator("#emphasis > p > em").nth(0)).toContainText(
      "I'm Italic!"
    );
    await expect(page.locator("#emphasis > p > em").nth(1)).toContainText(
      "I'm Italic!"
    );
  });

  test("blockquote", async ({ page }) => {
    await expect(
      page.locator("#blockquote > div > blockquote > p")
    ).toContainText("I am a block quote.");
  });

  // test("lists", async ({ page }) => {
  //   await expect(page.locator("#lists > ul > li")).toContainText("one");
  //   await expect(page.locator("#lists > ol > li")).toContainText("one");
  //   await expect(page.locator("#lists > ol > li > ul > li")).toContainText(
  //     "one"
  //   );
  // });

  test("links", async ({ page }) => {
    const link = page.locator("#links > p > a");
    await expect(link).toContainText("Link to fixture page");
    await link.click();
    await expect(page).toHaveURL("/fixturepage");
  });

  test("images", async ({ page }) => {
    await expect(page.locator("#images > p > img")).toHaveAttribute(
      "src",
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/abstract-flowers-rose-sciberras.jpg"
    );
  });
});

test.describe.parallel("GFM", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/markdownFeatures");
    await Page.getData();
  });

  test("tables", async ({ page }) => {
    await expect(
      page.locator('table > thead > tr > th:has-text("Left")')
    ).toHaveAttribute("align", "left");
  });

  test("taskList", async ({ page }) => {
    await expect(page.locator("#task-list > ul > li >> nth=0")).toContainText(
      "one thing to do"
    );
    await expect(page.locator("#task-list > ul > li > input")).toHaveJSProperty(
      "checked",
      true
    );
  });

  test("strikethrough", async ({ page }) => {
    await expect(page.locator("#strikethrough > p > del")).toContainText(
      "I'm CrossedOut!"
    );
  });

  test("autolinks", async ({ page }) => {
    await expect(page.locator("#autolinks > p > a")).toHaveAttribute(
      "href",
      "https://flowershow.app"
    );
  });
});
