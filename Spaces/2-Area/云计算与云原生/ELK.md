---
title: ELK
date created: 2022-12-09
date modified: 2023-03-14
---

用ELK（Elasticsearch+Logstash+Kibana）技术栈，自行搭建一个日志存储和分析系统。

1. **Elasticsearch:**
    
    - Elasticsearch 是一个分布式、实时的搜索和分析引擎。它用于存储和检索大量的数据，支持全文搜索、结构化搜索和复杂查询。Elasticsearch 的强大之处在于其分布式性能、高可用性和水平扩展能力，使得它成为处理日志和大数据的理想选择。
2. **Logstash:**
    
    - Logstash 是一个数据收集引擎，用于将不同来源的数据收集、处理和转换，然后发送到目标系统（如 Elasticsearch）。它支持多种数据源的输入（如日志文件、消息队列、数据库等）和多种目标的输出。
3. **Kibana:**
    
    - Kibana 是一个用于数据可视化和分析的工具。它允许用户通过创建仪表盘、图表和可视化图像来探索存储在 Elasticsearch 中的数据。Kibana 提供了一个直观的用户界面，使用户能够通过交互式方式进行数据分析和可视化。

"ELK" 组合通常用于搭建日志管理和分析平台，可以帮助用户实现实时的数据收集、存储、搜索和可视化，从而更好地理解数据、发现趋势和问题，以及支持决策制定。最近，"ELK" 也逐渐被"Elastic Stack"（Elastic Stack 包括 Elasticsearch、Logstash、Kibana 以及 Beats 等组件）所取代，以反映 Elastic 公司对其产品和生态系统的整体发展。
