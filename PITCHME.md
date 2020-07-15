## TypeScript 入門 〜Conditional Types 編〜

---

## おひさ！

---

### アジェンダ
* 前回までの復習
* keyof
* Indexed Access Types
* Mapped Types
* Conditional Types
* 問題
* まとめ

---

### 前準備
```sh:Terminal
git clone https://github.com/tee-talog/try-typescript-3.git
cd try-typescript-3
npm ci
```

---

# 前回までの復習

---

### 実行方法
直接 TS ファイルを実行

```sh:Terminal
npm start src/try1.ts
# もしくは
npx ts-node src/try1.ts
# => 3
```

---

### JS との違い
ほぼ JS、そこに型が書ける
型に関する専用の構文や既存構文の拡張がある

```ts
const a: number = 1
const func = (arg: number): void => {
  console.log(arg)
}
func(a)
// => 1
```

---

### いろいろな型
大まかに 2 種類
* プリミティブ型
* その他

---

### プリミティブ型
* string（文字列）
* number（数値）
* boolean（真偽値）
* null
* undefined
* リテラル型
* symbol
* bigint

---

### その他
* 配列型
* オブジェクト型
	* オブジェクトリテラル
	* object
	* {}
* 関数型
* any
* unknown
* タプル型
* void
* never

---

### いろいろな言語機能
* ジェネリクス
* クラス
* キャスト
* Union Types
* Type Guard 関数
* readonly
* const assertion
* Intersection Types
* Enum
* Optional Chaining
* Nullish Coalescing

---

## たくさん倒してきた

---

## しかし……

---

## ここからが TypeScript の本領

---

## 今回の構文たち

---

### `keyof`
その型のキーを取ってきて Union Types にする
（index types query と言うらしい）
単体だと意味不明な TS の構文第一位（※自分調べ）
<small>この辺になると例題考えるのが難しい</small>

```ts:try1.ts
type MusicCreator = {
  numberOfPeople: number
  lyrics: string
  composer: string
  recordingEngineer: string
  masteringEngineer: string
}

type MusicCreatorType = keyof MusicCreator
// => "numberOfPeople" | "lyrics" | "composer" | "recordingEngineer" | "masteringEngineer"
```

---

### Index Types
Lookup Types とも言う
インデックスアクセスの要領で型を参照する
よく keyof と一緒に出てくる

```ts:try2.ts
type MusicCreator = {
  numberOfPeople: number
  lyrics: string
  composer: string
  recordingEngineer: string
  masteringEngineer: string
}

type LyricsType = MusicCreator['lyrics']
// => string
```

---

### Mapped Types
本領発揮

その型がどんなキーを持つオブジェクトなのかを指定できる構文

```ts:try3.ts
type Nullable<T> = { [K in keyof T]: T[K] | null}
type MusicCreator = {
  numberOfPeople: number
  lyrics: string
  composer: string
  recordingEngineer: string
  masteringEngineer: string
}

const creators: Nullable<MusicCreator> = {
  numberOfPeople: 1,
  lyrics: 'John',
  composer: null,
  recordingEngineer: null,
  masteringEngineer: null
}
```

---

optional にしたり、逆に optional を取ったりできる。`readonly` もつけはずしできる

```ts:try4.ts
type Optional<T> = { [K in keyof T]?: T[K] }
type MusicCreator = {
  readonly numberOfPeople: number
  lyrics: string
  composer: string
  recordingEngineer: string
  masteringEngineer: string
}

const creators: Optional<MusicCreator> = {
  numberOfPeople: 1,
  lyrics: 'John'
}

// -----

type Readonly<T> = { -readonly [K in keyof T]: T[K] }
const readonlyCreators: Readonly<MusicCreator> = {
  numberOfPeople: 1,
  lyrics: 'John',
  composer: 'Smith',
  masteringEngineer: 'Catherine',
  recordingEngineer: 'Jessica'
}
readonlyCreators.numberOfPeople = 4
```

---

### Conditional Types

---

### お　ま　た　せ

---

### Conditional Types
型の条件分岐

---

例 1: 受け取った型が Foo 型なら Foo 型、そうでないなら Bar 型を返す型

```ts:try5.ts
type Foo = 'foo'
type Bar = 'bar'
type Baz = 'baz'
type FooBar<T> = T extends Foo ? Foo : Bar

type F1 = FooBar<Foo> // => Foo
type F2 = FooBar<Bar> // => Bar
type F3 = FooBar<Baz> // => Bar
```

---

例 2: 引数に A 型の値を取り、A が B に代入できる（サブタイプ）なら A、そうでないなら B を返す関数型

```ts:try6.ts
type UndefinedFunc<A, B> = (arg: A) => A extends B ? A : B

const uf1: UndefinedFunc<"a", "a" | "b"> = (arg) => "a"
const uf2: UndefinedFunc<"a", "b" | "c"> = () => "b"
const uf3: UndefinedFunc<true, boolean> = () => true
```

