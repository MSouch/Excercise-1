import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'
import { FaLinkedin, FaFacebook, FaXTwitter, FaCopy, FaCheck, FaArrowDown, FaArrowUp } from 'react-icons/fa6'

const { FiShield, FiTarget, FiHome, FiDownload } = FiIcons

// ============================================================================
// SIMULATION-SPECIFIC CONFIGURATION
// ============================================================================
// 👉 UPDATE THESE VALUES FOR EACH NEW SIMULATION
// ============================================================================

const SIMULATION_CONFIG = {
  // Simulation Identity
  name: 'Procurement Navigator', // Full name of the simulation
  credentialTitle: 'Certified Maintenance Procurement Professional', // Title on the medallion
  programName: 'Maintenance Procurement Navigator Program', // Subtitle on page
  completionCode: 'PN0300', // Unique completion code
  
  // Medallion Image
  // 👉 REPLACE THIS IMPORT with your simulation's medallion image
  medallionImage: '/path/to/your/medallion.png', // Import your medallion image and set it here
  
  // Share Text Configuration
  shareText: {
    message: 'I just completed the Procurement Navigator simulation and earned the Procurement Navigator Expert certificate!',
    hashtags: '#Procurement #Maintenance #ProfessionalDevelopment',
    url: 'https://ap-networks.com/learning-systems'
  },
  
  // Performance Impact Cards (4 items)
  performanceImpacts: [
    { 
      challenge: 'Challenge 1', 
      impact: 'Prevented $255,000 in production losses through proper emergency maintenance procedures' 
    },
    { 
      challenge: 'Challenge 2', 
      impact: 'Avoided 2-4 weeks of delays with comprehensive maintenance project documentation' 
    },
    { 
      challenge: 'Challenge 3', 
      impact: 'Built stakeholder consensus while staying within maintenance budget constraints' 
    },
    { 
      challenge: 'Challenge 4', 
      impact: 'Saved $3.67 million by making informed crisis maintenance decisions' 
    }
  ],
  
  // Real-World Success Statistics (4 metrics)
  successStatistics: {
    intro: 'Organizations that implement systematic maintenance procurement practices like yours see:',
    metrics: [
      { 
        metric: '23%', 
        label: 'Reduction in procurement processing time', 
        direction: 'down' // 'up' for improvements, 'down' for reductions
      },
      { 
        metric: '31%', 
        label: 'Fewer emergency maintenance purchases', 
        direction: 'down' 
      },
      { 
        metric: '27%', 
        label: 'Decrease in maintenance-related delays', 
        direction: 'down' 
      },
      { 
        metric: '18%', 
        label: 'Improvement in vendor performance', 
        direction: 'up' 
      }
    ],
    // Overall Event Success (3 items)
    overallSuccess: [
      { 
        metric: 'Faster Decisions', 
        label: 'Improved response time to maintenance crises' 
      },
      { 
        metric: 'Higher Reliability', 
        label: 'Better preventive planning outcomes' 
      },
      { 
        metric: 'Stronger Compliance', 
        label: 'Audit-ready documentation practices' 
      }
    ]
  },
  
  // Next Steps Configuration
  nextSteps: {
    immediateActions: [
      'Apply these frameworks in your daily maintenance procurement activities',
      'Share knowledge with colleagues facing similar challenges',
      'Document lessons learned from each procurement experience',
      'Build relationships proactively with key vendors and stakeholders'
    ],
    continueLinks: [
      { text: 'Advanced Maintenance Contract Negotiation Workshop', href: '#' },
      { text: 'Vendor Relationship Excellence Course', href: '#' },
      { text: 'Strategic Maintenance Procurement Leadership Program', href: '#' },
      { text: 'Other Navigator Series training courses', href: '#' }
    ]
  }
}

// ============================================================================
// END CONFIGURATION - DO NOT MODIFY BELOW THIS LINE
// ============================================================================

