
# 14개 전략 확장을 위한 아키텍처 리팩토링

## 핵심 전략: 데이터 기반 동적 렌더링

현재 전략마다 별도 컴포넌트를 만드는 방식에서, **하나의 범용 컴포넌트 + 전략별 데이터 설정**으로 전환합니다.

---

## 제안 구조

```text
src/
├── config/
│   └── strategies.ts          # 전략 메타데이터 (기존 + 확장)
│
├── data/
│   └── strategies/
│       ├── dfcovenant.ts      # DFcovenant 데이터
│       ├── dftrust.ts         # DFtrust 데이터
│       └── [strategy].ts      # 새 전략 추가 시 이 파일만 생성
│
├── hooks/
│   └── useStrategyData.ts     # 범용 데이터 훅 (strategyId로 분기)
│
├── pages/
│   ├── StrategyLanding.tsx    # 범용 랜딩 페이지
│   └── StrategyReport.tsx     # 범용 상세 리포트 페이지
│
├── components/backtest/
│   ├── HeroSection.tsx        # strategyId prop 받아 동적 렌더링
│   ├── PerformanceMetrics.tsx # strategyId prop 받아 동적 렌더링
│   ├── RiskMetrics.tsx        # strategyId prop 받아 동적 렌더링
│   ├── TabsContainer.tsx      # 범용 (Methodology, Correlation 공유)
│   ├── MethodologySection.tsx # 공유 (변경 없음)
│   └── PortfolioCorrelation.tsx # 공유 (변경 없음)
```

---

## 구현 단계

### 1단계: 전략 설정 확장

`src/config/strategies.ts` 확장

```typescript
export interface Strategy {
  id: string;
  name: string;
  description: string;
  landingPath: string;
  reportPath: string;
  symbol: string;
  period: string;
  currency: string;           // EUR, USD 등
  heroMetrics: HeroMetric[];  // 상단 5개 지표
  performanceMetrics: PerformanceMetric[];
  riskMetrics: RiskMetric[];
  tradingPeriod: TradingPeriod;
  reportInfo: ReportInfo;
  // ... 기타 데이터
}
```

### 2단계: 전략별 데이터 파일 통합

기존 `backtestData.ts`, `dftrustData.ts` → `strategies/[id].ts`로 재구성

```typescript
// src/data/strategies/dfcovenant.ts
export const dfcovenantConfig: StrategyConfig = {
  heroMetrics: [
    { value: "€722,988", label: "NET PROFIT" },
    // ...
  ],
  performanceMetrics: {
    primary: [...],
    secondary: [...],
  },
  riskMetrics: [...],
  equityChartTitle: "Equity Curve in EUR (2016-2026) — €10,000 → €732,988",
  reportLink: "/backtest-report",
  // ...
};
```

### 3단계: 범용 컴포넌트로 리팩토링

**HeroSection.tsx** - prop으로 전략 데이터 주입

```typescript
interface HeroSectionProps {
  strategyId: string;
}

const HeroSection = ({ strategyId }: HeroSectionProps) => {
  const config = getStrategyConfig(strategyId);
  
  return (
    <section>
      <h1>{config.name}</h1>
      <div className="grid grid-cols-5">
        {config.heroMetrics.map(...)}
      </div>
    </section>
  );
};
```

**PerformanceMetrics.tsx** - 동일 패턴

```typescript
const PerformanceMetrics = ({ strategyId }: Props) => {
  const config = getStrategyConfig(strategyId);
  const { equityData, isLoading } = useStrategyData(strategyId);
  
  return (
    <div>
      {config.performanceMetrics.primary.map(...)}
      <EquityCurveChart data={equityData} title={config.equityChartTitle} />
      <Link to={config.reportLink}>View Full Report</Link>
    </div>
  );
};
```

### 4단계: 범용 페이지 컴포넌트

**StrategyLanding.tsx**

```typescript
const StrategyLanding = () => {
  const { strategyId } = useParams();
  const strategy = getStrategyById(strategyId || "dfcovenant");
  
  return (
    <div>
      <Header currentStrategy={strategy.id} />
      <HeroSection strategyId={strategy.id} />
      <TabsContainer strategyId={strategy.id} />
      <Footer />
    </div>
  );
};
```

**StrategyReport.tsx**

```typescript
const StrategyReport = () => {
  const { strategyId } = useParams();
  const { data, isLoading } = useStrategyData(strategyId);
  const config = getStrategyConfig(strategyId);
  
  return (
    <div>
      <ReportHeader strategy={config} />
      <KeyStatsGrid stats={config.keyStats} />
      <EquityCurveChart data={data.equityData} />
      {/* ... 동일한 차트 컴포넌트들 재사용 */}
    </div>
  );
};
```

### 5단계: 라우팅 간소화

**App.tsx**

```typescript
<Routes>
  {/* 기본 전략 (DFcovenant) */}
  <Route path="/" element={<StrategyLanding />} />
  <Route path="/backtest-report" element={<StrategyReport />} />
  
  {/* 동적 전략 라우트 */}
  <Route path="/:strategyId" element={<StrategyLanding />} />
  <Route path="/:strategyId/backtest-report" element={<StrategyReport />} />
  
  {/* Correlation은 고정 */}
  <Route path="/correlation-report" element={<CorrelationReport />} />
</Routes>
```

---

## 새 전략 추가 시 작업 목록

14개 전략 추가 시, 전략당 필요한 작업:

| 작업 | 파일 | 내용 |
|-----|-----|-----|
| 1 | `src/config/strategies.ts` | 전략 메타데이터 추가 (5줄) |
| 2 | `src/data/strategies/[id].ts` | 전략별 데이터 파일 생성 |
| 3 | `public/[id]-backtest.html` | 원본 HTML (ZIP 없이 직접 사용 가능) |

**끝.** 페이지 파일, 컴포넌트 파일 추가 불필요.

---

## 변경 전후 비교

| 항목 | 현재 (2개 전략) | 리팩토링 후 (16개 전략) |
|-----|---------------|----------------------|
| 랜딩 페이지 파일 | 2개 | **1개** |
| 상세 리포트 파일 | 2개 | **1개** |
| HeroSection | 2개 | **1개** |
| PerformanceMetrics | 2개 | **1개** |
| RiskMetrics | 2개 | **1개** |
| TabsContainer | 2개 | **1개** |
| 데이터 훅 | 2개 | **1개** (범용) |
| 전략별 데이터 | 2개 | 16개 (데이터만) |
| **총 유지보수 파일** | ~14개 | **~8개 + 데이터 16개** |

---

## Methodology / Correlation 처리

- **Methodology**: 현재 그대로 공유 (변경 없음)
- **Correlation**: 상위 3개 전략 고정으로 현재 그대로 유지
  - 추후 동적으로 변경 필요 시, 별도 설정 파일로 분리 가능

---

## 기술적 고려사항

### 데이터 로딩 전략
- **Lazy Loading**: 각 전략 데이터 파일을 dynamic import로 필요 시에만 로드
- **캐싱**: React Query로 한번 로드된 데이터 캐시

```typescript
const useStrategyData = (strategyId: string) => {
  return useQuery({
    queryKey: ['strategy', strategyId],
    queryFn: () => import(`@/data/strategies/${strategyId}`),
    staleTime: Infinity,
  });
};
```

### 타입 안전성
- 모든 전략 데이터에 동일한 인터페이스 강제
- 누락된 필드 컴파일 타임 에러로 감지

---

## 추천 구현 순서

1. **config/strategies.ts 확장** - Strategy 인터페이스에 필요한 모든 데이터 필드 추가
2. **data/strategies/ 디렉토리 생성** - dfcovenant.ts, dftrust.ts로 기존 데이터 이전
3. **범용 훅 생성** - useStrategyData.ts
4. **HeroSection 범용화** - strategyId prop 방식으로 변경
5. **PerformanceMetrics, RiskMetrics 범용화**
6. **TabsContainer 범용화**
7. **StrategyLanding, StrategyReport 페이지 생성**
8. **라우팅 업데이트**
9. **기존 중복 파일 제거** (DFtrustXxx 시리즈)

---

## 결론

현재 구조의 [Results | Methodology | Correlation] 탭 구성은 유지하되, **컴포넌트 중복을 제거하고 데이터 기반으로 동적 렌더링**하는 것이 최선입니다.

새 전략 추가 시 **데이터 파일 하나만 추가**하면 되므로, 14개 전략 확장에도 유지보수가 간단해집니다.
