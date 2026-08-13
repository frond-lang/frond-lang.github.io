<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

interface TocItem {
  id: string
  label: string
}

const tocItems: TocItem[] = [
  { id: 'hello-world', label: '1. Hello World' },
  { id: 'variables', label: '2. Variables & Types' },
  { id: 'functions', label: '3. Functions' },
  { id: 'control-flow', label: '4. Control Flow' },
  { id: 'loops', label: '5. Loops' },
  { id: 'arrays', label: '6. Arrays' },
  { id: 'closures', label: '7. Lambda & Functions' },
  { id: 'generics', label: '8. Generics' },
  { id: 'custom-types', label: '9. Custom Types' },
  { id: 'patterns', label: '10. Pattern Matching' },
  { id: 'traits', label: '11. Traits' },
  { id: 'nullable', label: '12. Nullable Types' },
  { id: 'newtype', label: '13. Newtype' },
  { id: 'casting', label: '14. Type Casting' },
  { id: 'operators', label: '15. Operators' },
  { id: 'error-handling', label: '16. Error Handling' },
  { id: 'async', label: '17. Async & Channels' },
  { id: 'defer', label: '18. Defer' },
  { id: 'strings', label: '19. Strings' },
  { id: 'next-steps', label: '20. Next Steps' },
]

const activeSection = ref('hello-world')
let observer: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  const sections = document.querySelectorAll('.kuzo-tutorial-section')
  if (!sections.length || !('IntersectionObserver' in window)) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )
  sections.forEach((s) => observer!.observe(s))
})

onUnmounted(() => {
  observer?.disconnect()
})

