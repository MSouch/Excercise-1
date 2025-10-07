import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import logoImg from '../assets/AP-Networks-LearningSytems-Full-DivOf (6).png'
import medallionImg from '../assets/APLS-Medallion-2025_Procurement.png'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'
import { FaLinkedin, FaFacebook, FaXTwitter, FaArrowDown, FaArrowUp, FaCopy, FaCheck } from 'react-icons/fa6'

const { FiAward, FiDownload, FiShare2, FiHome, FiTarget, FiTrendingUp, FiShield } = FiIcons

const Conclusion = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [credentialId, setCredentialId] = useState(null)
  const [copiedId, setCopiedId] = useState(false)
  const [copiedShareText, setCopiedShareText] = useState(false)

  const calculateScoreLevel = () => {
    const { completedChallenges, totalChallenges } = progress
    if (completedChallenges === totalChallenges) return 'Expert'
    if (completedChallenges >= 3) return 'Proficient'
    if (completedChallenges >= 2) return 'Developing'
    return 'Needs Training'
  }

  // Generate unique credential ID
  const generateCredentialId = () => {
    // Generate a UUID v4-like unique identifier
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Copy credential ID to clipboard
  const copyCredentialId = () => {
    if (credentialId) {
      navigator.clipboard.writeText(credentialId)
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    }
  }

  // Copy share text to clipboard
  const copyShareText = () => {
    const shareText = `I just earned the Maintenance Procurement Navigator Digital Credential! 🏆\n\nCredential ID: ${credentialId}\n\n#Procurement #Maintenance #ProfessionalDevelopment #APLearningSystems`
    navigator.clipboard.writeText(shareText)
    setCopiedShareText(true)
    setTimeout(() => setCopiedShareText(false), 2000)
  }

  // Generate credential ID when component mounts if all challenges are complete
  useEffect(() => {
    console.log('Conclusion useEffect triggered')
    console.log('Progress:', progress)
    console.log('Completed challenges:', progress.completedChallenges)
    console.log('Total challenges:', progress.totalChallenges)
    
    if (progress.completedChallenges === progress.totalChallenges && !credentialId) {
      // Check if credential already exists in localStorage
      const storedCredential = localStorage.getItem('procurementCredential')
      if (storedCredential) {
        const data = JSON.parse(storedCredential)
        setCredentialId(data.credential_id)
      } else {
        // Generate new credential ID
        const newCredentialId = generateCredentialId()
        setCredentialId(newCredentialId)
        
        // Save credential info to localStorage
        const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
        const credentialData = {
          user_id: user?.id || 'anonymous',
          user_name: userName,
          credential_id: newCredentialId,
          score_level: calculateScoreLevel(),
          total_score: progress.overallScore,
          issued_at: new Date().toISOString()
        }
        
        localStorage.setItem('procurementCredential', JSON.stringify(credentialData))
        console.log('Credential data saved to localStorage:', credentialData)
      }
    }
  }, [progress, credentialId, user])

  const performanceImpacts = [
    { challenge: 'Challenge 1', impact: 'Prevented $255,000 in production losses through proper emergency maintenance procedures' },
    { challenge: 'Challenge 2', impact: 'Avoided 2-4 weeks of delays with comprehensive maintenance project documentation' },
    { challenge: 'Challenge 3', impact: 'Built stakeholder consensus while staying within maintenance budget constraints' },
    { challenge: 'Challenge 4', impact: 'Saved $3.67 million by making informed crisis maintenance decisions' }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiAward} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Congratulations, Maintenance Procurement Navigator!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You've successfully navigated four complex maintenance procurement scenarios using professional best practices. 
              Your systematic approach demonstrates mastery of industrial maintenance procurement fundamentals.
            </p>
          </motion.div>

          {/* Performance Impact */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Performance Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceImpacts.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <SafeIcon icon={FiTarget} className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.challenge}</h3>
                    <p className="text-gray-600 text-sm">{item.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Statistics */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Real-World Success Statistics
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Organizations that implement systematic maintenance procurement practices like yours see:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { metric: '23%', label: 'Reduction in procurement processing time', direction: 'down' },
                { metric: '31%', label: 'Fewer emergency maintenance purchases', direction: 'down' },
                { metric: '27%', label: 'Decrease in maintenance-related delays', direction: 'down' },
                { metric: '18%', label: 'Improvement in vendor performance', direction: 'up' }
              ].map((stat, index) => {
                const IconComp = stat.direction === 'down' ? FaArrowDown : FaArrowUp
                const color = stat.direction === 'down' ? 'text-success-600' : 'text-primary-600'
                const bg = stat.direction === 'down' ? 'bg-success-100' : 'bg-primary-100'
                return (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComp className={`w-6 h-6 ${color}`} />
                    </div>
                    <p className={`text-2xl font-bold ${color} mb-1`}>{stat.metric}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Overall Event Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { metric: 'Faster Decisions', label: 'Improved response time to maintenance crises', icon: FaArrowUp },
                { metric: 'Higher Reliability', label: 'Better preventive planning outcomes', icon: FaArrowUp },
                { metric: 'Stronger Compliance', label: 'Audit-ready documentation practices', icon: FaArrowUp }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + idx * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="text-base font-semibold text-primary-700 mb-1">{item.metric}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Digital Credential Section */}
          <motion.div 
            className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-2xl p-8 mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-center">
              Digital Credential Awarded
            </h2>
            <p className="text-blue-100 text-center mb-8">
              Maintenance Procurement Navigator Program
            </p>

            {/* Badge Display */}
            <div className="bg-white rounded-xl p-8 mb-8 text-center">
              <div className="inline-block relative mb-6">
                <img 
                  src={medallionImg} 
                  alt="APLS Procurement Navigator Medallion" 
                  className="w-56 h-56 mx-auto drop-shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {calculateScoreLevel().toUpperCase()}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Certified Maintenance Procurement Professional
              </h3>
              <p className="text-gray-600 font-medium">
                {user?.full_name || user?.user_metadata?.full_name || 'Participant'}
              </p>
            </div>

            {/* Credential Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Credential Information */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <SafeIcon icon={FiShield} className="w-5 h-5 mr-2" />
                  Credential Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Credential Name:</span>
                    <span className="font-semibold">Procurement Navigator</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Issued By:</span>
                    <span className="font-semibold">AP-Learning Systems</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Issue Date:</span>
                    <span className="font-semibold">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Achievement Level:</span>
                    <span className="font-semibold">{calculateScoreLevel()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Overall Score:</span>
                    <span className="font-semibold">{progress.overallScore}%</span>
                  </div>
                </div>
              </div>

              {/* Credential ID */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Unique Credential ID</h3>
                <div className="bg-white/20 rounded-lg p-4 mb-3">
                  <p className="text-xs text-blue-100 mb-1">Verification ID:</p>
                  <p className="font-mono text-sm break-all">
                    {credentialId || 'Generating...'}
                  </p>
                </div>
                <button
                  onClick={copyCredentialId}
                  disabled={!credentialId}
                  className="w-full bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {copiedId ? (
                    <>
                      <FaCheck className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-4 h-4" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Skills Verified */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Skills Verified</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Emergency maintenance procurement',
                  'Strategic vendor selection',
                  'Budget and cost control',
                  'Stakeholder management',
                  'Risk assessment and mitigation',
                  'Documentation and compliance',
                  'Crisis decision-making',
                  'Resource allocation optimization'
                ].map((skill, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <SafeIcon icon={FiTarget} className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Section */}
            <div className="bg-green-500 rounded-lg p-6 mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">Verify This Credential</h3>
              <p className="text-green-50 text-sm mb-4">
                This digital credential is secured and can be verified using the unique ID above
              </p>
              <div className="text-xs text-green-100">
                <strong>Verification Method:</strong> Unique identifier system<br/>
                <strong>Issuer Contact:</strong> credentials@ap-networks.com
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-center">Share Your Achievement</h3>
              <p className="text-blue-100 text-sm text-center mb-4">
                Showcase your professional credential on social media
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {(() => {
                  const shareUrl = encodeURIComponent('https://ap-networks.com/learning-systems')
                  const shareText = encodeURIComponent(`I just earned the Maintenance Procurement Navigator Digital Credential! 🏆\n\nCredential ID: ${credentialId || '[Generating]'}\n\n#Procurement #Maintenance #ProfessionalDevelopment`)
                  
                  const platforms = [
                    {
                      name: 'LinkedIn',
                      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
                      bg: 'bg-[#0A66C2] hover:bg-[#084f94]',
                      icon: FaLinkedin
                    },
                    {
                      name: 'Facebook',
                      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                      bg: 'bg-[#1877F2] hover:bg-[#125ec0]',
                      icon: FaFacebook
                    },
                    {
                      name: 'X (Twitter)',
                      href: `https://twitter.com/intent/tweet?text=${shareText}`,
                      bg: 'bg-black hover:bg-neutral-700',
                      icon: FaXTwitter
                    }
                  ]
                  
                  return platforms.map(p => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-2 ${p.bg} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg`}
                    >
                      <p.icon className="w-4 h-4" />
                      <span>{p.name}</span>
                    </a>
                  ))
                })()}
              </div>
              <button
                type="button"
                onClick={copyShareText}
                disabled={!credentialId}
                className="w-full bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {copiedShareText ? (
                  <>
                    <FaCheck className="w-4 h-4" />
                    <span>Share Text Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="w-4 h-4" />
                    <span>Copy Share Text</span>
                  </>
                )}
              </button>
              <p className="text-xs text-blue-100 mt-3 text-center">
                <strong>Tip:</strong> Add this credential to your LinkedIn profile under "Licenses & Certifications"
              </p>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Next Steps for Continued Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Immediate Actions:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Apply these frameworks in your daily maintenance procurement activities</li>
                  <li>• Share knowledge with colleagues facing similar challenges</li>
                  <li>• Document lessons learned from each procurement experience</li>
                  <li>• Build relationships proactively with key vendors and stakeholders</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Continue Learning:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <a href="#" className="text-primary-600 hover:underline">Advanced Maintenance Contract Negotiation Workshop</a></li>
                  <li>• <a href="#" className="text-primary-600 hover:underline">Vendor Relationship Excellence Course</a></li>
                  <li>• <a href="#" className="text-primary-600 hover:underline">Strategic Maintenance Procurement Leadership Program</a></li>
                  <li>• <a href="#" className="text-primary-600 hover:underline">Other Navigator Series training courses</a></li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Link 
              to="/dashboard"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiHome} className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Conclusion