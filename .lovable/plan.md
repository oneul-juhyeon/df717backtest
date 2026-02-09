
# Correlation 차트 단위 수정 (€ → %)

## 현재 문제점
- 상관관계 차트의 데이터는 **퍼센트 수익률(%)** 데이터임
- 하지만 현재 Y축과 툴팁 모두 유로(€) 통화 단위로 표시 중
- 이미지에서 보이듯이 "1337.8%"와 같이 표시되어야 함

---

## 변경 사항

### 파일: `src/components/backtest/charts/CorrelationEquityChart.tsx`

| 위치 | 현재 | 변경 후 |
|------|------|---------|
| 툴팁 값 포맷 | `formatCurrency(entry.value)` → €291 | `{entry.value.toFixed(1)}%` → 1337.8% |
| Y축 포맷 | `€${(value / 1000).toFixed(0)}K` | `${value.toFixed(0)}%` |

---

## 세부 변경 내용

### 1. 새 퍼센트 포맷 함수 추가
```typescript
const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
};
```

### 2. Y축 tickFormatter 수정
```typescript
<YAxis 
  tickFormatter={(value) => `${value.toFixed(0)}%`}
  ...
/>
```

### 3. 툴팁 값 표시 수정
```tsx
<span className="text-xs font-mono text-foreground">
  {entry.value.toFixed(1)}%
</span>
```
