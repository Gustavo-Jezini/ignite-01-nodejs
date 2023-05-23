import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    // Ao setar esse timeOut percebe-se que mesmo antes de todos os dados
    // chegarem, já é possivel utilizar os que estão vindo
    setTimeout(() => {
      if ( i > 5 ) {
        // a resposta é null
        this.push(null)
      } else {
        // Buffer é um tipo de dado. E não aceita numeros, por isso String(i)
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 500)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
})