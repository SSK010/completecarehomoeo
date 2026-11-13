module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("blogDate", (date) => {
    const value = date instanceof Date ? date : new Date(`${date}T00:00:00+05:30`);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata"
    }).format(value);
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      output: "_site"
    },
    templateFormats: ["md", "njk"]
  };
};
