import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const ChoicePage = () => {
  const navigate = useNavigate();
  const { userChoices, updateScenario, generateSimulation } = useApp();
  const [currentScenario, setCurrentScenario] = useState(1);

  const careerOptions = ['스타트업', '대기업', '프리랜서', '공무원'];
  const locationOptions = ['서울', '지방', '해외'];
  const lifestyleOptions = ['미니멀', '밸런스', '럭셔리'];
  const investmentOptions = ['안전', '보통', '공격적'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentScenario === 1) {
      setCurrentScenario(2);
    } else {
      generateSimulation();
      navigate('/result');
    }
  };

  const scenario = userChoices[`scenario${currentScenario}`];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title mb-4">
            시나리오 {currentScenario} 설정
          </h1>
          <p className="text-gray-400">
            {currentScenario === 1 ? '현재 또는 기존의 인생 경로를 입력하세요' : '대안이 되는 다른 인생 경로를 입력하세요'}
          </p>
        </motion.div>

        {/* 진행 표시 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${currentScenario >= 1 ? 'bg-primary-500' : 'bg-dark-card'}`}>
              1
            </div>
            <div className={`w-20 h-1 transition-all ${currentScenario >= 2 ? 'bg-primary-500' : 'bg-dark-border'}`}></div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${currentScenario >= 2 ? 'bg-primary-500' : 'bg-dark-card'}`}>
              2
            </div>
          </div>
        </div>

        {/* 폼 */}
        <motion.form
          onSubmit={handleSubmit}
          className="card space-y-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* 시나리오 이름 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              시나리오 이름
            </label>
            <input
              type="text"
              value={scenario.name}
              onChange={(e) => updateScenario(currentScenario, 'name', e.target.value)}
              placeholder={`예: ${currentScenario === 1 ? '현재의 나' : '꿈꾸던 나'}`}
              className="input-field w-full"
              required
            />
          </div>

          {/* 직업 선택 */}
          <div>
            <label className="block text-sm font-medium mb-4 text-gray-300">
              직업/커리어
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {careerOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateScenario(currentScenario, 'career', option)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    scenario.career === option
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-border hover:border-primary-500/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 거주지 선택 */}
          <div>
            <label className="block text-sm font-medium mb-4 text-gray-300">
              거주 지역
            </label>
            <div className="grid grid-cols-3 gap-4">
              {locationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateScenario(currentScenario, 'location', option)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    scenario.location === option
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-border hover:border-primary-500/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 라이프스타일 */}
          <div>
            <label className="block text-sm font-medium mb-4 text-gray-300">
              라이프스타일
            </label>
            <div className="grid grid-cols-3 gap-4">
              {lifestyleOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateScenario(currentScenario, 'lifestyle', option)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    scenario.lifestyle === option
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-border hover:border-primary-500/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 투자 성향 */}
          <div>
            <label className="block text-sm font-medium mb-4 text-gray-300">
              투자 성향
            </label>
            <div className="grid grid-cols-3 gap-4">
              {investmentOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateScenario(currentScenario, 'investment', option)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    scenario.investment === option
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-border hover:border-primary-500/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => currentScenario === 1 ? navigate('/') : setCurrentScenario(1)}
              className="btn-secondary"
            >
              ← 이전
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!scenario.name || !scenario.career || !scenario.location || !scenario.lifestyle || !scenario.investment}
            >
              {currentScenario === 1 ? '다음 →' : '시뮬레이션 시작 →'}
            </button>
          </div>
        </motion.form>

        {/* 저장된 시나리오 프리뷰 */}
        {currentScenario === 2 && (
          <motion.div
            className="mt-8 card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-primary-500">시나리오 1: {userChoices.scenario1.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
              <div>
                <span className="text-gray-500">직업:</span> {userChoices.scenario1.career}
              </div>
              <div>
                <span className="text-gray-500">지역:</span> {userChoices.scenario1.location}
              </div>
              <div>
                <span className="text-gray-500">라이프:</span> {userChoices.scenario1.lifestyle}
              </div>
              <div>
                <span className="text-gray-500">투자:</span> {userChoices.scenario1.investment}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChoicePage;
