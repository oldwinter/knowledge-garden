---
PromptInfo:
 promptId: artUkiyoe
 name: 🖼️ Generate a ukiyo-e art photo 
 description: select a text and photo with the style of ukiyo-e art will be generated using Dalle-2
 author: Prompt Engineering Guide
 tags: photo, dalle-2,art
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
{{selection}}, ukiyo-e art