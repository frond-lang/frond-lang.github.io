<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ShieldCheck,
  Brackets,
  GitBranch,
  LayoutGrid,
  AlertCircle,
  Radio,
} from 'lucide-vue-next'
import CodeBlock from '@/components/CodeBlock.vue'
const logoUrl = 'https://github.com/kuzo-lang/assets/blob/main/logo.png?raw=true'

interface Feature {
  icon: typeof ShieldCheck
  title: string
  desc: string
}

const features: Feature[] = [
  { icon: ShieldCheck, title: 'Static Typing', desc: 'Catch errors at compile time with a robust, expressive type system.' },
  { icon: Brackets, title: 'Generics', desc: 'Write reusable, type-safe code with generic functions and types.' },
  { icon: GitBranch, title: 'Algebraic Data Types', desc: 'Model domain complexity with tagged unions and pattern matching.' },
  { icon: LayoutGrid, title: 'Records', desc: 'Group related fields with named record types for clear data structures.' },
  { icon: AlertCircle, title: 'Error Handling', desc: 'First-class error handling with Throw types and throw/Ok expressions.' },
  { icon: Radio, title: 'Async & Channels', desc: 'Built-in async/await and typed channels for concurrent programming.' },
]

const cliCommands = [
  { cmd: 'kuzo init [name]', desc: 'Scaffold a new project' },
  { cmd: 'kuzo build [-O N]', desc: 'Compile to .kzo (-O 0..3, default 2)' },
  { cmd: 'kuzo run [-O N]', desc: 'Compile and run' },
  { cmd: 'kuzo run <file.kzo>', desc: 'Execute a compiled artifact' },
  { cmd: 'kuzo debug --stage S', desc: 'Diagnostics (tokens/ast/check/emit-c/emit-ffi/full)' },
  { cmd: 'kuzo inspect <file.kzo>', desc: 'Inspect .kzo metadata' },
]

const quickStartCode = `# Create a new project
kuzo init myapp
cd myapp

# Compile and run
kuzo run

# Or compile only
kuzo build
# Execute the artifact
kuzo run out/myapp.kzo`

const projectLayout = `myapp/
├── kuzo.toml      # Project manifest
└── src/Main.kz    # Entry point`

const mainCode = `fun main(): void {
    println("Hello, Kuzo!")
}`

const variablesCode = `val x: i32 = 42
var counter: i32 = 0`

const functionsCode = `fun add(a: i32, b: i32): i32 { a + b }
fun identity<T>(x: T): T { x }`

const adtCode = `type Shape = | Circle(f64) | Rect(f64, f64)

fun area(s: Shape): f64 {
    match s {
        Circle(r) => 3.14159 * r * r
        Rect(w, h) => w * h
    }
}`

const recordCode = `type Point = Point(x: i32, y: i32)
val p = Point(3, 4)`

const errorHandlingCode = `fun safeDiv(a: i32, b: i32): Throw<i32, Error> {
    if b == 0 { throw Error("div by zero") }
    Ok(a / b)
}`

const asyncCode = `async fun fetch(): Async<i32> {
    Timer(1).await()
    42
}

val ch = channel<i32>(2)
ch.send(10)
ch.recv()  // 10`

const stringCode = `println("sum = {1 + 2}, point = {p}")`
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="kuzo-hero">
      <div class="kuzo-container kuzo-hero-inner">
        <img :src="logoUrl" alt="Kuzo logo" class="kuzo-hero-logo" />
        <h1 class="kuzo-hero-title">Kuzo</h1>
        <p class="kuzo-hero-tagline">A statically typed programming language</p>
        <p class="kuzo-hero-desc">
          Write expressive, type-safe code with generics, algebraic data types, pattern matching,
          and built-in async channels. Compile to cross-platform .kzo binaries.
        </p>
        <div class="kuzo-hero-ctas">
          <RouterLink to="/#quick-start" class="kuzo-btn kuzo-btn-primary">Quick Start</RouterLink>
          <RouterLink to="/#tour" class="kuzo-btn kuzo-btn-secondary">Language Tour</RouterLink>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="kuzo-section" id="features">
      <div class="kuzo-container">
        <h2 class="kuzo-section-title">Features</h2>
        <div class="kuzo-feature-grid">
          <div v-for="f in features" :key="f.title" class="kuzo-feature-card">
            <component :is="f.icon" class="kuzo-feature-icon" />
            <h3 class="kuzo-feature-title">{{ f.title }}</h3>
            <p class="kuzo-feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="kuzo-section" id="quick-start">
      <div class="kuzo-container">
        <h2 class="kuzo-section-title">Quick Start</h2>
        <p class="kuzo-section-intro">Get up and running in seconds.</p>
        <CodeBlock :code="quickStartCode" />
        <div class="kuzo-quickstart-grid">
          <div>
            <p class="kuzo-code-label">Project Layout</p>
            <CodeBlock :code="projectLayout" />
          </div>
          <div>
            <p class="kuzo-code-label">src/Main.kz</p>
            <CodeBlock :code="mainCode" />
          </div>
        </div>
      </div>
    </section>

    <!-- Language Tour -->
    <section class="kuzo-section" id="tour">
      <div class="kuzo-container">
        <h2 class="kuzo-section-title">Language Tour</h2>
        <p class="kuzo-section-intro">A quick tour of Kuzo's core features.</p>

        <div class="kuzo-tour-item">
          <CodeBlock label="Variables" :code="variablesCode" />
        </div>

        <div class="kuzo-tour-item">
          <CodeBlock label="Functions and Generics" :code="functionsCode" />
        </div>

        <div class="kuzo-tour-item">
          <CodeBlock label="ADTs and Pattern Matching" :code="adtCode" />
        </div>

        <div class="kuzo-tour-item">
          <CodeBlock label="Records" :code="recordCode" />
        </div>

        <div class="kuzo-tour-item">
          <CodeBlock label="Error Handling" :code="errorHandlingCode" />
        </div>

        <div class="kuzo-tour-item">
          <CodeBlock label="Async and Channels" :code="asyncCode" />
        </div>

        <div class="kuzo-tour-item">
          <CodeBlock label="String Interpolation" :code="stringCode" />
        </div>
      </div>
    </section>

    <!-- CLI Reference -->
    <section class="kuzo-section" id="cli">
      <div class="kuzo-container">
        <h2 class="kuzo-section-title">CLI</h2>
        <div class="kuzo-table-wrap">
          <table class="kuzo-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in cliCommands" :key="c.cmd">
                <td class="cmd">{{ c.cmd }}</td>
                <td class="desc">{{ c.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>
