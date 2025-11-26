import { decl } from '../ast'
import type { DesignSystem } from '../design-system'
import type { ResolvedConfig } from './config/types'

export function registerContentCompat(userConfig: ResolvedConfig, designSystem: DesignSystem) {
  let content = userConfig.theme.content || {}

  if (typeof content !== 'object' || content === null) return

  for (let [key, value] of Object.entries(content)) {
    if (typeof value !== 'string') continue

    designSystem.utilities.static(`content-${key}`, () => [
      decl('--tw-content', value),
      decl('content', 'var(--tw-content)'),
    ])
  }
}
