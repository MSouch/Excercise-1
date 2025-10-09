import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import medallionImg from '../assets/APLS-Medallion-2025_Procurement.png'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'
import { FaLinkedin, FaFacebook, FaXTwitter, FaCopy, FaCheck } from 'react-icons/fa6'

const { FiShield, FiTarget } = FiIcons

// Self-contained medallion credential page
// - Usage: drop this file under src/pages and ensure the referenced imports exist in your project
// - Dependencies: Layout, useAuth, useProgress, SafeIcon, Tailwind CSS (or adjust classes)

const ConclusionMedallion = () => {
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

  // Simple UUID v4 generator for client-side credential IDs
  const generateCredentialId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const copyShareText = () => {
    const shareText = `I just earned the Maintenance Procurement Navigator Digital Credential! 🏆\n\n#Procurement #Maintenance #ProfessionalDevelopment`
    try {
      navigator.clipboard.writeText(shareText)
      setCopiedShareText(true)
      setTimeout(() => setCopiedShareText(false), 2000)
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(shareText)
    }
  }

  // Download medallion PNG
  const downloadMedallion = () => {
    try {
      const link = document.createElement('a')
      link.href = medallionImg
      link.download = `APLS-Medallion.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error('Error downloading medallion', e)
    }
  }

  useEffect(() => {
    // Only create or load a credential if the user completed all challenges
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
            <p className="text-lg text-gray-600">Maintenance Procurement Navigator Program</p>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-8 mb-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="inline-block mb-6">
              <img src={medallionImg} alt="APLS Procurement Navigator Medallion" className="w-56 h-56 mx-auto drop-shadow-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Certified Maintenance Procurement Professional</h3>
            <p className="text-gray-600 font-medium">{user?.full_name || user?.user_metadata?.full_name || 'Participant'}</p>
            <div className="mt-4">
              <button onClick={downloadMedallion} className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                <SafeIcon icon={FiShield} className="w-4 h-4" />
                <span>Download Medallion PNG</span>
              </button>
            </div>
          </motion.div>

            <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center"><SafeIcon icon={FiShield} className="w-5 h-5 mr-2" />Credential Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-blue-100">Credential Name:</span><span className="font-semibold">Procurement Navigator</span></div>
                <div className="flex justify-between"><span className="text-blue-100">Issued By:</span><span className="font-semibold">AP-Learning Systems</span></div>
                <div className="flex justify-between"><span className="text-blue-100">Issue Date:</span><span className="font-semibold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                <div className="flex justify-between"><span className="text-blue-100">Achievement Level:</span><span className="font-semibold">{calculateScoreLevel()}</span></div>
                <div className="flex justify-between"><span className="text-blue-100">Overall Score:</span><span className="font-semibold">{progress?.overallScore || 0}%</span></div>
              </div>
            </div>
          </div>

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

          {/* Verification section removed (to be added later) */}

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-center">Share Your Achievement</h3>
            <p className="text-blue-100 text-sm text-center mb-4">Showcase your professional credential on social media</p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {(() => {
                const shareUrl = encodeURIComponent('https://ap-networks.com/learning-systems')
                const shareText = encodeURIComponent(`I just earned the Maintenance Procurement Navigator Digital Credential! 🏆\n\n#Procurement #Maintenance #ProfessionalDevelopment`)
                const platforms = [
                  { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, bg: 'bg-[#0A66C2] hover:bg-[#084f94]', icon: FaLinkedin },
                  { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, bg: 'bg-[#1877F2] hover:bg-[#125ec0]', icon: FaFacebook },
                  { name: 'X (Twitter)', href: `https://twitter.com/intent/tweet?text=${shareText}`, bg: 'bg-black hover:bg-neutral-700', icon: FaXTwitter }
                ]
                return platforms.map(p => (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center space-x-2 ${p.bg} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg`}>
                    <p.icon className="w-4 h-4" />
                    <span>{p.name}</span>
                  </a>
                ))
              })()}
            </div>

            <button type="button" onClick={copyShareText} className="w-full bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              {copiedShareText ? (<><FaCheck className="w-4 h-4" /><span>Share Text Copied!</span></>) : (<><FaCopy className="w-4 h-4" /><span>Copy Share Text</span></>)}
            </button>
            <p className="text-xs text-blue-100 mt-3 text-center"><strong>Tip:</strong> Add this credential to your LinkedIn profile under "Licenses & Certifications"</p>
          </div>

          <div className="text-center">
            <Link to="/dashboard" className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ConclusionMedallion