const ConclusionTemplate = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [credentialId, setCredentialId] = useState(null)
  const [copiedShareText, setCopiedShareText] = useState(false)

  const calculateScoreLevel = () => {
    const { completedChallenges = 0, totalChallenges = 4 } = progress || {}
    if (completedChallenges === totalChallenges) return 'Expert'
    if (completedChallenges >= 3) return 'Proficient'
    if (completedChallenges >= 2) return 'Developing'
    return 'Needs Training'
  }

  const generateCredentialId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const copyShareText = async () => {
    const shareText = `${SIMULATION_CONFIG.shareText.message}\n\n${SIMULATION_CONFIG.shareText.hashtags}`
    try {
      await navigator.clipboard.writeText(shareText)
      setCopiedShareText(true)
      setTimeout(() => setCopiedShareText(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support Clipboard API
      try {
        const textArea = document.createElement('textarea')
        textArea.value = shareText
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        textArea.remove()
        if (successful) {
          setCopiedShareText(true)
          setTimeout(() => setCopiedShareText(false), 2000)
        } else {
          // eslint-disable-next-line no-alert
          alert(shareText)
        }
      } catch (fallbackErr) {
        // eslint-disable-next-line no-alert
        alert(shareText)
      }
    }
  }

  const downloadMedallion = () => {
    try {
      const link = document.createElement('a')
      link.href = SIMULATION_CONFIG.medallionImage
      link.download = `APLS-${SIMULATION_CONFIG.name.replace(/\s+/g, '-')}-Medallion.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error('Error downloading medallion', e)
    }
  }

  useEffect(() => {
    if (!progress) return
    const completed = progress.completedChallenges || 0
    const total = progress.totalChallenges || 4

    if (completed === total && !credentialId) {
      const stored = localStorage.getItem('procurementCredential')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed?.credential_id) {
            setCredentialId(parsed.credential_id)
            return
          }
        } catch (e) {
          // ignore and create new
        }
      }

      const newId = generateCredentialId()
      setCredentialId(newId)

      const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
      const payload = {
        user_id: user?.id || 'anonymous',
        user_name: userName,
        credential_id: newId,
        score_level: calculateScoreLevel(),
        total_score: progress.overallScore || 0,
        issued_at: new Date().toISOString()
      }

      try {
        localStorage.setItem('procurementCredential', JSON.stringify(payload))
      } catch (e) {
        console.warn('Could not persist credential to localStorage', e)
      }
    }
  }, [progress, credentialId, user])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiShield} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Digital Simulation Expert Credential Awarded</h1>
            <p className="text-lg text-gray-600">{SIMULATION_CONFIG.programName}</p>
          </motion.div>

          {/* Grand Medallion Card */}
          <motion.div 
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden mb-8 shadow-2xl"
            style={{ borderWidth: '6px', borderStyle: 'solid', borderImage: 'linear-gradient(135deg, #005397 0%, #0077be 100%) 1' }}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-[#005397]"></div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-[#005397]"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute bottom-0 left-0 w-1 h-full bg-[#005397]"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute bottom-0 right-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-[#005397]"></div>
            </div>

            <div className="relative p-12 text-center">
              {/* Medallion Image */}
              <div className="inline-block mb-8 relative">
                <div className="absolute inset-0 bg-[#005397] opacity-10 rounded-full blur-2xl scale-110"></div>
                <img src={SIMULATION_CONFIG.medallionImage} alt={`${SIMULATION_CONFIG.name} Medallion`} className="relative w-64 h-64 mx-auto drop-shadow-2xl" />
              </div>

              {/* Title & Name */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#005397] mb-3">{SIMULATION_CONFIG.credentialTitle}</h3>
                <p className="text-xl text-gray-700 font-semibold">{user?.full_name || user?.user_metadata?.full_name || 'Participant'}</p>
              </div>

              {/* Download Button */}
              <div className="mb-8">
                <button 
                  onClick={downloadMedallion} 
                  className="inline-flex items-center space-x-2 bg-[#005397] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#003d73] transition-all transform hover:scale-105 shadow-lg"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  <span>Download Medallion</span>
                </button>
              </div>

              {/* Credential Details Section */}
              <div className="border-t-2 border-[#005397] pt-8 mb-8">
                <h4 className="text-xl font-bold text-[#005397] mb-6 flex items-center justify-center">
                  <SafeIcon icon={FiShield} className="w-5 h-5 mr-2" />
                  Credential Details
                </h4>
                <div className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Credential Name</span>
                      <span className="font-semibold text-gray-900">{SIMULATION_CONFIG.name}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Issued By</span>
                      <span className="font-semibold text-gray-900">AP-Learning Systems</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Issue Date</span>
                      <span className="font-semibold text-gray-900">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Achievement Level</span>
                      <span className="font-semibold text-[#005397]">{calculateScoreLevel()}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 md:col-span-2">
                      <span className="text-sm text-gray-600 block mb-1">Overall Score</span>
                      <span className="font-semibold text-[#005397] text-xl">{progress?.overallScore || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="border-t-2 border-[#005397] pt-8">
                <h4 className="text-xl font-bold text-[#005397] mb-4">Share Your Achievement</h4>
                <p className="text-gray-600 text-sm mb-6">Showcase your professional credential on social media</p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {(() => {
                    const shareUrl = encodeURIComponent(SIMULATION_CONFIG.shareText.url)
                    const shareText = encodeURIComponent(`${SIMULATION_CONFIG.shareText.message}\n\n${SIMULATION_CONFIG.shareText.hashtags}`)
                    const platforms = [
                      { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, bg: 'bg-[#0A66C2] hover:bg-[#084f94]', icon: FaLinkedin },
                      { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, bg: 'bg-[#1877F2] hover:bg-[#125ec0]', icon: FaFacebook },
                      { name: 'X', href: `https://twitter.com/intent/tweet?text=${shareText}`, bg: 'bg-black hover:bg-neutral-700', icon: FaXTwitter }
                    ]
                    return platforms.map(p => (
                      <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center space-x-2 ${p.bg} text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow-lg`}>
                        <p.icon className="w-4 h-4" />
                        <span>{p.name}</span>
                      </a>
                    ))
                  })()}
                </div>
                <button 
                  type="button" 
                  onClick={copyShareText} 
                  className="w-full max-w-md mx-auto bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 shadow"
                >
                  {copiedShareText ? (<><FaCheck className="w-4 h-4 text-green-600" /><span>Copied!</span></>) : (<><FaCopy className="w-4 h-4" /><span>Copy Share Text</span></>)}
                </button>
                <p className="text-xs text-gray-500 mt-4"><strong>Tip:</strong> Add this credential to your LinkedIn profile under "Licenses & Certifications"</p>
              </div>
            </div>
          </motion.div>

          {/* Performance Impact */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Performance Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SIMULATION_CONFIG.performanceImpacts.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
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
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Real-World Success Statistics
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              {SIMULATION_CONFIG.successStatistics.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {SIMULATION_CONFIG.successStatistics.metrics.map((stat, index) => {
                const IconComp = stat.direction === 'down' ? FaArrowDown : FaArrowUp
                const color = stat.direction === 'down' ? 'text-success-600' : 'text-primary-600'
                const bg = stat.direction === 'down' ? 'bg-success-100' : 'bg-primary-100'
                return (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
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
              {SIMULATION_CONFIG.successStatistics.overallSuccess.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + idx * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaArrowUp className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="text-base font-semibold text-primary-700 mb-1">{item.metric}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Next Steps for Continued Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Immediate Actions:</h3>
                <ul className="space-y-2 text-gray-600">
                  {SIMULATION_CONFIG.nextSteps.immediateActions.map((action, idx) => (
                    <li key={idx}>• {action}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Continue Learning:</h3>
                <ul className="space-y-2 text-gray-600">
                  {SIMULATION_CONFIG.nextSteps.continueLinks.map((link, idx) => (
                    <li key={idx}>• <a href={link.href} className="text-primary-600 hover:underline">{link.text}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
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

export default ConclusionTemplate