---

また、`infer` を使うことで、Conditional Types の条件部でパターンマッチをして、新しい型変数を作り出すことができる

```ts:try7.ts
type ArgumentsType<T> = T extends (...args: infer U) => any ? U : T
type A = (arg: string) => void
type B = () => void
type C = (arg1: string, arg2: number) => number
type D = boolean

type At1 = ArgumentsType<A> // => [string]
type At2 = ArgumentsType<B> // => []
type At3 = ArgumentsType<C> // => [string, number]
type At4 = ArgumentsType<D> // => boolean
```

---

### 組み込み型
こんな面倒なことを覚えなくても、TypeScript には公式で提供されている便利な組み込み型があるので、ある程度それでまかなえるようになっている
https://www.typescriptlang.org/docs/handbook/utility-types.html

便利なやつら

* `Partial`, `Required`: 渡した型のプロパティをすべて(省略可能|省略不可)にする
* `Pick`, `Omit`: 1 つ目の型から 2 つ目の型を(抜き出す|消す)
* `ReturnType`: 関数型を渡すと戻り値の型が返ってくる

---

`Partial` の例

```ts:try8.ts
type FuncOption = {
  required: boolean
  env: 'development' | 'production'
}

// すべてのプロパティを設定する必要がある
const initialOption: FuncOption = {
  required: false,
  env: 'development'
}

// option にはすべてのプロパティを渡さなくていい
const func = (option: Partial<FuncOption>) => {
  const allOption = { ...option, ...initialOption }
  //
}

func({ required: true })
```

ちなみに、type-fest という、組み込み型だけでは手が届かないようなところにアプローチしているライブラリもある
https://github.com/sindresorhus/type-fest

---

実際にどんな型定義がされているのか、`ReturnType` を例に見ていく

ReturnType の型定義
https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1524

```ts
type ReturnType<T extends (...args: any) => any>
  = T extends (...args: any) => infer R ? R : any;
```

わかりやすいね（しろめ）

---

公式サイトの例が分かりづらいので自分の例

```ts:try9.ts
const func = (a: string): string => a
type F1 = ReturnType<typeof func> // => string
type F2 = ReturnType<() => string | number> // => string | number
type F3 = ReturnType<<T>() => T> // => unknown
```

戻り値の型を infer で仮置きしておいて、条件に一致したら本決めされる、という挙動になる

---

### Union Distribution
日本語だと Union Types の分配？
構文ではなく、Conditional Types の条件部分の extends の左が型変数だけで右側が Union Types のときに発生する現象

Exclude 型の定義
https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1494

```ts
type Exclude<T, U> = T extends U ? never : T;
```

型引数を 2 つ受け取り、1 つ目の型が 2 つ目の型のサブタイプではなかった場合、1 つ目の型を返す型

never か同じ型を返す……って意味なくない？

---

公式サイトの例

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
type T2 = Exclude<string | number | (() => void), Function> // string | number
```

Union Types を渡してあげると、「1 つ目の型が 2 つ目の型のサブタイプではなかった場合、1 つ目の型を返す」というチェックを、**それぞれの型に対して***行う
掛け算の分配法則的なやつ

ちなみに never は型の undefined みたいなもので、Union Types に入らず消える

---

今日やる内容はおわり
どいつもこいつもやべぇやつばっかり
組み込み型様を除く

* `keyof`
* Index Types
* Mapped Types
* Conditional Types
* 組み込み型
* Union Distribution

---

ここでちょっと休憩！

---

じゃあ実際に使ってみようか（にっこり）

---

各問題のソースは `src/questions/q（問題番号）.ts`, `src/answer/a（問題番号）.ts` にあります。

### 問題 1
`ObjKeys` は `obj` にあるキーの Union Types になっています。
手動でキーを書くのではなく、 `obj` の定義から自動的に取ってくるようにしてください。

```ts
const obj = {
  foo: 'foooooooo',
  bar: 'baaaaaaar',
  baz: 'baz?'
}

type ObjKeys = 'foo' | 'bar' | 'baz'
```

+++

### 問題 1 の答え
```ts
const obj = {
  foo: 'foooooooo',
  bar: 'baaaaaaar',
  baz: 'baz?'
}

type ObjKeys = keyof typeof obj
```

---

### 問題 2
`parsonValue` に適切な型を付けてください。
Parson 型の値とそのオブジェクトのキーを受け取って、対応する値を返す関数です。

```ts
// ここ！
const parsonValue = (parson: any, key: any): any => parson[key]

type Parson = {
  firstName: string
  lastName: string
}
const rezero: Parson = {
  firstName: 'Subaru',
  lastName: 'Natsuki'
}

