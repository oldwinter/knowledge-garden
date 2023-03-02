---
PromptInfo:
 promptId: getTags
 name: 🏷️Get Tags for Your Content
 description: Select a content and Get suggest Tags for it
 author: Noureddine
 tags: writing, learning
 version: 0.0.1
bodyParams:
 max_tokens: 30
---
content: 
{{context}}
prompt:
suggest tags for the content in markdown format
tags:
