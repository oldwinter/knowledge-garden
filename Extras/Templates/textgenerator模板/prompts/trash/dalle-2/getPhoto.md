---
PromptInfo:
 promptId: getPhoto 
 name: 🖼️ Generate a photo 
 description: select a text and photo about it will be generated using Dalle-2
 author: Noureddine
 tags: photo, dalle-2
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
{{selection}}