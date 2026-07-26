# JM-EHunter

[中文版](README_CN.md) [日本語](README_JP.md)

Enhanced manga reader based on [EHunter](https://github.com/hanFengSan/eHunter), with full support for both E-Hentai and 18comic (JM).

## Preview

<img src="https://raw.githubusercontent.com/FPV-G/JM-EHunter/master/github_image/LS%20(1).png" width="800" />

<img src="https://raw.githubusercontent.com/FPV-G/JM-EHunter/master/github_image/LS%20(2).png" width="800" />

## What's New

This fork extends the original EHunter with the following enhancements:

### 18comic (JM) Support
- Full compatibility with 18comic (禁漫天堂) gallery pages
- Automatic platform detection and theme adaptation
- Orange theme for 18comic, green theme for E-Hentai sites

### Animation Speed Control
- Adjustable page turn animation speed (0.5x to 2.0x)
- Unified base animation duration (0.70s) across all animation modes
- Real-time speed adjustment from the top bar

### Animation Reverse Toggle
- Reverse page turn animation direction for both mouse wheel and keyboard
- Located in the top bar next to animation speed
- Allows users to customize animation behavior based on personal preference

### Improved Animation Behavior
- Animation override: continuous page turns no longer wait for previous animations to complete
- Four animation modes: horizontal slide, book flip (3D), rotate (2D), vertical slide
- Consistent physical direction logic for keyboard and mouse wheel controls

### UI Improvements
- Branding updated to "JM-EHUNTER" across all interface elements
- Platform-specific color themes (orange for 18comic, green for E-Hentai)
- Enhanced top bar with quick access to animation controls

## Features Inherited from Original EHunter

- Multiple reading modes (scroll and book)
- Thumbnail view and quick navigation
- Customizable page layout (single/double page)
- RTL/LTR reading direction support
- Keyboard shortcuts and mouse wheel navigation
- Download functionality
- Multiple language support (Chinese, English, Japanese)

## Installation

This is a userscript for Tampermonkey or similar browser extensions.

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. Build the project (see Development section)
3. Open Tampermonkey dashboard
4. Click the "Utilities" tab, and drag the `jmehunter.iife.js` file downloaded from [Release](https://github.com/FPV-G/JM-EHunter/releases) into the Tampermonkey window
5. Click "Install"

The script will automatically activate on E-Hentai and 18comic gallery pages.

## Development

### Prerequisites
- Node.js 14 or higher
- npm or yarn

### Setup

```bash
npm install
```

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build-prod
```

The output file will be in `dist/jmehunter.iife.js`.

## Usage

### Animation Speed
In book mode, use the "Animation Speed" dropdown in the top bar to adjust page turn speed:
- 0.5x (slow)
- 0.75x
- 1.0x (default)
- 1.25x
- 1.5x
- 2.0x (fast)

### Animation Reverse
Toggle the "Reverse Animation" switch in the top bar to reverse the animation direction for both keyboard arrow keys and mouse wheel scrolling.

### Keyboard Shortcuts
- Right arrow: trigger right-to-left animation
- Left arrow: trigger left-to-right animation
- Arrow up/down: previous/next page in scroll mode
- Other shortcuts: see settings dialog

## Tech Stack

- Vue 3
- TypeScript
- Vite
- SCSS

## License

MIT License

## Credits

This project is based on [EHunter](https://github.com/hanFengSan/eHunter) by hanFengSan. Special thanks to the original author for creating such an excellent manga reader.

## Links

- [Original EHunter](https://github.com/hanFengSan/eHunter)
- [Issue Tracker](https://github.com/FPV-G/JM-EHunter/issues)

---

**Disclaimer**: This tool is for educational and personal use only. Please comply with local laws and regulations.