parsonValue(rezero, 'firstName') // => 'Subaru'
parsonValue(rezero, 'lastName') // => 'Natsuki'
```

+++

### 問題 2 の答え
```ts
const parsonValue = <K extends keyof Parson>(
  parson: Parson,
  key: K
): Parson[K] => parson[key]

type Parson = {
  firstName: string
  lastName: string
}
const rezero: Parson = {
  firstName: 'Subaru',
  lastName: 'Natsuki'
}

parsonValue(rezero, 'firstName') // => 'Subaru'
parsonValue(rezero, 'lastName') // => 'Natsuki'
```

---

### 問題 3
組み込み型 `Partial` と同じ型 `MyPartial` を定義してください。
受け取った型のキーをすべて省略可能にする型です。

```ts
type MyPartial<T> = any // これ！

type Xyz = {
  xx: string
  yy: number
}

type P = MyPartial<Xyz> // => { xx?: string; yy?: number }
```

+++

### 問題 3 の答え
```ts
type MyPartial<T> = { [K in keyof T]?: T[K] }

type Xyz = {
  xx: string
  yy: number
}

type P = MyPartial<Xyz> // => { xx?: string; yy?: number }
```

---

### 問題 4
第二引数が partial か required かによって、第一引数のオブジェクトのプロパティを省略可能にしたり省略不可にしたりする型を定義してください。

```ts
type PartialOrRequired<T, R> = any // これ！

type Minna = {
  ore: string
  omae: string
  marukajiri?: string
}

type Pr1 = PartialOrRequired<Minna, 'partial'> // => { ore?: string; omae?: string; marukajiri?: string }
type Pr2 = PartialOrRequired<Minna, 'required'> // => { ore: string; omae: string; marukajiri: string }
```

* 省略可能にする型：`Partial<T>`
* 省略不可にする型：`Required<T>`

+++

### 問題 4 の答え
```ts
type PartialOrRequired<
  T,
  R extends 'partial' | 'required'
> = R extends 'partial' ? Partial<T> : Required<T>

type Minna = {
  ore: string
  omae: string
  marukajiri?: string
}

type Pr1 = PartialOrRequired<Minna, 'partial'> // => { ore?: string; omae?: string; marukajiri?: string }
type Pr2 = PartialOrRequired<Minna, 'required'> // => { ore: string; omae: string; marukajiri: string }
```

---

### 問題 5
一つ目の型引数が引数の型を表していて、それに `undefined` を指定できる場合に引数が省略できる関数の型を定義してください。

```ts
type TypedFunction<A, R> = (arg: A) => R // ここ！

const func1: TypedFunction<string, number> = (arg: string) => 1
const func2: TypedFunction<number, boolean> = (arg: number) => true
const func3: TypedFunction<undefined, boolean> = () => true // 引数が不要
const func4: TypedFunction<number | undefined, void> = (arg?: number) => {} // 引数を書いても書かなくてもいい
```

`undefined` を指定できる（代入できる） ＝ `undefined` のスーパータイプ

+++

### 問題 5 の答え
```ts
type TypedFunction<A, R> = undefined extends A
  ? (arg?: A) => R
  : (arg: A) => R

const func1: TypedFunction<string, number> = (arg: string) => 1
const func2: TypedFunction<number, boolean> = (arg: number) => true
const func3: TypedFunction<undefined, boolean> = () => true // 引数が不要
const func4: TypedFunction<number | undefined, void> = (arg?: number) => {} // 引数を書いても書かなくてもいい
```

---

### 問題 6
ある型からメソッド名だけを抽出した型を定義してください。

```ts
type FunctionProperty<T> = any // これ！

type Animal = {
  name: string
  age: number
  run(): number
  walk(): number
  talk(): string
}

type Fp = FunctionProperty<Animal> // => 'run' | 'walk' | 'talk'
```

+++

### 問題 6 の答え
```ts
type FunctionProperty<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type Animal = {
  name: string,
  age: number,
  run(): number,
  walk(): number,
  talk(): string
}

FunctionProperty<Animal> // => 'run' | 'walk' | 'talk'
```

---

### 問題 7
オブジェクト型の一部のプロパティを省略可能にする型を定義してください。

```ts
type PartiallyPartial<T, K> = any // これ！

type AjaxOption = {
  method: 'get' | 'post'
  url: string
  data: any
  headers: any[]
}

type Pp = PartiallyPartial<AjaxOption, 'headers' | 'data'> // => { method: 'get' | 'post'; url: string; data?: any headers?: any[] }
```

+++

### 問題 7 のヒント
`{ method: 'get' | 'post'; url: string }` と `{ data?: any; headers?: any[] }` の Intersection Types

`K` に指定された名前のプロパティだけのオブジェクトと、  
`K` に指定されてない名前のプロパティだけのオブジェクト  
を作りたい

`K` に指定されてない名前のプロパティ === `T` のキーすべて - `K`

https://www.typescriptlang.org/docs/handbook/utility-types.html

+++

### 問題 7 の答え
```ts
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>

