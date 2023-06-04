---
PromptInfo:
 promptId: modFanart
 name: 🖼️ Generate a Fanart photo 
 description: This gives the generation a cute young amateur graphic design feel, adding hearts to the image and so on.
 author: Prompt Engineering Guide
 tags: photo, dalle-2, modifier
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
{{selection}}, Fanart