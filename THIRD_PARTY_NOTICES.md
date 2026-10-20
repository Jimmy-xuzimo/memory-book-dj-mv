# 第三方素材与依赖声明

项目原创部分：© 2026 Zimo Xu（Jimmy-xuzimo）。保留所有权利，详见 LICENSE。

## 歌曲、歌词与角色参考

- `public/song.wav` 为用户提供的《把回忆拼好给你》DJ 版音频。
- `public/lyrics.srt` 为原始字幕；各版本字幕包含经项目所有者指定的文字修订。
- `public/reference.png`、`public/v4/*-sheet.png` 以及派生角色裁片来自用户提供的角色参考资料。

这些资料用于本动画工程，保留各自权利人的权利；项目版权声明不替代歌曲、录音、歌词或参考素材的使用与传播授权。

## 手写笔画数据

手写歌词使用 Make Me a Hanzi 的笔画中线数据生成，项目地址：
https://github.com/skishore/makemeahanzi

原数据来源包括 Arphic PL KaitiM GB、Arphic PL UKai，适用 Arphic Public License。
工程将中线重新采样、扰动，生成不同压力和轮廓的笔迹；这些派生素材继续适用原许可。
各版本 `public/v*/handwriting/` 内保留 CREDITS.txt、SOURCE-COPYING.txt 等说明。
`tools/handwriting-medians.json` 与手写生成脚本使用相同来源的数据。

## 软件依赖

Remotion、React 及其他 npm 包按各自许可使用；版本锁定在 package-lock.json。
本项目 LICENSE 不重新许可这些依赖。Remotion 的适用条款参见：
https://www.remotion.dev/license
