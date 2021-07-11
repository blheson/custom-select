
const customSelect = {
    index: 1,
    coreSelect: null,
    cache: [],
    createList: function (arr) {
        let opt = document.createElement('div');
        opt.classList.add('option-box')
        arr.forEach(e => {
            opt.appendChild(this.optionList(e))
        })
        return opt
    },
    inputListen: function (customS, e) {
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
    parseData: function (singSelect) {
        singSelect.querySelectorAll('option').forEach(option => {
            this.cache[this.index].push([option.value, option.innerText])//ish
        });
        singSelect.style.display = 'none'
    },
    createInput: () => {
        let input = document.createElement('input')
        input.name = 'custom-search'
        input.type = 'search';
        return input
    },
    createOptionBox: function () {
        let optionBox = document.createElement('div');
        optionBox.classList.add('custom-option');
        optionBox.style['display'] = 'none';
        let input = this.createInput()
        optionBox.appendChild(input)
        let opt = this.createList(this.cache[this.index])
        optionBox.appendChild(opt)
        return optionBox
    },
    createClickPad: function () {
        let clickDiv = document.createElement('div')
        clickDiv.innerText = 'Select option';
        clickDiv.classList.add('click-to-show')
        return clickDiv;
    },
    createOverallBox: function () {
        let customS = document.createElement('div')
        customS.dataset.value = this.index
        customS.classList.add('big-bound-box' + this.index)
        return customS;
    },
    createBoundingBox: function () {
        let optionBox = this.createOptionBox()
        let customS = this.createOverallBox()
        let clickDiv = this.createClickPad()
        customS.appendChild(clickDiv);
        customS.appendChild(optionBox);
        return customS;
    },
    listenForClick: function (customS) {
        customS.addEventListener('click', e => {
            let customBox = customS.querySelector('.custom-option');
            if (e.target.classList.contains('click-to-show')) {
                customBox.style.display = customBox.style.display == 'none' ? '' : 'none'
            }
            if (e.target.classList.contains('option-list')) {
                this.coreSelect.value = e.target.dataset.value
                customS.querySelector('.click-to-show').innerText = e.target.innerText
                customBox.style.display = 'none'
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
    addStyle: function (option) {
        let style = document.createElement('style')

        let cssText = option.overwrite ? option.content : ".custom-box {width: 500px;display: flex;justify-content: center;margin: auto;align-items: center;align-content: center}.click-to-show {cursor: pointer;text-align: center;background: #509696;padding: 1rem;width: 209px}.custom-option {padding: 1rem;border-radius: 5px;background: #ddd;position: absolute;width: 209px;}.option-box>div {padding: 0.7rem 0;border-bottom: 1px solid #bfbfbf;font-size: 14px;cursor: pointer}.option-box>div:hover {border-bottom: 1px solid #8d8d8d}input {padding: 1rem;border: none}" + option.content
        style.innerText = cssText
        document.head.appendChild(style);
    },
    init: function (option = false) {
        this.addStyle(option)
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