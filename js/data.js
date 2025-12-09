// Numerology Calculator - Data File
// Contains all static knowledge objects for the Eight Star Magnetic Field system

const starMap = {
    // Tian Yi - 天医
    "13":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang"}, 
    "31":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang"},
    "68":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yang"}, 
    "86":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yang"},
    "49":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "94":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin"},
    "27":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yin"}, 
    "72":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yin"},
    
    // Sheng Qi - 生气
    "14":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang"}, 
    "41":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang"},
    "67":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yin"}, 
    "76":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yin"},
    "39":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "93":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin"},
    "28":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yang"}, 
    "82":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yang"},
    
    // Yan Nian - 延年
    "19":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:9, str:"strongest", strCn:"最强", yinyang:"yang"}, 
    "91":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:9, str:"strongest", strCn:"最强", yinyang:"yang"},
    "78":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:7, str:"strong", strCn:"强", yinyang:"yang"}, 
    "87":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:7, str:"strong", strCn:"强", yinyang:"yang"},
    "34":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:5, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "43":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:5, str:"weak", strCn:"较弱", yinyang:"yin"},
    "26":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:3, str:"weakest", strCn:"最弱", yinyang:"yin"}, 
    "62":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:3, str:"weakest", strCn:"最弱", yinyang:"yin"},
    
    // Fu Wei - 伏位 (good - stability and patience energy)
    "11":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strongest", strCn:"最强", yinyang:"neutral"}, 
    "22":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strongest", strCn:"最强", yinyang:"neutral"},
    "88":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strong", strCn:"强", yinyang:"neutral"}, 
    "99":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strong", strCn:"强", yinyang:"neutral"},
    "66":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weak", strCn:"较弱", yinyang:"neutral"}, 
    "77":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weak", strCn:"较弱", yinyang:"neutral"},
    "33":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weakest", strCn:"最弱", yinyang:"neutral"}, 
    "44":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weakest", strCn:"最弱", yinyang:"neutral"},
    
    // Jue Ming - 绝命
    "12":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-10, str:"strongest", strCn:"最强", yinyang:"yang"}, 
    "21":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-10, str:"strongest", strCn:"最强", yinyang:"yang"},
    "69":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-8, str:"strong", strCn:"强", yinyang:"yang"}, 
    "96":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-8, str:"strong", strCn:"强", yinyang:"yang"},
    "48":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-6, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "84":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-6, str:"weak", strCn:"较弱", yinyang:"yin"},
    "37":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-4, str:"weakest", strCn:"最弱", yinyang:"yin"}, 
    "73":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-4, str:"weakest", strCn:"最弱", yinyang:"yin"},
    
    // Wu Gui - 五鬼
    "18":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-9, str:"strongest", strCn:"最强", yinyang:"yin"}, 
    "81":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-9, str:"strongest", strCn:"最强", yinyang:"yin"},
    "79":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-7, str:"strong", strCn:"强", yinyang:"yang"}, 
    "97":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-7, str:"strong", strCn:"强", yinyang:"yang"},
    "36":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-5, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "63":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-5, str:"weak", strCn:"较弱", yinyang:"yin"},
    "24":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-3, str:"weakest", strCn:"最弱", yinyang:"yin"}, 
    "42":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-3, str:"weakest", strCn:"最弱", yinyang:"yin"},
    
    // Huo Hai - 祸害
    "17":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-8, str:"strongest", strCn:"最强", yinyang:"yang"}, 
    "71":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-8, str:"strongest", strCn:"最强", yinyang:"yang"},
    "89":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-6, str:"strong", strCn:"强", yinyang:"yang"}, 
    "98":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-6, str:"strong", strCn:"强", yinyang:"yang"},
    "46":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-4, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "64":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-4, str:"weak", strCn:"较弱", yinyang:"yin"},
    "23":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin"}, 
    "32":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin"},
    
    // Liu Sha - 六煞
    "16":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-7, str:"strongest", strCn:"最强", yinyang:"yang"}, 
    "61":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-7, str:"strongest", strCn:"最强", yinyang:"yang"},
    "47":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-5, str:"strong", strCn:"强", yinyang:"yin"}, 
    "74":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-5, str:"strong", strCn:"强", yinyang:"yin"},
    "38":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-3, str:"weak", strCn:"较弱", yinyang:"yin"}, 
    "83":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-3, str:"weak", strCn:"较弱", yinyang:"yin"},
    "29":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin"}, 
    "92":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin"}
};

