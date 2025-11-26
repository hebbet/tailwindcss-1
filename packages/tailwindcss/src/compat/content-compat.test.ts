import { expect, test } from 'vitest'
import { compile } from '..'

const css = String.raw

test('creates custom utilities to represent content keys', async () => {
  let input = css`
    @config "./config.js";
    @tailwind utilities;
  `

  let compiler = await compile(input, {
    loadModule: async () => ({
      base: '/root',
      path: '',
      module: {
        theme: {
          content: {
            slash: '"/"',
          },
        },
      },
    }),
  })

  expect(compiler.build(['content-slash'])).toMatchInlineSnapshot(`
    ".content-slash {
      --tw-content: "/";
      content: var(--tw-content);
    }
    "
  `)
})
