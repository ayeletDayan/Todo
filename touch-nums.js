'use strict'
var gNums = []
var gSize = 0
var gCount = 1
var gInterval
var gTime
function size(maxNum) {
    gSize = maxNum
}

function start() {
    gNums = createNums(gSize)
    renderBoard(gNums)
}

function createNums(maxNum) {
    var nums = []
    for (var i = 0; i < maxNum; i++) {
        nums.push(i + 1)
    }
    return shuffle(nums)
}

function shuffle(items) {
    var randIdx, keep, i
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = Math.floor(Math.random() * (items.length - 1))
        keep = items[i]
        items[i] = items[randIdx]
        items[randIdx] = keep
    }
    return items
}

function renderBoard(nums) {
    var strHTML = ''
    var numIdx = 0
    for (var i = 0; i < Math.sqrt(nums.length); i++) {
        strHTML += '<tr>'
        for (var j = 0; j < Math.sqrt(nums.length); j++) {
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this,${i},${j})" class="cell">` + nums[numIdx++] + `</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML    
}

function cellClicked(elBtn) {
    var currNum = elBtn.innerText
    if (!elBtn.classList.clickedNum && +currNum === gCount) {
        elBtn.classList.add('clickedNum')
        gCount++
    }
    if (+currNum === 1){
        gTime = Date.now()
        gInterval = setInterval(stopper,10)
    }
    if (gCount == gNums.length) clearInterval(gInterval)
}

function stopper() {
    var now = (Date.now() - gTime) / 1000
    var elTime = document.querySelector('span')
    elTime.innerText = now
}
