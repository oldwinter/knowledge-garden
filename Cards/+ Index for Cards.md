#index 

```dataview
TABLE dates
FROM "Cards" and -#index
GROUP BY file.folder

```

``` dataview
TABLE tags FROM "Cards" and -#x/index and -"People" and -#x/readme
SORT file.name ASC

```