// --- Code block strings ---
const helloWorldBash = `kuzo init myapp
cd myapp
kuzo run`
const helloWorldMain = `fun main(): void {
    println("Hello, Kuzo!")
}`
const variablesBasic = `val name: str = "Kuzo"
val version: i32 = 1
var counter: i32 = 0
counter = counter + 1`
const variablesInts = `val a: i8 = 127
val b: i16 = 32767
val c: i32 = 2147483647
val d: i64 = 9223372036854775807i64
val e: u8 = 255
val f: u16 = 65535
val big: i128 = 42i128`
const variablesFloats = `val pi: f64 = 3.14159
val half: f32 = 0.5f32
val ch: char = 'A'
val active: bool = true`
const variablesOverflow = `val max: i32 = 2147483647
val wrapped = max + 1  // -2147483648 (wraps to MIN)

val u_max: u8 = 255
val u_wrapped = u_max + 1  // 0 (wraps around)`
const variablesFloatSpecial = `val inf: f64 = 1.0f64 / 0.0f64
val neg_inf: f64 = -1.0f64 / 0.0f64
val nan: f64 = 0.0f64 / 0.0f64

// NaN never equals itself
val check = nan != nan  // true`
const variablesNumberLiterals = `val hex = 0xFF       // 255
val bin = 0b1010     // 10
val oct = 0o777      // 511`
const functionsBasic = `fun add(a: i32, b: i32): i32 {
    a + b
}

fun greet(name: str): void {
    println("Hello, {name}!")
}`
const functionsCall = `val sum = add(3, 4)
greet("World")`
const functionsRecursive = `fun fib(n: i32): i32 {
    if n < 2 { n } else { fib(n - 1) + fib(n - 2) }
}`
const controlFlowIfElse = `fun classify(n: i32): str {
    if n > 0 { "positive" }
    else if n < 0 { "negative" }
    else { "zero" }
}`
const controlFlowAssign = `val sign = if 5 > 3 { 1 } else { -1 }`
const controlFlowBlock = `val result = {
    val a = 3
    val b = 4
    a + b
}`
const controlFlowMatch = `fun describe(n: i32): str {
    match n {
        0 => "zero"
        1 => "one"
        _ => "many"
    }
}`
const loopsWhile = `var i: i32 = 0
var sum: i32 = 0
while i < 10 {
    sum = sum + i
    i = i + 1
}`
const loopsBreak = `var n: i32 = 0
while n < 100 {
    if n >= 5 { break }
    n = n + 1
}`
const loopsForIn = `val arr = [10, 20, 30, 40]
var total: i32 = 0
for x in arr.iter() {
    total = total + x
}`
const arraysBasic = `val nums = [1, 2, 3, 4, 5]
val first = nums[0]
val last = nums[nums.len() - 1]`
const arraysConcat = `val a = [1, 2]
val b = [3, 4]
val c = a ++ b`
const arraysNested = `val strs = ["hello", "world"]
val nested = [[1, 2], [3, 4]]
val grid = nested[0][1]`
const arraysEmpty = `val empty: i32[] = []
val built = empty ++ [1, 2, 3]`
const closuresBasic = `val x: i32 = 10
val read = fun(): i32 { x }
val result = read()`
const closuresMutation = `var count: i32 = 0
val inc = fun(): void { count = count + 1 }
inc()
inc()
inc()`
const closuresMakeCounter = `fun makeCounter(): (() -> i32) {
    var n: i32 = 0
    fun(): i32 {
        n = n + 1
        n
    }
}

val c = makeCounter()
val a = c()
val b = c()`
const closuresHigherOrder = `fun apply(f: (() -> i32)): i32 { f() }
fun compose(f: (() -> i32), g: (() -> i32)): (() -> i32) {
    fun(): i32 { f() + g() }
}`
const closuresParams = `val base: i32 = 100
val adder = fun(n: i32): i32 { base + n }

val r1 = adder(5)   // 105
val r2 = adder(50)  // 150`
const closuresStore = `var fns: (() -> i32)[] = []
var i: i32 = 0
while i < 3 {
    val captured = i * 10
    fns = fns ++ [fun(): i32 { captured }]
    i = i + 1
}
// fns[0]() = 0, fns[1]() = 10, fns[2]() = 20`
const closuresFactory = `fun makeAdder(n: i32): (() -> i32) {
    fun(): i32 { n + 1 }
}

val add5 = makeAdder(5)
val result = add5()  // 6`
const genericsIdentity = `fun identity<T>(x: T): T {
    x
}

val n = identity<i32>(42)
val s = identity<str>("hello")`
const genericsDoubleCast = `fun double_cast<T>(x: T): T {
    x as f64 as T
}`
const genericsMultiple = `fun swap<T, U>(a: T, b: U): (U, T) {
    Pair(b, a)
}

type GList<T> = | GNil | GCons(T, GList<T>)

fun glen<T>(l: GList<T>): i32 {
    match l {
        GNil => 0
        GCons(_, t) => 1 + glen(t)
    }
}`
const customTypesAdt = `type Shape = | Circle(f64) | Rect(f64, f64)

fun area(s: Shape): f64 {
    match s {
        Circle(r) => 3.14159 * r * r
        Rect(w, h) => w * h
    }
}`
const customTypesRecord = `type Point = Point(x: i32, y: i32)

val p = Point(3, 4)`
const customTypesRecordNullable = `type User = User(name: str, age: i32?, tags: str[])

val u1 = User("Alice", 30, ["admin"])
val u2 = User("Bob", null, [])

val age = u1.age ?? 0  // 30
val tagCount = u2.tags.len()  // 0`
const customTypesRecordMut = `var pt = Point(0, 0)
pt.x = 10  // mutate field via var
pt.y = 20`
const customTypesDestructure = `fun quadrant(p: Point): str {
    match p {
        Point(0, 0) => "origin"
        Point(x, y) if x > 0 && y > 0 => "Q1"
        Point(x, y) if x < 0 && y > 0 => "Q2"
        Point(_, 0) => "x-axis"
        _ => "other"
    }
}`
const customTypesRecursive = `type Tree = | Leaf | Node(i32, Tree, Tree)

fun treeSum(t: Tree): i32 {
    match t {
        Leaf => 0
        Node(v, l, r) => v + treeSum(l) + treeSum(r)
    }
}

val tree = Node(1, Node(2, Leaf, Leaf), Node(3, Leaf, Leaf))`
const patternsOrPatterns = `fun weekend(n: i32): bool {
    match n {
        0 | 6 => true
        _ => false
    }
}`
const patternsGuards = `fun classify(n: i32): str {
    match n {
        n if n < 0 => "negative"
        n if n % 2 == 0 => "even"
        _ => "odd"
    }
}`
const patternsNested = `type Pt = Pt(x: i32, y: i32)
type Seg = Seg(a: Pt, b: Pt)

fun segLen(s: Seg): i32 {
    match s {
        Seg(Pt(x1, y1), Pt(x2, y2)) => (x2 - x1) + (y2 - y1)
    }
}`
const patternsLiteral = `fun command(cmd: str): i32 {
    match cmd {
        "go" | "move" | "run" => 1
        "stop" | "halt" => 2
        _ => 0
    }
}

fun vowel(c: char): bool {
    match c {
        &#39;a&#39; | &#39;e&#39; | &#39;i&#39; | &#39;o&#39; | &#39;u&#39; => true
        _ => false
    }
}`
const traitsShow = `trait Show {
    fun show(): str
}

type Point: Show = Point(x: i32, y: i32) {
    fun show(): str {
        "Pt(" + x as str + "," + y as str + ")"
    }
}`
const traitsMultiple = `trait Greet {
    fun name(): str
    fun hello(): str {
        "Hello, " + name()
    }
}

trait Sizeable {
    fun sz(): i32
}

type Ordering: (Greet, Sizeable, Show) = | Lt | Eq | Gt {
    fun name(): str {
        match this {
            Lt => "less"
            Eq => "equal"
            Gt => "greater"
        }
    }
    fun sz(): i32 {
        match this { Lt => -1; Eq => 0; Gt => 1 }
    }
    fun show(): str {
        "Ordering." + name()
    }
}`
const traitsChain = `trait Chain {
    fun base(): str
    fun wrap1(): str {
        "[" + base() + "]"
    }
    fun wrap2(): str {
        "{{" + wrap1() + "}}"
    }
}

type Tag: Chain = Tag(label: str) {
    fun base(): str {
        label
    }
}

val t = Tag("hi")
// t.wrap1() = "[hi]"
// t.wrap2() = "{{[hi]}}"`
const traitsCounter = `trait Counter {
    fun current(): i32
}

type CounterBox: Counter = CounterBox(count: i32) {
    fun current(): i32 { count }
    fun next(): CounterBox {
        CounterBox(count + 1)
    }
}

val c = CounterBox(0)
val three = c.next().next().next()
// three.current() = 3`
const traitsMutRef = `trait Counter {
    fun current(): i32
    fun &increment(): void
}

type CounterBox: Counter = CounterBox(count: i32) {
    fun current(): i32 { count }
    fun &increment(): void {
        this.count = this.count + 1
    }
}

val c = CounterBox(0)
c.increment()
c.increment()
// c.current() = 2`
const nullableBasic = `val a: i32? = null
val b: i32? = 42`
const nullableCoalesce = `val x: i32? = null
val y = x ?? 99

val chain = null ?? null ?? 7 ?? -1`
const nullableSafeAccess = `type Addr = Addr(city: str, zip: i32)
type User = User(name: str, addr: Addr?)

val user = User("Alice", Addr("Beijing", 100000))
val city = user?.addr?.city

val some: i32? = 42
val forced = some!`
const newtypeBasic = `type Celsius = Celsius(f64)
type Fahrenheit = Fahrenheit(f64)

val c = Celsius(100.0)
val f = Fahrenheit(100.0)`
const newtypeUnwrap = `fun toFahrenheit(c: Celsius): Fahrenheit {
    match c {
        Celsius(v) => Fahrenheit(v * 9.0 / 5.0 + 32.0)
    }
}`
const newtypeDomain = `type UserId = UserId(i64)
type Email = Email(str)

val uid = UserId(42i64)
val email = Email("test@example.com")`
const castingWidening = `val wide = 42i8 as i64
val u16v = 200u8 as u16`
const castingNarrowing = `val wrapped = 300i32 as i8
val negToU8 = (-1i32) as u8`
const castingIntFloat = `val f = 42i32 as f64
val i = 3.99f64 as i32`
const castingCharInt = `val code = 'A' as i32
val ch = 65i32 as char`
const castingIntStr = `val s = 42i32 as str
val b = true as str`
const operatorsArithmetic = `val a = 1 + 2 * 3
val b = (1 + 2) * 3
val c = 100 / 7
val d = 100 % 7`
const operatorsComparison = `val eq = 5 == 5
val lt = 3 < 7
val both = (5 > 3) && (2 < 8)
val either = (1 > 2) || (3 < 4)`
const operatorsBitwise = `val and = 0xFF & 0x0F
val or = 0xF0 | 0x0F
val xor = 0xFF ^ 0x0F
val not = ~0
val shifted = 1 << 4
val shifted_right = 256 >> 4`
const operatorsLiterals = `val hex = 0xFF
val bin = 0b1010
val oct = 0o777`
const errorHandlingSafeDiv = `fun safeDiv(a: i32, b: i32): Throw<i32, Error> {
    if b == 0 {
        throw Error("division by zero")
    }
    Ok(a / b)
}`
const errorHandlingPropagate = `fun step1(a: i32): Throw<i32, Error> {
    if a < 0 { throw Error("negative") }
    Ok(a + 1)
}

fun pipeline(a: i32): Throw<i32, Error> {
    val r1 = step1(a)?   // propagates error if step1 fails
    Ok(r1 * 2)
}`
const errorHandlingSubtypes = `type NotFound: Err = NotFound(msg: str)
type Timeout: Err = Timeout(msg: str)

fun lookup(id: i32): Throw<str, Error> {
    if id < 0 { throw NotFound("negative id") }
    if id == 0 { throw Timeout("timed out") }
    Ok("user-" + id as str)
}`
const errorHandlingMatch = `match lookup(-1) {
    Ok(name) => println("found: {name}")
    Error(NotFound(m)) => println("not found: {m}")
    Error(Timeout(m)) => println("timeout: {m}")
    Error(_) => println("other error")
}`
const errorHandlingCoalesce = `val result = safeDiv(10, 0) ?? -1
// result = -1 (safeDiv throws, ?? provides default)`
const asyncFetch = `async fun fetch(): Async<i32> {
    Timer(1).await()
    42
}`
const asyncChannels = `val ch = channel<i32>(2)

ch.send(10)
ch.send(20)

val first = ch.recv()   // 10
val second = ch.recv()  // 20`
const asyncChain = `async fun fetchValue(): Async<i32> {
    Timer(1).await()
    42
}

async fun process(): Async<i32> {
    val v = fetchValue().await()
    v + 100
}

val result = process().await()  // 142`
const asyncChannelsTypes = `val ch = channel<Point>(2)
ch.send(Point(1, 2))
ch.send(Point(3, 4))

val p1 = ch.recv()  // Point(1, 2)
val p2 = ch.recv()  // Point(3, 4)

// Nullable values through channels
val nch = channel<i32?>(2)
nch.send(10)
nch.send(null)
val v1 = nch.recv()  // 10
val v2 = nch.recv()  // null`
const deferBasic = `fun process(): void {
    defer println("cleanup")
    defer println("second cleanup")
    println("working")
}`
const deferCleanup = `fun readFile(path: str): str {
    val ch = open(path)
    defer ch.close()
    ch.read()
}`
const deferError = `fun riskyOp(): Throw<i32, Error> {
    defer println("cleanup always runs")
    if true { throw Error("fail") }
    Ok(1)
}
// "cleanup always runs" is printed even though throw occurs`
const deferRecurse = `fun recurse(n: i32): i32 {
    defer println("defer {n}")
    if n <= 0 { 0 } else { n + recurse(n - 1) }
}
// recurse(2) prints: defer 0, defer 1, defer 2`
const stringsInterpolation = `val name = "Kuzo"
val version = 1

println("Welcome to {name} v{version}")
println("sum = {1 + 2}")
println("point = {Point(3, 4)}")`
const stringsOperations = `val s = "hello"
val first = s[0]      // &#39;h&#39; (char)
val len = s.len()      // 5
val concat = "ab" + "cd"  // "abcd"
val mixed = "n=" + 42    // "n=42" (str + int)`
const stringsComparison = `val a = "apple" < "banana"  // true
val b = "abc" < "abcd"      // true (shorter prefix)`
const stringsEscapes = `val tab = "\\t"           // tab
val newline = "\\n"        // newline
val quote = "\\""          // embedded quote
val backslash = "\\\\"       // literal backslash
val unicode = "\\u{1F600}"  // emoji
val nul = "\\0"            // NUL character`
const stringsUnicode = `val emoji = "😀😁😂"
val len = emoji.len()    // 3 (one codepoint each)
val first = emoji[0]    // &#39;😀&#39;

val cjk = "你好"
val ch = cjk[0]         // &#39;你&#39;`
</script>

