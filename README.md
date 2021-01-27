公開している Web サイトのソースコードです。

## client

[client] ディレクトリは [next.js](https://nextjs.org/) で作成したフロントエンドの部分です。
src は [atomic design](https://bradfrost.com/blog/post/atomic-web-design/)を参考にしてフォルダは分けています。
ホスティングは`firebase`を利用して deploy を行っています。

## server

[server] ディレクトリは node.js + express で作成したバッグエンドの部分です。
api を作成し、データは`cloud firestore`に保存するようにしています。

## clone

[clone] ディレクトリは現在、未完成です。 nuxt.js を利用して特定サイトの clone coding を行う予定です。
