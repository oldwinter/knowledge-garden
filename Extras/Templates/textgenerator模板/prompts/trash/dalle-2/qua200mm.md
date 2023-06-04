---
PromptInfo:
 promptId: qua200mm
 name: 🖼️ Generate a 200mm lens photo
 description: Extremely zoomed in photo, tons of background blur, & will look like it was photographed from a far distance and then zoomed in a lot (good for photos of flying birds, small animals).
 author: Prompt Engineering Guide
 tags: photo, dalle-2,quality,lens
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
{{selection}}, 200mm lens