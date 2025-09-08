import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import logoImg from '../assets/AP-Networks-LearningSytems-Full-DivOf (6).png'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiAward, FiDownload, FiShare2, FiHome, FiTarget, FiTrendingUp } = FiIcons

const Conclusion = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [certificateUrl, setCertificateUrl] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [certificateError, setCertificateError] = useState(null)

  const calculateScoreLevel = () => {
    const { completedChallenges, totalChallenges } = progress
    if (completedChallenges === totalChallenges) return 'Expert'
    if (completedChallenges >= 3) return 'Proficient'
    if (completedChallenges >= 2) return 'Developing'
    return 'Needs Training'
  }

  const generateCertificate = async () => {
    console.log('Starting certificate generation...')
    setGenerating(true)
    setCertificateError(null)
    
    try {
      // Warn but continue if user missing
      if (!user) {
        console.warn('generateCertificate: No user found - proceeding with placeholder identity')
      }
      // Dynamic import of jsPDF to ensure it loads properly
      const { jsPDF } = await import('jspdf')
      console.log('jsPDF loaded successfully')
      
      const pdf = new jsPDF('landscape')
      const pageWidth = pdf.internal.pageSize.width
      const pageHeight = pdf.internal.pageSize.height

      console.log('PDF dimensions:', { pageWidth, pageHeight })

      // Background
      pdf.setFillColor(248, 250, 252)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // Border
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(3)
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)

      // APLS Logo (upper left corner)
      try {
        // Convert imported image to data URL via canvas for reliability
        const img = new Image()
        img.src = logoImg
        await new Promise((res, rej) => {
          img.onload = () => res()
          img.onerror = (e) => rej(e)
        })
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        // Desired display width in PDF (maintain aspect ratio)
        const displayWidth = 55
        const aspect = img.naturalHeight / img.naturalWidth
        const displayHeight = displayWidth * aspect
        pdf.addImage(dataUrl, 'PNG', 20, 18, displayWidth, displayHeight)
        console.log('Logo added to PDF')
      } catch (e) {
        console.warn('Failed to add logo, falling back to placeholder', e)
        pdf.setDrawColor(200, 200, 200)
        pdf.setLineWidth(1)
        pdf.rect(20, 20, 55, 25)
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text('APLS LOGO', 25, 35, { align: 'left' })
      }

      // Header
      pdf.setFontSize(24)
      pdf.setTextColor(59, 130, 246)
      pdf.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 40, { align: 'center' })

      // Subtitle
      pdf.setFontSize(16)
      pdf.setTextColor(75, 85, 99)
      pdf.text('Procurement Navigator Training Simulation', pageWidth / 2, 55, { align: 'center' })

      // User name
      pdf.setFontSize(20)
      pdf.setTextColor(17, 24, 39)
  const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
      pdf.text(`This certifies that ${userName}`, pageWidth / 2, 80, { align: 'center' })

      // User email
      pdf.setFontSize(12)
      pdf.setTextColor(107, 114, 128)
  const userEmail = user?.email || user?.user_metadata?.email || ''
      if (userEmail) {
        pdf.text(`(${userEmail})`, pageWidth / 2, 90, { align: 'center' })
      }

      // Achievement
      pdf.setFontSize(16)
      pdf.setTextColor(75, 85, 99)
      pdf.text('has successfully completed the Procurement Navigator training simulation', pageWidth / 2, 105, { align: 'center' })
      pdf.text('and demonstrated mastery of industrial maintenance procurement principles', pageWidth / 2, 120, { align: 'center' })

      // Score level
      pdf.setFontSize(18)
      pdf.setTextColor(34, 197, 94)
      pdf.text(`Achievement Level: ${calculateScoreLevel()}`, pageWidth / 2, 140, { align: 'center' })

      // Date
      pdf.setFontSize(12)
      pdf.setTextColor(107, 114, 128)
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`Completed on ${date}`, pageWidth / 2, 160, { align: 'center' })

      // Company info - Fixed positioning to prevent overlap
      pdf.setFontSize(14)
      pdf.setTextColor(59, 130, 246)
      pdf.text('AP-Learning Systems', pageWidth / 2, 180, { align: 'center' })
      
      // Division text - moved up slightly and made smaller to create more space
      pdf.setFontSize(10)
      pdf.setTextColor(107, 114, 128)
      pdf.text('A Division of AP-Networks LLC', pageWidth / 2, 190, { align: 'center' })

      // Completion Code (lower left corner)
      pdf.setFontSize(10)
      pdf.setTextColor(107, 114, 128)
      pdf.text('Completion Code: PN0300', 20, pageHeight - 30, { align: 'left' })

      // Certificate verification info (lower right corner)
      if (userEmail) {
        pdf.setFontSize(8)
        pdf.setTextColor(107, 114, 128)
        pdf.text(`Issued to: ${userEmail}`, pageWidth - 20, pageHeight - 40, { align: 'right' })
      }

      // Copyright (bottom center) - moved down to create proper separation
      pdf.setFontSize(8)
      pdf.setTextColor(107, 114, 128)
      pdf.text('© 2025 AP-Learning Systems, a Division of AP-Networks LLC - ALL RIGHTS RESERVED', 
               pageWidth / 2, pageHeight - 15, { align: 'center' })

      console.log('PDF content generated successfully')

      // Save certificate
      const pdfBlob = pdf.output('blob')
      const url = URL.createObjectURL(pdfBlob)
      
      console.log('Certificate blob created:', { size: pdfBlob.size, type: pdfBlob.type })
      
      setCertificateUrl(url)
      setCertificateGenerated(true)

      // Save certificate info to localStorage
      const certificateData = {
        user_id: user?.id || 'anonymous',
        user_email: user?.email || user?.user_metadata?.email || null,
        user_name: userName,
        certificate_code: 'PN0300',
        score_level: calculateScoreLevel(),
        total_score: progress.overallScore,
        issued_at: new Date().toISOString(),
        url
      }
      
      localStorage.setItem('procurementCertificate', JSON.stringify(certificateData))
      console.log('Certificate data saved to localStorage')

    } catch (error) {
      console.error('Error generating certificate:', error)
      setCertificateError('Error generating certificate. Please retry.')
    } finally {
      setGenerating(false)
    }
  }

  const downloadCertificate = () => {
    console.log('Download certificate clicked, URL:', certificateUrl)
    
    if (certificateUrl) {
      try {
        const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
        const fileName = `Procurement-Navigator-Certificate-${userName.replace(/\s+/g, '-')}.pdf`
        
        // Create download link
        const link = document.createElement('a')
        link.href = certificateUrl
        link.download = fileName
        link.style.display = 'none'
        
        // Append to body, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        console.log('Certificate download initiated:', fileName)
      } catch (error) {
        console.error('Error downloading certificate:', error)
        alert('There was an error downloading your certificate. Please try again.')
      }
    } else {
      console.error('No certificate URL available for download')
      alert('Certificate not ready. Please wait for generation to complete.')
    }
  }

  // Generate certificate when component mounts if all challenges are complete
  useEffect(() => {
    console.log('Conclusion useEffect triggered')
    console.log('Progress:', progress)
    console.log('Completed challenges:', progress.completedChallenges)
    console.log('Total challenges:', progress.totalChallenges)
    
    if (progress.completedChallenges === progress.totalChallenges && !certificateGenerated && !generating) {
      console.log('All challenges complete, generating certificate...')
      generateCertificate()
    }
  }, [progress, certificateGenerated, generating])

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: '23%', label: 'Reduction in maintenance procurement processing time' },
                { metric: '31%', label: 'Fewer emergency maintenance purchases' },
                { metric: '18%', label: 'Improvement in vendor performance' },
                { metric: '27%', label: 'Decrease in maintenance-related delays' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="text-2xl font-bold text-primary-600 mb-1">{stat.metric}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificate Section */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Certificate of Completion
            </h2>
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-lg p-6 text-white mb-6">
                <SafeIcon icon={FiAward} className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Certified Maintenance Procurement Navigator</h3>
                <p className="text-primary-100">
                  Achievement Level: {calculateScoreLevel()}
                </p>
                <p className="text-primary-100 text-sm">
                  Overall Score: {progress.overallScore}%
                </p>
                <p className="text-primary-100 text-sm mt-2">
                  Completion Code: PN0300
                </p>
                {user?.email && (
                  <p className="text-primary-100 text-xs mt-2">
                    Issued to: {user.email}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {generating ? (
                  <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                    <span className="text-gray-600">Generating your certificate...</span>
                  </div>
                ) : certificateGenerated && certificateUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-success-600 mb-4">
                      <SafeIcon icon={FiAward} className="w-5 h-5" />
                      <span className="font-medium">Certificate Ready!</span>
                    </div>
                    <div className="space-x-4">
                      <button
                        onClick={downloadCertificate}
                        className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Download Certificate</span>
                      </button>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: 'Procurement Navigator Certification',
                              text: 'I just completed the Procurement Navigator training simulation!',
                              url: window.location.href
                            })
                          } else {
                            // Fallback for browsers that don't support Web Share API
                            const text = 'I just completed the Procurement Navigator training simulation!'
                            navigator.clipboard.writeText(`${text} ${window.location.href}`)
                            alert('Achievement copied to clipboard!')
                          }
                        }}
                        className="inline-flex items-center space-x-2 bg-success-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-success-700 transition-colors"
                      >
                        <SafeIcon icon={FiShare2} className="w-4 h-4" />
                        <span>Share Achievement</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <button
                      onClick={generateCertificate}
                      disabled={generating || progress.completedChallenges < progress.totalChallenges}
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <SafeIcon icon={FiAward} className="w-4 h-4" />
                      <span>{generating ? 'Generating...' : 'Generate Certificate'}</span>
                    </button>
                    {progress.completedChallenges < progress.totalChallenges && (
                      <p className="text-sm text-gray-500 mt-2">
                        Complete all challenges to generate your certificate
                      </p>
                    )}
                    {certificateError && (
                      <p className="text-sm text-red-600 mt-2">
                        {certificateError}
                        <button
                          onClick={generateCertificate}
                          className="ml-2 underline text-red-700 hover:text-red-800"
                        >Retry</button>
                      </p>
                    )}
                  </div>
                )}
              </div>
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
                  <li>• Advanced Maintenance Contract Negotiation Workshop</li>
                  <li>• Vendor Relationship Excellence Course</li>
                  <li>• Strategic Maintenance Procurement Leadership Program</li>
                  <li>• Other Navigator Series training modules</li>
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