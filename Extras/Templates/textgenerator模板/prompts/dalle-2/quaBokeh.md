---
PromptInfo:
 promptId: quaBokeh
 name: 🖼️ Generate a Bokeh photo 
 description:  Enforce a large amount of background blur with clear outer bands, this can be used as a replacement for the “mm lens” prompts. Also could cause the subject to be closer to the camera.
 author: Prompt Engineering Guide
 tags: photo, dalle-2,quality
 version: 0.0.1
config:
 append:
  bodyParams: false
  reqParams: true
 context: "prompt"
 output: '`\n![](${requestResults.data[0].url})`'
bodyParams:
 n: 1
 size: "1024x1024"
reqParams:
 url: "https://api.openai.com/v1/images/generations"
---
{{selection}}, Bokeh