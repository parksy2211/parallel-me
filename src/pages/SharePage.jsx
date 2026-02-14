import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import html2canvas from 'html2canvas';

const SharePage = () => {
  const navigate = useNavigate();
  const { simulationResults, userChoices } = useApp();
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!simulationResults) {
    navigate('/choice');
    return null;
  }

  const { scenario1, scenario2 } = simulationResults;

  const formatCurrency = (value) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억`;
    }
    return `${(value / 10000).toFixed(0)}만`;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0e17',
        scale: 2,
        logging: false
      });

      const link = document.createElement('a');
      link.download = 'parallel-me-result.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('이미지 생성 실패:', error);
    }
    setIsGenerating(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert('링크가 복사되었습니다!');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title mb-4">공유 카드</h1>
          <p className="text-gray-400">SNS에 나만의 시뮬레이션 결과를 공유하세요</p>
        </motion.div>

        {/* 공유 카드 프리뷰 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg p-8 rounded-2xl border border-primary-500/30 shadow-2xl shadow-primary-500/20"
            style={{ width: '800px', maxWidth: '100%', margin: '0 auto' }}
          >
            {/* 카드 헤더 */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">
                  Parallel Me
                </span>
              </h2>
              <p className="text-gray-400">나의 평행우주 시뮬레이션</p>
            </div>

            {/* 시나리오 비교 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* 시나리오 1 */}
              <div className="bg-dark-bg/50 rounded-xl p-6 border border-primary-500/50">
                <h3 className="text-xl font-bold mb-4 text-primary-500">
                  {userChoices.scenario1.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <p>💼 {scenario1.scenario.career}</p>
                  <p>📍 {scenario1.scenario.location}</p>
                  <p>✨ {scenario1.scenario.lifestyle}</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-primary-500/10 rounded-lg p-3">
                    <div className="text-xs text-gray-400">최종 자산</div>
                    <div className="text-xl font-bold text-primary-500">
                      {formatCurrency(scenario1.finalAssets)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-primary-500/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400">건강</div>
                      <div className="text-lg font-bold text-primary-500">
                        {scenario1.finalHealth}
                      </div>
                    </div>
                    <div className="bg-primary-500/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400">행복</div>
                      <div className="text-lg font-bold text-primary-500">
                        {scenario1.finalHappiness}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 시나리오 2 */}
              <div className="bg-dark-bg/50 rounded-xl p-6 border border-purple-500/50">
                <h3 className="text-xl font-bold mb-4 text-purple-500">
                  {userChoices.scenario2.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <p>💼 {scenario2.scenario.career}</p>
                  <p>📍 {scenario2.scenario.location}</p>
                  <p>✨ {scenario2.scenario.lifestyle}</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <div className="text-xs text-gray-400">최종 자산</div>
                    <div className="text-xl font-bold text-purple-500">
                      {formatCurrency(scenario2.finalAssets)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400">건강</div>
                      <div className="text-lg font-bold text-purple-500">
                        {scenario2.finalHealth}
                      </div>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400">행복</div>
                      <div className="text-lg font-bold text-purple-500">
                        {scenario2.finalHappiness}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 주요 인사이트 */}
            <div className="bg-dark-bg/50 rounded-xl p-6 border border-primary-500/30">
              <h4 className="font-bold mb-3 text-primary-500">📌 핵심 인사이트</h4>
              <div className="text-sm text-gray-300 space-y-2">
                {scenario1.finalAssets > scenario2.finalAssets ? (
                  <p>• {userChoices.scenario1.name}가 재정적으로 {formatCurrency(scenario1.finalAssets - scenario2.finalAssets)} 더 유리합니다</p>
                ) : (
                  <p>• {userChoices.scenario2.name}가 재정적으로 {formatCurrency(scenario2.finalAssets - scenario1.finalAssets)} 더 유리합니다</p>
                )}
                {scenario1.finalHealth > scenario2.finalHealth ? (
                  <p>• {userChoices.scenario1.name}가 건강 면에서 {scenario1.finalHealth - scenario2.finalHealth}점 더 높습니다</p>
                ) : (
                  <p>• {userChoices.scenario2.name}가 건강 면에서 {scenario2.finalHealth - scenario1.finalHealth}점 더 높습니다</p>
                )}
                {scenario1.finalHappiness > scenario2.finalHappiness ? (
                  <p>• {userChoices.scenario1.name}가 행복도에서 {scenario1.finalHappiness - scenario2.finalHappiness}점 더 높습니다</p>
                ) : (
                  <p>• {userChoices.scenario2.name}가 행복도에서 {scenario2.finalHappiness - scenario1.finalHappiness}점 더 높습니다</p>
                )}
              </div>
            </div>

            {/* 카드 푸터 */}
            <div className="text-center mt-8 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                나도 시뮬레이션 해보기 👉 parallel-me.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* 공유 옵션 */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-6">공유 방법</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  생성 중...
                </>
              ) : (
                <>
                  📥 이미지 다운로드
                </>
              )}
            </button>

            <button
              onClick={handleCopyLink}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              🔗 링크 복사
            </button>
          </div>

          <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
            <p className="text-sm text-gray-300">
              💡 <strong>팁:</strong> 이미지를 다운로드하여 인스타그램, 페이스북, 트위터 등에 공유하세요!
            </p>
          </div>
        </motion.div>

        {/* 액션 버튼 */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate('/result')}
            className="btn-secondary"
          >
            ← 결과 보기
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            처음으로
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SharePage;
