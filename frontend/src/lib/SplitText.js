/** Lightweight SplitText replacement — no gsap-trial required */
export class SplitText {
  constructor(targets, vars = {}) {
    this.elements = []
    this.chars = []
    this.words = []
    this.lines = []
    this._originals = []

    const els = typeof targets === 'string'
      ? Array.from(document.querySelectorAll(targets))
      : Array.isArray(targets)
        ? targets.flatMap((t) => (typeof t === 'string' ? Array.from(document.querySelectorAll(t)) : [t]))
        : [targets]

    const type = vars.type || 'chars,words,lines'
    const wantChars = type.includes('chars')
    const wantWords = type.includes('words')
    const linesClass = vars.linesClass || 'split-line'

    els.filter(Boolean).forEach((el) => {
      this.elements.push(el)
      this._originals.push({ el, html: el.innerHTML })

      const text = el.textContent || ''
      const words = text.split(/(\s+)/)
      const frag = document.createDocumentFragment()
      const line = document.createElement('span')
      line.className = linesClass
      line.style.display = 'block'
      line.style.overflow = 'hidden'

      words.forEach((word) => {
        if (!word) return
        if (/^\s+$/.test(word)) {
          line.appendChild(document.createTextNode(word.replace(/ /g, '\u00A0')))
          return
        }

        if (wantWords || wantChars) {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'split-word'
          wordSpan.style.display = 'inline-block'

          if (wantChars) {
            ;[...word].forEach((ch) => {
              const charSpan = document.createElement('span')
              charSpan.className = 'split-char'
              charSpan.style.display = 'inline-block'
              charSpan.textContent = ch
              wordSpan.appendChild(charSpan)
              this.chars.push(charSpan)
            })
          } else {
            wordSpan.textContent = word
          }

          line.appendChild(wordSpan)
          this.words.push(wordSpan)
        } else {
          line.appendChild(document.createTextNode(word))
        }
      })

      frag.appendChild(line)
      this.lines.push(line)
      el.innerHTML = ''
      el.appendChild(frag)
    })
  }

  revert() {
    this._originals.forEach(({ el, html }) => {
      el.innerHTML = html
    })
    this.chars = []
    this.words = []
    this.lines = []
  }
}
