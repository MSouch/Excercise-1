export const challengeContent = {
  1: {
    id: 1,
    title: "The Friday Afternoon Crisis",
    scenario: {
      time: "Day 1, 3:47 PM - Production Floor",
      description: "The primary hydraulic system on Production Line 3 is losing pressure rapidly. Your maintenance team reports a critical seal failure that will shut down the line by Monday morning if not replaced. The seal costs $4,200 and requires special ordering from Germany with a normal 3-week lead time.\n\nProduction Line 3 manufactures 30% of your plant's daily output. Each day of downtime costs approximately $85,000 in lost production. Your emergency purchase authority is $5,000, and your supervisor is unreachable at an off-site meeting."
    },
    question: "As the Industrial Maintenance Planner, what's your first action?",
    options: {
      A: "Order the seal immediately using emergency purchase procedures - time is critical",
      B: "Wait until Monday to follow normal procurement procedures and get proper approvals", 
      C: "Look for a cheaper alternative seal from a local supplier to stay under budget",
      D: "First verify this truly qualifies as an emergency, then document justification before proceeding"
    },
    correctAnswer: "D",
    feedback: {
      A: {
        correct: false,
        message: "While speed matters, jumping straight to ordering without verification can create bigger problems. Emergency purchases that aren't properly justified can face audit issues later. In one major manufacturer, $2.3M in emergency purchases were challenged because proper documentation wasn't completed first.",
        guidingQuestion: "What should you confirm before declaring any maintenance situation an emergency?"
      },
      B: {
        correct: false,
        message: "Waiting until Monday would cost $255,000 in lost production (3 days × $85,000) - far more than expediting the correct part. Normal procedures exist for routine maintenance situations, not genuine emergencies.",
        guidingQuestion: "When production impact exceeds $85,000 per day, what type of purchase process should you consider?"
      },
      C: {
        correct: false,
        message: "Choosing cheaper alternatives for critical maintenance components often backfires. If the substitute seal fails, you'll face the original downtime plus additional repair time. A pharmaceutical plant learned this lesson when a $300 'equivalent' part caused $1.2M in production losses.",
        guidingQuestion: "What should drive your maintenance procurement decision - initial cost or total impact on operations?"
      },
      D: {
        correct: true,
        message: "This systematic approach protects both you and your organization while addressing the urgent maintenance need. Verification prevents costly mistakes, documentation supports faster processing, ensures audit compliance, and maintains professional credibility.",
        explanation: "Emergency maintenance purchases require systematic verification - not just urgency feelings. Document the business impact, equipment risks, and time constraints to build a solid case for expedited processing. This approach ensures you can act quickly while maintaining proper controls and audit trails."
      }
    }
  },
  2: {
    id: 2,
    title: "The Documentation Dilemma", 
    scenario: {
      time: "Day 3, 10:15 AM - Maintenance Office",
      description: "Your maintenance team needs to upgrade the main production line's control system. The project involves multiple vendors: software licenses ($45,000), hardware components ($78,000), installation services ($32,000), and training ($15,000). Total project value: $170,000.\n\nThe maintenance supervisor provided a basic email saying 'need new PLC system for Line 1 - attached spec sheet.' The attached specification is a 2-page vendor brochure with handwritten notes in the margins. Procurement is asking for complete documentation before they can process the request."
    },
    question: "As the Industrial Maintenance Planner, what's your approach to documentation?",
    options: {
      A: "Forward the email and brochure to procurement - maintenance provided what they thought was needed",
      B: "Create separate purchase orders for each component to stay under individual approval thresholds",
      C: "Develop comprehensive documentation including detailed specifications, vendor comparisons, and implementation timeline",
      D: "Ask maintenance to provide better documentation and wait for them to complete it"
    },
    correctAnswer: "C",
    feedback: {
      A: {
        correct: false,
        message: "Incomplete documentation causes 73% of procurement delays according to industry studies. A brochure with handwritten notes doesn't provide the technical specifications, quantities, or timeline needed for competitive bidding. This approach typically adds 2-4 weeks to procurement time.",
        guidingQuestion: "What specific information does procurement need to process a $170,000 maintenance project effectively?"
      },
      B: {
        correct: false,
        message: "Splitting purchases to avoid approval thresholds is called 'purchase order splitting' and violates most organizational policies. It prevents proper oversight of large maintenance projects and can result in disciplinary action. The total project value determines approval requirements, not individual components.",
        guidingQuestion: "Why do organizations have higher approval thresholds for large maintenance purchases?"
      },
      C: {
        correct: true,
        message: "This proactive approach ensures smooth procurement processing and prevents costly delays. Comprehensive documentation enables faster processing, better vendor quotes, reduced project risk, proper approvals, and audit compliance.",
        explanation: "Comprehensive documentation upfront prevents delays, ensures accurate quotes, and supports proper decision-making. Key elements include: detailed technical specifications, quantity requirements, delivery timelines, installation requirements, training needs, vendor evaluation criteria, and business justification. Invest time in documentation to save weeks in procurement processing."
      },
      D: {
        correct: false,
        message: "While maintenance input is valuable, waiting for them to learn procurement documentation requirements could delay the project significantly. As the maintenance planner, you're in the best position to bridge technical requirements with procurement needs.",
        guidingQuestion: "Who typically has the best understanding of both maintenance requirements and procurement processes?"
      }
    }
  },
  3: {
    id: 3,
    title: "The Stakeholder Standoff",
    scenario: {
      time: "Day 5, 2:30 PM - Conference Room",
      description: "You're in a heated meeting about replacing worn conveyor belting throughout the facility. The project budget is $125,000, and each department has different priorities:\n\n• Engineering insists on premium belting ($180,000) with advanced monitoring sensors\n• Operations wants quick replacement with existing belt type ($90,000) to minimize disruption\n• Maintenance prefers mid-grade belting ($125,000) that balances durability with maintainability\n• Finance is pushing for lowest-cost option due to quarterly budget pressures\n\nThe current belting is increasingly unreliable, causing 2-3 unplanned stops per week. Everyone is looking to you to break the deadlock."
    },
    question: "As the Industrial Maintenance Planner, how do you navigate this stakeholder conflict?",
    options: {
      A: "Support Finance's position - staying within budget is always the top priority",
      B: "Side with Engineering - investing in advanced technology provides the best long-term value", 
      C: "Facilitate a collaborative solution that addresses each department's core concerns",
      D: "Choose Maintenance's middle-ground option as the fairest compromise"
    },
    correctAnswer: "C",
    feedback: {
      A: {
        correct: false,
        message: "Choosing the lowest cost option often creates bigger maintenance problems. A major food processor learned this when cheap belting failed after 6 months, causing $400,000 in spoiled product and emergency replacement costs. Short-term budget savings frequently lead to much higher long-term costs.",
        guidingQuestion: "What are the total cost implications beyond initial purchase price for maintenance equipment?"
      },
      B: {
        correct: false,
        message: "While advanced technology can provide value, exceeding budget by 44% without stakeholder buy-in creates problems. The best solution isn't always the most expensive one - it's the one that best serves organizational needs within constraints.",
        guidingQuestion: "How can you achieve maintenance improvements while respecting budget limitations?"
      },
      C: {
        correct: true,
        message: "This approach builds consensus while finding the best overall solution for the organization. Better solutions emerge from multiple perspectives, stakeholder buy-in increases, implementation improves, and future relationships strengthen.",
        explanation: "Effective stakeholder management requires understanding underlying concerns, not just stated positions. Look for creative solutions that provide value to multiple parties within organizational constraints. For example: phase the implementation, negotiate volume discounts, explore leasing options, or identify alternative funding sources. The goal is finding win-win solutions that advance maintenance objectives."
      },
      D: {
        correct: false,
        message: "Simply splitting the difference doesn't address stakeholder concerns. True compromise requires understanding each department's underlying needs and finding solutions that provide real value to multiple parties.",
        guidingQuestion: "What specific concerns is each department expressing, and how might those be addressed creatively?"
      }
    }
  },
  4: {
    id: 4,
    title: "The Discovery Crisis",
    scenario: {
      time: "Day 8, 11:45 AM - Maintenance Workshop", 
      description: "During a planned maintenance shutdown, your team discovered extensive corrosion in the heat exchanger that wasn't visible during pre-shutdown inspections. The damage is far worse than expected:\n\n• Original plan: Routine cleaning and gasket replacement ($8,500, 2-day timeline)\n• New reality: Complete tube bundle replacement required ($47,000, 5-day timeline)\n\nComplications: Current vendor is 6 weeks out on tube bundle delivery, but you found a rebuilder who can deliver in 3 days at $52,000. Meanwhile, you have incomplete documentation on the original heat exchanger specifications, your preferred vendor is questioning some measurements, and operations is demanding the fastest solution regardless of cost. Your plant is losing $95,000 per day during the shutdown."
    },
    question: "As the Industrial Maintenance Planner, what's your systematic response to this crisis?",
    options: {
      A: "Immediately order from the rebuilder at $52,000 - every day of delay costs $95,000",
      B: "Work with your preferred vendor at $47,000 despite the 6-week delay - quality matters more than speed",
      C: "Thoroughly document the situation, verify specifications, and make an informed procurement decision", 
      D: "Split the difference and negotiate with both vendors to see who can improve their terms"
    },
    correctAnswer: "C",
    feedback: {
      A: {
        correct: false,
        message: "Rushing to the rebuilder without verification could lead to bigger problems. A steel mill faced $2.8M in costs when they installed incorrect heat exchanger tubes that failed within days. The 2-day time savings cost them 3 weeks of additional downtime plus emergency repairs.",
        guidingQuestion: "What information do you need to verify before making a $50,000+ maintenance decision under pressure?"
      },
      B: {
        correct: false,
        message: "A 6-week delay would cost $3.99M in lost production (42 days × $95,000), compared to the $5,000 price difference. Sometimes speed has greater value than minor cost savings, especially in unplanned maintenance situations.",
        guidingQuestion: "When downtime costs $95,000/day, how should you weigh time versus cost in your maintenance decision?"
      },
      C: {
        correct: true,
        message: "This systematic approach prevents expensive mistakes while addressing the urgent timeline. Verification ensures the right solution the first time, documentation supports decision justification, enables fast decisions, and maintains professional standards.",
        explanation: "Crisis maintenance situations require fast decisions, but systematic evaluation prevents expensive mistakes. Key steps: 1) Verify technical specifications quickly, 2) Document the discovery and impact, 3) Evaluate both vendors against clear criteria (price, delivery, quality, risk), 4) Make decision based on total cost including downtime, 5) Execute immediately with proper documentation. Speed and accuracy are both critical - systematic thinking enables both."
      },
      D: {
        correct: false,
        message: "Negotiating takes time you don't have, and splitting attention between vendors often results in neither giving you their best solution. Focus on making the right decision rather than trying to optimize both vendors simultaneously.",
        guidingQuestion: "In maintenance crisis situations, what should you prioritize - negotiation or decisive action based on good information?"
      }
    }
  }
}