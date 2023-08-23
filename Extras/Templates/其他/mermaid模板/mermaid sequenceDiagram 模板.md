---
---
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