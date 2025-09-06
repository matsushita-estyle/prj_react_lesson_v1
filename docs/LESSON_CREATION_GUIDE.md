# レッスン作成ガイド

## 概要

このドキュメントは、新しいレッスンファイルを作成するための手順と参考資料をまとめたものです。

## 作成手順

### 1. 事前準備

1. **LESSON_PLAN.mdを確認**
   - 作成するレッスンの学習目標とタスクを把握
   - 段階的学習のステップ構成を理解

2. **既存レッスンを参照**
   - `src/data/lessons/chapter1/lesson1.ts` - 基本構造とsteps形式
   - `src/data/lessons/chapter1/lesson2.ts` - CSS重点のレッスン構造
   - `src/data/lessons/chapter1/lesson3.ts` - JavaScript重点のレッスン構造
   - `src/lib/types/lesson.ts` - 型定義を確認

### 2. レッスンファイル構造

```typescript
export const chapter1Lesson4: Lesson = {
  id: 'chapter1-lesson4',
  title: 'レッスンタイトル',
  lessonNumber: 4,

  // 教材説明（マークダウン）
  textBook: `# レッスンタイトル

  学習内容の詳細説明...
  `,

  // タスク説明
  taskDescription: `
  # 実践タスク

  具体的な課題内容...
  `,

  // 段階的学習ステップ
  steps: [
    {
      stepNumber: 1,
      title: 'ステップタイトル',
      instruction: `詳細な指示...`,
      hint: '学習者へのヒント',
      tips: ['学習のヒントや補足説明'],
      tipsTitle: 'ヒントのタイトル',
      copyableCode: [
        {
          label: 'コードの説明',
          code: `サンプルコード`,
        }
      ],
      initialStepFiles: {
        'ファイル名': {
          content: `初期コード`,
          isVisible: true
        }
      },
      solutionCodes: [{
        code: `解答コード`,
        solutionTargetFile: 'ファイル名',
        label: '解答の説明'
      }],
      validation: {
        includes: ['チェック項目'],
      },
    },
    // 他のステップ...
  ],

  // 新しいプロジェクト構造形式
  projectStructure: {
    files: [
      {
        path: 'react-app/App.jsx',
        content: `初期状態のコード`,
        language: 'javascript',
        description: 'メインのReactコンポーネント',
        order: 1,
      },
      {
        path: 'react-app/styles.css',
        content: `スタイルシート`,
        language: 'css',
        description: 'アプリのスタイルシート',
        order: 2,
      }
    ],
    defaultFile: 'react-app/App.jsx',
    folderConfig: {
      displayOrder: ['react-app'],
    },
  },

  // ナビゲーション
  previousLessonId: 'chapter1-lesson3',
  nextLessonId: 'chapter1-lesson5',
}
```

### 3. レッスン4の具体的要件

**テーマ**: コンポーネント分割の実践

**学習目標**:

- コンポーネントを小さな単位に分割する方法を学習
- 再利用可能なコンポーネントの設計と実装
- import/exportを使ったモジュール化

**段階的学習**:

1. ProductCardコンポーネントの分割
2. ProductImageコンポーネントの作成
3. ProductInfoコンポーネントの作成
4. Appで複数商品の表示
5. デザインの統一と再利用性の確認

**参考にすべき既存レッスン**:

- lesson3: 商品カードの完成形を基に分割作業を行う
- lesson1: 段階的なsteps構造とcopyableCodeの活用方法
- lesson2: 複数ファイル（App.jsx + styles.css）の管理方法

### 4. 重要なポイント

#### textBookセクション

- Reactの概念説明
- なぜその技術が必要かの背景
- 実装例とコードサンプル
- 学習のまとめ

#### steps構成

- 各ステップは独立して理解できるようにする
- instructionは具体的で分かりやすく
- copyableCodeで学習者の作業効率を向上
- hintでつまずきポイントをサポート

#### ファイル管理

- defaultFileを設定して最初に開くファイルを指定
- 複数ファイルの場合は適切な初期状態を設定
- solutionFilesは完全動作する状態にする

#### バリデーション

- validation.includesで最低限のチェック項目を設定
- 学習目標が達成できているかを確認

### 5. 作成依頼テンプレート

```
lesson04を作成してください。以下の要件に従って作成をお願いします：

**基本情報**:
- ファイル: `src/data/lessons/chapter1/lesson4.ts`
- テーマ: コンポーネント分割の実践
- 学習目標: [LESSON_PLAN.mdの該当箇所を参照]

**参考レッスン**:
- lesson1.ts: steps構造とcopyableCodeの使い方
- lesson2.ts: 複数ファイル管理方法
- lesson3.ts: 商品カード完成形（分割前の状態として参考）

**段階的学習要件**:
1. [ステップ1の内容]
2. [ステップ2の内容]
3. [ステップ3の内容]
4. [ステップ4の内容]
5. [ステップ5の内容]

**技術的要件**:
- 既存のlesson3の商品カードを基に分割作業
- import/export文の正しい使用
- 再利用可能なコンポーネント設計
- 複数の商品データでの動作確認

作成後はtypecheck, lintの実行をお願いします。
```

## 注意事項

- 既存レッスンとの整合性を保つ
- 学習者の理解レベルに応じた難易度設定
- 実践的で意味のある課題設計
- エラーメッセージへの配慮
- 美しいデザインとユーザビリティの両立

---

このガイドに従って、質の高いレッスンを効率的に作成できます。
