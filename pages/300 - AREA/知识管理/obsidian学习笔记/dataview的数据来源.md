
在[[obsidian]]中，

dataview有3种元数据获取方式：

- 1，是[[frontdata|frontmatter]]，和[[dataview]]
	- **Frontmatter**: Frontmatter is a common Markdown extension which allows for YAML metadata to be added to the top of a page. All YAML fields will be available as Dataview fields:

	- ```
		---
	   alias: "document" 
	   last-reviewed: 2021-08-17 
	   thoughts: 
		 rating: 8 
		 reviewable: false 
	   ---
2，是Inline Fields。和[[logseq]]的表示方式相同，但和obsidian的兼容性不是太好，比如aliases获取不到。
	- ```
		Basic Field:: Value
		**Bold Field**:: Nice!
3，就是dataview内置的cday，mtime，tags等参数，应该是从md源文件里面读取的。
		
