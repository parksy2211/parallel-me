import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [userChoices, setUserChoices] = useState({
    scenario1: {
      name: '',
      career: '',
      location: '',
      lifestyle: '',
      investment: ''
    },
    scenario2: {
      name: '',
      career: '',
      location: '',
      lifestyle: '',
      investment: ''
    }
  });

  const [simulationResults, setSimulationResults] = useState(null);

  const updateScenario = (scenarioNum, field, value) => {
    setUserChoices(prev => ({
      ...prev,
      [`scenario${scenarioNum}`]: {
        ...prev[`scenario${scenarioNum}`],
        [field]: value
      }
    }));
  };

  const generateSimulation = () => {
    // 시뮬레이션 로직
    const results = {
      scenario1: generateScenarioData(userChoices.scenario1),
      scenario2: generateScenarioData(userChoices.scenario2)
    };
    setSimulationResults(results);
    return results;
  };

  const value = {
    userChoices,
    setUserChoices,
    updateScenario,
    simulationResults,
    setSimulationResults,
    generateSimulation
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 시뮬레이션 데이터 생성 함수
const generateScenarioData = (scenario) => {
  const careerMultipliers = {
    '스타트업': { income: 1.2, stress: 1.4, happiness: 1.3 },
    '대기업': { income: 1.0, stress: 1.0, happiness: 0.9 },
    '프리랜서': { income: 0.9, stress: 0.8, happiness: 1.2 },
    '공무원': { income: 0.8, stress: 0.6, happiness: 1.0 }
  };

  const locationMultipliers = {
    '서울': { cost: 1.5, opportunity: 1.3 },
    '지방': { cost: 0.7, opportunity: 0.8 },
    '해외': { cost: 1.2, opportunity: 1.5 }
  };

  const lifestyleMultipliers = {
    '미니멀': { cost: 0.6, happiness: 1.1 },
    '밸런스': { cost: 1.0, happiness: 1.0 },
    '럭셔리': { cost: 1.8, happiness: 0.9 }
  };

  const career = careerMultipliers[scenario.career] || careerMultipliers['대기업'];
  const location = locationMultipliers[scenario.location] || locationMultipliers['서울'];
  const lifestyle = lifestyleMultipliers[scenario.lifestyle] || lifestyleMultipliers['밸런스'];

  // 10년치 데이터 생성
  const years = 10;
  const assetsData = [];
  const healthData = [];
  const happinessData = [];

  let baseAsset = 50000000; // 초기 자산 5천만원
  let baseIncome = 40000000; // 초기 연봉 4천만원

  for (let i = 0; i <= years; i++) {
    const year = 2025 + i;
    const yearMultiplier = 1 + (i * 0.05); // 연 5% 성장

    const income = baseIncome * career.income * yearMultiplier;
    const cost = income * 0.4 * location.cost * lifestyle.cost;
    const savings = income - cost;

    baseAsset += savings;

    // 투자 수익
    if (scenario.investment === '공격적') {
      baseAsset *= 1.08; // 8% 수익
    } else if (scenario.investment === '보통') {
      baseAsset *= 1.05; // 5% 수익
    } else {
      baseAsset *= 1.02; // 2% 수익
    }

    assetsData.push({
      year,
      value: Math.round(baseAsset)
    });

    // 체력 데이터
    const health = Math.max(20, 100 - (i * 3) - (career.stress * 10) + (lifestyle.cost === 0.6 ? 10 : 0));
    healthData.push({
      year,
      value: Math.round(health)
    });

    // 행복도 데이터
    const happiness = Math.min(100, 70 + (career.happiness * 10) + (lifestyle.happiness * 10) - (career.stress * 5));
    happinessData.push({
      year,
      value: Math.round(happiness + Math.random() * 10 - 5)
    });
  }

  return {
    scenario,
    assetsData,
    healthData,
    happinessData,
    finalAssets: assetsData[assetsData.length - 1].value,
    finalHealth: healthData[healthData.length - 1].value,
    finalHappiness: happinessData[happinessData.length - 1].value,
    risks: generateRisks(scenario, career)
  };
};

const generateRisks = (scenario, career) => {
  const risks = [];

  if (career.stress > 1.2) {
    risks.push({
      type: '건강',
      level: 'high',
      description: '높은 스트레스로 인한 건강 악화 가능성'
    });
  }

  if (scenario.investment === '공격적') {
    risks.push({
      type: '재정',
      level: 'medium',
      description: '시장 변동성에 따른 자산 감소 위험'
    });
  }

  if (scenario.location === '해외') {
    risks.push({
      type: '적응',
      level: 'medium',
      description: '문화 적응 및 언어 장벽'
    });
  }

  if (scenario.career === '스타트업') {
    risks.push({
      type: '커리어',
      level: 'high',
      description: '사업 실패 및 수입 불안정성'
    });
  }

  return risks;
};