const comboMap = {
    // Good -> Good (Excellent flows)
    "Sheng Qi+Tian Yi": "Career Success → Brings Wealth",
    "Tian Yi+Sheng Qi": "Wealth → Opens More Doors",
    "Yan Nian+Tian Yi": "Hard Work → Financial Reward",
    "Tian Yi+Yan Nian": "Wealth → Managed Wisely",
    "Sheng Qi+Yan Nian": "Social Skills → Leadership Role",
    "Yan Nian+Sheng Qi": "Leadership → Popularity & Support",
    "Sheng Qi+Sheng Qi": "Double Vitality → Explosive Growth",
    "Tian Yi+Tian Yi": "Double Wealth → Major Accumulation",
    "Yan Nian+Yan Nian": "Double Authority → Commanding Presence",
    
    // Good -> Neutral
    "Tian Yi+Fu Wei": "Wealth → Preserved Steadily",
    "Sheng Qi+Fu Wei": "Opportunity → Waiting Period",
    "Yan Nian+Fu Wei": "Achievement → Consolidation Phase",
    
    // Neutral -> Good
    "Fu Wei+Tian Yi": "Patience → Eventual Wealth",
    "Fu Wei+Sheng Qi": "Waiting → Opportunity Emerges",
    "Fu Wei+Yan Nian": "Preparation → Leadership Moment",
    
    // Bad -> Bad (Dangerous compounds)
    "Wu Gui+Wu Gui": "Double Ghost → Extreme Volatility",
    "Jue Ming+Jue Ming": "Double Extremes → All or Nothing",
    "Huo Hai+Huo Hai": "Double Conflict → Serious Disputes",
    "Liu Sha+Liu Sha": "Double Entanglement → Complex Drama",
    "Wu Gui+Huo Hai": "Clever Mind → Sharp Tongue",
    "Huo Hai+Wu Gui": "Arguments → Cunning Response",
    "Huo Hai+Jue Ming": "Blunt Words → Severe Loss",
    "Jue Ming+Huo Hai": "Risky Move → Verbal Fallout",
    "Jue Ming+Wu Gui": "High Risk → Unpredictable Twist",
    "Wu Gui+Jue Ming": "Clever Plan → Dangerous Gamble",
    "Liu Sha+Huo Hai": "Emotional → Health Stress",
    "Huo Hai+Liu Sha": "Conflict → Emotional Wounds",
    "Liu Sha+Jue Ming": "Emotions → Extreme Actions",
    "Jue Ming+Liu Sha": "Impulse → Relationship Chaos",
    "Liu Sha+Wu Gui": "Charm → Manipulation Risk",
    "Wu Gui+Liu Sha": "Schemes → Emotional Traps",
    
    // Good -> Bad (Energy drain)
    "Tian Yi+Jue Ming": "Wealth → Risky Investment",
    "Tian Yi+Wu Gui": "Stability → Sudden Change",
    "Tian Yi+Huo Hai": "Prosperity → Arguments Over Money",
    "Tian Yi+Liu Sha": "Wealth → Emotional Spending",
    "Sheng Qi+Jue Ming": "Opportunity → Reckless Leap",
    "Sheng Qi+Wu Gui": "Popularity → Backstabbing",
    "Sheng Qi+Huo Hai": "Social Success → Jealous Conflict",
    "Sheng Qi+Liu Sha": "Charm → Complicated Affairs",
    "Yan Nian+Jue Ming": "Leadership → Authoritarian Excess",
    "Yan Nian+Wu Gui": "Authority → Power Struggles",
    "Yan Nian+Huo Hai": "Command → Resistance & Conflict",
    "Yan Nian+Liu Sha": "Career Focus → Neglected Relations",
    
    // Bad -> Good (Redemption arcs)
    "Jue Ming+Tian Yi": "Risk Taken → Surprise Wealth",
    "Wu Gui+Tian Yi": "Chaos Survived → Stable Gain",
    "Huo Hai+Tian Yi": "Conflict Resolved → Peace & Profit",
    "Liu Sha+Tian Yi": "Emotional Journey → Supportive Partner",
    "Jue Ming+Sheng Qi": "Near Miss → Lucky Break",
    "Wu Gui+Sheng Qi": "Clever Move → Opens Doors",
    "Huo Hai+Sheng Qi": "Debate Won → Reputation Boost",
    "Liu Sha+Sheng Qi": "Social Drama → Popularity",
    "Jue Ming+Yan Nian": "Extreme Test → Earned Authority",
    "Wu Gui+Yan Nian": "Cunning → Strategic Leadership",
    "Huo Hai+Yan Nian": "Speaking Up → Taking Charge",
    "Liu Sha+Yan Nian": "Emotional Intelligence → Leadership",
    
    // Neutral combinations
    "Fu Wei+Fu Wei": "Double Waiting → Prolonged Stagnation",
    "Fu Wei+Wu Gui": "Stillness → Sudden Disruption",
    "Fu Wei+Jue Ming": "Caution → Forced Decision",
    "Fu Wei+Huo Hai": "Patience Tested → Frustration",
    "Fu Wei+Liu Sha": "Waiting → Emotional Restlessness",
    "Wu Gui+Fu Wei": "Storm → Calm After",
    "Jue Ming+Fu Wei": "Crisis → Recovery Period",
    "Huo Hai+Fu Wei": "Conflict → Cooling Off",
    "Liu Sha+Fu Wei": "Drama → Settling Down"
};

