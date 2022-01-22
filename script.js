const cards = document.querySelectorAll('.cards')
let hasFlipedCard = false
let lockBoard = false
let firsCard, secondCard
let points = 0




function virar() {
    if (lockBoard) return
    if (this === firsCard)return 
    this.classList.add('virar')
    if(!hasFlipedCard){
        hasFlipedCard = true
        firsCard = this
    }else{
        hasFlipedCard = false
        secondCard = this

        if (firsCard.dataset.name === secondCard.dataset.name) {
            setTimeout(()=>{
                points++
                if (points === 6) {
                    window.location.href = 'vitoria.html'
                }
            },400)
            firsCard.removeEventListener('click',virar)
            secondCard.removeEventListener('click',virar)
        }else{
            lockBoard = true
            setTimeout(()=>{
                lockBoard = false
                firsCard.classList.remove('virar')
                secondCard.classList.remove('virar')
            },700)
        }
    }
}

function resetBoard() {
    [hasFlipedCard,lockBoard] = [false,false]
    [firsCard, secondCard] = [null,null]
}

(function shuffle() {
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
})()



cards.forEach(card => card.addEventListener('click', virar))
