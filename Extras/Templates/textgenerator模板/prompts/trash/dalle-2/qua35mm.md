---
PromptInfo:
 promptId: qua35mm 
 name: 🖼️ Generate a 35mm lens photo 
 description: Reasonable amount of background blur, reasonable zoom level.
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
{{selection}},35mm lens