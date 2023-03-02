---
PromptInfo:
 promptId: modArtStation
 name: 🖼️ Generate a Trending on ArtStation photo 
 description: This modifier will sample extra training data from the most-liked artwork from the website ArtStation. Images which trend on ArtStation are usually very visually-appealing as it means the ArtStation community enjoys those images, so filtering the data to produce images similar to those will greatly increase the quality of the generated art.
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
{{selection}}, Trending on ArtStation