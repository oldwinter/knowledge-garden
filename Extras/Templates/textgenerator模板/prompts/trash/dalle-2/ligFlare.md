---
PromptInfo:
 promptId: ligFlare
 name: 🖼️ Generate a Lens Flare photo
 description: Adds a streak of light onto an image generation, creating the appearance of a bright light source being just outside of the frame.

 author: Prompt Engineering Guide
 tags: photo, dalle-2,lighting
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
{{selection}},Lens Flare