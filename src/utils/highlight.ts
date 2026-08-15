/**
 * Lightweight Frond syntax highlighter.
 * Tokenizes source code and wraps tokens in CSS-class spans.
 */

// Synced with the compiler keyword table (src/ast/Parser.rs keyword_type).
const KEYWORDS = new Set([
  'fun', 'val', 'var', 'if', 'else', 'match', 'type', 'trait',
  'override', 'pub', 'pack', 'import', 'as',
  'async', 'await', 'throw', 'defer', 'while', 'for', 'in', 'loop',
  'break', 'continue', 'return', 'lazy', 'true', 'false', 'null',
  'this', 'super', 'channel', 'select', 'atomic',
])

const BUILTIN_TYPES = new Set([
  'i8', 'i16', 'i32', 'i64', 'i128',
  'u8', 'u16', 'u32', 'u64', 'u128',
  'f16', 'f32', 'f64', 'f128',
  'bool', 'char', 'str', 'void',
])

const SPECIAL_TYPES = new Set([
  'Error', 'Throw', 'Async', 'Timer', 'Err',
  'Ok', 'Nil', 'Cons', 'None', 'Some',
  'Leaf', 'Node', 'Lt', 'Eq', 'Gt',
  'Pair', 'GNil', 'GCons',
])

type TokenType = 'com' | 'str' | 'kw' | 'ty' | 'num' | 'fn' | 'text'

interface Token {
  type: TokenType
  value: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    const ch = code[i]
    const next = code[i + 1]

    // Comment
    if (ch === '/' && next === '/') {
      let end = code.indexOf('\n', i)
      if (end === -1) end = code.length
      tokens.push({ type: 'com', value: code.slice(i, end) })
      i = end
      continue
    }

    // String (double or single quoted)
    if (ch === '"' || ch === "'") {
      const quote = ch
      let j = i + 1
      while (j < code.length) {
        if (code[j] === '\\') {
          j += 2
          continue
        }
        if (code[j] === quote) {
          j++
          break
        }
        j++
      }
      tokens.push({ type: 'str', value: code.slice(i, j) })
      i = j
      continue
    }

    // Number (including hex, binary, octal, and type suffixes)
    if (/\d/.test(ch)) {
      let j = i
      if (ch === '0' && (next === 'x' || next === 'X' || next === 'b' || next === 'B' || next === 'o' || next === 'O')) {
        j = i + 2
        while (j < code.length && /[0-9a-fA-F_]/.test(code[j])) j++
      } else {
        while (j < code.length && /[\d._]/.test(code[j])) j++
      }
      // Type suffix (e.g., 42i64, 3.14f64)
      while (j < code.length && /[a-zA-Z0-9]/.test(code[j])) j++
      tokens.push({ type: 'num', value: code.slice(i, j) })
      i = j
      continue
    }

    // Identifier / keyword
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++
      const word = code.slice(i, j)

      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'kw', value: word })
      } else if (BUILTIN_TYPES.has(word) || SPECIAL_TYPES.has(word)) {
        tokens.push({ type: 'ty', value: word })
      } else if (/^[A-Z]/.test(word)) {
        // Capitalized identifier = type constructor
        tokens.push({ type: 'ty', value: word })
      } else {
        // Check if function call (next non-space char is '(')
        let k = j
        while (k < code.length && code[k] === ' ') k++
        if (code[k] === '(') {
          tokens.push({ type: 'fn', value: word })
        } else {
          tokens.push({ type: 'text', value: word })
        }
      }
      i = j
      continue
    }

    // Single character (operators, punctuation, whitespace)
    tokens.push({ type: 'text', value: ch })
    i++
  }

  return tokens
}

export function highlightFrond(code: string): string {
  const tokens = tokenize(code)
  return tokens
    .map((t) => {
      const escaped = escapeHtml(t.value)
      if (t.type === 'text') return escaped
      return `<span class="${t.type}">${escaped}</span>`
    })
    .join('')
}
