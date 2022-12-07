# TODO
- Login ✔
- Get User Data ✔
- Get User's Repo Data ✔
- Get Repo's Commits Data ✔
- Profile Card Component ✔
- Expandable Data Table Component ✔
- Chart Integration ✔
- Pagination ✔
- Combobox ✔
- Search Bar in Expanded Row ✔
- Download link integration ??
- Priv Repo Access ??
- Pull Access ??

## NOTES

- Selamlar, taskte priv repolara erisim icin baska bir yol var sanirim Github API Docs baktim fakat gozume carpmadi ve pull reqler icin de bu durum mevcut. API request attigimda bos donmekte. Fakat ben her ihtimale karsi belki benim hesabimla ilgili bir sorun olabilir diye dusunerek bu iki taski de yaptim.

- Acikcasi styling icin cok fazla ozenemedim fakat olabildigince sade gozunuzu yormayacak ve github renklerine uygun bir tasarim yapmaya calistim. [BrandColor](https://brandcolors.net/) bu linkte githubun renklerini bulabilirsiniz.

- Okunurlugu basit tutmak icin biraz daha fazla kod yazdim. Bu yuzden kodlarin bir kismi biraz uzun olabilir. Fakat bu benim icin daha okunabilir oldu. Ozellikle redux kullanmamayi tercih ettim biraz prop drilling yaptim.

- Bunlar disinda server.js te biraz isleri uzattigimin farkindayim daha basic sekilde requestler tasarlayabilirdim fakat bu sekilde daha okunabilir ve daha kolay bir sekilde requestleri ayarlamak istedim.

- Download request calismiyor [octorest](https://octokit.rest/GET/repos/%7Bowner%7D/%7Brepo%7D/zipball/%7Bref%7D?token=&owner=&repo=&ref=) bu linkteki gibi bir request attigimda 404 donuyor. Bu yuzden download linkini ekleyemedim.

Task benim icin cok zevkli ve ogreticiydi. Tesekkurler.