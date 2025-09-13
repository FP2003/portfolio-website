"use client"

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Terminal, Mail, Send, User, MessageSquare, CheckCircle, AlertCircle, Github, Linkedin, Code } from 'lucide-react'

type ContactProps = {
  onReturn?: () => void
}

type FormData = {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact({ onReturn }: ContactProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const headerText = 'CONTACT PROTOCOL'
  const descriptionText = 'Feel free to get in contact with me, I will look to respond in record time of less than 24 hours... But times may vary across the year.'

  // Typing effect for description
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < descriptionText.length) {
        setDisplayedText(descriptionText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setTypingDone(true), 800)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [])

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setFormStatus('submitting')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      
      setFormStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000)
     } catch {
       setFormStatus('error')
       setTimeout(() => setFormStatus('idle'), 5000)
     }
  }

  const contactInfo = [
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/FP2003',
      description: 'View my repositories',
      url: 'https://github.com/FP2003'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/filip-pielecki',
      description: 'Professional network',
      url: 'https://linkedin.com/in/filip-pielecki'
    },
    {
      icon: Code,
      label: 'LeetCode',
      value: 'leetcode.com/u/FP2003',
      description: 'Coding challenges & solutions',
      url: 'https://leetcode.com/u/FP2003'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono p-6 min-w-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Terminal */}
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
              <Terminal className="w-4 h-4" />
              <span className="text-sm">arasaka-comm://secure/contact.dat</span>
            </div>
            <div className="text-xs text-red-400">
                SECURE CHANNEL - LEVEL 3
                {onReturn && (
                <button
                  onClick={onReturn}
                  data-return-action
                  className="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-1 rounded border border-red-400/50 transition-colors font-mono ml-4"
                >
                  [RETURN]
                </button>
              )}
            </div>
          </div>

          {/* Header Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-red-400" />
              <h1 className="text-2xl font-bold text-red-400">{headerText}</h1>
            </div>
            
            <div className="space-y-2">
              <div className="text-red-500">
                <span className="text-red-400">system@arasaka</span>:~$ cat contact_protocol.txt
              </div>
              <div className="text-gray-300 min-h-[60px] pl-4 border-l-2 border-red-500/30">
                {displayedText}
                {!typingDone && <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {typingDone && (
          <>
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
            >
              <div className="flex items-center px-4 py-2 border-b border-red-400/30 bg-red-900/10">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">CONTACT DIRECTORY</span>
              </div>

              <div className="p-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {contactInfo.map((info, index) => (
                     <motion.div
                       key={info.label}
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.5, delay: 0.1 * index }}
                       className={`border border-red-500/20 p-4 bg-red-900/5 hover:bg-red-900/10 transition-colors ${
                         info.url ? 'cursor-pointer' : ''
                       }`}
                       onClick={() => info.url && window.open(info.url, '_blank', 'noopener,noreferrer')}
                     >
                       <div className="flex items-center gap-3 mb-2">
                         <info.icon className="w-5 h-5 text-red-400" />
                         <span className="text-sm font-semibold text-red-300">{info.label}</span>
                         {info.url && (
                           <div className="ml-auto text-xs text-red-500 opacity-60">[CLICK]</div>
                         )}
                       </div>
                       <div className="text-red-400 text-sm mb-1">{info.value}</div>
                       <div className="text-xs text-gray-500">{info.description}</div>
                     </motion.div>
                   ))}
                 </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
            >
              <div className="flex items-center px-4 py-2 border-b border-red-400/30 bg-red-900/10">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span className="text-sm">SECURE MESSAGE TRANSMISSION</span>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-red-400 text-sm font-semibold">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-3 py-2 bg-black border border-red-400/30 text-red-300 placeholder-gray-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400/50 transition-colors ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <div className="flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-red-400 text-sm font-semibold">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 bg-black border border-red-400/30 text-red-300 placeholder-gray-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400/50 transition-colors ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder="your.email@domain.com"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-red-400 text-sm font-semibold">
                        SUBJECT *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={`w-full px-3 py-2 bg-black border border-red-400/30 text-red-300 placeholder-gray-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400/50 transition-colors ${
                          errors.subject ? 'border-red-500' : ''
                        }`}
                        placeholder="Message subject"
                      />
                      {errors.subject && (
                        <div className="flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-red-400 text-sm font-semibold">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-red-400/30 text-red-300 placeholder-gray-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400/50 transition-colors"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-red-400 text-sm font-semibold">
                      MESSAGE *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full px-3 py-2 bg-black border border-red-400/30 text-red-300 placeholder-gray-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400/50 transition-colors resize-none ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your message here..."
                    />
                    {errors.message && (
                      <div className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      Minimum 10 characters. Current: {formData.message.length}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`flex items-center gap-2 px-6 py-2 border transition-all duration-200 font-mono text-sm ${
                        formStatus === 'submitting'
                          ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                          : formStatus === 'success'
                          ? 'border-green-500 text-green-400 bg-green-900/20'
                          : formStatus === 'error'
                          ? 'border-red-500 text-red-400 bg-red-900/20'
                          : 'border-red-400 text-red-400 hover:bg-red-900/20 hover:text-red-300'
                      }`}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : formStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          TRANSMISSION SUCCESSFUL
                        </>
                      ) : formStatus === 'error' ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          TRANSMISSION FAILED
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          SEND MESSAGE
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-green-500/50 bg-green-900/10 text-green-400 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Message transmitted successfully. You will receive a response within 24 hours.
                      </div>
                    </motion.div>
                  )}

                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-red-500/50 bg-red-900/10 text-red-400 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Transmission failed. Please try again or use alternative contact methods.
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