type AjaxOption = {
  method: 'get' | 'post'
  url: string
  data: any
  headers: any[]
}

type Pp = PartiallyPartial<AjaxOption, 'headers' | 'data'> // => { method: 'get' | 'post'; url: string; data?: any headers?: any[] }
```

---

### 問題 8
オブジェクト型から、最低一つは必須のオブジェクト型を生成する型を定義してください。

```ts
type AtLeastOne<T> = any // これ！

type PrimaryValue = {
  id: string
  name: string
  pos: { x: number; y: number }
}

type PrimaryValueAtLeastOne = AtLeastOne<PrimaryValue>
const a: PrimaryValueAtLeastOne = { id: 'id1' }
const b: PrimaryValueAtLeastOne = { name: 'hoge' }
const c: PrimaryValueAtLeastOne = { pos: { x: 100, y: 200 } }
const d: PrimaryValueAtLeastOne = { id: 'id2', pos: { x: 100, y: 200 } }
// const x: PrimaryValueAtLeastOne = {} // コンパイルエラー
// const x: PrimaryValueAtLeastOne = { test: 'test' } // コンパイルエラー
```

問題 7 の答えを使います

+++

### 問題 8 のヒント
「ある一つのキーだけ必須でそれ以外は省略可能なオブジェクト」を各キーに対して作り、それを Union すればできる。

```ts
type Answer =
  | {
      id: string
      name?: string
      pos?: { x: number; y: number }
    }
  | {
      id?: string
      name: string
      pos?: { x: number; y: number }
    }
  | {
      id?: string
      name?: string
      pos: { x: number; y: number }
    }
```

+++

### 問題 8 の答え
```ts
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>
type Spread<T, K extends keyof T> = K extends keyof T
  ? PartiallyPartial<T, Exclude<keyof T, K>>
  : never
type AtLeastOne<T> = Spread<T, keyof T>

type PrimaryValue = {
  id: string
  name: string
  pos: { x: number; y: number }
}

type PrimaryValueAtLeastOne = AtLeastOne<PrimaryValue>
const a: PrimaryValueAtLeastOne = { id: 'id1' }
const b: PrimaryValueAtLeastOne = { name: 'hoge' }
const c: PrimaryValueAtLeastOne = { pos: { x: 100, y: 200 } }
const d: PrimaryValueAtLeastOne = { id: 'id2', pos: { x: 100, y: 200 } }
// const x: PrimaryValueAtLeastOne = {} // コンパイルエラー
// const x: PrimaryValueAtLeastOne = { test: 'test' } // コンパイルエラー
```

+++

別解？

```
npm i type-fest
```

```ts
import { RequireAtLeastOne } from 'type-fest'

type AtLeastOne<T> = RequireAtLeastOne<T, keyof T>

type PrimaryValue = {
  id: string
  name: string
  pos: { x: number; y: number }
}

type PrimaryValueAtLeastOne = AtLeastOne<PrimaryValue>
const a: PrimaryValueAtLeastOne = { id: 'id1' }
const b: PrimaryValueAtLeastOne = { name: 'hoge' }
const c: PrimaryValueAtLeastOne = { pos: { x: 100, y: 200 } }
const d: PrimaryValueAtLeastOne = { id: 'id2', pos: { x: 100, y: 200 } }
// const x: PrimaryValueAtLeastOne = {} // コンパイルエラー
// const x: PrimaryValueAtLeastOne = { test: 'test' } // コンパイルエラー
```

---

---

### 素朴な疑問
Q. 実務でここまでやる必要ある？

A. ないです。

---

### まとめ
いかがでしたか？（暗黒微笑）

今回は TypeScript の真髄に触れました。

これらを使いこなせると、どうしてもここに適切な型を付けたい！となったときにつけられるようになります。

ただ、大体は組み込み型や type-fest などを使えば解決できます。

すぐに諦めずに、それらを使ってどうにかできないか考えてみると、より型安全に書けるようになると思います。

---

TypeScript の文法については（大体）終わったので、次回の TypeScript 勉強会の予定は今のところありません。

もし「こういうことが聞きたい！」などあれば、アンケートに記入いただけると嬉しいです！

---

# おわり

+++

### 参考
* TypeScriptの型入門
	* https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a
* TypeScriptの型初級
	* https://qiita.com/uhyo/items/da21e2b3c10c8a03952f
* TypeScriptの型演習
	* https://qiita.com/uhyo/items/e4f54ef3b87afdd65546
* TypeScript Deep Dive 日本語版
	* https://typescript-jp.gitbook.io/deep-dive/
* TypeScript 練習問題集
	* https://gist.github.com/kenmori/8cea4b82dd12ad31f565721c9c456662

