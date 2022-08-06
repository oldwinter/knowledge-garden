---
---
## 官方文档

[About Mermaid (mermaid-js.github.io)](https://mermaid-js.github.io/mermaid/#/README)

>Mermaid 还可以自建服务器 通过 url 参数的方式提供渲染好的 svg 数据。  
在不支持 mermaid 的 markdown 预览软件里 可以直接通过引用图片的方式来引用
如果后面有机会频繁用再搞。

## 简单流程图 - graph

```mermaid
graph TD;  
    A-->B;  
    A-->C;  
    B-->D;  
    C-->D;
```

## 流程图 - flow chart

```mermaid
flowchart   TB
 c1-->a2
 subgraph one
 a1-->a2
 end
 subgraph two
 b1-->b2
 end
 subgraph three
 c1-->c2
 end
 one --> two
 three --> two
 two --> c2
```

## 饼图 - pie

```mermaid
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
```

## 时序图 - sequenceDiagram

```mermaid
sequenceDiagram  
    participant Alice  
    participant Bob  
    Alice->>John: Hello John, how are you?  
    loop Healthcheck  
        John->>John: Fight against hypochondria  
    end  
    John-->>Alice: Great!  
    John->>Bob: How about you?  
    Bob-->>John: Jolly good!
```

## 状态转移图 - stateDiagram

```
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

## 甘特图 - gantt

```mermaid
gantt  
dateFormat  YYYY-MM-DD  
title Adding GANTT diagram to mermaid  
excludes weekdays 2014-01-10  
  
section A section  
Completed task            :done,    des1, 2014-01-06,2014-01-08  
Active task               :active,  des2, 2014-01-09, 3d  
Future task               :         des3, after des2, 5d  
Future task2               :         des4, after des3, 5d
```

## 类图 - class diagram

```mermaid
classDiagram  
Class01 <|-- AveryLongClass : Cool  
Class03 *-- Class04  
Class05 o-- Class06  
Class07 .. Class08  
Class09 --> C2 : Where am i?  
Class09 --* C3  
Class09 --|> Class07  
Class07 : equals()  
Class07 : Object[] elementData  
Class01 : size()  
Class01 : int chimp  
Class01 : int gorilla  
Class08 <--> C2: Cool label 
```

## 用户日记图 - journey

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```
