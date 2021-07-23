# Custom Select
Convert your old select html to more interactive searchable select popup. User can search through options.
# How to use Custom Select

add custom select to your code through 
```
<script src="https://cdn.jsdelivr.net/gh/blheson/custom-select/src/app.js"></script>
```
In your main script
```
customSelect.init(true,options);
```

In your html, convert

```
<select name="anyname">
    <option value='1'>1</option>
    <option value='2'>2</option>
</select>
```
to 
```
<div class="custom-box">
    <select class="custom-select" name="anyname">
        <option value='1'>1</option>
        <option value='2'>2</option>
    </select>
</div>
```
...and you are good to go. You can convert more than one select element. 
## Options
This is an object to configure the custom selector
- overwrite [bool]
	- true - New CSS will overwrite default CSS
	- false - New CSS is added to old CSS
- content [string]
	- CSS string
## Example
```
customSelect.init(
    true,
    {
        overwrite:true, //This configuration will overwrite the default css
        content:'input{display:flex}'
	}); 
```
### CSS Styling
You can overwrite the css styling as normal