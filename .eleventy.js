module.exports = function (eleventyConfig) {
  // Obrázky a video: skopíruj src/img -> _site/img bez zmeny
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });

  return {
    dir: {
      input: "src",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
