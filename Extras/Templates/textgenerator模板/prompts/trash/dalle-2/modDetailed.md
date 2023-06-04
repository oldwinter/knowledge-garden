---
PromptInfo:
 promptId: modDetailed 
 name: 🖼️ Generate a photo, with more precise details 
 description:  Adds more precise details to the output, instead of simple art, but can also make the art overwhelming/over the top in small details.
 author: Prompt Engineering Guide
 tags: photo, dalle-2,modifier
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
{{selection}}, Detailed