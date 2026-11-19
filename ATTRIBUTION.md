# Sources and assets

- 技能的“唱片 × 微缩场景”结构分析来自用户提供的 Summer Swim 参考视频，文件名署名为“梦见两只电子喵”。分析记录位于 `references/reference-analysis.md`。仓库没有包含其视频、截图、音乐或源代码。
- 当前西瓜周末示例以用户提供的生活方式照片为内容参考，输入文件名署名为“呼叫星星💫”。原照片没有收录，也没有据文件名推断公开链接。
- `demo-scene.png` 通过内置 imagegen 生成；完整提示词位于 `references/example-prompt.txt`。`cover.png` 与 `demo.mp4` 由同一程序场景渲染。
- 示例平板画面是重新生成的抽象光影，不复制原输入的影视人物或字幕。文字盘标由程序排版。
- 不分发系统字体。运行依赖为 `@napi-rs/canvas`，视频编码依赖为 FFmpeg；分别遵循其项目许可。
