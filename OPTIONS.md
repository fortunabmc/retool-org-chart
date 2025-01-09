# Org Chart Options
| Name | Type | Description | Initial Value | Inspector | Enum Definition |
|------|------|-------------|---------------|-----------|----------------|
| User List | array | Array of users with `id` and `parentId` |  |  |  |
| Layout Style | enumeration | Direction of layout for the tree | left | segmented | left, top, bottom, right |
| Show Control Buttons | boolean |  | true | checkbox |  |
| Node Height | number | Height of the rendered node | 200 |  |  |
| Node Width | number | Width of the rendered node | 250 |  |  |
| Parent / Child Gap | number | Vertical spacing between parent and children | 60 |  |  |
| Siblings Gap | number | Horizontal spacing between sibling nodes | 60 |  |  |
| Neighbor Spacing | number | Horizontal spacing between groups of child nodes | 80 |  |  |
| Child X Gap | number | Horizontal spacing between sibling child nodes | 100 |  |  |
| Child Y Gap | number | Vertical spacing between sibling child nodes | 50 |  |  |
| Link Width | number | Stroke width of the links between nodes | 2 |  |  |
| Link Color | string | Color for the links between nodes | #FFF |  |  |
| Node Template CSS | string | CSS for rendering the nodes. Define classes and use them in node HTML. EX: <p class="styled">Hello <? user.name ?></p> |  |  |  |
| Node Template HTML | string | HTML template for rendering the nodes. User and Node props available as vars to templates. EX: <p>Hello <? user.name ?></p> |  |  |  |
| onNodeClick | object |  | [object Object] | hidden |  |

