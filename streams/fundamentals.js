// Netflix & Stream

// Importação de clientes via CSV (Excel)

// É processamento de pequenas quantidades de informações enquanto
//o todo ainda está sendo processado;

// No exemplo da Netflix... O ep não carrega TODO e depois é 
// transmitido. Ele vai sendo carregado enquanto é transmitido.

// Readable Streams / Writable Streams

// Streams -> 

// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    // Ao setar esse timeOut percebe-se que mesmo antes de todos os dados
    // chegarem, já é possivel utilizar os que estão vindo
    setTimeout(() => {
      if ( i > 100 ) {
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

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * (-1)

    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())