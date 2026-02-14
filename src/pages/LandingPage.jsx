import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl top-20 -left-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-20 -right-20 animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 로고/타이틀 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 glow-text">
            <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Parallel Me
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          만약 다른 선택을 했다면?
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          당신의 인생에서 다른 선택을 했을 때의 미래를 시뮬레이션하고 비교해보세요.
          <br />
          AI가 두 개의 평행우주를 생성하여 자산, 건강, 행복도를 분석합니다.
        </motion.p>

        {/* 특징 카드들 */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="card">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">자산 비교</h3>
            <p className="text-gray-400">10년 후 재정 상태를 그래프로 비교</p>
          </div>

          <div className="card">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-2">삶의 질 분석</h3>
            <p className="text-gray-400">건강과 행복도 지수 측정</p>
          </div>

          <div className="card">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-2">리스크 평가</h3>
            <p className="text-gray-400">각 선택의 위험 요소 분석</p>
          </div>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => navigate('/choice')}
            className="btn-primary text-xl"
          >
            시뮬레이션 시작하기 →
          </button>
        </motion.div>

        {/* 부가 설명 */}
        <motion.p
          className="text-sm text-gray-500 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          * 이 서비스는 엔터테인먼트 목적의 시뮬레이션입니다
        </motion.p>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="text-gray-500 text-sm">↓ 시작하기</div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
