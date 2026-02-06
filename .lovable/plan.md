

# StrategySelector 드롭다운 애니메이션 개선

## 현재 문제점
- 드롭다운 열릴 때 좌측으로 살짝 움직이는 어색한 모션
- 기본 zoom-in/out 애니메이션이 세련되지 않음
- SpaceX 스타일의 미니멀하고 부드러운 애니메이션 필요

---

## 해결 방안

### 1. 드롭다운 Content 위치 조정
`align="end"`를 `align="start"`로 변경하여 트리거 버튼과 정렬이 일관되게 유지

### 2. SpaceX 스타일 애니메이션 추가
- 줌 효과 제거 (zoom-out-95, zoom-in-95 삭제)
- 부드러운 fade + 아래로 슬라이드 효과만 사용
- 애니메이션 duration을 좀 더 길게 (200ms → 300ms)
- ease-out 타이밍 함수로 자연스러운 감속

### 3. ChevronDown 아이콘 회전 애니메이션
- 열림/닫힘 상태에 따라 180도 회전
- 부드러운 트랜지션 적용

---

## 파일 변경

| 파일 | 변경 내용 |
|------|-----------|
| `src/components/ui/dropdown-menu.tsx` | Content 애니메이션 클래스 수정 - zoom 제거, fade + slide만 유지 |
| `src/components/backtest/StrategySelector.tsx` | align 변경, ChevronDown 회전 애니메이션 추가 |

---

## 기술적 세부사항

### DropdownMenuContent 애니메이션 변경

**현재:**
```
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
data-[side=bottom]:slide-in-from-top-2
```

**변경 후:**
```
data-[state=open]:animate-in data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
data-[side=bottom]:slide-in-from-top-1
```
- zoom 효과 제거로 위치 이동 문제 해결
- slide 거리를 2에서 1로 줄여 더 미세하게

### ChevronDown 회전 효과

```tsx
<ChevronDown 
  className={cn(
    "h-4 w-4 opacity-50 transition-transform duration-200",
    open && "rotate-180"
  )} 
/>
```

드롭다운이 열리면 화살표가 위로 향하도록 180도 회전

