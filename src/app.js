const customSelect = {
    index: 1,
    displayText: 'Select option',
    inputPlaceholder: 'Search options',
    coreSelect: null,
    cache: [],
    createList: function(arr) {
        let opt = document.createElement('div');
        opt.classList.add('option-box')
        arr.forEach(e => {
            opt.appendChild(this.optionList(e))
        })
        return opt
    },
    inputListen: function(customS, e) {
        let opt = document.createElement('div');
        opt.classList.add('option-box')
        let search = e.target.value ?? ''
        this.cache[customS.dataset.value].forEach(sing => {
            if (sing[1].toLowerCase().includes(search.toLowerCase()))
                opt.appendChild(this.optionList(sing));
        });
        return opt;
    },
    optionList: (data) => {
        let div = document.createElement('div')
        div.classList.add('option-list')
        div.dataset.value = data[0];
        div.innerText = data[1];
        return div;
    },
    parseData: function(singSelect) {
        singSelect.querySelectorAll('option').forEach(option => {
            this.cache[this.index].push([option.value, option.innerText]) //ish
        });
        singSelect.style.display = 'none'
    },
    createInput: function() {
        let input = document.createElement('input')
        input.name = 'custom-search'
        input.type = 'search';
        input.placeholder =this.inputPlaceholder
        return input
    },
    createOptionBox: function() {
        let optionBox = document.createElement('div');
        optionBox.classList.add('custom-option');

        let input = this.createInput()
        optionBox.appendChild(input)
        let opt = this.createList(this.cache[this.index])
        optionBox.appendChild(opt)
        let backBg = document.createElement('div');
        let closePop = document.createElement('div');
        let contentBox = document.createElement('div');
        contentBox.classList.add('pop-enclose')
        closePop.classList.add('close-pop');
        closePop.innerText = 'x'
        backBg.classList.add('back-bg');
        backBg.style['display'] = 'none';
        contentBox.appendChild(closePop)
        contentBox.appendChild(optionBox)
        backBg.appendChild(contentBox)
        return backBg
    },
    createClickPad: function() {
        let clickDiv = document.createElement('div')
        clickDiv.innerText = this.displayText;
        clickDiv.classList.add('click-to-show')
        return clickDiv;
    },
    createOverallBox: function() {
        let customS = document.createElement('div')
        customS.dataset.value = this.index
        customS.classList.add('big-bound-box', 'big-bound-box' + this.index)
        return customS;
    },
    createBoundingBox: function() {
        let optionBox = this.createOptionBox()
        let customS = this.createOverallBox()
        let clickDiv = this.createClickPad()
        customS.appendChild(clickDiv);
        customS.appendChild(optionBox);
        return customS;
    },
    listenForClick: function(customS) {
        customS.addEventListener('click', e => {
            let customBox = customS.querySelector('.custom-option');
            let backBg = customS.querySelector('.back-bg');
            if (e.target.classList.contains('click-to-show')) {
                backBg.style.display = backBg.style.display == 'none' ? '' : 'none'
            }
            if (e.target.classList.contains('option-list')) {
                this.coreSelect.value = e.target.dataset.value
                customS.querySelector('.click-to-show').innerText = e.target.innerText
                backBg.style.display = 'none'
            }
            if (e.target.classList.contains('close-pop')) {

                // customS.querySelector('.click-to-show').innerText = e.target.innerText
                backBg.style.display = 'none'
            }
            if (e.target.name == 'custom-search') {
                e.target.addEventListener('input', () => {
                    let opt = this.inputListen(customS, e);
                    if (customS.querySelector('.option-box') != null)
                        customS.querySelector('.option-box').remove()
                    customBox.appendChild(opt);
                })
            }
        })
    },
    addStyle: function(option) {
        let style = document.createElement('style')
        let cssText = option.overwrite ? option.content : ".back-bg .pop-enclose{position: relative;width: 400px;top: 16%;height: 400px;left: calc(50% - 150px)}.back-bg>div.pop-enclose>.close-pop{cursor:pointer;border-radius: 20px; position: relative; top: 21px; z-index: 1001; left: 283px; background: #fff; width: 30px; height: 30px; line-height: 27px; text-align: center; }.back-bg .custom-option>input{width:100%}.big-bound-box{width:100%}.back-bg{position: fixed;width: 100%;top: 0;background: #2d2d2db8;z-index: 1000;left: 0;height: 100%;}.back-bg .custom-box {display: flex;justify-content: center;margin: auto;align-items: center;align-content: center}.big-bound-box .click-to-show {cursor: pointer;text-align: center;background: #509696;padding: 1rem}.back-bg .custom-option {padding: 1rem; border-radius: 5px; background: #fff; position: absolute; z-index: 1000; overflow-y: scroll; overflow-x: hidden; max-height: 400px}.back-bg .option-box>div {padding: 0.7rem 0;border-bottom: 1px solid #bfbfbf;font-size: 14px;cursor: pointer}.back-bg .option-box>div:hover {border-bottom: 1px solid #8d8d8d}.back-bg input {padding: 1rem;border: none}.back-bg .custom-option::-webkit-scrollbar-track{width:8px}.back-bg .custom-option::-webkit-scrollbar-thumb{background: rgb(143, 128, 186);border-radius: 8px;}" + option.content
        style.innerText = cssText
        document.head.appendChild(style);
    },
    init: function(option = false) {
        this.addStyle(option)
        if (option.text.display)
            this.displayText = option.text.display
          
        if (option.text.inputPlaceholder)
            this.inputPlaceholder = option.text.inputPlaceholder
            

        document.querySelectorAll('select[name=custom]').forEach(singSelect => {
            this.coreSelect = singSelect
            this.cache[this.index] = [];
            this.parseData(singSelect)
            let customS = this.createBoundingBox()
            this.listenForClick(customS)
            singSelect.parentElement.appendChild(customS)
            this.index++
        })
    }
}