import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FiTrendingUp, FiSpeed, FiActivity, FiAlertCircle } from 'react-icons/fi';

const PageSpeedAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [speedResults, setSpeedResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const results = {
        overallScore: 78,
        metrics: {
          firstContentfulPaint: 1.8,
          largestContentfulPaint: 3.2,
          cumulativeLayoutShift: 0.15,
          timeToFirstByte: 0.6,
          speedIndex: 2.5,
        },
        metricsData: [
          { name: 'FCP', value: 1.8, threshold: 1.8, status: 'good' },
          { name: 'LCP', value: 3.2, threshold: 2.5, status: 'warning' },
          { name: 'CLS', value: 0.15, threshold: 0.1, status: 'warning' },
          { name: 'TTFB', value: 0.6, threshold: 0.6, status: 'good' },
          { name: 'SI', value: 2.5, threshold: 3.4, status: 'good' },
        ],
        fieldData: [
          { metric: 'FCP', score: 88, impact: 'Critical' },
          { metric: 'LCP', score: 65, impact: 'Critical' },
          { metric: 'CLS', score: 72, impact: 'High' },
          { metric: 'TTFB', score: 92, impact: 'Medium' },
          { metric: 'SI', score: 85, impact: 'Medium' },
        ],
        suggestions: [
          { category: 'Images', issue: 'Unoptimized images', impact: 'High', savings: '250 KB' },
          { category: 'CSS', issue: 'Unused CSS rules', impact: 'Medium', savings: '45 KB' },
          { category: 'JavaScript', issue: 'Large JavaScript bundle', impact: 'High', savings: '120 KB' },
          { category: 'Fonts', issue: 'Preload critical fonts', impact: 'Low', savings: '30 KB' },
        ],
        timeline: [
          { time: 0, event: 'Navigation Start' },
          { time: 0.6, event: 'Time to First Byte' },
          { time: 1.2, event: 'First Paint' },
          { time: 1.8, event: 'First Contentful Paint' },
          { time: 2.5, event: 'Speed Index' },
          { time: 3.2, event: 'Largest Contentful Paint' },
        ],
      };
      setSpeedResults(results);
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-green-600 to-green-800';
    if (score >= 50) return 'from-yellow-600 to-yellow-800';
    return 'from-red-600 to-red-800';
  };

  const getMetricColor = (status) => {
    if (status === 'good') return '#10b981';
    if (status === 'warning') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Page Speed Analyzer</h1>

      {/* Input Form */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <form onSubmit={handleAnalyze} className="flex gap-4">
          <input
            type="url"
            placeholder="Enter page URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-blue-500 outline-none"
            required
          />
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold flex items-center gap-2">
            <FiSpeed /> Analyze
          </button>
        </form>
      </div>

      {/* Results */}
      {speedResults && (
        <>
          {/* Overall Score */}
          <div className={`bg-gradient-to-br ${getScoreColor(speedResults.overallScore)} rounded-lg p-8 shadow-lg text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-80">Performance Score</p>
                <p className="text-6xl font-bold">{speedResults.overallScore}</p>
                <p className="text-sm opacity-70 mt-2">
                  {speedResults.overallScore >= 90
                    ? 'Excellent Performance'
                    : speedResults.overallScore >= 50
                    ? 'Needs Improvement'
                    : 'Poor Performance'}
                </p>
              </div>
              <div className="text-8xl opacity-30">
                <FiActivity />
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              label="FCP"
              value={`${speedResults.metrics.firstContentfulPaint}s`}
              status="good"
              description="First Contentful Paint"
            />
            <MetricCard
              label="LCP"
              value={`${speedResults.metrics.largestContentfulPaint}s`}
              status="warning"
              description="Largest Contentful Paint"
            />
            <MetricCard
              label="CLS"
              value={speedResults.metrics.cumulativeLayoutShift}
              status="warning"
              description="Cumulative Layout Shift"
            />
            <MetricCard
              label="TTFB"
              value={`${speedResults.metrics.timeToFirstByte}s`}
              status="good"
              description="Time to First Byte"
            />
            <MetricCard
              label="SI"
              value={`${speedResults.metrics.speedIndex}s`}
              status="good"
              description="Speed Index"
            />
          </div>

          {/* Metrics Chart */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Web Vitals Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speedResults.metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Field Data */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Metrics Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {speedResults.fieldData.map((metric, idx) => (
                <div key={idx} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{metric.metric}</span>
                    <span className="text-sm text-gray-400">{metric.impact}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${metric.score >= 75 ? 'bg-green-500' : metric.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                  <p className="text-white font-bold text-lg mt-2">{metric.score}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Optimization Suggestions</h2>
            <div className="space-y-3">
              {speedResults.suggestions.map((suggestion, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-700 rounded border-l-4 border-orange-500">
                  <FiAlertCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-semibold">{suggestion.issue}</p>
                      <span className="text-xs px-2 py-1 bg-orange-600 text-white rounded">{suggestion.category}</span>
                    </div>
                    <p className="text-gray-400 text-sm">Potential savings: {suggestion.savings}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-bold ${suggestion.impact === 'High' ? 'bg-red-600' : suggestion.impact === 'Medium' ? 'bg-yellow-600' : 'bg-blue-600'}`}>  
                    {suggestion.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Page Load Timeline</h2>
            <div className="space-y-2">
              {speedResults.timeline.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-700 rounded">
                  <div className="w-16 text-right">
                    <span className="text-blue-400 font-bold">{item.time}s</span>
                  </div>
                  <div className="h-1 flex-1 bg-gray-600 rounded">
                    <div className="h-full bg-blue-500 rounded" style={{ width: `${(item.time / 3.5) * 100}%` }}></div>
                  </div>
                  <span className="text-gray-300 font-semibold">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-white text-lg">Analyzing page speed...</p>
          <div className="animate-spin inline-block mt-4 w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

function MetricCard({ label, value, status, description }) {
  const colorMap = { good: 'from-green-600 to-green-800', warning: 'from-yellow-600 to-yellow-800', bad: 'from-red-600 to-red-800' };
  return (
    <div className={`bg-gradient-to-br ${colorMap[status]} rounded-lg p-4 text-white shadow-lg`}>  
      <p className="text-xs opacity-80">{description}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-lg font-bold opacity-70 mt-2">{label}</p>
    </div>
  );
}

export default PageSpeedAnalyzer;