---
title: notion database的官方案例demo
date created: 2023-02-15
date modified: 2023-03-14
---

官方notion推荐的项目管理projects、sprints和tasks三件套，通过database的relation，将3个联动起来。

- 其中sprints是冲刺，也可以认为是roadmap，比如季度，月度目标，从精益看板等概念汲取而来，强调小步小周期循环式快跑。从而适合用timeline视图查看。而其由tasks关联，一眼就能看出：要完成哪些任务tasks，才能完成现在的冲刺目标。
- projects是项目，也是有tasks组成，但这里注意到，projects是没有关联sprints的。
- tasks是任务，是sprints和projects的最小执行单元。

可以认为tasks是80%时间都在用的，projects占15%。sprints处于规划时期的时候用的比较多。

## 官方原文描述

### Tasks

Tasks are the smallest unit of work in your project management tracker. A Task represents a more granular piece of work, often assigned to just one person. Many Tasks can be organized into a Project, or added to a Sprint.

### Projects

Projects are typically made up of tasks. A Project represents a large body of work, such as a product launch, or a team milestone. A Project can be broken down into many Tasks, and contain customizable properties such as Status.

### Sprints

Sprints are another dimension by which you can organize tasks and projects, commonly used in Agile workflows. A sprint represents a discrete cycle of time in which tasks will be completed. You can configure start and end dates per Sprint, and assign each Task to a Sprint.
