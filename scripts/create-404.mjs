import { copyFile } from 'node:fs/promises'

const distDirectory = new URL('../dist/', import.meta.url)

await copyFile(
  new URL('index.html', distDirectory),
  new URL('404.html', distDirectory),
)
