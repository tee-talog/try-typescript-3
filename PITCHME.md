## TypeScript 入門 〜Conditional Types 編〜

---

### アジェンダ
* 前回の復習
* keyof
* プロパティアクセス型
* Mapped Types
* Conditional Types
* 前回の質問に答える

---

### 前準備
```sh:Terminal
git clone https://github.com/tee-talog/try-typescript-3.git
cd try-typescript-3
npm ci
```

---

# 前回の復習

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




// これ以降を変更する






### 型の書き方
「型アノテーション」というもので型定義する。

`try2.ts`

```ts
// 変数に型付けする場合
// 変数名: 型 = 値
const str: string = 'Hello World'

// 関数に型付けする場合
// (引数: 引数の型): 戻り値の型 => { 処理内容 }
const add = (a: number, b: number): number => a + b
```

型推論があり、型が自明の場合は明示的な型アノテーションの記述を省略できる。

---

### 型の種類
* プリミティブ型
	* string（文字列）
	* number（数値）
	* boolean（真偽値）
	* null
	* undefined
	* リテラル型
* 配列型
* オブジェクト型
* 関数型
* any

---

### 独特な型
* `null`, `undefined` 型
	* TypeScript では、`null`, `undefined` は 1 つの型となっている。いわゆる **null safety**。
* リテラル型
	* `"1"` 型、`334` 型、`true` 型 など。
* any 型
	* **嘘** ※ネタです
	* どの型でも受け入れる。

---

### 言語機能
* ジェネリクス
	* 型を引数として取り、内部でそれを利用する構文。
* クラス
	* 説明略。
* キャスト
	* 別の型として扱えるようにする構文。
* typeof 演算子
	* JavaScript の使い方ができるとともに、型名を書く場所で使用すると、その変数の型が返ってくる。

---

### 言語機能
* Union Types
	* 「◯◯型**または**☓☓型」という型
* 省略可能なプロパティ
	* 定義しなくてもいいプロパティを表す。
*  デコレータ
	* 簡単に言うと、クラスやメソッドなどに適用できる関数。

---

### 型の種類（再掲）
* プリミティブ型
    * string（文字列）
    * number（数値）
    * boolean（真偽値）
    * null
    * undefined
    * リテラル型
* 配列型
* オブジェクト型
* 関数型
* any

---

# 他にどんな型があるのか

---

### プリミティブ型
* symbol
* bigint

---

### symbol, bigint
JavaScript に割と最近入った人たち。

注意点として、ネイティブでこれらが実装されていないと使えない。

`symbol` は ES2015、`bigint` は ES2020 で実装。

`try3.ts`

```ts
{
  const s: symbol = Symbol()
  const bi: bigint = 100n
}
```

---

### 非プリミティブ型
* オブジェクト型
	* オブジェクトリテラル
		* weak type
	* object
	* {}
* unknown
* タプル型
* void
* never

---

### オブジェクトリテラル
前回説明したやつ。

`try4.ts`

```ts
type Human = {
  firstName: string
  lastName: string
}

const tanaka: Human = {
  firstName: 'Tarou',
  lastName: 'Tanaka'
}
```

---

### weak type
省略可能なプロパティのみで構成されたオブジェクトリテラル型。

代入するオブジェクトは、プロパティに存在する値しか持てない。

`try5.ts`

```ts
type CliOptions = {
  verbose?: boolean
  row?: number
  directory?: string
}

const options1: CliOptions = { verbose: true }
// const options2: CliOptions = { row: 10, help: true } // Error
const options3: CliOptions = {} // 例外として {} は代入できる
```

---

### `object`
プリミティブ型と null, undefined 以外なら何でも入る。ちょっと堅い any。

`try6.ts`

```ts
const obj1: object = { foo: 'foo', bar: 'bar', baz: 'baz' }
const obj2: object = { hoge: 'hoge', fuga: 'fuga' }
```

特別な理由がない限り使わないのが吉。

---

### `{}`
プリミティブ型を**含む**、プロパティアクセス可能な値。

つまり null, undefined 以外。

`try7.ts`

```ts
const brace1: {} = { foo: 'foo', bar: 'bar', baz: 'baz' }
const brace2: {} = { hoge: 'hoge', fuga: 'fuga' }
const brace3: {} = 1
const brace4: {} = 'banana'
```