<template>
  <main>
    <!-- Tutorial Header -->
    <section class="kuzo-tutorial-header">
      <div class="kuzo-container">
        <h1 class="kuzo-tutorial-title">Getting Started</h1>
        <p class="kuzo-tutorial-subtitle">
          Learn Kuzo from scratch — from Hello World to async channels.
        </p>
      </div>
    </section>

    <!-- Tutorial Body -->
    <div class="kuzo-container">
      <!-- Mobile TOC -->
      <nav class="kuzo-toc-mobile no-scrollbar" aria-label="Table of contents">
        <a
          v-for="item in tocItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="kuzo-toc-chip"
          :class="{ active: activeSection === item.id }"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="kuzo-tutorial-grid">
        <!-- Desktop TOC Sidebar -->
        <aside class="kuzo-toc">
          <p class="kuzo-toc-heading">Contents</p>
          <nav class="kuzo-toc-list">
            <a
              v-for="item in tocItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="kuzo-toc-link"
              :class="{ active: activeSection === item.id }"
            >
              {{ item.label }}
            </a>
          </nav>
        </aside>

        <!-- Content -->
        <div class="kuzo-content">
          <!-- 1. Hello World -->
          <section id="hello-world" class="kuzo-tutorial-section">
            <h2>Hello World</h2>
            <p class="kuzo-prose">Every Kuzo program starts with a <code>main</code> function. Let's create your first program.</p>
            <p class="kuzo-prose kuzo-prose-muted">Running <code>kuzo init myapp</code> creates a new project with <code>src/Main.kz</code> as the entry point.</p>
            <CodeBlock label="bash" :code="helloWorldBash" />
            <CodeBlock label="src/Main.kz" :code="helloWorldMain" />
            <p class="kuzo-prose">The <code>fun</code> keyword declares a function. <code>main</code> is the entry point — it takes no arguments and returns <code>void</code>. <code>println</code> prints a line to stdout.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Run <code>kuzo run</code> to compile and execute in one step.</p>
            </div>
          </section>

          <!-- 2. Variables & Types -->
          <section id="variables" class="kuzo-tutorial-section">
            <h2>Variables &amp; Types</h2>
            <p class="kuzo-prose">Kuzo is statically typed. Use <code>val</code> for immutable bindings and <code>var</code> for mutable ones.</p>
            <CodeBlock :code="variablesBasic" />
            <p class="kuzo-prose">Type annotations are required on declarations. Once a <code>val</code> is assigned, it cannot be reassigned. <code>var</code> allows mutation.</p>
            <p class="kuzo-prose">Kuzo provides a rich set of primitive types:</p>
            <CodeBlock :code="variablesInts" />
            <CodeBlock :code="variablesFloats" />
            <p class="kuzo-prose">Integer types include <code>i8</code> through <code>i128</code> (signed) and <code>u8</code> through <code>u128</code> (unsigned). Float types include <code>f16</code>, <code>f32</code>, <code>f64</code>, and <code>f128</code>. The <code>char</code> type represents a single Unicode character.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Type suffixes like <code>42i64</code> or <code>3.14f64</code> specify the exact type of a literal.</p>
            </div>
            <h3>Integer Overflow</h3>
            <p class="kuzo-prose">Integer arithmetic uses wrapping semantics — overflow wraps around to the minimum or maximum value.</p>
            <CodeBlock :code="variablesOverflow" />
            <h3>Float Special Values</h3>
            <p class="kuzo-prose">Floats support <code>Inf</code>, <code>-Inf</code>, and <code>NaN</code> following IEEE 754:</p>
            <CodeBlock :code="variablesFloatSpecial" />
            <h3>Number Literals</h3>
            <CodeBlock :code="variablesNumberLiterals" />
          </section>

          <!-- 3. Functions -->
          <section id="functions" class="kuzo-tutorial-section">
            <h2>Functions</h2>
            <p class="kuzo-prose">Functions are declared with <code>fun</code>. The last expression is the return value — no <code>return</code> keyword needed.</p>
            <CodeBlock :code="functionsBasic" />
            <p class="kuzo-prose"><code>add</code> returns the result of <code>a + b</code> without an explicit <code>return</code> keyword. Functions returning <code>void</code> use <code>println</code> or other side effects. This is called expression-based returns.</p>
            <CodeBlock label="Calling functions" :code="functionsCall" />
            <p class="kuzo-prose">Functions can be recursive:</p>
            <CodeBlock :code="functionsRecursive" />
          </section>

          <!-- 4. Control Flow -->
          <section id="control-flow" class="kuzo-tutorial-section">
            <h2>Control Flow</h2>
            <p class="kuzo-prose">Kuzo supports <code>if</code>/<code>else</code> conditionals and <code>match</code> expressions. Both are expressions — they return values.</p>
            <CodeBlock label="if / else" :code="controlFlowIfElse" />
            <p class="kuzo-prose"><code>if</code> is an expression. You can assign its result directly:</p>
            <CodeBlock :code="controlFlowAssign" />
            <p class="kuzo-prose">Block expressions evaluate to their last expression:</p>
            <CodeBlock :code="controlFlowBlock" />
            <p class="kuzo-prose">A block expression <code>{ ... }</code> evaluates every statement and returns the value of the last expression. This is useful for scoping intermediate variables.</p>
            <CodeBlock label="match" :code="controlFlowMatch" />
            <p class="kuzo-prose"><code>match</code> selects the first matching arm. <code>_</code> is a wildcard that matches anything.</p>
          </section>

          <!-- 5. Loops -->
          <section id="loops" class="kuzo-tutorial-section">
            <h2>Loops</h2>
            <p class="kuzo-prose">Kuzo provides <code>while</code> loops with <code>break</code> and <code>continue</code>, plus <code>for-in</code> iteration.</p>
            <CodeBlock label="while" :code="loopsWhile" />
            <p class="kuzo-prose"><code>while</code> repeats as long as the condition is true. Use <code>break</code> to exit early and <code>continue</code> to skip to the next iteration.</p>
            <CodeBlock :code="loopsBreak" />
            <CodeBlock label="for-in" :code="loopsForIn" />
            <p class="kuzo-prose"><code>for x in arr.iter()</code> iterates over array elements. Loops can be nested arbitrarily.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text"><code>break</code> only exits the innermost loop — outer loops continue normally.</p>
            </div>
          </section>

          <!-- 6. Arrays -->
          <section id="arrays" class="kuzo-tutorial-section">
            <h2>Arrays</h2>
            <p class="kuzo-prose">Arrays hold ordered sequences of values. Create them with square brackets.</p>
            <CodeBlock :code="arraysBasic" />
            <p class="kuzo-prose">Access elements by index (0-based). <code>.len()</code> returns the array length.</p>
            <p class="kuzo-prose">Concatenate arrays with <code>++</code>:</p>
            <CodeBlock :code="arraysConcat" />
            <p class="kuzo-prose"><code>++</code> creates a new array — the originals are unchanged. This is a deep copy, not a mutation.</p>
            <CodeBlock :code="arraysNested" />
            <p class="kuzo-prose">Arrays can hold any type, including strings, records, and other arrays.</p>
            <CodeBlock :code="arraysEmpty" />
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Use explicit type annotations (<code>i32[]</code>) for empty arrays since the compiler can't infer the element type.</p>
            </div>
          </section>

          <!-- 7. Lambda & Nested Functions -->
          <section id="closures" class="kuzo-tutorial-section">
            <h2>Lambda &amp; Nested Functions</h2>
            <p class="kuzo-prose">A lambda is an anonymous function value written with <code>fun(params): ReturnType &#123; body &#125;</code>. The return type is required — the compiler does not infer it.</p>
            <CodeBlock :code="closuresBasic" />
            <p class="kuzo-prose">Lambdas capture outer variables. A <code>var</code> binding is captured by reference — the lambda sees and can modify the latest value:</p>
            <CodeBlock :code="closuresMutation" />
            <p class="kuzo-prose">After three calls, <code>count</code> is 3. Changes inside the lambda are visible outside.</p>
            <p class="kuzo-prose">Lambdas can escape their defining scope and maintain state:</p>
            <CodeBlock :code="closuresMakeCounter" />
            <p class="kuzo-prose">Each call to <code>makeCounter</code> creates an independent counter. The function type <code>() -&gt; i32</code> describes a function that takes no arguments and returns an <code>i32</code>.</p>
            <p class="kuzo-prose">Lambdas are first-class values — pass them as arguments and return them:</p>
            <CodeBlock :code="closuresHigherOrder" />
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Function types use the arrow syntax: <code>(A, B) -&gt; C</code> for a function taking <code>A</code> and <code>B</code>, returning <code>C</code>.</p>
            </div>
            <p class="kuzo-prose">Lambdas can take parameters and capture multiple variables:</p>
            <CodeBlock :code="closuresParams" />
            <p class="kuzo-prose">Lambdas are first-class — store them in arrays and iterate:</p>
            <CodeBlock :code="closuresStore" />
            <p class="kuzo-prose">Lambdas can return other lambdas, enabling factory patterns:</p>
            <CodeBlock :code="closuresFactory" />
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Note</p>
              <p class="kuzo-callout-text">A lambda that captures outer variables is sometimes called a "closure" — but in Kuzo there is only one concept: the lambda. A nested function (<code>fun name(params): T &#123; &#125;</code>) is just a lambda bound to a name.</p>
            </div>
          </section>

          <!-- 8. Generics -->
          <section id="generics" class="kuzo-tutorial-section">
            <h2>Generics</h2>
            <p class="kuzo-prose">Generics let you write functions that work with any type.</p>
            <CodeBlock :code="genericsIdentity" />
            <p class="kuzo-prose">The type parameter <code>T</code> can be any type. The compiler ensures type safety at each call site.</p>
            <CodeBlock :code="genericsDoubleCast" />
            <p class="kuzo-prose">Generics support multiple type parameters and generic types:</p>
            <CodeBlock :code="genericsMultiple" />
            <p class="kuzo-prose">Generic functions can call other generic functions, and the compiler monomorphizes each instantiation for full type safety.</p>
          </section>

          <!-- 9. Custom Types -->
          <section id="custom-types" class="kuzo-tutorial-section">
            <h2>Custom Types</h2>
            <p class="kuzo-prose">Kuzo has two ways to define custom types: algebraic data types (ADTs) for tagged unions, and records for grouped fields.</p>
            <h3>Algebraic Data Types</h3>
            <CodeBlock :code="customTypesAdt" />
            <p class="kuzo-prose">An ADT lists its variants after <code>|</code>. Pattern matching destructures each variant.</p>
            <h3>Records</h3>
            <CodeBlock :code="customTypesRecord" />
            <p class="kuzo-prose">Records group named fields. Construct by calling the type name with field values in order.</p>
            <p class="kuzo-prose">Records support nullable fields, array fields, and mutation with <code>var</code>:</p>
            <CodeBlock :code="customTypesRecordNullable" />
            <CodeBlock :code="customTypesRecordMut" />
            <p class="kuzo-prose">Records can be destructured in <code>match</code> with guards:</p>
            <CodeBlock :code="customTypesDestructure" />
            <h3>Recursive Types</h3>
            <CodeBlock :code="customTypesRecursive" />
            <p class="kuzo-prose">ADTs can be recursive — a <code>Tree</code> variant can contain other <code>Tree</code> values. This is ideal for linked structures like trees and linked lists.</p>
          </section>

          <!-- 10. Pattern Matching -->
          <section id="patterns" class="kuzo-tutorial-section">
            <h2>Pattern Matching</h2>
            <p class="kuzo-prose">Pattern matching goes beyond simple value comparison. Kuzo supports or-patterns, guards, nested destructuring, and literal matching.</p>
            <h3>Or-Patterns</h3>
            <CodeBlock :code="patternsOrPatterns" />
            <p class="kuzo-prose">Use <code>|</code> to match multiple patterns in a single arm.</p>
            <h3>Guards</h3>
            <CodeBlock :code="patternsGuards" />
            <p class="kuzo-prose">Guards add a boolean condition with <code>if</code>. The arm only matches if the guard is true.</p>
            <h3>Nested Destructuring</h3>
            <CodeBlock :code="patternsNested" />
            <p class="kuzo-prose">Patterns can nest arbitrarily deep, destructuring records inside records.</p>
            <h3>Literal Patterns</h3>
            <CodeBlock :code="patternsLiteral" />
            <p class="kuzo-prose">Match on string and char literals. Combine with or-patterns for multi-value matching.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Wildcards (<code>_</code>) ignore parts of a structure. Use <code>Node(v, _, _)</code> to extract only the value from a tree node.</p>
            </div>
          </section>

          <!-- 11. Traits -->
          <section id="traits" class="kuzo-tutorial-section">
            <h2>Traits</h2>
            <p class="kuzo-prose">Traits define shared behavior. Types implement traits to provide methods. A trait declares method signatures; types provide implementations.</p>
            <CodeBlock :code="traitsShow" />
            <p class="kuzo-prose">The <code>trait</code> keyword declares a trait. A type implements it by listing the trait name after <code>:</code> and providing method bodies inside <code>{ }</code>. The receiver is implicit — use <code>this</code> inside the method body to refer to the instance.</p>
            <p class="kuzo-prose">Types can implement multiple traits:</p>
            <CodeBlock :code="traitsMultiple" />
            <p class="kuzo-prose">List multiple traits in parentheses: <code>(Greet, Sizeable, Show)</code>. The <code>hello</code> method has a default implementation — types only need to implement <code>name</code>, and <code>hello</code> works automatically.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Default methods can call other trait methods. <code>hello</code> calls <code>name()</code>, which each type implements differently.</p>
            </div>
            <p class="kuzo-prose">Default methods can chain — one default calls another, creating multi-layer behavior:</p>
            <CodeBlock :code="traitsChain" />
            <p class="kuzo-prose">Trait methods can take extra parameters beyond the implicit receiver, and can return new instances for chaining:</p>
            <CodeBlock :code="traitsCounter" />
            <p class="kuzo-prose">Use <code>&amp;</code> before the method name to take the receiver by reference — the method can mutate the instance:</p>
            <CodeBlock :code="traitsMutRef" />
            <p class="kuzo-prose">Without <code>&amp;</code>, the method receives the instance by value (read-only). With <code>&amp;</code>, mutations like <code>this.count = ...</code> persist. Use <code>this</code> when you need to explicitly reference the receiver, e.g. for assignment.</p>
          </section>

          <!-- 12. Nullable Types -->
          <section id="nullable" class="kuzo-tutorial-section">
            <h2>Nullable Types</h2>
            <p class="kuzo-prose">Kuzo has explicit nullable types. Append <code>?</code> to any type to make it nullable — it can hold <code>null</code> or a value of the base type.</p>
            <CodeBlock :code="nullableBasic" />
            <p class="kuzo-prose">Use <code>??</code> (coalescing) to provide a default for null values:</p>
            <CodeBlock :code="nullableCoalesce" />
            <p class="kuzo-prose"><code>??</code> returns the first non-null value. Chain multiple <code>??</code> for fallback sequences.</p>
            <p class="kuzo-prose">Use <code>!</code> to assert non-null (panics if null) and <code>?.</code> for safe field access:</p>
            <CodeBlock :code="nullableSafeAccess" />
            <p class="kuzo-prose"><code>?.</code> short-circuits to <code>null</code> if any link in the chain is null. <code>!</code> unwraps a non-null value — use it when you're certain the value exists.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Prefer <code>??</code> for safe defaults. Use <code>!</code> sparingly — it's an assertion that crashes if the value is null.</p>
            </div>
          </section>

          <!-- 13. Newtype -->
          <section id="newtype" class="kuzo-tutorial-section">
            <h2>Newtype</h2>
            <p class="kuzo-prose">Newtype creates a type-safe wrapper around an existing type. Even if two newtypes share the same underlying type, they are not interchangeable.</p>
            <CodeBlock :code="newtypeBasic" />
            <p class="kuzo-prose">You can't accidentally pass <code>Celsius</code> where <code>Fahrenheit</code> is expected — the compiler enforces type safety even though both wrap <code>f64</code>.</p>
            <p class="kuzo-prose">Unwrap newtype values with pattern matching:</p>
            <CodeBlock :code="newtypeUnwrap" />
            <p class="kuzo-prose">Newtypes are great for domain modeling — <code>UserId</code>, <code>Email</code>, <code>Meters</code> — without the overhead of a full record.</p>
            <CodeBlock :code="newtypeDomain" />
          </section>

          <!-- 14. Type Casting -->
          <section id="casting" class="kuzo-tutorial-section">
            <h2>Type Casting</h2>
            <p class="kuzo-prose">Use <code>value as Type</code> to convert between types. Kuzo supports widening, narrowing, and cross-category conversions.</p>
            <CodeBlock label="Widening" :code="castingWidening" />
            <CodeBlock label="Narrowing with wrapping" :code="castingNarrowing" />
            <p class="kuzo-prose">Narrowing casts wrap around — <code>300i32</code> to <code>i8</code> gives <code>44</code> (300 mod 256 - 256).</p>
            <CodeBlock label="Int &harr; Float" :code="castingIntFloat" />
            <p class="kuzo-prose">Float-to-int truncates (3.99 becomes 3). Int-to-float is exact for representable values.</p>
            <CodeBlock label="Char &harr; Int" :code="castingCharInt" />
            <CodeBlock label="Int &rarr; Str" :code="castingIntStr" />
            <p class="kuzo-prose">Cast to <code>str</code> converts any primitive to its string representation. <code>true as str</code> returns <code>"true"</code>.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Chain casts for complex conversions: <code>65i32 as i64 as i8</code>.</p>
            </div>
          </section>

          <!-- 15. Operators -->
          <section id="operators" class="kuzo-tutorial-section">
            <h2>Operators</h2>
            <p class="kuzo-prose">Kuzo supports standard arithmetic, comparison, logical, and bitwise operators.</p>
            <h3>Arithmetic</h3>
            <CodeBlock :code="operatorsArithmetic" />
            <p class="kuzo-prose">Operator precedence follows standard math rules: <code>*</code> and <code>/</code> before <code>+</code> and <code>-</code>. Integer division truncates toward zero.</p>
            <h3>Comparison &amp; Logical</h3>
            <CodeBlock :code="operatorsComparison" />
            <h3>Bitwise</h3>
            <CodeBlock :code="operatorsBitwise" />
            <p class="kuzo-prose">Bitwise operators work on integer types. Hex (<code>0xFF</code>), binary (<code>0b1010</code>), and octal (<code>0o777</code>) literals are supported.</p>
            <CodeBlock :code="operatorsLiterals" />
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Bitwise <code>&amp;</code> has higher precedence than <code>|</code>, matching C convention. Use parentheses for clarity.</p>
            </div>
          </section>

          <!-- 16. Error Handling -->
          <section id="error-handling" class="kuzo-tutorial-section">
            <h2>Error Handling</h2>
            <p class="kuzo-prose">Kuzo uses <code>Throw&lt;T, E&gt;</code> types for explicit error handling.</p>
            <CodeBlock :code="errorHandlingSafeDiv" />
            <p class="kuzo-prose">The return type <code>Throw&lt;i32, Error&gt;</code> tells callers that this function either succeeds with an <code>i32</code> or fails with an <code>Error</code>.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Unlike exceptions in other languages, Kuzo errors are visible in the function signature. You always know what can go wrong.</p>
            </div>
            <p class="kuzo-prose">Use <code>?</code> to propagate errors — if the expression fails, the function returns immediately with the error:</p>
            <CodeBlock :code="errorHandlingPropagate" />
            <p class="kuzo-prose">Define error subtypes with <code>: Err</code> for granular error matching:</p>
            <CodeBlock :code="errorHandlingSubtypes" />
            <p class="kuzo-prose">Match on different error subtypes in multiple arms:</p>
            <CodeBlock :code="errorHandlingMatch" />
            <p class="kuzo-prose">Use <code>??</code> to provide defaults for <code>Throw</code> values, just like nullable types:</p>
            <CodeBlock :code="errorHandlingCoalesce" />
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text"><code>throw</code> can throw any type — not just <code>Error</code>. Use <code>throw 42</code> or <code>throw "message"</code> for lightweight error signaling.</p>
            </div>
          </section>

          <!-- 17. Async & Channels -->
          <section id="async" class="kuzo-tutorial-section">
            <h2>Async &amp; Channels</h2>
            <p class="kuzo-prose">Kuzo has built-in async/await support and typed channels for concurrent programming.</p>
            <CodeBlock label="Async functions" :code="asyncFetch" />
            <p class="kuzo-prose">The <code>async</code> keyword marks a function as asynchronous. <code>await()</code> suspends execution until the operation completes. <code>Async&lt;T&gt;</code> is the return type for async functions.</p>
            <CodeBlock label="Channels" :code="asyncChannels" />
            <p class="kuzo-prose">Channels are typed communication pipes between concurrent tasks. <code>channel&lt;i32&gt;(2)</code> creates a buffered channel that holds up to 2 integers. <code>send</code> writes a value, <code>recv</code> reads one.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Channels make concurrent code safe — no shared mutable state, just message passing.</p>
            </div>
            <p class="kuzo-prose">Async functions can chain — one async function can <code>await</code> another:</p>
            <CodeBlock :code="asyncChain" />
            <p class="kuzo-prose">Channels work with any type — records, ADTs, nullable values, and more:</p>
            <CodeBlock :code="asyncChannelsTypes" />
          </section>

          <!-- 18. Defer -->
          <section id="defer" class="kuzo-tutorial-section">
            <h2>Defer</h2>
            <p class="kuzo-prose"><code>defer</code> schedules a statement to run when the function exits, regardless of how it exits. Deferred statements run in LIFO (last-in, first-out) order.</p>
            <CodeBlock :code="deferBasic" />
            <p class="kuzo-prose">When <code>process</code> is called, it prints: <code>working</code>, then <code>second cleanup</code>, then <code>cleanup</code>. The last deferred statement runs first.</p>
            <p class="kuzo-prose">Defer is useful for resource cleanup:</p>
            <CodeBlock :code="deferCleanup" />
            <p class="kuzo-prose">No matter how <code>readFile</code> exits — normal return, early return, or error — the channel is always closed.</p>
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Deferred statements capture variable values at the time of execution, not at the time of <code>defer</code>. If a variable changes after <code>defer</code>, the deferred statement sees the new value.</p>
            </div>
            <p class="kuzo-prose">Defer runs even when a function exits via <code>throw</code> — making it ideal for cleanup in error paths:</p>
            <CodeBlock :code="deferError" />
            <p class="kuzo-prose">In recursive functions, each call's defers execute in LIFO order as the stack unwinds:</p>
            <CodeBlock :code="deferRecurse" />
          </section>

          <!-- 19. Strings -->
          <section id="strings" class="kuzo-tutorial-section">
            <h2>Strings</h2>
            <p class="kuzo-prose">Kuzo supports string interpolation with <code>{}</code> syntax. Any expression can be embedded inside a string.</p>
            <CodeBlock :code="stringsInterpolation" />
            <p class="kuzo-prose">Place expressions inside <code>{}</code> within a string literal. Kuzo evaluates them at runtime and converts the result to a string.</p>
            <h3>String Operations</h3>
            <p class="kuzo-prose">Strings support indexing, length, concatenation, and comparison:</p>
            <CodeBlock :code="stringsOperations" />
            <p class="kuzo-prose">String comparison is lexicographic and Unicode-aware:</p>
            <CodeBlock :code="stringsComparison" />
            <h3>Escape Sequences</h3>
            <CodeBlock :code="stringsEscapes" />
            <h3>Unicode Support</h3>
            <p class="kuzo-prose">Strings are Unicode-aware. Indexing returns a <code>char</code> by codepoint:</p>
            <CodeBlock :code="stringsUnicode" />
            <div class="kuzo-callout">
              <p class="kuzo-callout-label">Tip</p>
              <p class="kuzo-callout-text">Nullable strings work with <code>??</code>: <code>(nullableStr ?? "default")</code> provides a fallback for <code>null</code>.</p>
            </div>
          </section>

          <!-- 20. Next Steps -->
          <section id="next-steps" class="kuzo-tutorial-section">
            <h2>Next Steps</h2>
            <p class="kuzo-prose">You now know the basics of Kuzo. Here's what to explore next:</p>
            <ol class="kuzo-next-list">
              <li>Read the full Language Tour for advanced features</li>
              <li>Try the CLI commands — <code>kuzo debug</code> shows compilation stages</li>
              <li>Build a real project with <code>kuzo init</code> and experiment</li>
              <li>Explore generics and ADTs in depth</li>
            </ol>
            <p class="kuzo-next-closing">Happy coding with Kuzo.</p>
          </section>
        </div><!-- /.kuzo-content -->
      </div><!-- /.kuzo-tutorial-grid -->
    </div><!-- /.kuzo-container -->
  </main>
</template>
