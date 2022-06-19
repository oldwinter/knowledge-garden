---

database-plugin: basic

---

<%%
name: new database
description: new description
columns:
  column1:
    input: text
    key: column1
    accessor: column1
    label: Column 1
    position: 0
    config:
      enable_media_view: true
      media_width: 100
      media_height: 100
      isInline: false
config:
  enable_show_state: false
  group_folder_column: 
  remove_field_when_delete_column: false
  cell_size: normal
  sticky_first_column: false
  show_metadata_created: false
  show_metadata_modified: false
  source_data: current_folder
  source_form_result: root
filters:
%%>