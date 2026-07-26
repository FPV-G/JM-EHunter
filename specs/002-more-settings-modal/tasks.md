# Tasks: 统一更多设置弹窗

**Input**: Design documents from `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/`
**Prerequisites**: `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/plan.md`, `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/spec.md`, `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/research.md`, `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/data-model.md`, `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/contracts/settings-modal.openapi.yaml`

**Tests**: Spec未要求先写自动化测试；本任务单以类型检查 + `npm run dev` + `chrome-devtools-mcp` 运行时验收为主。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Descriptions include exact file paths

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 对齐统一设置弹窗的文档契约与实现入口，建立开发骨架。

- [X] T001 Create unified settings component scaffold in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T002 [P] Add placeholder icon asset for more-settings entry in `/Users/alex/Desktop/works/js/JM-EHunter/core/assets/svg/more-settings.svg`
- [X] T003 [P] Add i18n keys scaffold for modal categories/actions in `/Users/alex/Desktop/works/js/JM-EHunter/core/assets/i18n.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 完成所有用户故事共享的数据结构、状态流和持久化约束。

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define settings category and item metadata model in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T005 Implement schema-versioned preference snapshot and invalid-value fallback in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T006 Implement global quick-setting order data model with pinned reading-mode rule in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T007 Add modal open/close and active-category state/actions in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T008 [P] Wire userscript-first persistence fallback path for new settings keys in `/Users/alex/Desktop/works/js/JM-EHunter/src/platform/base/service/PlatformService.js`
- [X] T009 [P] Define factory-reset operation states and error feedback model in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 打开并使用统一设置入口 (Priority: P1) 🎯 MVP

**Goal**: 顶栏新增统一“更多设置”图标并打开弹窗，支持左侧分类跳转、右侧平滑滚动与高亮，且删除旧二层更多设置交互。

**Independent Test**: 点击顶栏图标打开/关闭弹窗；点击左侧分类可平滑定位并高亮；确认旧二层更多设置区域不再出现。

### Implementation for User Story 1

- [X] T010 [US1] Add new more-settings icon button and click binding in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/TopBar.vue`
- [X] T011 [US1] Remove legacy second-row more-settings expand behavior in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/TopBar.vue`
- [X] T012 [US1] Mount `MoreSettingsDialog` from top bar and bind visibility state in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/TopBar.vue`
- [X] T013 [US1] Implement two-column modal shell and section anchor layout in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T014 [US1] Implement smooth category jump and active-category highlight sync in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T015 [US1] Implement responsive behavior (desktop two-column, narrow-screen compact category jump) in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T016 [US1] Update top-bar and modal interaction style rules in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/TopBar.vue`
- [X] T017 [US1] Validate US1 runtime flow with dev server and browser checks in `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/quickstart.md`

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - 按分类配置阅读参数 (Priority: P2)

**Goal**: 将通用/滚动模式/书页模式/其他分组中的全部现有可配置项迁移至统一弹窗，并实现“清空缓存并重置全部设置”确认执行。

**Independent Test**: 在弹窗内逐分类核对和修改配置，变更可立即生效并持久化；“其他”中的 github/版本/重置流程按规格生效。

### Implementation for User Story 2

- [X] T018 [P] [US2] Add missing category and setting labels/tips for CN/EN/JP in `/Users/alex/Desktop/works/js/JM-EHunter/core/assets/i18n.ts`
- [X] T019 [US2] Render General section controls (language, load number, auto source retry) in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T020 [US2] Render Scroll Mode section controls from existing configurable set in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T021 [US2] Render Book Mode section controls from existing configurable set in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T022 [US2] Render Other section with github link and version display in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T023 [US2] Implement confirm-before-execute factory-reset dialog flow in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T024 [US2] Execute clear-cache plus reset-all-settings action and state refresh in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [ ] T025 [US2] Reuse existing EH cache clear integration for reset operation in `/Users/alex/Desktop/works/js/JM-EHunter/src/platform/eh/service/AlbumCacheService.ts`
- [X] T026 [US2] Validate US2 runtime flow with category completeness and reset confirmation checks in `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/quickstart.md`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - 管理顶部快捷配置栏 (Priority: P3)

**Goal**: 在“快捷设置”分组实现快捷项可见性配置与拖拽排序，遵守“阅读模式固定第一位 + 全局排序 + 当前模式过滤”。

**Independent Test**: 勾选/取消快捷项并拖拽排序后，顶部快捷栏按全局顺序展示；切换阅读模式仅显示该模式适用项，固定项始终第一位。

### Implementation for User Story 3

- [X] T027 [US3] Build quick-settings management section UI in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T028 [US3] Enforce pinned reading-mode item constraints (always selected, fixed order 0) in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T029 [US3] Implement non-pinned item selection toggle persistence in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T030 [US3] Implement drag-and-drop reorder for selected quick items in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [X] T031 [US3] Apply global-order plus current-mode filter projection for top quick bar in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/TopBar.vue`
- [X] T032 [US3] Sync quick-action display source with new preference model in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/QuickActionList.vue`
- [X] T033 [US3] Add reset/fallback handling for invalid quick-order snapshots in `/Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts`
- [X] T034 [US3] Validate US3 runtime flow for ordering/filtering/pinned-item rules in `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/quickstart.md`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 完成跨故事一致性、文档回填与最终验收。

- [X] T035 [P] Normalize modal visual spacing, typography, and responsive polish in `/Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue`
- [ ] T036 [P] Clean up obsolete i18n keys/usages related to removed second-row settings in `/Users/alex/Desktop/works/js/JM-EHunter/core/assets/i18n.ts`
- [ ] T037 Run type validation for final changes with `npm run type-check` from `/Users/alex/Desktop/works/js/JM-EHunter/package.json`
- [X] T038 Run runtime verification with `npm run dev` and browser checks documented in `/Users/alex/Desktop/works/js/JM-EHunter/specs/001-more-settings-modal/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies, starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1, blocks all story work.
- **Phase 3 (US1)**: Depends on Phase 2 completion.
- **Phase 4 (US2)**: Depends on Phase 2 completion; can run after US1 MVP validation.
- **Phase 5 (US3)**: Depends on Phase 2 completion; should integrate after US1 UI shell exists.
- **Phase 6 (Polish)**: Depends on selected story completion (US1 for MVP, US1+US2+US3 for full scope).

