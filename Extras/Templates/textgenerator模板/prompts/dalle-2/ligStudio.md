---
PromptInfo:
 promptId: ligStudio
 name: 🖼️ Generate a Studio Lighting photo
 description: Dark/light background is imposed behind the subject, lighting accentuates details of the figure in the foreground.
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
{{selection}},Studio Lighting