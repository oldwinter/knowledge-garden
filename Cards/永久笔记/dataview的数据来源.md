---
date created: 2022-06-09
date modified: 2023-03-14
title: dataview的数据来源
---

在 [[Obsidian]] 中，

dataview 有 3 种元数据获取方式：

1，是 [[frontmatter]]，和[[Dataview]]

	- **Frontmatter**: Frontmatter is a common Markdown extension which allows for YAML metadata to be added to the top of a page. All YAML fields will be available as Dataview fields:

```
		---
	   alias: "document" 
	   last-reviewed: 2021-08-17 
	   thoughts: 
		 rating: 8 
		 reviewable: false 
	   ---

```

2，是 Inline Fields。和 [[Logseq]] 的表示方式相同，但和 obsidian 的兼容性不是太好，比如 aliases 获取不到。`= this.basic-field` 就能获取到 Value

```
		Basic Field:: Value
		**Bold Field**:: Nice!
```

3，就是 dataview 内置的 cday，mtime，tags 等参数，应该是从 md 源文件里面读取的。