const doubleStarMeanings = {
    "Tian Yi": {
        name: "Double Heavenly Doctor (双天医)",
        effect: "Exceptional wealth accumulation potential. Financial luck is magnified. Health and healing matters are strongly favored.",
        advice: "This is rare and powerful. Major financial decisions made during this influence have amplified positive outcomes."
    },
    "Sheng Qi": {
        name: "Double Life Force (双生气)",
        effect: "Explosive social energy. Popularity and opportunities multiply. You become a magnet for beneficial connections.",
        advice: "Network aggressively. Say yes to invitations. Your charisma is at peak levels."
    },
    "Yan Nian": {
        name: "Double Longevity (双延年)",
        effect: "Commanding authority. Leadership abilities are doubled. You can take on significant responsibility successfully.",
        advice: "Step into leadership roles confidently. Your capacity for management and long-term planning is exceptionally strong."
    },
    "Fu Wei": {
        name: "Double Stability (双伏位)",
        effect: "Extended waiting period. Progress is very slow but extremely stable. Nothing dramatic happens—for better or worse.",
        advice: "Use this time for deep preparation. Don't force change. Build foundations quietly."
    },
    "Wu Gui": {
        name: "Double Five Ghosts (双五鬼)",
        effect: "Extreme mental intensity and unpredictability. Brilliant ideas but also paranoia and sudden reversals. High-risk, high-reward thinking.",
        advice: "Channel into creative or intellectual work only. Avoid ANY financial speculation. Document your ideas but delay major decisions."
    },
    "Huo Hai": {
        name: "Double Mishaps (双祸害)",
        effect: "Intensified conflict energy. Arguments escalate quickly. Health issues, especially stress-related, are amplified.",
        advice: "Practice silence. Avoid confrontations at all costs. Focus on stress management and health maintenance."
    },
    "Liu Sha": {
        name: "Double Six Killings (双六煞)",
        effect: "Overwhelming emotional and social complexity. Multiple entanglements. Charm is magnetic but creates complicated situations.",
        advice: "Maintain strict boundaries. Be decisive in relationships. Your attractiveness creates more problems than benefits now."
    },
    "Jue Ming": {
        name: "Double Life Ending (双绝命)",
        effect: "Maximum volatility. This is the most extreme configuration. Everything is all-or-nothing. Potential for spectacular success or catastrophic failure.",
        advice: "Extreme caution required. This energy demands respect. Small, calculated moves only. Never bet what you can't afford to lose."
    }
};