特別な理由がない限り使わないのが吉。

---

### unknown
型安全な any。any の代わりになるべくこれを使うべき。

数値計算もできなければプロパティアクセスも出来ない。

`JSON.parse()` の戻り値で使ってほしい。

`try8.ts`

```ts
const name: unknown = 'value'
// console.log(name.toUpperCase()) // => Error
if (typeof name === 'string') {
  console.log(name.toUpperCase())
}
```

---

### タプル型
複数の値を 1 つの値として扱えるようにした型。配列の各要素に型をつけられる。

関数は分けられないけど複数の値を返したいときに使える。

`try9.ts`

```ts
type TwoQuestion = [string, boolean]
const questionAndAnswer: TwoQuestion = ['あなたは人間ですか？', true]
```

---

### void
なにもないことを表す型。

戻り値のない関数の戻り値の型。

undefined だけを値に取る。

`try10.ts`

```ts
const noReturnFunction = (): void => {}
noReturnFunction() // => undefined
```

---

### never
到達しないことを表す型。

いずれかの case にマッチする switch 文の default や、必ず throw される関数の戻り値の型。

どんな値も never 型の変数には入れられない。

この性質を利用して、switch 文等が条件を網羅できているか確かめることもできる。

---

### never
`try11.ts`

```ts
const value: any = 'success'
const answer: 'success' | 'fail' = value

switch (answer) {
  case 'success':
    console.log('ok')
    break
  case 'fail':
    console.log('ng')
    break
  default:
    console.log('never')
    const test: never = answer
}
```

---

# 他にどんな言語機能があるのか

---

### 今回やるもの
* Type Guard 関数
* readonly
* const assertion
* Intersection Types
* Enum

#### 時間があれば
* Optional Chaining
* Nullish Coalescing

---

### Type Guard 関数
型を絞り込むための関数が作れる。

これを使用して if 文等で絞り込みを行うと、typeof で分岐したときと同じように型が絞り込まれる。

プログラミングをする人が型の安全性を保証する必要がある。

---

### Type Guard 関数
`try12.ts`

```ts
type Human = {
  firstName: string
  lastName: string
}

const isHuman = (arg: any): arg is Human =>
    arg != null &&
    typeof arg.firstName === 'string' &&
    typeof arg.lastName === 'string'

const tanaka: Human | string  = {
  firstName: 'Tarou',
  lastName: 'Tanaka'
}
// console.log(tanaka.firstName) // => Error
if (isHuman(tanaka)) {
  // tanaka は Human 型として扱える
  console.log(tanaka.firstName)
}
```

---

### readonly
プロパティ版の const。

クラス内からも getter only のプロパティ。

`try13.ts`

```ts
class ReadOnlyProperty {
  readonly zero = 0
  one = 1
  // error() { this.zero = 2 } // Error
}

const instance = new ReadOnlyProperty()
console.log(instance.zero)
// instance.zero = 100 // Error
```

---

### const assertion
書き換えを意図しないことを示す。

例えばオブジェクトリテラルに使った場合、プロパティが readonly になり、なるべくリテラル型・タプル型に推論される。

---

### const assertion
`try14.ts`

```ts
const actionCreator = (data: string) => {
  return {
    type: 'SET_DATA',
    payload: { value: [data, 'payload'] }
  } as const
}

console.log(actionCreator('test'))
/* =>
  {
    readonly type: 'SET_DATA',
    readonly payload: {
      readonly value: [string, 'payload']
    }
  }
*/
```

---

### Intersection Types
交差型。Union Types の逆バージョン。

「◯◯型**かつ**☓☓型」という型。

既存の型を拡張するときにも使える。
また、Union Types が絡んだときにも時々出てくる。

`try15.ts`

```ts
type Foo = { foo: string }
type Bar = { bar: number }
type FooBar = Foo & Bar // => { foo: string, bar: number }

const fb: FooBar = { foo: 'baz', bar: 10 }
```

---

### Enum
他の言語とだいたい同じ。

値のスタートは 0 で、任意の値を設定できる。

Union Types にお株を奪われがち。

`try16.ts`

```ts
enum Service {
  Bengo4,
  Zeiri4,
  BusinessLawyers,
  CloudSign
}
```

+++