### User Story Dependencies

- **US1 (P1)**: Independent after foundational phase; no dependency on US2/US3.
- **US2 (P2)**: Independent functional slice after foundational phase; reuses US1 modal shell.
- **US3 (P3)**: Independent behavior slice after foundational phase; relies on modal presence and store primitives.

### Dependency Graph

- Setup -> Foundational -> US1 (MVP)
- Setup -> Foundational -> US2
- Setup -> Foundational -> US3
- US1 + US2 + US3 -> Polish

---

## Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel.
- **Foundational**: T008 and T009 can run in parallel with T004-T007 once state model skeleton exists.
- **US2**: T018 can run in parallel with T019-T022.
- **Polish**: T035 and T036 can run in parallel.

## Parallel Example: User Story 1

```bash
Task: "T013 Implement two-column modal shell in /Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue"
Task: "T016 Update top-bar and modal interaction style rules in /Users/alex/Desktop/works/js/JM-EHunter/core/components/TopBar.vue"
```

## Parallel Example: User Story 2

```bash
Task: "T018 Add missing category and setting labels in /Users/alex/Desktop/works/js/JM-EHunter/core/assets/i18n.ts"
Task: "T022 Render Other section with github/version in /Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue"
```

## Parallel Example: User Story 3

```bash
Task: "T029 Implement quick-item selection persistence in /Users/alex/Desktop/works/js/JM-EHunter/core/store/app.ts"
Task: "T030 Implement drag-and-drop reorder in /Users/alex/Desktop/works/js/JM-EHunter/core/components/MoreSettingsDialog.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) and run T017.
3. Stop and validate: modal entry, category jump/highlight, and removal of old second-row settings.

### Incremental Delivery

1. Deliver MVP with US1.
2. Add US2 for full category migration and destructive reset flow.
3. Add US3 for quick-setting management and ordering/filtering rules.
4. Finish with Phase 6 cross-cutting polish and runtime verification.

### Parallel Team Strategy

1. One developer handles store foundational work (T004-T009).
2. After foundation: 
   - Dev A: US1 (entry/modal shell)
   - Dev B: US2 (category migrations + reset flow)
   - Dev C: US3 (quick settings behavior)
3. Merge in priority order with checkpoint validation per story.

---

## Notes

- Every task line follows required checklist format with Task ID and file path.
- [P] tasks are parallel-safe by file/dependency separation.
- [USx] labels are used only in user story phases.
- Runtime validation (`npm run dev` + `chrome-devtools-mcp`) is mandatory before completion.