const starChinese = {
    "Tian Yi": "天医",
    "Sheng Qi": "生气",
    "Yan Nian": "延年",
    "Fu Wei": "伏位",
    "Wu Gui": "五鬼",
    "Huo Hai": "祸害",
    "Liu Sha": "六煞",
    "Jue Ming": "绝命"
};

const starDescriptions = {
    "Tian Yi": {
        full: "Heavenly Doctor (天医)",
        meaning: "The primary wealth and health star. Money comes through legitimate means—careers, smart investments, business acumen. People with this energy are seen as reliable and trustworthy. Also governs health, recovery, and healing. Associated with kindness, intelligence, and good marriage prospects.",
        advice: "Leverage this energy for financial planning, career advancement, and health decisions. Excellent for stable wealth accumulation.",
        strengths: "财富 (Wealth), 聪明 (Smart), 婚姻 (Marriage), 善良 (Kind)",
        weaknesses: "Can become overly focused on money; may neglect relationships for financial gain",
        health: "Generally protective of health; aids recovery from illness",
        career: "Finance, healthcare, consulting, management, investments",
        love: "Indicates finding a helpful, supportive spouse; stable marriage"
    },
    "Sheng Qi": {
        full: "Life Generating (生气)",
        meaning: "The star of vitality, nobility, and social success. Brings opportunities through connections and networking. People are naturally drawn to this energy—it opens doors others find closed. Associated with cheerfulness, popularity, and attracting helpful people (贵人).",
        advice: "Use this energy to build relationships, expand your network, and pursue opportunities requiring charisma.",
        strengths: "贵人 (Noble helpers), 人缘 (Popularity), 开朗 (Cheerful), 随缘 (Easygoing)",
        weaknesses: "May rely too much on others; can become superficial in relationships",
        health: "Generally good vitality and energy",
        career: "Sales, marketing, public relations, entertainment, networking businesses",
        love: "Attracts many suitors; popular with opposite sex; may have trouble choosing"
    },
    "Yan Nian": {
        full: "Longevity (延年)",
        meaning: "The leadership and authority star. Represents hard work, responsibility, and commanding respect. Strong sense of duty and ability to manage. Good at financial management and understanding priorities. Can be stubborn and inflexible.",
        advice: "Step into leadership roles. Take on responsibility. This energy rewards perseverance and discipline.",
        strengths: "领导 (Leadership), 事业 (Career), 成功 (Success), 健康 (Health), 守财 (Wealth preservation)",
        weaknesses: "自做主张 (Self-willed), 不容易被说服 (Hard to persuade), 固执 (Stubborn), 死板 (Rigid), 不圆滑 (Not tactful)",
        health: "脑 (Brain), 头发 (Hair), 精神系统 (Mental system), 颈肩关节 (Neck/shoulder), 容易失眠 (Insomnia)",
        career: "Management, executive roles, professional specialist, decision-making positions",
        love: "Can be too focused on work; may neglect partner; stubborn in relationships"
    },
    "Fu Wei": {
        full: "Stability (伏位)",
        meaning: "The waiting star. Represents patience, conservation, and strategic thinking. Progress is slow but steady. Reliable but not exciting. Good for deep thinking and planning.",
        advice: "Don't force change during Fu Wei phases. Use this time to plan, consolidate, and prepare.",
        strengths: "等待 (Waiting), 保守 (Conservative), 被动 (Passive), 思考 (Thinking)",
        weaknesses: "Lack of momentum; may miss opportunities; too passive",
        health: "Stable but unremarkable; no major concerns",
        career: "Research, planning, administrative roles, steady employment",
        love: "Slow to develop; stable but may lack passion"
    },
    "Wu Gui": {
        full: "Five Ghosts (五鬼)",
        meaning: "The star of intelligence, talent, and unpredictability. Brings sharp thinking but sudden changes. Quick learner with creative mind. Associated with 'gray money' (偏财), unconventional income, and things not in the light. Can indicate affairs, foreign marriages, and frequent changes.",
        advice: "Channel into creative or intellectual pursuits. Avoid speculation. Your mind is sharp but outcomes unpredictable.",
        strengths: "智慧 (Wisdom), 才华 (Talent), 变化 (Change), 反应快 (Quick reactions), 学习强 (Fast learner)",
        weaknesses: "头脑幻象多 (Many illusions), 反复无常 (Fickle), 不稳定 (Unstable), 凶险 (Dangerous), 不踏实 (Unreliable)",
        health: "血液 (Blood), 血压 (Blood pressure), 心脏 (Heart), 脑部 (Brain), 免疫系统 (Immune system)",
        career: "Creative work, religious/spiritual, planning, arts, police, trade, innovation—jobs with frequent change",
        love: "三角恋 (Love triangles), 不安分 (Restless), 外遇 (Affairs), 异国婚姻 (Foreign marriage), unstable"
    },
    "Huo Hai": {
        full: "Mishaps (祸害)",
        meaning: "The star of eloquence and conflict. Brings excellent speaking ability but also arguments and stubbornness. Good for careers using the mouth—teaching, sales, food industry. Can indicate petty people (小人) and health issues related to mouth/throat.",
        advice: "Be mindful of words. Avoid unnecessary arguments. Channel into debate, negotiation, or teaching.",
        strengths: "口才 (Eloquence), 能言善道 (Good with words), 以口为业 (Career through speaking), 开口来财 (Money from talking)",
        weaknesses: "口舌是非 (Gossip/disputes), 铁齿 (Stubborn speech), 暴躁 (Irritable), 病痛 (Illness), 不服输 (Won't admit defeat)",
        health: "气管 (Respiratory), 呼吸 (Breathing), 口腔 (Mouth), 淋巴 (Lymph), 身体偏寒 (Cold constitution)",
        career: "Teaching, public speaking, sales, food service, lawyer, negotiator",
        love: "花言巧语 (Sweet talk), 婚后易吵架 (Arguments after marriage), verbal conflicts"
    },
    "Liu Sha": {
        full: "Six Killings (六煞)",
        meaning: "The peach blossom star—charm, attraction, and emotional complexity. Brings social magnetism and strong interpersonal skills but also indecision, entanglements, and emotional drama. Good for service industries and work involving women.",
        advice: "Enjoy social benefits but maintain boundaries. Be decisive in relationships. Don't let charm substitute for substance.",
        strengths: "桃花 (Peach blossom/charm), 人际 (Social skills), 交际能量强 (Strong networking), 八面玲珑 (Tactful), 善于沟通 (Good communication)",
        weaknesses: "情绪 (Emotional), 纠葛 (Entangled), 优柔寡断 (Indecisive), 想的多不干活 (Overthinks, doesn't act), 情感丰富易受伤 (Sensitive, easily hurt)",
        health: "皮肤 (Skin), 肠胃 (Stomach/intestines), 情绪忧郁 (Emotional depression)",
        career: "Service industry, beauty, cosmetics, public relations, government work, women-focused industries",
        love: "感情丰富 (Rich emotions), 三角关系 (Love triangles), 为情所困 (Trapped by love), many admirers"
    },
    "Jue Ming": {
        full: "Life Ending (绝命)",
        meaning: "The most extreme star—high risk, high reward. Represents impulsive investment, extreme decisions, and all-or-nothing scenarios. Can bring great wealth OR devastating loss. Associated with loneliness, lawsuits, and major life changes. The '大凶' (greatly inauspicious) star.",
        advice: "Extreme caution with financial decisions. Never bet more than you can afford to lose. Avoid if ending a phone number.",
        strengths: "投资 (Investment), 极端 (Extreme), 直爽 (Straightforward), 勇敢 (Brave), 敢冲敢做 (Dares to act), 判断敏锐 (Sharp judgment)",
        weaknesses: "冲动 (Impulsive), 走极端 (Goes to extremes), 好赌博 (Gambling tendency), 易暴躁 (Short temper), 不守信 (Breaks promises), 情绪大起大落 (Emotional swings), 官司 (Lawsuits), 孤独 (Lonely)",
        health: "肝肾 (Liver/kidney), 糖尿病 (Diabetes), 泌尿系统 (Urinary system), 易导致疾病 (Prone to illness), accident risk",
        career: "High-risk investment, entrepreneurship, independent work—prefers working alone",
        love: "感情难有结果 (Relationships don't last), 容易分手 (Easy breakups), 离婚率高 (High divorce rate), 两极分化 (Polarized)"
    }
};

