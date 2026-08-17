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
  { id: 'modules', label: '20. Modules & Imports' },
  { id: 'next-steps', label: '21. Next Steps' },
]

const activeSection = ref('hello-world')
let observer: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  const sections = document.querySelectorAll('.frond-tutorial-section')
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
const helloWorldBash = `frond init myapp
cd myapp
frond run`
const helloWorldMain = `fun main(): void {
    println("Hello, Frond!")
}`
const variablesBasic = `val name: str = "Frond"
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
const variablesNumberLiterals = `val hex = 0xFF           // 255
val bin = 0b1010         // 10
val oct = 0o777          // 511
val grouped = 1_000_000  // underscores group digits`
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
const loopsRange = `var sum: i64 = 0
for i in 0..5 { sum = sum + i }       // 0+1+2+3+4 = 10

var total: i64 = 0
for i in 1..=10 { total = total + i }  // inclusive: 1..10 = 55`
const loopsInfinite = `var attempts: i32 = 0
loop {
    attempts = attempts + 1
    if attempts >= 3 { break }
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
const arraysFill = `// [value, ..count] creates count copies of value
val buf: u8[] = [0, ..32]   // 32 zeroes — a fresh 32-byte buffer
val ones: i32[] = [1, ..3]  // [1, 1, 1]`
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
        'a' | 'e' | 'i' | 'o' | 'u' => true
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
const traitsOverride = `trait Greeter {
    fun greet(): str {
        "hello"
    }
}

type Loud: Greeter = Loud(name: str) {
    override fun greet(): str {
        super.greet() + " " + name
    }
}

val l = Loud("frond")
// l.greet() = "hello frond"`
const traitsSuperLayer = `trait Multi {
    fun one(): str { "one" }
    fun two(): str { "two" }
}

type Impl: Multi = | Impl {
    override fun one(): str { super.two() + "+one" }
    override fun two(): str { "TWO" }
}

// Impl.one() = "two+one"  (super skips the override)
// Impl.two() = "TWO"      (normal dispatch hits the override)`
const traitsDelegate = `trait A {
    fun m(): str { "A.m" }
}
trait B {
    fun m(): str { "B.m" }
}

// Bind the slot to A's default — no body needed
type PickA: (A, B) = | PickA {
    fun m(): str = A.m
}

// Or override both with your own implementation
type OwnM: (A, B) = | OwnM {
    override fun m(): str { "own" }
}`
const traitsBindAndBody = `type PickB: (A, B) = | PickB {
    override fun m(): str = B.m {
        super.m() + "!"
    }
}

// PickB.m() = "B.m!"`
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
const errorHandlingSubtypes = `type NotFound: Err = NotFound(message: str)
type Timeout: Err = Timeout(message: str)

fun lookup(id: i32): Throw<str, Error> {
    if id < 0 { throw NotFound("negative id") }
    if id == 0 { throw Timeout("timed out") }
    Ok("user-" + id as str)
}`
const errorHandlingMatch = `match lookup(-1) {
    Ok(name) => println("found: {name}")
    Error(e) => println("failed: {e.message}")  // "failed: negative id"
}`
const errorHandlingCoalesce = `val result = safeDiv(10, 0) ?? -1
// result = -1 (safeDiv throws, ?? provides default)`
const asyncFetch = `async fun fetch(): Async<i32> {
    Timer(50_000_000).await()  // suspend for 50ms (nanoseconds)
    42
}`
const asyncChannels = `val ch = channel<i32>(2)

ch.send(10)
ch.send(20)

val first = ch.recv()   // 10
val second = ch.recv()  // 20`
const asyncChain = `async fun fetchValue(): Async<i32> {
    Timer(50_000_000).await()  // 50ms
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
const deferCleanup = `import std.io.Buffered
import std.io.File
import std.io.Path

