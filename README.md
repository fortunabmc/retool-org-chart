# Retool Org Chart

Retool Custom Component Wrapper for https://github.com/bumbeishvili/org-chart

![left-tree](./img/left.png)

## Configure via Retool Editor

![alt text](./img/settings.png)

### Node Template CSS & HTML

Under the hood, these two fields use[mustache.js](https://github.com/janl/mustache.js) as a template engine.

The delimeters have been set to `<?` and `?>` to prevent interferenece with Retool's `{{ vars }}`

Both the CSS and HTML have the full user object from the list, within the node, as `<? user.PROP ?>`.

Also available are:

- `<? node.width ?>`
- `<? node.height ?>`
- `<? node.lineColor ?>`

## [View Component Options](./OPTIONS.md)

## Examples with variable interpolation

### User List Interface

```ts
interface IUser {
  id: string | number; // mandatory
  parentId: null; // mandatory; `null` for the root or an id of another `IUser`
  name?: string;
  email?: string;
  position?: string;
  imageUrl?: string;
}
```

### Template CSS

```css
.container {
  /*padding-top: 30px;*/
  margin-left: 1px;
  border-radius: 6px;
  overflow: visible;
  height: <? node.height ?>px;
  background-color: #fff;
}

.content {
  height: calc(<? node.height ?>px - 32px);
}

.userpic {
  width: 60px;
  height: 60px;
  margin-top: -20px;
  background-color: #fff;
  margin-left: calc(<? node.width ?>px / 2 - 33px);
  border-radius: 100px;
  border: 2px solid <? node.linkColor ?>;
}

.hr {
  margin-top: -48px;
  height: 10px;
  border-radius: 6px 6px 0 0;
  background-color: <? node.linkColor ?>;
}

.footer {
}
```

## Example Template HTML

```html
<div class="container">
  <div class="content">
    <img
      class="userpic"
      src="<? user.imageUrl ?>"
    />
    <div class="hr"></div>
    <div class="userinfo">
      <div class="name"><? user.name ?></div>
      <div class="position"><? user.position ?></div>
    </div>
    <div class="footer">
      <div>Manages: <? user._directSubordinates ?> 👤</div>
      <div>Oversees: <? user._totalSubordinates ?>👤</div>
    </div>
  </div>
</div>
```
