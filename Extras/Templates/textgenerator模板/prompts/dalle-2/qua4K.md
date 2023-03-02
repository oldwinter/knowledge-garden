---
PromptInfo:
 promptId: qua4K
 name: 🖼️ Generate a 4K/8K photo 
 description: Images in the dataset with the caption “4K/8K” are of high production value therefore will look more professionally photographed if you add this modifier.
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
{{selection}}, 4K/8K