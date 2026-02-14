import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const ResultPage = () => {
  const navigate = useNavigate();
  const { simulationResults, userChoices } = useApp();

  if (!simulationResults) {
    navigate('/choice');
    return null;
  }

  const { scenario1, scenario2 } = simulationResults;

  // 자산 데이터 병합
  const assetData = scenario1.assetsData.map((item, index) => ({
    year: item.year,
    scenario1: item.value,
    scenario2: scenario2.assetsData[index].value
  }));

  // 건강/행복 레이더 차트 데이터
  const radarData = [
    {
      subject: '최종 자산',
      scenario1: (scenario1.finalAssets / 1000000000) * 10, // 억 단위로 정규화
      scenario2: (scenario2.finalAssets / 1000000000) * 10
    },
    {
      subject: '건강',
      scenario1: scenario1.finalHealth,
      scenario2: scenario2.finalHealth
    },
    {
      subject: '행복도',
      scenario1: scenario1.finalHappiness,
      scenario2: scenario2.finalHappiness
    }
  ];

  const formatCurrency = (value) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억`;
    }
    return `${(value / 10000).toFixed(0)}만`;
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      default: return 'text-green-500 bg-green-500/10 border-green-500';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title mb-4">시뮬레이션 결과</h1>
          <p className="text-gray-400">10년 후, 두 개의 평행우주</p>
        </motion.div>

        {/* 시나리오 요약 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            className="card border-l-4 border-primary-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary-500">
              {userChoices.scenario1.name}
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>💼 {scenario1.scenario.career}</p>
              <p>📍 {scenario1.scenario.location}</p>
              <p>✨ {scenario1.scenario.lifestyle}</p>
              <p>💰 {scenario1.scenario.investment} 투자</p>
            </div>
          </motion.div>

          <motion.div
            className="card border-l-4 border-purple-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-500">
              {userChoices.scenario2.name}
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>💼 {scenario2.scenario.career}</p>
              <p>📍 {scenario2.scenario.location}</p>
              <p>✨ {scenario2.scenario.lifestyle}</p>
              <p>💰 {scenario2.scenario.investment} 투자</p>
            </div>
          </motion.div>
        </div>

        {/* 자산 그래프 */}
        <motion.div
          className="card mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">💰 자산 변화 추이</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={assetData}>
              <defs>
                <linearGradient id="colorScenario1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorScenario2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="year" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatCurrency} />
              <Tooltip
                contentStyle={{ backgroundColor: '#141821', border: '1px solid #1f2937' }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="scenario1"
                name={userChoices.scenario1.name}
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorScenario1)"
              />
              <Area
                type="monotone"
                dataKey="scenario2"
                name={userChoices.scenario2.name}
                stroke="#a855f7"
                fillOpacity={1}
                fill="url(#colorScenario2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 종합 비교 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 최종 수치 비교 */}
          <motion.div
            className="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">📊 최종 수치 비교</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">최종 자산</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-500/10 border border-primary-500 rounded-lg p-4">
                    <div className="text-sm text-gray-400">{userChoices.scenario1.name}</div>
                    <div className="text-2xl font-bold text-primary-500">{formatCurrency(scenario1.finalAssets)}</div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500 rounded-lg p-4">
                    <div className="text-sm text-gray-400">{userChoices.scenario2.name}</div>
                    <div className="text-2xl font-bold text-purple-500">{formatCurrency(scenario2.finalAssets)}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">건강 지수</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-500/10 border border-primary-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary-500">{scenario1.finalHealth}점</div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-500">{scenario2.finalHealth}점</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">행복도</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-500/10 border border-primary-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary-500">{scenario1.finalHappiness}점</div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-500">{scenario2.finalHappiness}점</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 레이더 차트 */}
          <motion.div
            className="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">⚖️ 종합 밸런스</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar
                  name={userChoices.scenario1.name}
                  dataKey="scenario1"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                />
                <Radar
                  name={userChoices.scenario2.name}
                  dataKey="scenario2"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* 리스크 분석 */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-primary-500">
              ⚠️ {userChoices.scenario1.name} 리스크
            </h3>
            <div className="space-y-3">
              {scenario1.risks.length > 0 ? (
                scenario1.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}
                  >
                    <div className="font-bold">{risk.type}</div>
                    <div className="text-sm mt-1">{risk.description}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">주요 리스크가 발견되지 않았습니다.</p>
              )}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-purple-500">
              ⚠️ {userChoices.scenario2.name} 리스크
            </h3>
            <div className="space-y-3">
              {scenario2.risks.length > 0 ? (
                scenario2.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}
                  >
                    <div className="font-bold">{risk.type}</div>
                    <div className="text-sm mt-1">{risk.description}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">주요 리스크가 발견되지 않았습니다.</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* 액션 버튼 */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate('/choice')}
            className="btn-secondary"
          >
            ← 다시 시뮬레이션
          </button>
          <button
            onClick={() => navigate('/share')}
            className="btn-primary"
          >
            공유 카드 만들기 →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
