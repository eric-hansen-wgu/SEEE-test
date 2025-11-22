'use client'; 
import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const StudentSuccessEcosystem = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [intrinsicLevels, setIntrinsicLevels] = useState({
    cognition: 70,
    mindset: 70,
    belonging: 70
  });
  const [hoveredIntrinsic, setHoveredIntrinsic] = useState(null);
  const [tooltipIntrinsic, setTooltipIntrinsic] = useState(null);
  const [tooltipLayer, setTooltipLayer] = useState(null);

  const focusWheelDomains = [
    {
      id: 'academics',
      name: 'Academics',
      color: '#6CACE4',//'#3B82F6',
      angle: 292.5,
      influences: { cognition: 100, mindset: 60, belonging: 40 },
      description: 'Academic performance, course engagement, and learning outcomes',
      example: 'Strong academic support helps students master content (Learning) and build confidence (Mindset)'
    },
    {
      id: 'effectiveness',
      name: 'Effectiveness',
      color: '#7BAF9E',//'#8B5CF6',
      angle: 247.5,
      influences: { cognition: 60, mindset: 95, belonging: 20 },
      description: 'Time management, study skills, and organizational capabilities',
      example: 'Effective study strategies boost both learning capacity and student self-efficacy'
    },
    {
      id: 'commitments',
      name: 'Managing Commitments',
      color: '#9BC53D',//'#EC4899',
      angle: 112.5,
      influences: { cognition: 40, mindset: 90, belonging: 50 },
      description: 'Balancing school, work, family, and personal responsibilities',
      example: 'Successfully managing competing demands strengthens resilience and sense of control'
    },
    {
      id: 'health',
      name: 'Health & Support',
      color: '#58A4B0',//'#EF4444',
      angle: 157.5,
      influences: { cognition: 50, mindset: 75, belonging: 70 },
      description: 'Physical health, mental wellness, and access to support systems',
      example: 'Wellness resources and support networks foster both wellbeing and community connection'
    },
    {
      id: 'community',
      name: 'School Community',
      color: '#F4A300',//'#F59E0B',
      angle: 67.5,
      influences: { cognition: 45, mindset: 55, belonging: 95 },
      description: 'Peer connections, faculty relationships, and sense of institutional belonging',
      example: 'Active participation in university community directly strengthens sense of belonging and identity'
    },
    {
      id: 'commitment',
      name: 'Commitment to Graduation',
      color: '#5B8E7D',//'#10B981',
      angle: 202.5,
      influences: { cognition: 50, mindset: 100, belonging: 50 },
      description: 'Goal clarity, persistence, and dedication to degree completion',
      example: 'Clear goals and strong commitment fuel motivation and sustained effort through challenges'
    },
    {
      id: 'finances',
      name: 'Finances',
      color: '#C4A000',//'#14B8A6',
      angle: 22.5,
      influences: { cognition: 55, mindset: 75, belonging: 50 },
      description: 'Financial aid, budgeting, and economic stability',
      example: 'Financial security reduces stress and enables focus on learning and growth'
    },
    {
      id: 'career',
      name: 'Career',
      color: '#7D6EB8',//'#06B6D4',
      angle: 337.5,
      influences: { cognition: 75, mindset: 80, belonging: 55 },
      description: 'Career planning, professional development, and future opportunities',
      example: 'Career clarity and progress strengthen motivation and give learning immediate relevance'
    }
  ];

  const intrinsicNeeds = [
    { 
      id: 'cognition', 
      name: 'Thought', 
      color: '#002855', 
      position: 'top',
      description: 'The capacity to acquire, process, and apply knowledge and skills',
      context: 'Thought (a.k.a. Cognition) encompasses cognitive development, knowledge acquisition, skill mastery, and the ability to transfer learning to new contexts. It represents the intellectual dimension of student success.'
    },
    { 
      id: 'mindset', 
      name: 'Volition', 
      color: '#007A33', 
      position: 'left',
      description: 'The beliefs, attitudes, and psychological capacities that enable persistence and growth',
      context: 'Volition (a.k.a. Conation) includes self-efficacy, growth orientation, resilience, motivation, and sense of agency. It represents the psychological and emotional dimension of student success—the internal drive and confidence to persist through challenges.'
    },
    { 
      id: 'belonging', 
      name: 'Feeling', 
      color: '#C8102E', 
      position: 'right',
      description: 'The sense of connection, identity, and membership within the learning community',
      context: 'Feeling (a.k.a. Affection) reflects social integration, feelings of acceptance and value, cultural fit, and connection to institutional identity. It represents the social and relational dimension of student success—feeling part of something larger than oneself.'
    },
    { 
      id: 'learning', 
      name: 'Learning', 
      color: '#001731', 
      position: 'middle',
      description: 'The successful culmination of all components to drive the mission and outcome of WGU',
      context: 'Learning is conditionally irrespective interpretation of juxtaposed, competing, or remixed methods, definitions, philosophies, frameworks, and/or contexts by which to choose a superior way of knowing, working, behaving, and/or thinking.'
    }
  ];

  const ecologicalLayers = [
    { 
      id: 'chronosystem', 
      name: 'Chronosystem', 
      radius: 350, 
      color: '#E0D5F0', 
      opacity: 0.3, 
      width: 35,
      description: 'The chronosystem adds a temporal dimension to the ecological model, considering how changes over time affect development. ',
      context: '•	Life transitions: Such as moving to a new city, changing schools, or family changes like divorce.<br />•	Historical events: Major societal changes, such as economic recessions or technological advancements, that can influence individual experiences and development.<br /><br />The chronosystem emphasizes that development is not static but evolves over time in response to various influences.'
    },
    { 
      id: 'macrosystem', 
      name: 'Macrosystem', 
      radius: 306, 
      color: '#D4C8E8', 
      opacity: 0.4, 
      width: 35,
      description: 'The macrosystem encompasses the broader cultural and societal contexts that influence development.',
      context: '•	Cultural values: Norms and beliefs that shape behaviors and expectations.<br />•	Economic conditions: The overall economic environment that can affect access to resources and opportunities.<br />•	Political systems: Laws and policies that govern society and impact individual lives.<br /><br />The macrosystem provides the overarching framework within which the other systems operate.'
    },
    { 
      id: 'exosystem',
      name: 'Exosystem',
      radius: 262,
      color: '#C8BBE0',
      opacity: 0.45,
      width: 35,
      description: 'The exosystem includes external environmental settings that indirectly influence the individual.',
      context: '•	Community resources: Such as local health services, schools, and recreational facilities.<br />•	Parental workplace: The work environment of parents can affect family dynamics and resources available to children.<br />•	Local policies: Decisions made at the community or governmental level that impact the individual\'s environment.<br /><br />While individuals may not interact directly with these systems, they still have a significant impact on their development.'
    },
    { 
      id: 'mesosystem',
      name: 'Mesosystem',
      radius: 221,
      color: '#BCAED8',
      opacity: 0.5,
      width: 30,
      description: 'The mesosystem refers to the connections and interactions between different microsystems.', 
      context: '•	The relationship between home and school, where parental involvement can affect a child\'s academic performance.<br />•	Interactions between peer groups and family, which can influence family dynamics.<br />•	The connection between the neighborhood and school, where community resources can impact educational opportunities.<br /><br />The mesosystem highlights the importance of supportive relationships across different environments.'
    },
    { 
      id: 'microsystem',
      name: 'Microsystem',
      radius: 180,
      color: '#B0A1D0',
      opacity: 0.55,
      width: 35,
      description: 'The microsystem is the innermost layer and includes the immediate environments that an individual interacts with directly.', 
      context: '•	Family: Parents, siblings, and extended family members who provide care and socialization.<br />•	School: Teachers and classmates that contribute to learning and social experiences.<br />•	Peers: Friends and playmates who influence social skills and behaviors.<br />•	Neighborhood: The local community and its resources, safety, and social norms.<br /><br />Interactions within the microsystem are bidirectional, meaning that individuals can influence their environment just as their environment influences them.'
    }
  ];

  // --- NEW HANDLER FUNCTIONS TO ENSURE MUTUAL EXCLUSIVITY ---

  const handleLayerClick = (layerId) => {
    if (tooltipLayer === layerId) {
      setTooltipLayer(null);
    } else {
      // Activate Layer, clear others
      setTooltipLayer(layerId);
      setTooltipIntrinsic(null);
      setSelectedDomain(null);
    }
  };

  const handleIntrinsicClick = (intrinsicId) => {
    if (tooltipIntrinsic === intrinsicId) {
      setTooltipIntrinsic(null);
    } else {
      // Activate Intrinsic, clear others
      setTooltipIntrinsic(intrinsicId);
      setTooltipLayer(null);
      setSelectedDomain(null);
    }
  };

  const handleDomainClick = (domain) => {
    if (selectedDomain?.id === domain.id) {
      setSelectedDomain(null);
    } else {
      // Activate Domain, clear others
      setSelectedDomain(domain);
      setTooltipIntrinsic(null);
      setTooltipLayer(null);
    }
  };

  // ---------------------------------------------------------

  const clearSelection = () => {
    setSelectedDomain(null);
    setHoveredIntrinsic(null);
    setTooltipIntrinsic(null);
    setTooltipLayer(null);
  };

  const getNeedNameById = (id) => {
    return intrinsicNeeds.find(item => item.id === id)?.name;
  };

  const getNeedColorById = (id) => {
    return intrinsicNeeds.find(item => item.id === id)?.color;
  };
   
  const getConnectionStrength = (domain, intrinsic) => {
    if (!domain || !intrinsic) return 0;
    return domain.influences[intrinsic] || 0;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
  };

  const getAngleDegrees = (
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number, 
    normalize: boolean = false
  ): number => {
      const dx = x2 - x1;
      const dy = y2 - y1;
   
      const angleRad = Math.atan2(dy, dx); 
      let degrees = angleRad * (180 / Math.PI); 
   
      if (normalize && degrees < 0) {
          degrees += 360;
      }
   
      return degrees;
  };

  const renderConnection = (domain, intrinsic) => {
    const strength = getConnectionStrength(domain, intrinsic);
    if (strength < 5) return null;

    const centerX = 400;
    const centerY = 400;
    
    const cognitionScore = domain.influences.cognition * intrinsicLevels.cognition;
    const mindsetScore = domain.influences.mindset * intrinsicLevels.mindset;
    const belongingScore = domain.influences.belonging * intrinsicLevels.belonging;
    const totalScore = cognitionScore + mindsetScore + belongingScore;
    const maxPossibleScore = (domain.influences.cognition + domain.influences.mindset + domain.influences.belonging) * 100;
    const domainAlignment = totalScore / maxPossibleScore;
    const radius = 350 - (domainAlignment * 180);
    
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
    const intrinsicInfo = intrinsicNeeds.find(n => n.id === intrinsic);
    const gradientId = `gradient-${domain.id}-${intrinsic}`;
    const gradientAngle = getAngleDegrees(intrinsicX, intrinsicY, domainX, domainY, true);

    return (
      <g key={`${domain.id}-${intrinsic}`}>
        <defs>
          <linearGradient 
            id={gradientId} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="0%" 
            gradientTransform={`rotate(${gradientAngle}, .5, .5)`}
            >
            <stop 
              offset="0%" 
              stopColor={intrinsicInfo.color} 
              stopOpacity="0.4" 
            />
            <stop 
              offset="100%" 
              stopColor={domain.color} 
              stopOpacity="1" 
            />
          </linearGradient>
        </defs>
        <line
          x1={intrinsicX}
          y1={intrinsicY}
          x2={domainX}
          y2={domainY}
          stroke={`url(#${gradientId})`}
          strokeWidth={strength / 5}
          opacity="1"
          className="transition-all duration-300"
        />
      </g>
    );
  };

  const getIntrinsicInfo = (intrinsicId) => {
    return intrinsicNeeds.find(need => need.id === intrinsicId);
  };

  const getLayerInfo = (layerId) => {
    return ecologicalLayers.find(layer => layer.id === layerId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Student Experience Ecosystem Explorer
          </h1>
          <p className="text-left text-sm font-medium text-slate-700 mb-3">
            The Learning Triangle and the Focus Wheel models form a mutually reinforcing ecosystem. The Focus Wheel visualizes the outer (or extrinsic) experience of the learner's environment, while the Learning Triangle represents the inner experience of learning itself. Together, they operate as a bi-directional system — where intrinsic states shape extrinsic outcomes, and extrinsic supports restore or strengthen intrinsic capacities. Use the tool below to explore how intrinsic learner needs and extrinsic support domains dynamically interact in the WGU student experience model.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualization */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <svg viewBox="0 0 800 800" className="w-full h-full">
              {/* Ecological Layers - Background */}
              {ecologicalLayers.map((layer, idx) => (
                <g key={`layer-${idx}`}>
                  <circle
                    cx="400"
                    cy="400"
                    r={layer.radius}
                    fill="none"
                    stroke={layer.color}
                    strokeWidth={layer.width}
                    opacity={layer.opacity}
                  />
                  <text
                    x="400"
                    y={400 - layer.radius + layer.width / 2 - 15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#64748B"
                    fontSize="14"
                    fontWeight="600"
                    opacity="0.6"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => handleLayerClick(layer.id)}
                  >
                    {layer.name}
                  </text>
                </g>
              ))}

              {/* Connection lines */}
              {selectedDomain && intrinsicNeeds.map(intrinsic => 
                renderConnection(selectedDomain, intrinsic.id)
              )}

              {/* Alignment lines and labels */}
              {focusWheelDomains.map(domain => {
                const centerX = 400;
                const centerY = 400;
                
                const cognitionScore = domain.influences.cognition * intrinsicLevels.cognition;
                const mindsetScore = domain.influences.mindset * intrinsicLevels.mindset;
                const belongingScore = domain.influences.belonging * intrinsicLevels.belonging;
                const totalScore = cognitionScore + mindsetScore + belongingScore;
                const maxPossibleScore = (domain.influences.cognition + domain.influences.mindset + domain.influences.belonging) * 100;
                const domainAlignment = totalScore / maxPossibleScore;
                
                const radius = (350 - 30) - (domainAlignment * 180);
                const angleRad = (domain.angle * Math.PI) / 180;
                const x = centerX + radius * Math.cos(angleRad);
                const y = centerY + radius * Math.sin(angleRad);
                
                const midX = centerX + (radius * 0.85) * Math.cos(angleRad);
                const midY = centerY + (radius * 0.85) * Math.sin(angleRad);
                
                return (
                  <g key={`alignment-${domain.id}`}>
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
                
                const cognitionScore = domain.influences.cognition * intrinsicLevels.cognition;
                const mindsetScore = domain.influences.mindset * intrinsicLevels.mindset;
                const belongingScore = domain.influences.belonging * intrinsicLevels.belonging;
                
                const totalScore = cognitionScore + mindsetScore + belongingScore;
                
                const maxPossibleScore = (domain.influences.cognition + domain.influences.mindset + domain.influences.belonging) * 100;
                const domainAlignment = totalScore / maxPossibleScore;
                
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
                      onClick={() => handleDomainClick(domain)}
                    />
                    <text
                      x={x}
                      y={y - ((domain.name.split(' ').length - 1) * 6) + 4}
                      textAnchor="middle"
                      dominantBaseline="top"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      className="pointer-events-none"
                      style={{ userSelect: 'none' }}
                    >
                      {domain.name.split(' ').map((word, i) => (
                        <tspan key={i} x={x} dy={i === 0 ? 0 : 12}>
                          {word}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}

              {/* Learning Triangle */}
              <g>
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
                  r={tooltipIntrinsic === 'cognition' ? 55 : 45}
                  fill={getNeedColorById('cognition')}
                  opacity={tooltipIntrinsic === 'cognition' ? 1 : 0.8}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleIntrinsicClick('cognition')}
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
                  {getNeedNameById('cognition')}
                </text>

                {/* Mindset (bottom left) */}
                <circle
                  cx="330"
                  cy="440"
                  r={tooltipIntrinsic === 'mindset' ? 55 : 45}
                  fill={getNeedColorById('mindset')}
                  opacity={tooltipIntrinsic === 'mindset' ? 1 : 0.8}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleIntrinsicClick('mindset')}
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
                  {getNeedNameById('mindset')}
                </text>

                {/* Belonging (bottom right) */}
                <circle
                  cx="470"
                  cy="440"
                  r={tooltipIntrinsic === 'belonging' ? 55 : 45}
                  fill={getNeedColorById('belonging')}
                  opacity={tooltipIntrinsic === 'belonging' ? 1 : 0.8}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleIntrinsicClick('belonging')}
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
                  {getNeedNameById('belonging')}
                </text>

                {/* Learning (middle center) */}
                <circle
                  cx="400"
                  cy="400"
                  r={tooltipIntrinsic === 'learning' ? 55 : 45}
                  fill={getNeedColorById('learning')}
                  opacity={tooltipIntrinsic === 'learning' ? 1 : 0.8}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleIntrinsicClick('learning')}
                />
                <text
                  x="400"
                  y="404"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                  className="pointer-events-none"
                >
                  {getNeedNameById('learning')}
                </text>
              </g>
            </svg>
          </div>

          {/* Control Panel & Info */}
          <div className="space-y-6">
            {/* Clear Button */}
            {(selectedDomain || hoveredIntrinsic || tooltipIntrinsic || tooltipLayer) && (
              <button
                onClick={clearSelection}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
              >
                <X size={18} />
                Clear Selection
              </button>
            )}

            {/* Intrinsic Level Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={20} />
                Adjust Intrinsic Needs Levels
              </h3>
              <div className="space-y-4">
                {intrinsicNeeds.map(need => (
                  <div key={need.id}>
                    <label 
                      className={need.id === 'learning' ? 'hidden' : 'block text-sm font-medium text-slate-700 mb-2'}
                    >
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
                      className={need.id === 'learning' ? 'hidden' : 'w-full'}
                      style={{
                        accentColor: need.color
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ecological Layer Tooltip */}
            {tooltipLayer && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <div 
                  className="w-full h-2 rounded-full mb-4"
                  style={{ backgroundColor: getLayerInfo(tooltipLayer).color }}
                />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {getLayerInfo(tooltipLayer).name}
                </h3>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  {getLayerInfo(tooltipLayer).description}
                </p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-700" dangerouslySetInnerHTML={{__html: getLayerInfo(tooltipLayer).context}} />
                </div>
              </div>
            )}

            {/* Intrinsic Need Tooltip */}
            {/* Removed !tooltipLayer check to simplify logic now that state is exclusive */}
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
            {/* Removed !tooltipLayer and !tooltipIntrinsic checks */}
            {selectedDomain && (
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
                      <div 
                        key={need.id} 
                        className={need.id === 'learning' ? 'hidden' : 'flex items-center gap-2'}
                      >
                        <span className="text-sm text-slate-600 w-24">
                          {need.name}:
                        </span>
                        <div 
                          className={need.id === 'learning' ? 'hidden' : 'flex-1 bg-slate-200 rounded-full h-2'}
                        >
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${strength}%`,
                              backgroundColor: need.color
                            }}
                          />
                        </div>
                        <span 
                          className={need.id === 'learning' ? 'hidden' : 'text-sm font-medium text-slate-700 w-12'}
                        >
                          {strength}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Instructions */}
            {!selectedDomain && !tooltipIntrinsic && !tooltipLayer && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  How to Explore
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Click on any Focus Wheel domain to see connections</li>
                  <li>• Click on Learning Triangle elements for context</li>
                  <li>• Click on Ecological Layer labels for system information</li>
                  <li>• Adjust intrinsic need level sliders to simulate individual context changes</li>
                  <li>• Watch domains move closer/farther based on learning triangle influences</li>
                  <li>• Note domain placement against ecological layers for recommended intervention pathway</li>
                  <li>• Line thickness and % labels show connection strength</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>Based on a combination of the Learning Triangle, InsideTrack Focus Wheel, and Bronfenbrenner's Ecological Systems Theory | Interactive Prototype Designed for Student Experience</p>
        </footer>
      </div>
    </div>
  );
};

export default StudentSuccessEcosystem;