// Missing star analysis data
const missingStarRisks = {
    "Tian Yi": {
        risk: "Lack of primary wealth luck",
        description: "Without Tian Yi (天医), wealth may require more direct effort and labor rather than flowing naturally through opportunity or investment. Financial success depends on deliberate strategy.",
        impact: "Money may come but retention could be challenging. Consider pairing with wealth-building practices."
    },
    "Sheng Qi": {
        risk: "Limited opportunity energy",
        description: "Missing Sheng Qi (生气) means fewer doors open through connections and networking. Opportunities may need to be created rather than discovered.",
        impact: "Social magnetism and popularity benefits are reduced. Building relationships requires more conscious effort."
    },
    "Yan Nian": {
        risk: "Weak leadership presence",
        description: "Without Yan Nian (延年), natural authority and leadership abilities are less pronounced. Career advancement may require more deliberate skill-building.",
        impact: "Taking charge and managing others may feel less natural. Leadership roles require more preparation."
    },
    "Fu Wei": {
        risk: "Lack of stability energy",
        description: "Missing Fu Wei (伏位) means less patience and strategic waiting energy. Progress may be more volatile.",
        impact: "Long-term planning and steady accumulation may be challenging. Consider building stability through other means."
    },
    "Wu Gui": {
        risk: "Reduced adaptability",
        description: "Without Wu Gui (五鬼), there's less mental flexibility and creative problem-solving energy. Changes may feel more disruptive.",
        impact: "Adapting to sudden changes or thinking outside the box may require more effort."
    },
    "Huo Hai": {
        risk: "Limited communication power",
        description: "Missing Huo Hai (祸害) means less natural eloquence and persuasive speaking ability. Communication may need more practice.",
        impact: "Careers requiring strong verbal skills may be less accessible. Consider developing communication abilities."
    },
    "Liu Sha": {
        risk: "Reduced social charm",
        description: "Without Liu Sha (六煞), natural charm and interpersonal magnetism are less pronounced. Social connections may require more effort.",
        impact: "Building relationships and networking may feel more challenging. Consider developing social skills."
    },
    "Jue Ming": {
        risk: "Less risk-taking energy",
        description: "Missing Jue Ming (绝命) means less extreme risk-taking and all-or-nothing decision-making energy. This can be protective but also limiting.",
        impact: "High-risk, high-reward opportunities may feel less accessible. Consider calculated risks rather than extreme moves."
    }
};

