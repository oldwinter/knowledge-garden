### 最近的30条编辑笔记

```dataview
table WITHOUT ID file.link AS "File",file.mtime as "修改时间"
from !"模板" and !"kanban"
sort file.mtime desc
limit 30
```

### 三天内创建的笔记

```dataview
table file.ctime as 创建时间
from ""
where date(today) - file.ctime <=dur(3 days)
sort file.ctime desc
limit 999
```

### 未完成tasks

```dataview
task from #projects/active
```
```dataviewjs
dv.taskList(dv.pages().file.tasks.where(t => !t.completed));
```

## 已完成tasks

```dataviewjs
dv.taskList(dv.pages('"/" and -"pages/500 - ARCHIVE"').file.tasks.where(t => t.completed));
```

### TODO

```dataview
table file.mtime as 修改时间, tags
from ""
where contains(file.tags,"todo")
sort tags desc
limit 20
```

### 回顾记忆

```dataview
table file.mtime as 修改时间, tags
from ""
where contains(file.tags,"review")
sort tags desc
limit 20
```
