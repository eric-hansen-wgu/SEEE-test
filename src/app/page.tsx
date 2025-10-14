'use client'; 
import React, { useState } from 'react';
import { Info } from 'lucide-react';

const StudentSuccessEcosystem = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [intrinsicLevels, setIntrinsicLevels] = useState({
    learning: 70,
    mindset: 70,
    belonging: 70
  });
  const [hoveredIntrinsic, setHoveredIntrinsic] = useState(null);
  const [tooltipIntrinsic, setTooltipIntrinsic] = useState(null);

  const focusWheelDomains = [
    {
      id: 'academics',
      name: 'Academics',
      color: '#3B82F6',
      angle: 270,
      influences: { learning: 90, mindset: 60, belonging: 40 },
      description: 'Academic performance, course engagement, and learning outcomes',
      example: 'Strong academic support helps students master content (Learning) and build confidence (Mindset)'
    },
    {
      id: 'effectiveness',
      name: 'Effectiveness',
      color: '#8B5CF6',
      angle: 225,
      influences: { learning: 70, mindset: 85, belonging: 30 },
      description: 'Time management, study skills, and organizational capabilities',
      example: 'Effective study strategies boost both learning capacity and student self-efficacy'
    },
    {
      id: 'commitments',
      name: 'Managing Commitments',
      color: '#EC4899',
      angle: 90,
      influences: { learning: 40, mindset: 80, belonging: 50 },
      description: 'Balancing school, work, family, and personal responsibilities',
      example: 'Successfully managing competing demands strengthens resilience and sense of control'
    },
    {
      id: 'health',
      name: 'Health & Support',
      color: '#EF4444',
      angle: 135,
      influences: { learning: 50, mindset: 75, belonging: 70 },
      description: 'Physical health, mental wellness, and access to support systems',
      example: 'Wellness resources and support networks foster both wellbeing and community connection'
    },
    {
      id: 'community',
      name: 'School Community',
      color: '#F59E0B',
      angle: 45,
      influences: { learning: 45, mindset: 55, belonging: 95 },
      description: 'Peer connections, faculty relationships, and sense of institutional belonging',
      example: 'Active participation in university community directly strengthens sense of belonging and identity'
    },
    {
      id: 'commitment',
      name: 'Commitment to Graduation',
      color: '#10B981',
      angle: 180,
      influences: { learning: 60, mindset: 90, belonging: 60 },
      description: 'Goal clarity, persistence, and dedication to degree completion',
      example: 'Clear goals and strong commitment fuel motivation and sustained effort through challenges'
    },
    {
      id: 'finances',
      name: 'Finances',
      color: '#14B8A6',
      angle: 0,
      influences: { learning: 55, mindset: 70, belonging: 45 },
      description: 'Financial aid, budgeting, and economic stability',
      example: 'Financial security reduces stress and enables focus on learning and growth'
    },
    {
      id: 'career',
      name: 'Career',
      color: '#06B6D4',
      angle: 315,
      influences: { learning: 75, mindset: 80, belonging: 55 },
      description: 'Career planning, professional development, and future opportunities',
      example: 'Career clarity and progress strengthen motivation and give learning immediate relevance'
    }
  ];

  const intrinsicNeeds = [
    { 
      id: 'cognition', 
      name: 'Cognition', 
      color: '#7C3AED', 
      position: 'top',
      description: 'The capacity to acquire, process, and apply knowledge and skills',
      context: 'Cognition encompasses cognitive development, knowledge acquisition, skill mastery, and the ability to transfer learning to new contexts. It represents the intellectual dimension of student success.'
    },
    { 
      id: 'mindset', 
      name: 'Mindset', 
      color: '#DC2626', 
      position: 'left',
      description: 'The beliefs, attitudes, and psychological capacities that enable persistence and growth',
      context: 'Mindset includes self-efficacy, growth orientation, resilience, motivation, and sense of agency. It represents the psychological and emotional dimension of student success—the internal drive and confidence to persist through challenges.'
    },
    { 
      id: 'belonging', 
      name: 'Belonging', 
      color: '#059669', 
      position: 'right',
      description: 'The sense of connection, identity, and membership within the learning community',
      context: 'Belonging reflects social integration, feelings of acceptance and value, cultural fit, and connection to institutional identity. It represents the social and relational dimension of student success—feeling part of something larger than oneself.'
    },
    { 
      id: 'learning', 
      name: 'Learning', 
      color: '#555555', 
      position: 'top',
      description: 'The successful culmination of all components to drive the mission and outcome of WGU',
      context: 'Learning is conditionally irrespective interpretation of juxtaposed, competing, or remixed methods, definitions, philosophies, frameworks, and/or contexts by which to choose a superior way of knowing, working, behaving, and/or thinking.'
    }
  ];

  const getConnectionStrength = (domain, intrinsic) => {
    if (!domain || !intrinsic) return 0;
    return domain.influences[intrinsic] || 0;
  };

  const getAffectedDomains = (intrinsicId, level) => {
    return focusWheelDomains.map(domain => ({
      ...domain,
      impact: (domain.influences[intrinsicId] / 100) * (level / 100)
    }));
  };

  const renderConnection = (domain, intrinsic) => {
    const strength = getConnectionStrength(domain, intrinsic);
    if (strength < 30) return null;

    const centerX = 400;
    const centerY = 400;
    
    // Calculate domain position
    const learningScore = domain.influences.learning * intrinsicLevels.learning;
    const mindsetScore = domain.influences.mindset * intrinsicLevels.mindset;
    const belongingScore = domain.influences.belonging * intrinsicLevels.belonging;
    const totalScore = learningScore + mindsetScore + belongingScore;
    const maxPossibleScore = (domain.influences.learning + domain.influences.mindset + domain.influences.belonging) * 100;
    const domainAlignment = totalScore / maxPossibleScore;
    const radius = 350 - (domainAlignment * 120);
    
    const angleRad = (domain.angle * Math.PI) / 180;
    const domainX = centerX + radius * Math.cos(angleRad);
    const domainY = centerY + radius * Math.sin(angleRad);

    let intrinsicX = centerX;
    let intrinsicY = centerY - 80;
    if (intrinsic === 'mindset') {
      intrinsicX = centerX - 70;
      intrinsicY = centerY + 40;
    } else if (intrinsic === 'belonging') {
      intrinsicX = centerX + 70;
      intrinsicY = centerY + 40;
    }

    const opacity = strength / 100;

    return (
      <line
        key={`${domain.id}-${intrinsic}`}
        x1={domainX}
        y1={domainY}
        x2={intrinsicX}
        y2={intrinsicY}
        stroke={domain.color}
        strokeWidth={strength / 10}
        opacity={opacity * 0.6}
        className="transition-all duration-300"
      />
    );
  };

  const getIntrinsicInfo = (intrinsicId) => {
    return intrinsicNeeds.find(need => need.id === intrinsicId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Student Experience Ecosystem Explorer
          </h1>
          <p className="text-sm font-medium text-slate-700 mb-3">
            The Learning Triangle and the Focus Wheel models form a mutually reinforcing ecosystem. The Focus Wheel visualizes the outer (or extrinsic) experience of the learner’s environment, while the Learning Triangle represents the inner experience of learning itself. Together, they operate as a bi-directional system — where intrinsic states shape extrinsic outcomes, and extrinsic supports restore or strengthen intrinsic capacities. Use the tool below to explore how intrinsic learner needs and extrinsic support domains dynamically interact in the WGU student experience model.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualization */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <svg viewBox="0 0 800 800" className="w-full h-full">
              {/* Connection lines */}
              {selectedDomain && intrinsicNeeds.map(intrinsic => 
                renderConnection(selectedDomain, intrinsic.id)
              )}

              {/* Alignment lines and labels - drawn first so they appear behind domains */}
              {focusWheelDomains.map(domain => {
                const centerX = 400;
                const centerY = 400;
                
                // Calculate alignment score (same as below)
                const learningScore = domain.influences.learning * intrinsicLevels.learning;
                const mindsetScore = domain.influences.mindset * intrinsicLevels.mindset;
                const belongingScore = domain.influences.belonging * intrinsicLevels.belonging;
                const totalScore = learningScore + mindsetScore + belongingScore;
                const maxPossibleScore = (domain.influences.learning + domain.influences.mindset + domain.influences.belonging) * 100;
                const domainAlignment = totalScore / maxPossibleScore;
                
                const radius = 325 - (domainAlignment * 120);
                const angleRad = (domain.angle * Math.PI) / 180;
                const x = centerX + radius * Math.cos(angleRad);
                const y = centerY + radius * Math.sin(angleRad);
                
                // Calculate midpoint for label placement
                const midX = centerX + (radius / 2) * Math.cos(angleRad);
                const midY = centerY + (radius / 2) * Math.sin(angleRad);
                
                return (
                  <g key={`alignment-${domain.id}`}>
                    {/* Dashed line from domain to center */}
                    <line
                      x1={x}
                      y1={y}
                      x2={centerX}
                      y2={centerY}
                      stroke={domain.color}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.4"
                    />
                    {/* Alignment score label */}
                    <g>
                      <rect
                        x={midX - 25}
                        y={midY - 10}
                        width="50"
                        height="20"
                        fill="white"
                        opacity="0.6"
                        rx="4"
                      />
                      <text
                        x={midX}
                        y={midY + 5}
                        textAnchor="middle"
                        fill={domain.color}
                        fontSize="12"
                        fontWeight="600"
                      >
                        {(domainAlignment * 100).toFixed(0)}%
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Focus Wheel Domains */}
              {focusWheelDomains.map(domain => {
                const centerX = 400;
                const centerY = 400;
                
                // Calculate weighted alignment between domain influences and intrinsic levels
                // Each domain's influences are values (0-100) indicating how much that domain affects each intrinsic need
                // Multiply domain influence strength by current intrinsic level
                const learningScore = domain.influences.learning * intrinsicLevels.learning;
                const mindsetScore = domain.influences.mindset * intrinsicLevels.mindset;
                const belongingScore = domain.influences.belonging * intrinsicLevels.belonging;
                
                // Sum the scores
                const totalScore = learningScore + mindsetScore + belongingScore;
                
                // Normalize based on THIS domain's maximum possible score
                // Max occurs when all intrinsic levels are 100
                const maxPossibleScore = (domain.influences.learning + domain.influences.mindset + domain.influences.belonging) * 100;
                const domainAlignment = totalScore / maxPossibleScore; // Normalize to 0-1 range
                
                // Dynamic radius: stronger alignment = closer to center
                // Range from 180 (very close) to 350 (far away)
                const minRadius = 180;
                const maxRadius = 350;
                const radius = maxRadius - (domainAlignment * (maxRadius - minRadius));
                
                const angleRad = (domain.angle * Math.PI) / 180;
                const x = centerX + radius * Math.cos(angleRad);
                const y = centerY + radius * Math.sin(angleRad);
                const isSelected = selectedDomain?.id === domain.id;

                return (
                  <g key={domain.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 50 : 40}
                      fill={domain.color}
                      opacity={isSelected ? 1 : 0.8}
                      className="cursor-pointer transition-all duration-300 hover:opacity-100"
                      onClick={() => setSelectedDomain(domain)}
                      onMouseEnter={() => setSelectedDomain(domain)}
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="top"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      className="pointer-events-none"
                      style={{ userSelect: 'none' }}
                    >
                      {domain.name.split(' ').map((word, i) => (
                        <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>
                          {word}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}

              {/* Learning Triangle */}
              <g>
                {/* Triangle outline: old coordinates: 400,280 330,440 470,440 */}
                <polygon
                  points="400,319 330,440 470,440"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="2"
                  opacity="0.3"
                />

                {/* Cognition (top) */}
                <circle
                  cx="400"
                  cy="319"
                  r={hoveredIntrinsic === 'cognition' ? 55 : 45}
                  fill="#7C3AED"
                  opacity={hoveredIntrinsic === 'cognition' ? 0.85 : 0.4}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => {
                    setHoveredIntrinsic('cognition');
                    setTooltipIntrinsic('cognition');
                  }}
                  onMouseLeave={() => {
                    setHoveredIntrinsic(null);
                    setTooltipIntrinsic(null);
                  }}
                  onClick={() => setTooltipIntrinsic(tooltipIntrinsic === 'cognition' ? null : 'cognition')}
                />
                <text
                  x="400"
                  y="324"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                  className="pointer-events-none"
                >
                  Cognition
                </text>

                {/* Mindset (bottom left) */}
                <circle
                  cx="330"
                  cy="440"
                  r={hoveredIntrinsic === 'mindset' ? 55 : 45}
                  fill="#DC2626"
                  opacity={hoveredIntrinsic === 'mindset' ? 0.85 : 0.4}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => {
                    setHoveredIntrinsic('mindset');
                    setTooltipIntrinsic('mindset');
                  }}
                  onMouseLeave={() => {
                    setHoveredIntrinsic(null);
                    setTooltipIntrinsic(null);
                  }}
                  onClick={() => setTooltipIntrinsic(tooltipIntrinsic === 'mindset' ? null : 'mindset')}
                />
                <text
                  x="330"
                  y="445"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                  className="pointer-events-none"
                >
                  Mindset
                </text>

                {/* Belonging (bottom right) */}
                <circle
                  cx="470"
                  cy="440"
                  r={hoveredIntrinsic === 'belonging' ? 55 : 45}
                  fill="#059669"
                  opacity={hoveredIntrinsic === 'belonging' ? 0.85 : 0.4}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => {
                    setHoveredIntrinsic('belonging');
                    setTooltipIntrinsic('belonging');
                  }}
                  onMouseLeave={() => {
                    setHoveredIntrinsic(null);
                    setTooltipIntrinsic(null);
                  }}
                  onClick={() => setTooltipIntrinsic(tooltipIntrinsic === 'belonging' ? null : 'belonging')}
                />
                <text
                  x="470"
                  y="445"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                  className="pointer-events-none"
                >
                  Belonging
                </text>

                {/* Learning (middle center) */}
                <circle
                  cx="400"
                  cy="400"
                  r={hoveredIntrinsic === 'learning' ? 55 : 45}
                  fill="#7C3AED"
                  opacity={hoveredIntrinsic === 'learning' ? 0.85 : 0.4}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => {
                    setHoveredIntrinsic('learning');
                    setTooltipIntrinsic('learning');
                  }}
                  onMouseLeave={() => {
                    setHoveredIntrinsic(null);
                    setTooltipIntrinsic(null);
                  }}
                  onClick={() => setTooltipIntrinsic(tooltipIntrinsic === 'learning' ? null : 'learning')}
                />
                <text
                  x="400"
                  y="324"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                  className="pointer-events-none"
                >
                  Learning
                </text>
              </g>
            </svg>
          </div>

          {/* Control Panel & Info */}
          <div className="space-y-6">
            {/* Intrinsic Level Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={20} />
                Adjust Intrinsic Levels
              </h3>
              <div className="space-y-4">
                {intrinsicNeeds.map(need => (
                  <div key={need.id}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {need.name}: {intrinsicLevels[need.id]}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={intrinsicLevels[need.id]}
                      onChange={(e) => setIntrinsicLevels({
                        ...intrinsicLevels,
                        [need.id]: parseInt(e.target.value)
                      })}
                      className="w-full"
                      style={{
                        accentColor: need.color
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Intrinsic Need Tooltip */}
            {tooltipIntrinsic && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <div 
                  className="w-full h-2 rounded-full mb-4"
                  style={{ backgroundColor: getIntrinsicInfo(tooltipIntrinsic).color }}
                />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {getIntrinsicInfo(tooltipIntrinsic).name}
                </h3>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  {getIntrinsicInfo(tooltipIntrinsic).description}
                </p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-700">
                    {getIntrinsicInfo(tooltipIntrinsic).context}
                  </p>
                </div>
              </div>
            )}

            {/* Domain Info Card */}
            {selectedDomain && !tooltipIntrinsic && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <div 
                  className="w-full h-2 rounded-full mb-4"
                  style={{ backgroundColor: selectedDomain.color }}
                />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {selectedDomain.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {selectedDomain.description}
                </p>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-700 italic">
                    "{selectedDomain.example}"
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-700">
                    Influences on Intrinsic Needs:
                  </h4>
                  {intrinsicNeeds.map(need => {
                    const strength = selectedDomain.influences[need.id];
                    return (
                      <div key={need.id} className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 w-24">
                          {need.name}:
                        </span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${strength}%`,
                              backgroundColor: need.color
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700 w-12">
                          {strength}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Instructions */}
            {!selectedDomain && !tooltipIntrinsic && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  How to Explore
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Click or hover on any Focus Wheel domain to see connections</li>
                  <li>• Hover over Learning Triangle elements for context</li>
                  <li>• Adjust intrinsic level sliders to simulate system changes</li>
                  <li>• Watch domains move closer/farther based on alignment</li>
                  <li>• Line thickness and % labels show connection strength</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>Based on a combination of the Learning Triangle and InsideTrack Focus Wheel models | Interactive Prototype Designed for Student Experience</p>
        </footer>
      </div>
    </div>
  );
};

export default StudentSuccessEcosystem;