fun readFile(path: Path): Async<Throw<str, IOError>> {
    val f = File.open(path, File.read_only()).await()?
    defer f.close().await()
    val reader = Buffered.new_reader(f)
    reader.read_to_string().await()?
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
const stringsInterpolation = `val name = "Frond"
val version = 1

println("Welcome to {name} v{version}")
println("sum = {1 + 2}")
println("point = {Point(3, 4)}")`
const stringsOperations = `val s = "hello"
val first = s[0]      // 'h' (char)
val len = s.len()      // 5 (Unicode chars)
val raw = s.bytes()    // u8[] — the raw UTF-8 bytes
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
val first = emoji[0]    // '😀'

val cjk = "你好"
val ch = cjk[0]         // '你'`
const stringsHelpers = `import std.core.types

val parts = Str.split("a,b,c", ",")         // ["a", "b", "c"]
val clean = Str.trim("  hi  ")              // "hi"
val hit = Str.contains("hello", "ell")      // true
val at = Str.index_of("hello", "ell")       // 1 (byte offset)
val loud = Str.to_upper_ascii("abc!")       // "ABC!"
val dashed = Str.replace("a,b", ",", "-")   // "a-b"`
const stringsParse = `import std.core.types

val n = I32.parse("42")        // 42 — null when the text is malformed
val x = F64.parse("3.5")       // 3.5
val flag = Bool.parse("true")  // true

val max = I32.MAX              // 2147483647
val min = I32.MIN              // -2147483648`
const modulesBasic = `import std.os.Env

fun main(): void {
    match Env.set("GREETING", "hello") {
        Ok(_) => println("set ok"),
        Error(e) => println("set failed: {e.message}"),
    }
    println(Env.get("GREETING"))  // "hello" ("" when the key is not set)
}`
const modulesIo = `import std.io.Fs
import std.io.Path

fun main(): void {
    val path = Path.from("data").join_str("notes.txt")
    match Fs.read_file(path).await() {
        Ok(text) => println(text),
        Error(e) => println("read failed: {e.message}"),
    }
}`
const modulesRand = `import std.rand.Rand

Rand.seed(42)                  // same seed → same sequence
val dice = Rand.range(1, 6)    // integer in [1, 6], both ends inclusive
val coin = Rand.next_f64()     // float in [0, 1)`
const modulesSelective = `import std.io.File.{remove as delete_file}

// delete_file(Path.from("old.txt")) now calls File.remove`
const visibilityModule = `// src/Counter.frond — a module of your own
type Counter = Counter(count: i32) {
    pub fun current(): i32 { count }
    pub fun &increment(): void { count = count + 1 }
}

// Factory: the module constructs the private-field type for callers
pub fun from(start: i32): Counter { Counter(start) }`
const visibilityClient = `// src/Main.frond
import Counter

fun main(): void {
    val c = Counter.from(10)
    c.increment()
    println(c.current())   // 11

    // val x = Counter(5)  // error: constructor has private fields
    // val n = c.count     // error: field 'Counter.count' is private
}`
</script>

<template>
  <main>
    <!-- Tutorial Header -->
    <section class="frond-tutorial-header">
      <div class="frond-container">
        <h1 class="frond-tutorial-title">Getting Started</h1>
        <p class="frond-tutorial-subtitle">
          Learn Frond from scratch — from Hello World to modules, async, and channels.
        </p>
      </div>
    </section>

    <!-- Tutorial Body -->
    <div class="frond-container">
      <!-- Mobile TOC -->
      <nav class="frond-toc-mobile no-scrollbar" aria-label="Table of contents">
        <a
          v-for="item in tocItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="frond-toc-chip"
          :class="{ active: activeSection === item.id }"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="frond-tutorial-grid">
        <!-- Desktop TOC Sidebar -->
        <aside class="frond-toc">
          <p class="frond-toc-heading">Contents</p>
          <nav class="frond-toc-list">
            <a
              v-for="item in tocItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="frond-toc-link"
              :class="{ active: activeSection === item.id }"
            >
              {{ item.label }}
            </a>
          </nav>
        </aside>

        <!-- Content -->
        <div class="frond-content">
          <!-- 1. Hello World -->
          <section id="hello-world" class="frond-tutorial-section">
            <h2>Hello World</h2>
            <p class="frond-prose">Every Frond program starts with a <code>main</code> function. Let's create your first program.</p>
            <p class="frond-prose frond-prose-muted">Running <code>frond init myapp</code> creates a new project with <code>src/Main.frond</code> as the entry point.</p>
            <CodeBlock label="bash" :code="helloWorldBash" />
            <CodeBlock label="src/Main.frond" :code="helloWorldMain" />
            <p class="frond-prose">The <code>fun</code> keyword declares a function. <code>main</code> is the entry point — it takes no arguments and returns <code>void</code>. <code>println</code> prints a line to stdout.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Run <code>frond run</code> to compile and execute in one step.</p>
            </div>
          </section>

          <!-- 2. Variables & Types -->
          <section id="variables" class="frond-tutorial-section">
            <h2>Variables &amp; Types</h2>
            <p class="frond-prose">Frond is statically typed. Use <code>val</code> for immutable bindings and <code>var</code> for mutable ones.</p>
            <CodeBlock :code="variablesBasic" />
            <p class="frond-prose">Type annotations are required on declarations. Once a <code>val</code> is assigned, it cannot be reassigned. <code>var</code> allows mutation.</p>
            <p class="frond-prose">Frond provides a rich set of primitive types:</p>
            <CodeBlock :code="variablesInts" />
            <CodeBlock :code="variablesFloats" />
            <p class="frond-prose">Integer types include <code>i8</code> through <code>i128</code> (signed) and <code>u8</code> through <code>u128</code> (unsigned). Float types include <code>f16</code>, <code>f32</code>, <code>f64</code>, and <code>f128</code>. The <code>char</code> type represents a single Unicode character.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Type suffixes like <code>42i64</code> or <code>3.14f64</code> specify the exact type of a literal.</p>
            </div>
            <h3>Integer Overflow</h3>
            <p class="frond-prose">Integer arithmetic uses wrapping semantics — overflow wraps around to the minimum or maximum value.</p>
            <CodeBlock :code="variablesOverflow" />
            <h3>Float Special Values</h3>
            <p class="frond-prose">Floats support <code>Inf</code>, <code>-Inf</code>, and <code>NaN</code> following IEEE 754:</p>
            <CodeBlock :code="variablesFloatSpecial" />
            <h3>Number Literals</h3>
            <CodeBlock :code="variablesNumberLiterals" />
          </section>

          <!-- 3. Functions -->
          <section id="functions" class="frond-tutorial-section">
            <h2>Functions</h2>
            <p class="frond-prose">Functions are declared with <code>fun</code>. The last expression is the return value — no <code>return</code> keyword needed.</p>
            <CodeBlock :code="functionsBasic" />
            <p class="frond-prose"><code>add</code> returns the result of <code>a + b</code> without an explicit <code>return</code> keyword. Functions returning <code>void</code> use <code>println</code> or other side effects. This is called expression-based returns.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Rule</p>
              <p class="frond-callout-text">Every function must declare its return type explicitly — <code>fun add(a: i32, b: i32): i32</code> — including recursive functions. Use <code>: void</code> when a function returns nothing.</p>
            </div>
            <CodeBlock label="Calling functions" :code="functionsCall" />
            <p class="frond-prose">Functions can be recursive:</p>
            <CodeBlock :code="functionsRecursive" />
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">Recursive functions must be declared at the top level — a function nested inside another function cannot call itself by name.</p>
            </div>
          </section>

          <!-- 4. Control Flow -->
          <section id="control-flow" class="frond-tutorial-section">
            <h2>Control Flow</h2>
            <p class="frond-prose">Frond supports <code>if</code>/<code>else</code> conditionals and <code>match</code> expressions. Both are expressions — they return values.</p>
            <CodeBlock label="if / else" :code="controlFlowIfElse" />
            <p class="frond-prose"><code>if</code> is an expression. You can assign its result directly:</p>
            <CodeBlock :code="controlFlowAssign" />
            <p class="frond-prose">Block expressions evaluate to their last expression:</p>
            <CodeBlock :code="controlFlowBlock" />
            <p class="frond-prose">A block expression <code>{ ... }</code> evaluates every statement and returns the value of the last expression. This is useful for scoping intermediate variables.</p>
            <CodeBlock label="match" :code="controlFlowMatch" />
            <p class="frond-prose"><code>match</code> selects the first matching arm. <code>_</code> is a wildcard that matches anything.</p>
          </section>

          <!-- 5. Loops -->
          <section id="loops" class="frond-tutorial-section">
            <h2>Loops</h2>
            <p class="frond-prose">Frond provides <code>while</code> loops with <code>break</code> and <code>continue</code>, plus <code>for-in</code> iteration, ranges, and unconditional <code>loop</code>.</p>
            <CodeBlock label="while" :code="loopsWhile" />
            <p class="frond-prose"><code>while</code> repeats as long as the condition is true. Use <code>break</code> to exit early and <code>continue</code> to skip to the next iteration.</p>
            <CodeBlock :code="loopsBreak" />
            <CodeBlock label="for-in" :code="loopsForIn" />
            <p class="frond-prose"><code>for x in arr.iter()</code> iterates over array elements. Loops can be nested arbitrarily.</p>
            <CodeBlock label="Ranges" :code="loopsRange" />
            <p class="frond-prose">Ranges work with any integer type. <code>a..b</code> excludes the upper bound; <code>a..=b</code> includes it. The loop variable is an <code>i64</code>.</p>
            <CodeBlock label="loop" :code="loopsInfinite" />
            <p class="frond-prose"><code>loop</code> repeats its body forever — exit with <code>break</code> or <code>return</code>.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text"><code>break</code> only exits the innermost loop — outer loops continue normally.</p>
            </div>
          </section>

          <!-- 6. Arrays -->
          <section id="arrays" class="frond-tutorial-section">
            <h2>Arrays</h2>
            <p class="frond-prose">Arrays hold ordered sequences of values. Create them with square brackets.</p>
            <CodeBlock :code="arraysBasic" />
            <p class="frond-prose">Access elements by index (0-based). <code>.len()</code> returns the array length.</p>
            <p class="frond-prose">Concatenate arrays with <code>++</code>:</p>
            <CodeBlock :code="arraysConcat" />
            <p class="frond-prose"><code>++</code> creates a new array — the originals are unchanged. This is a deep copy, not a mutation.</p>
            <CodeBlock :code="arraysNested" />
            <p class="frond-prose">Arrays can hold any type, including strings, records, and other arrays.</p>
            <CodeBlock :code="arraysEmpty" />
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Use explicit type annotations (<code>i32[]</code>) for empty arrays since the compiler can't infer the element type.</p>
            </div>
            <h3>Fill Syntax</h3>
            <CodeBlock :code="arraysFill" />
            <p class="frond-prose">The fill form <code>[value, ..count]</code> allocates a new array of <code>count</code> copies — the idiomatic way to preallocate buffers.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">Arithmetic operators do not broadcast to arrays — <code>[1, 2] + [3, 4]</code> is a compile error. Use a loop for element-wise math; <code>++</code> only concatenates.</p>
            </div>
          </section>

          <!-- 7. Lambda & Nested Functions -->
          <section id="closures" class="frond-tutorial-section">
            <h2>Lambda &amp; Nested Functions</h2>
            <p class="frond-prose">A lambda is an anonymous function value written with <code>fun(params): ReturnType &#123; body &#125;</code>. The return type is required — the compiler does not infer it.</p>
            <CodeBlock :code="closuresBasic" />
            <p class="frond-prose">Lambdas capture outer variables. A <code>var</code> binding is captured by reference — the lambda sees and can modify the latest value:</p>
            <CodeBlock :code="closuresMutation" />
            <p class="frond-prose">After three calls, <code>count</code> is 3. Changes inside the lambda are visible outside.</p>
            <p class="frond-prose">Lambdas can escape their defining scope and maintain state:</p>
            <CodeBlock :code="closuresMakeCounter" />
            <p class="frond-prose">Each call to <code>makeCounter</code> creates an independent counter. The function type <code>() -&gt; i32</code> describes a function that takes no arguments and returns an <code>i32</code>.</p>
            <p class="frond-prose">Lambdas are first-class values — pass them as arguments and return them:</p>
            <CodeBlock :code="closuresHigherOrder" />
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Function types use the arrow syntax: <code>(A, B) -&gt; C</code> for a function taking <code>A</code> and <code>B</code>, returning <code>C</code>.</p>
            </div>
            <p class="frond-prose">Lambdas can take parameters and capture multiple variables:</p>
            <CodeBlock :code="closuresParams" />
            <p class="frond-prose">Lambdas are first-class — store them in arrays and iterate:</p>
            <CodeBlock :code="closuresStore" />
            <p class="frond-prose">Lambdas can return other lambdas, enabling factory patterns:</p>
            <CodeBlock :code="closuresFactory" />
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">A lambda that captures outer variables is sometimes called a "closure" — but in Frond there is only one concept: the lambda. A nested function (<code>fun name(params): T &#123; &#125;</code>) is just a lambda bound to a name — and like any lambda, it cannot call itself, so recursive helpers must live at the top level.</p>
            </div>
          </section>

          <!-- 8. Generics -->
          <section id="generics" class="frond-tutorial-section">
            <h2>Generics</h2>
            <p class="frond-prose">Generics let you write functions that work with any type.</p>
            <CodeBlock :code="genericsIdentity" />
            <p class="frond-prose">The type parameter <code>T</code> can be any type. The compiler ensures type safety at each call site.</p>
            <CodeBlock :code="genericsDoubleCast" />
            <p class="frond-prose">Generics support multiple type parameters and generic types:</p>
            <CodeBlock :code="genericsMultiple" />
            <p class="frond-prose">Generic functions can call other generic functions, and the compiler monomorphizes each instantiation for full type safety.</p>
          </section>

          <!-- 9. Custom Types -->
          <section id="custom-types" class="frond-tutorial-section">
            <h2>Custom Types</h2>
            <p class="frond-prose">Frond has two ways to define custom types: algebraic data types (ADTs) for tagged unions, and records for grouped fields.</p>
            <h3>Algebraic Data Types</h3>
            <CodeBlock :code="customTypesAdt" />
            <p class="frond-prose">An ADT lists its variants after <code>|</code>. Pattern matching destructures each variant.</p>
            <h3>Records</h3>
            <CodeBlock :code="customTypesRecord" />
            <p class="frond-prose">Records group named fields. Construct by calling the type name with field values in order.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">Fields and methods are private to their module by default — it doesn't matter in these single-file examples, but mark them <code>pub</code> to use them from other modules (see <a href="#modules">Modules &amp; Imports</a>).</p>
            </div>
            <p class="frond-prose">Records support nullable fields, array fields, and mutation with <code>var</code>:</p>
            <CodeBlock :code="customTypesRecordNullable" />
            <CodeBlock :code="customTypesRecordMut" />
            <p class="frond-prose">Records can be destructured in <code>match</code> with guards:</p>
            <CodeBlock :code="customTypesDestructure" />
            <h3>Recursive Types</h3>
            <CodeBlock :code="customTypesRecursive" />
            <p class="frond-prose">ADTs can be recursive — a <code>Tree</code> variant can contain other <code>Tree</code> values. This is ideal for linked structures like trees and linked lists.</p>
          </section>

          <!-- 10. Pattern Matching -->
          <section id="patterns" class="frond-tutorial-section">
            <h2>Pattern Matching</h2>
            <p class="frond-prose">Pattern matching goes beyond simple value comparison. Frond supports or-patterns, guards, nested destructuring, and literal matching.</p>
            <h3>Or-Patterns</h3>
            <CodeBlock :code="patternsOrPatterns" />
            <p class="frond-prose">Use <code>|</code> to match multiple patterns in a single arm.</p>
            <h3>Guards</h3>
            <CodeBlock :code="patternsGuards" />
            <p class="frond-prose">Guards add a boolean condition with <code>if</code>. The arm only matches if the guard is true.</p>
            <h3>Nested Destructuring</h3>
            <CodeBlock :code="patternsNested" />
            <p class="frond-prose">Patterns can nest arbitrarily deep, destructuring records inside records.</p>
            <h3>Literal Patterns</h3>
            <CodeBlock :code="patternsLiteral" />
            <p class="frond-prose">Match on string and char literals. Combine with or-patterns for multi-value matching.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Wildcards (<code>_</code>) ignore parts of a structure. Use <code>Node(v, _, _)</code> to extract only the value from a tree node.</p>
            </div>
          </section>

          <!-- 11. Traits -->
          <section id="traits" class="frond-tutorial-section">
            <h2>Traits</h2>
            <p class="frond-prose">Traits define shared behavior. Types implement traits to provide methods. A trait declares method signatures; types provide implementations.</p>
            <CodeBlock :code="traitsShow" />
            <p class="frond-prose">The <code>trait</code> keyword declares a trait. A type implements it by listing the trait name after <code>:</code> and providing method bodies inside <code>{ }</code>. The receiver is implicit — use <code>this</code> inside the method body to refer to the instance.</p>
            <p class="frond-prose">Types can implement multiple traits:</p>
            <CodeBlock :code="traitsMultiple" />
            <p class="frond-prose">List multiple traits in parentheses: <code>(Greet, Sizeable, Show)</code>. The <code>hello</code> method has a default implementation — types only need to implement <code>name</code>, and <code>hello</code> works automatically.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Default methods can call other trait methods. <code>hello</code> calls <code>name()</code>, which each type implements differently.</p>
            </div>
            <p class="frond-prose">Default methods can chain — one default calls another, creating multi-layer behavior:</p>
            <CodeBlock :code="traitsChain" />
            <p class="frond-prose">Trait methods can take extra parameters beyond the implicit receiver, and can return new instances for chaining:</p>
            <CodeBlock :code="traitsCounter" />
            <p class="frond-prose">Use <code>&amp;</code> before the method name to take the receiver by reference — the method can mutate the instance:</p>
            <CodeBlock :code="traitsMutRef" />
            <p class="frond-prose">Without <code>&amp;</code>, the method receives the instance by value (read-only). With <code>&amp;</code>, mutations like <code>this.count = ...</code> persist. Use <code>this</code> when you need to explicitly reference the receiver, e.g. for assignment. Methods implementing a trait inherit the trait's declared visibility — an override of a pub trait method stays callable across modules without re-declaring <code>pub</code>; a type's own methods default to module-private (see <a href="#modules">Modules &amp; Imports</a>).</p>
            <h3>Override &amp; super</h3>
            <p class="frond-prose">Overriding a trait's default method requires the <code>override</code> keyword. Inside an override, <code>super.method()</code> calls the default implementation you replaced — the classic way to wrap default behavior:</p>
            <CodeBlock :code="traitsOverride" />
            <p class="frond-prose"><code>this</code> and <code>super</code> form one system — two views of the same receiver. <code>this.m()</code> (and the bare <code>m()</code>) dispatches dynamically from the top: the type's own override wins, the trait default is the fallback. <code>super.m()</code> dispatches statically to the bound trait default, skipping the override.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">They point in opposite directions: a default method calling <code>this.m()</code> reaches <em>down</em> into the type's override (the template-method pattern), while an override calling <code>super.m()</code> reaches <em>up</em> into the default it replaced.</p>
            </div>
            <p class="frond-prose"><code>super</code> is a layer view, not a value — it works for any method name, always targeting that method's default on the current type:</p>
            <CodeBlock :code="traitsSuperLayer" />
            <h3>Resolving Method Conflicts</h3>
            <p class="frond-prose">When a type implements several traits that provide same-named default methods, the conflict must be resolved at the declaration site — with a delegate or an explicit override. Leaving it unresolved is a compile error:</p>
            <CodeBlock :code="traitsDelegate" />
            <p class="frond-prose">The delegate syntax <code>fun m(): str = A.m</code> binds the method slot to trait <code>A</code>'s default. To override <em>and</em> choose which default <code>super</code> targets, combine the binding with a body:</p>
            <CodeBlock :code="traitsBindAndBody" />
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">With a unique provider the binding is implicit — plain <code>override fun m()</code> is enough. The <code>= Trait.m</code> annotation is only required when several traits offer same-named defaults.</p>
            </div>
          </section>

          <!-- 12. Nullable Types -->
          <section id="nullable" class="frond-tutorial-section">
            <h2>Nullable Types</h2>
            <p class="frond-prose">Frond has explicit nullable types. Append <code>?</code> to any type to make it nullable — it can hold <code>null</code> or a value of the base type.</p>
            <CodeBlock :code="nullableBasic" />
            <p class="frond-prose">Use <code>??</code> (coalescing) to provide a default for null values:</p>
            <CodeBlock :code="nullableCoalesce" />
            <p class="frond-prose"><code>??</code> returns the first non-null value. Chain multiple <code>??</code> for fallback sequences.</p>
            <p class="frond-prose">Use <code>!</code> to assert non-null (panics if null) and <code>?.</code> for safe field access:</p>
            <CodeBlock :code="nullableSafeAccess" />
            <p class="frond-prose"><code>?.</code> short-circuits to <code>null</code> if any link in the chain is null. <code>!</code> unwraps a non-null value — use it when you're certain the value exists.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Prefer <code>??</code> for safe defaults. Use <code>!</code> sparingly — it's an assertion that crashes if the value is null.</p>
            </div>
          </section>

          <!-- 13. Newtype -->
          <section id="newtype" class="frond-tutorial-section">
            <h2>Newtype</h2>
            <p class="frond-prose">Newtype creates a type-safe wrapper around an existing type. Even if two newtypes share the same underlying type, they are not interchangeable.</p>
            <CodeBlock :code="newtypeBasic" />
            <p class="frond-prose">You can't accidentally pass <code>Celsius</code> where <code>Fahrenheit</code> is expected — the compiler enforces type safety even though both wrap <code>f64</code>.</p>
            <p class="frond-prose">Unwrap newtype values with pattern matching:</p>
            <CodeBlock :code="newtypeUnwrap" />
            <p class="frond-prose">Newtypes are great for domain modeling — <code>UserId</code>, <code>Email</code>, <code>Meters</code> — without the overhead of a full record.</p>
            <CodeBlock :code="newtypeDomain" />
          </section>

          <!-- 14. Type Casting -->
          <section id="casting" class="frond-tutorial-section">
            <h2>Type Casting</h2>
            <p class="frond-prose">Use <code>value as Type</code> to convert between types. Frond supports widening, narrowing, and cross-category conversions.</p>
            <CodeBlock label="Widening" :code="castingWidening" />
            <CodeBlock label="Narrowing with wrapping" :code="castingNarrowing" />
            <p class="frond-prose">Narrowing casts wrap around — <code>300i32</code> to <code>i8</code> gives <code>44</code> (300 mod 256).</p>
            <CodeBlock label="Int &harr; Float" :code="castingIntFloat" />
            <p class="frond-prose">Float-to-int truncates (3.99 becomes 3). Int-to-float is exact for representable values.</p>
            <CodeBlock label="Char &harr; Int" :code="castingCharInt" />
            <CodeBlock label="Int &rarr; Str" :code="castingIntStr" />
            <p class="frond-prose">Cast to <code>str</code> converts any primitive to its string representation. <code>true as str</code> returns <code>"true"</code>.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Chain casts for complex conversions: <code>65i32 as i64 as i8</code>.</p>
            </div>
          </section>

          <!-- 15. Operators -->
          <section id="operators" class="frond-tutorial-section">
            <h2>Operators</h2>
            <p class="frond-prose">Frond supports standard arithmetic, comparison, logical, and bitwise operators.</p>
            <h3>Arithmetic</h3>
            <CodeBlock :code="operatorsArithmetic" />
            <p class="frond-prose">Operator precedence follows standard math rules: <code>*</code> and <code>/</code> before <code>+</code> and <code>-</code>. Integer division truncates toward zero.</p>
            <h3>Comparison &amp; Logical</h3>
            <CodeBlock :code="operatorsComparison" />
            <h3>Bitwise</h3>
            <CodeBlock :code="operatorsBitwise" />
            <p class="frond-prose">Bitwise operators work on integer types. Hex (<code>0xFF</code>), binary (<code>0b1010</code>), and octal (<code>0o777</code>) literals are supported.</p>
            <CodeBlock :code="operatorsLiterals" />
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Bitwise <code>&amp;</code> has higher precedence than <code>|</code>, matching C convention. Use parentheses for clarity.</p>
            </div>
          </section>

          <!-- 16. Error Handling -->
          <section id="error-handling" class="frond-tutorial-section">
            <h2>Error Handling</h2>
            <p class="frond-prose">Frond uses <code>Throw&lt;T, E&gt;</code> types for explicit error handling.</p>
            <CodeBlock :code="errorHandlingSafeDiv" />
            <p class="frond-prose">The return type <code>Throw&lt;i32, Error&gt;</code> tells callers that this function either succeeds with an <code>i32</code> or fails with an <code>Error</code>.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Unlike exceptions in other languages, Frond errors are visible in the function signature. You always know what can go wrong.</p>
            </div>
            <p class="frond-prose">Use <code>?</code> to propagate errors — if the expression fails, the function returns immediately with the error:</p>
            <CodeBlock :code="errorHandlingPropagate" />
            <p class="frond-prose">Define error subtypes with <code>: Err</code> for domain-specific errors. Every subtype must carry a <code>message: str</code> field:</p>
            <CodeBlock :code="errorHandlingSubtypes" />
            <p class="frond-prose">At the match site, <code>Error(e)</code> binds the error value — read its message with <code>e.message</code>:</p>
            <CodeBlock :code="errorHandlingMatch" />
            <p class="frond-prose">Use <code>??</code> to provide defaults for <code>Throw</code> values, just like nullable types:</p>
            <CodeBlock :code="errorHandlingCoalesce" />
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text"><code>throw</code> can throw any type — not just <code>Error</code>. Use <code>throw 42</code> or <code>throw "message"</code> for lightweight error signaling.</p>
            </div>
          </section>

          <!-- 17. Async & Channels -->
          <section id="async" class="frond-tutorial-section">
            <h2>Async &amp; Channels</h2>
            <p class="frond-prose">Frond has built-in async/await support and typed channels for concurrent programming.</p>
            <CodeBlock label="Async functions" :code="asyncFetch" />
            <p class="frond-prose">The <code>async</code> keyword marks a function as asynchronous. <code>await()</code> suspends execution until the operation completes. <code>Async&lt;T&gt;</code> is the return type for async functions. <code>Timer(n)</code> sleeps for <code>n</code> nanoseconds — a 1-second sleep is <code>Timer(1_000_000_000).await()</code>.</p>
            <CodeBlock label="Channels" :code="asyncChannels" />
            <p class="frond-prose">Channels are typed communication pipes between concurrent tasks. <code>channel&lt;i32&gt;(2)</code> creates a buffered channel that holds up to 2 integers. <code>send</code> writes a value, <code>recv</code> reads one.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Channels make concurrent code safe — no shared mutable state, just message passing.</p>
            </div>
            <p class="frond-prose">Async functions can chain — one async function can <code>await</code> another:</p>
            <CodeBlock :code="asyncChain" />
            <p class="frond-prose">Channels work with any type — records, ADTs, nullable values, and more:</p>
            <CodeBlock :code="asyncChannelsTypes" />
          </section>

          <!-- 18. Defer -->
          <section id="defer" class="frond-tutorial-section">
            <h2>Defer</h2>
            <p class="frond-prose"><code>defer</code> schedules a statement to run when the function exits, regardless of how it exits. Deferred statements run in LIFO (last-in, first-out) order.</p>
            <CodeBlock :code="deferBasic" />
            <p class="frond-prose">When <code>process</code> is called, it prints: <code>working</code>, then <code>second cleanup</code>, then <code>cleanup</code>. The last deferred statement runs first.</p>
            <p class="frond-prose">Defer is useful for resource cleanup:</p>
            <CodeBlock :code="deferCleanup" />
            <p class="frond-prose">No matter how <code>readFile</code> exits — normal return, early <code>return</code>, or a thrown error — the file is always closed.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Deferred statements capture variable values at the time of execution, not at the time of <code>defer</code>. If a variable changes after <code>defer</code>, the deferred statement sees the new value.</p>
            </div>
            <p class="frond-prose">Defer runs even when a function exits via <code>throw</code> — making it ideal for cleanup in error paths:</p>
            <CodeBlock :code="deferError" />
            <p class="frond-prose">In recursive functions, each call's defers execute in LIFO order as the stack unwinds:</p>
            <CodeBlock :code="deferRecurse" />
          </section>

          <!-- 19. Strings -->
          <section id="strings" class="frond-tutorial-section">
            <h2>Strings</h2>
            <p class="frond-prose">Frond supports string interpolation with <code>{}</code> syntax. Any expression can be embedded inside a string.</p>
            <CodeBlock :code="stringsInterpolation" />
            <p class="frond-prose">Place expressions inside <code>{}</code> within a string literal. Frond evaluates them at runtime and converts the result to a string.</p>
            <h3>String Operations</h3>
            <p class="frond-prose">Strings support indexing, length, concatenation, and comparison:</p>
            <CodeBlock :code="stringsOperations" />
            <p class="frond-prose">String comparison is lexicographic and Unicode-aware:</p>
            <CodeBlock :code="stringsComparison" />
            <h3>Escape Sequences</h3>
            <CodeBlock :code="stringsEscapes" />
            <h3>Unicode Support</h3>
            <p class="frond-prose">Strings are Unicode-aware. Indexing returns a <code>char</code> by codepoint, while <code>bytes()</code> exposes the raw UTF-8 byte view:</p>
            <CodeBlock :code="stringsUnicode" />
            <h3>String Helpers</h3>
            <p class="frond-prose">One import — <code>import std.core.types</code> — brings in the <code>Str</code> namespace with the full string toolkit:</p>
            <CodeBlock :code="stringsHelpers" />
            <p class="frond-prose"><code>Str</code> covers <code>split</code> (Go-style: empty separator returns the whole string, empty pieces are preserved), <code>trim</code>/<code>trim_start</code>/<code>trim_end</code>, <code>contains</code>/<code>starts_with</code>/<code>ends_with</code>, <code>index_of</code> (byte offset), <code>replace</code>, <code>repeat</code>, <code>substring</code>, and <code>to_upper_ascii</code>/<code>to_lower_ascii</code>.</p>
            <p class="frond-prose">The same import also brings a namespace per type — <code>I8</code>..<code>I128</code>, <code>U8</code>..<code>U128</code>, <code>F16</code>..<code>F128</code>, <code>Bool</code> — each with <code>parse</code> and the <code>MAX</code>/<code>MIN</code> bounds constants:</p>
            <CodeBlock :code="stringsParse" />
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text"><code>parse</code> returns <code>T?</code> — null means the text is malformed. Combine with <code>??</code> for a default: <code>I32.parse(text) ?? 0</code>.</p>
            </div>
            <div class="frond-callout">
              <p class="frond-callout-label">Tip</p>
              <p class="frond-callout-text">Nullable strings work with <code>??</code>: <code>(nullableStr ?? "default")</code> provides a fallback for <code>null</code>.</p>
            </div>
          </section>

          <!-- 20. Modules & Imports -->
          <section id="modules" class="frond-tutorial-section">
            <h2>Modules &amp; Imports</h2>
            <p class="frond-prose">Frond ships a standard library organized into packs. Import a pack with <code>import std.&lt;pack&gt;.&lt;module&gt;</code>:</p>
            <CodeBlock :code="modulesBasic" />
            <p class="frond-prose">Operations that can fail return <code>Throw</code> values — handle them with <code>match</code> or <code>?</code> like any error. <code>Env.get</code> follows Go's convention: a missing key yields <code>""</code>.</p>
            <p class="frond-prose">File-system APIs live in <code>std.io</code> and take <code>Path</code> values — the single path currency across the library. Build paths with <code>Path.from</code> / <code>.join_str</code> and render them with <code>.to_str()</code>:</p>
            <CodeBlock :code="modulesIo" />
            <p class="frond-prose">Random numbers come from <code>std.rand.Rand</code> — a seedable xorshift stream (not cryptographic):</p>
            <CodeBlock :code="modulesRand" />
            <p class="frond-prose">Some names clash across packs — for example <code>File.chmod</code> and <code>Fs.chmod</code>. Import a single function under an alias to keep call sites unambiguous:</p>
            <CodeBlock :code="modulesSelective" />
            <h3>Visibility (<code>pub</code>)</h3>
            <p class="frond-prose">Your own modules import the same way — put <code>Counter.frond</code> next to <code>Main.frond</code> and <code>import Counter</code> (a directory with a <code>pack.frond</code> imports under its name too). Inside a module, fields, methods, and top-level items are <strong>private to the module</strong> by default; mark them <code>pub</code> to make them part of its public surface:</p>
            <CodeBlock label="src/Counter.frond" :code="visibilityModule" />
            <CodeBlock label="src/Main.frond" :code="visibilityClient" />
            <p class="frond-prose">Three rules govern what crosses a module boundary:</p>
            <ol class="frond-next-list">
              <li><strong>Fields</strong> are module-private unless declared <code>pub</code> — <code>c.count</code> above fails from <code>Main.frond</code>.</li>
              <li><strong>Constructors</strong> of a record with any private named field cannot be called outside its module (both <code>Counter(5)</code> and the qualified spelling) — expose a <code>pub</code> factory like <code>Counter.from</code> instead.</li>
              <li><strong>Methods</strong> are module-private unless declared <code>pub</code> — <code>current()</code> and <code>&amp;increment()</code> above are callable only because they carry <code>pub</code>.</li>
            </ol>
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">This is how <code>std.io.File</code> works: its descriptor field is private, files are opened through the pub <code>File.open</code> factory, and the descriptor is readable through the pub <code>fd()</code> accessor. ADT payloads (positional fields like <code>Circle(f64)</code>) follow the type's own visibility — they stay constructible and matchable across modules.</p>
            </div>
            <p class="frond-prose">Top-level items follow the same marker: <code>pub fun</code>, <code>pub type</code>, <code>pub val</code>, <code>pub var</code> — <code>Str.split</code>, <code>I32.MAX</code>, and <code>Rand.next</code> are all <code>pub</code> items on the library's surface. Methods implementing a trait inherit the trait's declared visibility — an override of a pub trait method is callable without re-declaring <code>pub</code>.</p>
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text"><code>@internal</code> marks standard-library implementation primitives — it is reserved: user code can neither declare nor call them.</p>
            </div>
            <div class="frond-callout">
              <p class="frond-callout-label">Note</p>
              <p class="frond-callout-text">Console output (<code>println</code>, <code>print</code>, <code>eprintln</code>), <code>Timer</code>, and the error types (<code>Ok</code>, <code>Error</code>, <code>Throw</code>) are built in — no import needed.</p>
            </div>
            <p class="frond-prose">The standard library covers:</p>
            <ol class="frond-next-list">
              <li><code>std.core.types</code> — value-type namespaces: <code>Str</code> (string algorithms), <code>I8</code>..<code>I128</code> / <code>U8</code>..<code>U128</code>, <code>F16</code>..<code>F128</code>, <code>Bool</code> (bounds + parse)</li>
              <li><code>std.io</code> — <code>Path</code>, <code>File</code>, <code>Dir</code>, <code>Fs</code>, <code>Buffered</code>, <code>Reader</code>, <code>Writer</code></li>
              <li><code>std.os</code> — <code>Env</code>, <code>Info</code>, <code>Os</code>, <code>Proc</code> (args, exit, run/spawn/capture), <code>Tty</code></li>
              <li><code>std.time</code> — <code>Duration</code>, <code>Instant</code>, <code>SystemTime</code>, <code>DateTime</code>, <code>Calendar</code>, plus <code>Timer</code> helpers (<code>sleep</code>, <code>ticker</code>, <code>timeout</code>)</li>
              <li><code>std.math</code> — <code>Math</code> (constants, NaN/Inf helpers), <code>Power</code>, <code>Round</code>, <code>Trig</code></li>
              <li><code>std.rand</code> — <code>Rand</code> (seedable pseudo-random stream)</li>
              <li><code>std.net</code>, <code>std.iter</code>, <code>std.reflect</code> — raw sockets, iterators, runtime reflection</li>
            </ol>
          </section>

          <!-- 21. Next Steps -->
          <section id="next-steps" class="frond-tutorial-section">
            <h2>Next Steps</h2>
            <p class="frond-prose">You now know the basics of Frond. Here's what to explore next:</p>
            <ol class="frond-next-list">
              <li>Read the full Language Tour for advanced features</li>
              <li>Try the CLI commands — <code>frond debug</code> shows compilation stages</li>
              <li>Build a real project with <code>frond init</code> and experiment</li>
              <li>Explore generics and ADTs in depth</li>
              <li>Browse the standard library — <code>std.io</code>, <code>std.os</code>, and beyond</li>
            </ol>
            <p class="frond-next-closing">Happy coding with Frond.</p>
          </section>
        </div><!-- /.frond-content -->
      </div><!-- /.frond-tutorial-grid -->
    </div><!-- /.frond-container -->
  </main>
</template>
