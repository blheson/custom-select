# How to use Custom Select

add custom select to your code through 
```
<script src="path/to/custom-select.js"></script>
```
In your main script
```
customSelect.init(true,options);
```
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
		overwrite:true,
		content:'input{display:flex}'
		});
		//This configuration will overwrite the default css
```
### CSS Styling
You can overwrite the css styling as normal