### Optional Chaining
TypeScript 3.7 から導入された新機能。

あるかどうかわからない（null, undefined かもしれない）ものに対してアクセスが可能。アクセス先の値か undefined が返る。

<small>参考：https://qiita.com/uhyo/items/6cd88c0ea4dc6289387a</small>

`try17.ts`

```ts
const foo = { bar: 'baz' }
const hoge = null

foo?.bar // => baz
hoge?.fuga // => undefined
```

+++

### Nullish Coalescing
これも TypeScript 3.7 から導入された。

null, undefined でなければ演算子の左側が、そうでなければ演算子の右側が返る。

パラメータのデフォルト値を設定するときに重宝するはず。

`try18.ts`

```ts
const foo = 'bar'
const hoge = null

foo ?? 'default' // => 'bar'
hoge ?? 'default' // => 'default'
```

---

# 前回の質問に答える

---

### 配列型の書き方はどうする？
* Array<string>
* string[]

主に後者を利用する。

理由は単純にわかりやすい・見やすいから（個人の感想）。

---

### CloudSign で導入するときにハマったこと
vue-loader のバージョンが古かったためか、モジュール解決がうまくいかなかった。

大絶賛バージョンアップ作業中……

---

### 型の絞り込みはどうやってやるの？
* `typeof`
* Type Guard 関数
* `in`
* `instanceof`
* Tagged Union

---

### `instanceof`
`typeof` と大体同じ。

右側にはコンストラクタ関数を置く。

`try19.ts`

```ts
class A {
  show() {
    console.log('A class!')
  }
}
class B {}

const a = new A()
if (a instanceof A) {
  a.show() // => A class!
}
```

---

### Tagged Union
タグ付けされた Union Types。

説明には Redux がよく取り上げられる気がする。（けどもうあまり使われない？）

---

### Tagged Union
`try20.ts`

```ts
type State = 'state'
type SET_ACTION = { type: 'SET_ACTION'; payload: string }
type REMOVE_ACTION = { type: 'REMOVE_ACTION'; payload: number }
type Action = SET_ACTION | REMOVE_ACTION

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ACTION': return action.payload.toUpperCase() // string
    case 'REMOVE_ACTION': return action.payload.toFixed() // number
    default: const test: never = action; throw new Error() // never
  }
}
console.log(
  reducer('state', {
    type: 'SET_ACTION',
    payload: 'value'
  })
)
```

+++

### 余談 1：他の言語にあるやつ
* interface ある（type とほぼ同義）
* constructor 引数をフィールドに直接定義・代入するやつある（Kotlin とか）
* オーバーライドある
* オーバーロードある

+++

### 余談 2：JavaScript に戻れなくなりそう
書き心地という点では戻れなくなる人が多数いる（らしい）。
ただ、ちょっとしたスクリプトを書くときは JavaScript で書くこともある。

+++

また、TypeScript プロジェクトにおいて、「やっぱり JavaScript にしたい！」というニーズもないことはない。

そんなときでも、コンパイル後のソースを見れば分かるが、かなりきれいな JavaScript コードが生成される。

JavaScript に戻したいときでも、コンパイラオプションをしっかり調整すれば、JavaScript に戻すのもかなり楽に行える。

---

### まとめ
いかがでしたか？（実家のような安心感）

TypeScript では JavaScript のつらみをなんとか解消するために独特な型があります。

それらを使いこなせるようになると、とても柔軟に型付けが出来て、開発がスムーズに進むようになるはずです！

困ったことがあれば気軽に私までご連絡ください！ 一緒に困ります。

---

# 次回 TypeScript 勉強会の予告

---

* keyof
* プロパティアクセス型
* Mapped Types
* **Conditional Types**

---

## 2020 / 01 / 16（木）17:00〜 ※予定

---

# よい TypeScript ライフを！

+++

### 参考
* TypeScriptの型入門
	* https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a
* そろそろJavaScriptに採用されそうなOptional Chainingを今さら徹底解説
	* https://qiita.com/uhyo/items/6cd88c0ea4dc6289387a
* Announcing TypeScript 3.7 Beta
	* https://devblogs.microsoft.com/typescript/announcing-typescript-3-7-beta/
* TypeScript Deep Dive 日本語版
	* https://typescript-jp.gitbook.io/deep-dive/
