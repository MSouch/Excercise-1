export const exerciseContent = {
  1: {
    id: 1,
    title: "Emergency Purchase Assessment Matrix",
  description: "Complete this Emergency Purchase Verification for the hydraulic seal situation.",
    fields: [
      {
        id: 'safety_risk',
        label: 'Safety Risk',
        type: 'textarea',
        placeholder: 'Describe any safety implications...'
      },
      {
        id: 'safety_threshold',
        label: 'Safety Emergency Threshold Met?',
        type: 'select',
        options: ['Yes', 'No']
      },
      {
        id: 'production_impact',
        label: 'Production Impact',
        type: 'textarea',
        placeholder: 'Quantify production impact...'
      },
      {
        id: 'production_threshold',
        label: 'Production Emergency Threshold Met?',
        type: 'select',
        options: ['Yes', 'No']
      },
      {
        id: 'equipment_damage',
        label: 'Equipment Damage Risk',
        type: 'textarea',
        placeholder: 'Assess equipment damage potential...'
      },
      {
        id: 'equipment_threshold',
        label: 'Equipment Emergency Threshold Met?',
        type: 'select',
        options: ['Yes', 'No']
      },
      {
        id: 'timeline_urgency',
        label: 'Timeline Urgency',
        type: 'textarea',
        placeholder: 'Evaluate timeline constraints...'
      },
      {
        id: 'timeline_threshold',
        label: 'Timeline Emergency Threshold Met?',
        type: 'select',
        options: ['Yes', 'No']
      },
      {
        id: 'alternatives',
        label: 'Alternatives Available',
        type: 'textarea',
        placeholder: 'List available alternatives...'
      },
      {
        id: 'alternatives_threshold',
        label: 'Alternatives Emergency Threshold Met?',
        type: 'select',
        options: ['Yes', 'No']
      },
      {
        id: 'justification',
        label: 'Overall Emergency Justification (2-3 sentences)',
        type: 'textarea',
        placeholder: 'Provide comprehensive justification...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Emergency Classification Framework",
          points: [
            "Safety Risk: Hydraulic system failure poses moderate safety risk - pressurized system could cause injury during failure, but no immediate life-threatening danger",
            "Production Impact: $255,000 lost revenue over weekend (3 days × $85,000) clearly exceeds emergency threshold of $50,000+ impact",
            "Equipment Damage: Continued operation without proper sealing will cause catastrophic pump damage, potentially $50,000+ in additional repairs",
            "Timeline Urgency: Weekend timing prevents normal supplier contact, and Monday production start requires immediate action"
          ]
        },
        {
          title: "Decision Matrix Analysis",
          points: [
            "Production Emergency: YES - $85,000/day loss significantly exceeds most organizational emergency thresholds",
            "Equipment Emergency: YES - Continued operation risks major secondary damage to hydraulic pumps and motors",
            "Timeline Emergency: YES - Normal procurement channels unavailable due to weekend timing",
            "Alternatives Assessment: Limited local alternatives for specialized German-manufactured seal"
          ]
        },
        {
          title: "Professional Documentation Requirements",
          points: [
            "Document specific equipment failure mode and root cause analysis",
            "Calculate total cost impact including production loss, overtime, and potential equipment damage",
            "Record timeline constraints and why normal procurement processes cannot be followed",
            "Obtain secondary verification from maintenance supervisor or plant manager when possible",
            "Maintain audit trail with photos, measurements, and supplier communications"
          ]
        }
      ],
      keyTakeaways: [
        "Emergency maintenance purchases require systematic verification across multiple criteria, not just urgency feelings",
        "Production impact of $85,000/day clearly justifies emergency procurement procedures",
        "Proper documentation protects both the maintenance planner and organization during audits",
        "Always calculate total cost of delay versus expedited purchase cost",
        "Weekend timing legitimately prevents normal approval processes, supporting emergency classification"
      ]
    }
  },
  2: {
    id: 2,
    title: "Technical Procurement Package Development",
  description: "Create the essential documentation for the control system upgrade.",
    fields: [
      {
        id: 'spec1',
        label: 'Critical Specification Element 1',
        type: 'text',
        placeholder: 'Enter first critical specification...'
      },
      {
        id: 'spec2',
        label: 'Critical Specification Element 2',
        type: 'text',
        placeholder: 'Enter second critical specification...'
      },
      {
        id: 'spec3',
        label: 'Critical Specification Element 3',
        type: 'text',
        placeholder: 'Enter third critical specification...'
      },
      {
        id: 'spec4',
        label: 'Critical Specification Element 4',
        type: 'text',
        placeholder: 'Enter fourth critical specification...'
      },
      {
        id: 'spec5',
        label: 'Critical Specification Element 5',
        type: 'text',
        placeholder: 'Enter fifth critical specification...'
      },
      {
        id: 'vendor_criteria',
        label: 'Vendor Evaluation Criteria (Rank 1-4 in priority order)',
        type: 'ranking',
        options: ['Price', 'Technical capabilities', 'Installation timeline', 'Support/maintenance availability']
      },
      {
        id: 'project_approval',
        label: 'Project Approval Timeline',
        type: 'text',
        placeholder: 'Week 1, Week 2, etc...'
      },
      {
        id: 'hardware_delivery',
        label: 'Hardware Delivery Timeline',
        type: 'text',
        placeholder: 'Week X...'
      },
      {
        id: 'installation_start',
        label: 'Installation Start Timeline',
        type: 'text',
        placeholder: 'Week X...'
      },
      {
        id: 'system_commissioning',
        label: 'System Commissioning Timeline',
        type: 'text',
        placeholder: 'Week X...'
      },
      {
        id: 'production_restart',
        label: 'Production Restart Timeline',
        type: 'text',
        placeholder: 'Week X...'
      },
      {
        id: 'business_case',
        label: 'Business Justification (2-3 sentences)',
        type: 'textarea',
        placeholder: 'This $170,000 control system upgrade is necessary because...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Essential Technical Specifications",
          points: [
            "I/O Count Requirements: Minimum 128 digital inputs, 64 digital outputs, 32 analog inputs, 16 analog outputs",
            "Communication Protocols: Must support Ethernet/IP, Modbus TCP, and legacy serial communications",
            "Processing Speed: Scan time <10ms for critical safety functions, <50ms for standard operations",
            "Environmental Ratings: IP65 enclosure rating, operating temperature -10°C to +60°C",
            "Redundancy Requirements: Hot-swappable I/O modules, dual power supplies, automatic failover capability"
          ]
        },
        {
          title: "Vendor Evaluation Framework",
          points: [
            "Technical Capabilities (Priority 1): System integration expertise, local programming support, proven track record with similar applications",
            "Installation Timeline (Priority 2): Ability to meet production shutdown window, resource availability, project management experience",
            "Support/Maintenance (Priority 3): 24/7 technical support, local service technicians, spare parts availability",
            "Price (Priority 4): Total cost of ownership including training, support contracts, and future expansion capability"
          ]
        },
        {
          title: "Implementation Timeline",
          points: [
            "Week 1-2: Project approval and vendor selection",
            "Week 3-6: Hardware delivery and factory acceptance testing",
            "Week 7-8: Installation during planned maintenance shutdown",
            "Week 9-10: System commissioning and operator training",
            "Week 11: Production restart and performance validation"
          ]
        }
      ],
      keyTakeaways: [
        "Comprehensive specifications prevent costly change orders and delays during implementation",
        "Technical capabilities should be weighted higher than price for critical control systems",
        "Timeline coordination with production schedules is essential for minimizing disruption",
        "Investment in proper training and support prevents long-term operational problems",
        "Business justification should quantify benefits: reduced downtime, improved efficiency, enhanced safety"
      ]
    }
  },
  3: {
    id: 3,
    title: "Stakeholder Needs Analysis & Solution Development",
  description: "Map each stakeholder's underlying concern and identify solutions.",
    fields: [
      {
        id: 'engineering_concern',
        label: 'Engineering - Underlying Concern',
        type: 'text',
        placeholder: 'What is Engineering really concerned about?'
      },
      {
        id: 'engineering_success',
        label: 'Engineering - Success Metrics',
        type: 'text',
        placeholder: 'How would Engineering measure success?'
      },
      {
        id: 'operations_concern',
        label: 'Operations - Underlying Concern',
        type: 'text',
        placeholder: 'What is Operations really concerned about?'
      },
      {
        id: 'operations_success',
        label: 'Operations - Success Metrics',
        type: 'text',
        placeholder: 'How would Operations measure success?'
      },
      {
        id: 'maintenance_concern',
        label: 'Maintenance - Underlying Concern',
        type: 'text',
        placeholder: 'What is Maintenance really concerned about?'
      },
      {
        id: 'maintenance_success',
        label: 'Maintenance - Success Metrics',
        type: 'text',
        placeholder: 'How would Maintenance measure success?'
      },
      {
        id: 'finance_concern',
        label: 'Finance - Underlying Concern',
        type: 'text',
        placeholder: 'What is Finance really concerned about?'
      },
      {
        id: 'finance_success',
        label: 'Finance - Success Metrics',
        type: 'text',
        placeholder: 'How would Finance measure success?'
      },
      {
        id: 'recommended_solution',
        label: 'Your Recommended Solution',
        type: 'textarea',
        placeholder: 'Describe your solution that addresses multiple stakeholder needs...'
      },
      {
        id: 'engineering_address',
        label: 'How it addresses Engineering concerns',
        type: 'text',
        placeholder: 'Explain how your solution helps Engineering...'
      },
      {
        id: 'operations_address',
        label: 'How it addresses Operations concerns',
        type: 'text',
        placeholder: 'Explain how your solution helps Operations...'
      },
      {
        id: 'maintenance_address',
        label: 'How it addresses Maintenance concerns',
        type: 'text',
        placeholder: 'Explain how your solution helps Maintenance...'
      },
      {
        id: 'finance_address',
        label: 'How it addresses Finance concerns',
        type: 'text',
        placeholder: 'Explain how your solution helps Finance...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Stakeholder Analysis Framework",
          points: [
            "Engineering Concerns: Long-term reliability, predictive maintenance capabilities, system integration, future-proofing technology",
            "Operations Concerns: Minimizing production disruption, maintaining throughput rates, quick implementation, operator familiarity",
            "Maintenance Concerns: Ease of repair, parts availability, diagnostic capabilities, workforce skill requirements",
            "Finance Concerns: Capital budget constraints, ROI justification, quarterly performance impact, total cost of ownership"
          ]
        },
        {
          title: "Win-Win Solution Strategy",
          points: [
            "Phased Implementation: Install mid-grade belting now ($125K), add monitoring sensors later ($35K) when budget allows",
            "Volume Negotiation: Combine current purchase with future sensor installation for better pricing",
            "Financing Options: Explore vendor financing to spread costs across quarters while meeting current operational needs",
            "Performance Guarantees: Negotiate warranty terms that protect against premature failure while staying within budget"
          ]
        },
        {
          title: "Stakeholder Value Proposition",
          points: [
            "Engineering Value: Mid-grade belting provides 80% of premium benefits at 70% of cost, sensor-ready design for future upgrades",
            "Operations Value: Faster installation (2-day vs 5-day shutdown), familiar maintenance procedures, immediate reliability improvement",
            "Maintenance Value: Better diagnostic access, improved part standardization, enhanced documentation and training included",
            "Finance Value: Stays within budget, demonstrates cost discipline, provides measurable ROI through reduced unplanned downtime"
          ]
        }
      ],
      keyTakeaways: [
        "Look beyond stated positions to understand underlying concerns and motivations",
        "Creative solutions often provide value to multiple stakeholders within existing constraints",
        "Phased implementation allows immediate needs to be met while planning for future enhancements",
        "Win-win solutions build stronger stakeholder relationships for future projects",
        "Document how your solution addresses each stakeholder's success metrics"
      ]
    }
  },
  4: {
    id: 4,
    title: "Crisis Procurement Decision Framework",
  description: "Apply systematic crisis management to the heat exchanger situation.",
    fields: [
      {
        id: 'discovery_details',
        label: 'Discovery Details',
        type: 'textarea',
        placeholder: 'Describe what was discovered during the shutdown...'
      },
      {
        id: 'technical_requirements',
        label: 'Technical Requirements',
        type: 'textarea',
        placeholder: 'List the technical specifications needed...'
      },
      {
        id: 'timeline_impact',
        label: 'Timeline Impact',
        type: 'textarea',
        placeholder: 'Quantify the timeline implications...'
      },
      {
        id: 'cost_implications',
        label: 'Cost Implications',
        type: 'textarea',
        placeholder: 'Calculate the total cost impact...'
      },
      {
        id: 'price_weight',
        label: 'Price Weight',
        type: 'number',
        placeholder: 'Enter a weight (e.g., 1-10)'
      },
      {
        id: 'delivery_weight',
        label: 'Delivery Timeline Weight',
        type: 'number',
        placeholder: 'Enter a weight (e.g., 1-10)'
      },
      {
        id: 'quality_weight',
        label: 'Quality Assurance Weight',
        type: 'number',
        placeholder: 'Enter a weight (e.g., 1-10)'
      },
      {
        id: 'support_weight',
        label: 'Technical Support Weight',
        type: 'number',
        placeholder: 'Enter a weight (e.g., 1-10)'
      },
      {
        id: 'risk_weight',
        label: 'Risk Level Weight',
        type: 'number',
        placeholder: 'Enter a weight (e.g., 1-10)'
      },
      {
        id: 'current_vendor_quality',
        label: 'Current Vendor - Quality Rating',
        type: 'number',
        placeholder: 'Enter a rating (e.g., 1-10)'
      },
      {
        id: 'current_vendor_support',
        label: 'Current Vendor - Support Rating',
        type: 'number',
        placeholder: 'Enter a rating (e.g., 1-10)'
      },
      {
        id: 'current_vendor_risk',
        label: 'Current Vendor - Risk Rating',
        type: 'number',
        placeholder: 'Enter a rating (e.g., 1-10)'
      },
      {
        id: 'rebuilder_quality',
        label: 'Rebuilder - Quality Rating',
        type: 'number',
        placeholder: 'Enter a rating (e.g., 1-10)'
      },
      {
        id: 'rebuilder_support',
        label: 'Rebuilder - Support Rating',
        type: 'number',
        placeholder: 'Enter a rating (e.g., 1-10)'
      },
      {
        id: 'rebuilder_risk',
        label: 'Rebuilder - Risk Rating',
        type: 'number',
        placeholder: 'Enter a rating (e.g., 1-10)'
      },
      {
        id: 'recommended_vendor',
        label: 'Recommended Vendor',
        type: 'select',
        options: ['Current Vendor', 'Rebuilder']
      },
      {
        id: 'cost_justification',
        label: 'Total Cost Justification',
        type: 'textarea',
        placeholder: 'Calculate and justify total cost including downtime...'
      },
      {
        id: 'risk_mitigation',
        label: 'Risk Mitigation Steps',
        type: 'textarea',
        placeholder: 'List steps to mitigate risks...'
      },
      {
        id: 'documentation_package',
        label: 'Documentation Package (list 3 key records)',
        type: 'textarea',
        placeholder: 'List the records you will maintain...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Crisis Decision Matrix",
          points: [
            "Discovery Impact: Extensive corrosion discovered during shutdown, original $8,500 repair escalated to $47,000-$52,000 replacement",
            "Timeline Analysis: Current vendor 6-week delay = $3.99M cost (42 days × $95K), Rebuilder 3-day delivery = $285K cost (3 days × $95K)",
            "Cost-Benefit Calculation: $5K price difference vs $3.7M in additional downtime costs strongly favors faster delivery",
            "Risk Assessment: Rebuilder speed advantage outweighs quality concerns given proper verification and warranty terms"
          ]
        },
        {
          title: "Systematic Verification Process",
          points: [
            "Technical Specifications: Verify tube bundle dimensions, material grades, pressure ratings, and connection specifications",
            "Supplier Qualification: Check rebuilder certifications, previous customer references, quality management systems",
            "Delivery Confirmation: Obtain firm delivery commitment with penalty clauses for delays",
            "Quality Assurance: Require factory inspection, pressure testing, and material certifications before shipment"
          ]
        },
        {
          title: "Risk Mitigation Strategy",
          points: [
            "Dual-Source Approach: Place order with rebuilder while maintaining backup option with current vendor",
            "Inspection Protocol: Implement incoming inspection checklist and pressure testing before installation",
            "Warranty Protection: Negotiate extended warranty terms and replacement guarantee within 30 days",
            "Documentation Trail: Maintain complete records of discovery, decision rationale, and supplier communications"
          ]
        }
      ],
      keyTakeaways: [
        "In crisis situations, systematic thinking prevents expensive mistakes while maintaining speed",
        "Total cost analysis (including downtime) often justifies premium pricing for faster delivery",
        "Verification of technical specifications is critical before committing to alternative suppliers",
        "Risk mitigation through warranties and inspection protocols protects against supplier failures",
        "Complete documentation supports decision justification and audit requirements"
      ]
    }
  }
}