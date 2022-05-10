/*!
 * reveal.js Mermaid plugin
 */

import mermaid from "mermaid";

mermaid.mermaidAPI.initialize({
  // The node size will be calculated incorrectly if set `startOnLoad: start`,
  // so we need to manually render.
  startOnLoad: false,
});

const Plugin = {
  id: "mermaid",

  init: function (reveal) {
    const mermaidEls = reveal.getRevealElement().querySelectorAll(".mermaid");

    Array.from(mermaidEls).forEach(function (el) {
      var insertSvg = function (svgCode, bindFunctions) {
        el.innerHTML = svgCode;
      };

      var graphDefinition = el.textContent.trim();

      try {
        mermaid.mermaidAPI.render(
          `mermaid-${Math.random().toString(36).substring(2)}`,
          graphDefinition,
          insertSvg
        );
      } catch (error) {
        console.error(error, { graphDefinition, el });
        el.innerHTML = error.message;
      }
    });
  },
};

export default () => Plugin;
