const customSelect = {
    index: 1,
    createList: (arr) => {
        let opt = '';
        arr.forEach(e => {
            opt += `<div class="sing-opt" data-value="${e[0]}">${e[1]}</div>`
        })
        return opt
    },
    cache: [],
    parseData: function (singSelect, options = null) {
        singSelect.querySelectorAll('option').forEach(option => {


            this.cache[this.index].push([option.value, option.innerText])//ish
        });
        singSelect.style.display = 'none'
    },
    createBoundingBox: function () {
        let opt = this.createList(this.cache[this.index])
        let optionBox = `<div class="customOption" style="display:none"><input type="search" name="customSearch">${opt}</div>`;
        let customS = document.createElement('div')
        customS.classList.add('big-bound-box' + this.index)
        customS.innerHTML = `<div class="clicktoshow">Select option</div>${optionBox}`
        return customS;
    },
    listenForClick: function (customS) {
        customS.addEventListener('click', e => {
            if (e.target.classList.contains('clicktoshow')) {
                let optionBox = customS.querySelector('.customOption');
                optionBox.style.display = optionBox.style.display == 'none' ?
                    '' : 'none'
            }
            if (e.target.classList.contains('sing-opt')) {
                // console.log(this.coreSelect)
                this.coreSelect.value = e.target.dataset.value
                customS.querySelector('.clicktoshow').innerText = e.target.innerText
            }
        })
    },
    coreSelect: null,
    init: function (status) {
        if (!status) {
            return
        }
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
