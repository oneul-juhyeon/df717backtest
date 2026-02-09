# 14개 전략 확장을 위한 아키텍처 리팩토링

## ✅ 완료 상태 (2026-02-09)

### 구현 완료된 전략 (13개)
JSON 데이터 기반으로 랜딩 페이지 + 상세 리포트 구현:

| # | 전략명 | Symbol | Period | 경로 |
|---|--------|--------|--------|------|
| 1 | DFart | AUDCAD | M15 | /dfart |
| 2 | DFmate | Multi | H1 | /dfmate |
| 3 | DFbeauty | Multi | H1 | /dfbeauty |
| 4 | DFadam | Multi | H1 | /dfadam |
| 5 | DFreap | Multi | H1 | /dfreap |
| 6 | DFboaz | Multi | H1 | /dfboaz |
| 7 | DFharvest | Multi | H1 | /dfharvest |
| 8 | DFtrust | XAUUSD | H1 | /dftrust |
| 9 | DFlight | Multi | H1 | /dflight |
| 10 | DFsight | Multi | H1 | /dfsight |
| 11 | DFknight | Multi | H1 | /dfknight |
| 12 | DFpower | Multi | H1 | /dfpower |
| 13 | DFgravity | XAUUSD | H1 | /dfgravity |

### 기존 구현 유지 (1개)
- **DFcovenant** - XAUUSD, H1 (메인 전략, 기존 HTML 파싱 방식 유지)

---

## 아키텍처

### 파일 구조
```
public/strategies/
└── all_strategies_data.json     # 13개 전략 데이터 (JSON)

src/
├── config/strategies.ts          # 전략 메타데이터 + 라우트 설정
├── types/strategyData.ts         # JSON 데이터 타입 정의
├── hooks/useUniversalStrategyData.ts  # JSON 데이터 로딩 훅
├── pages/
│   ├── UniversalStrategyLanding.tsx   # JSON 기반 랜딩 페이지
│   └── UniversalStrategyReport.tsx    # JSON 기반 상세 리포트
└── components/backtest/
    ├── JsonPerformanceMetrics.tsx     # JSON 데이터용 성과 지표
    ├── JsonRiskMetrics.tsx            # JSON 데이터용 리스크 지표
    └── TabsContainer.tsx              # isJsonStrategy 분기 처리
```

### 라우팅
- `/` → DFcovenant 랜딩 (기존)
- `/backtest-report` → DFcovenant 상세 (기존)
- `/dftrust` → DFtrust 랜딩 (기존 유지)
- `/{strategyId}` → UniversalStrategyLanding (JSON 기반)
- `/{strategyId}/backtest-report` → UniversalStrategyReport (JSON 기반)

---

## 새 전략 추가 방법

1. `public/strategies/all_strategies_data.json`에 전략 데이터 추가
2. `src/config/strategies.ts`의 `jsonStrategies` 배열에 메타데이터 추가

```typescript
{
  id: "dfnewstrategy",
  name: "DFnewstrategy",
  description: "New Strategy Description",
  landingPath: "/dfnewstrategy",
  reportPath: "/dfnewstrategy/backtest-report",
  symbol: "XAUUSD",
  period: "H1",
}
```

**끝.** 페이지/컴포넌트 파일 수정 불필요.

---

## 핵심 변경사항

### Before (전략당 필요한 작업)
- 랜딩 페이지 파일 생성
- 상세 리포트 페이지 파일 생성
- HeroSection 컴포넌트 생성
- PerformanceMetrics 컴포넌트 생성
- RiskMetrics 컴포넌트 생성
- 데이터 훅 생성
- 라우트 추가

### After (전략당 필요한 작업)
1. JSON 데이터 추가 (자동 생성 가능)
2. 메타데이터 1줄 추가

**개발 시간: 전략당 30분 → 5분**
