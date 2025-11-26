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
    "@layer properties;
    .content-slash {
      --tw-content: "/";
      content: var(--tw-content);
    }
    @property --tw-content {
      syntax: "*";
      inherits: false;
      initial-value: "";
    }
    @layer properties {
      @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
        *, ::before, ::after, ::backdrop {
          --tw-content: "";
        }
      }
    }
    "
  `)
})
