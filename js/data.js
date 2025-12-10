// Numerology Calculator - Data File
// Contains all static knowledge objects for the Eight Star Magnetic Field system

const starMap = {
    // Tian Yi - 天医 (Level 1-4: 1=strongest, 4=weakest)
    "13":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang", level:1}, 
    "31":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang", level:1},
    "68":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yang", level:2}, 
    "86":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yang", level:2},
    "49":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "94":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "27":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}, 
    "72":{n:"Tian Yi", cn:"天医", d:"Wealth / Health",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yin", level:4},
    
    // Sheng Qi - 生气 (Level 1-4)
    "14":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang", level:1}, 
    "41":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:10, str:"strongest", strCn:"最强", yinyang:"yang", level:1},
    "67":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yin", level:2}, 
    "76":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:8, str:"strong", strCn:"强", yinyang:"yin", level:2},
    "39":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "93":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:6, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "28":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yang", level:4}, 
    "82":{n:"Sheng Qi", cn:"生气", d:"Career / Success",p:"good", s:4, str:"weakest", strCn:"最弱", yinyang:"yang", level:4},
    
    // Yan Nian - 延年 (Level 1-4)
    "19":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:9, str:"strongest", strCn:"最强", yinyang:"yang", level:1}, 
    "91":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:9, str:"strongest", strCn:"最强", yinyang:"yang", level:1},
    "78":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:7, str:"strong", strCn:"强", yinyang:"yang", level:2}, 
    "87":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:7, str:"strong", strCn:"强", yinyang:"yang", level:2},
    "34":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:5, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "43":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:5, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "26":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:3, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}, 
    "62":{n:"Yan Nian", cn:"延年", d:"Leadership",p:"good", s:3, str:"weakest", strCn:"最弱", yinyang:"yin", level:4},
    
    // Fu Wei - 伏位 (Level 1-4)
    "11":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strongest", strCn:"最强", yinyang:"neutral", level:1}, 
    "22":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strongest", strCn:"最强", yinyang:"neutral", level:1},
    "88":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strong", strCn:"强", yinyang:"neutral", level:2}, 
    "99":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:2, str:"strong", strCn:"强", yinyang:"neutral", level:2},
    "66":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weak", strCn:"较弱", yinyang:"neutral", level:3}, 
    "77":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weak", strCn:"较弱", yinyang:"neutral", level:3},
    "33":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weakest", strCn:"最弱", yinyang:"neutral", level:4}, 
    "44":{n:"Fu Wei", cn:"伏位", d:"Stability",p:"good", s:1, str:"weakest", strCn:"最弱", yinyang:"neutral", level:4},
    
    // Jue Ming - 绝命 (Level 1-4)
    "12":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-10, str:"strongest", strCn:"最强", yinyang:"yang", level:1}, 
    "21":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-10, str:"strongest", strCn:"最强", yinyang:"yang", level:1},
    "69":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-8, str:"strong", strCn:"强", yinyang:"yang", level:2}, 
    "96":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-8, str:"strong", strCn:"强", yinyang:"yang", level:2},
    "48":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-6, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "84":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-6, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "37":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-4, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}, 
    "73":{n:"Jue Ming", cn:"绝命", d:"Risk / Impulsive",p:"bad", s:-4, str:"weakest", strCn:"最弱", yinyang:"yin", level:4},
    
    // Wu Gui - 五鬼 (Level 1-4)
    "18":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-9, str:"strongest", strCn:"最强", yinyang:"yin", level:1}, 
    "81":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-9, str:"strongest", strCn:"最强", yinyang:"yin", level:1},
    "79":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-7, str:"strong", strCn:"强", yinyang:"yang", level:2}, 
    "97":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-7, str:"strong", strCn:"强", yinyang:"yang", level:2},
    "36":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-5, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "63":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-5, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "24":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-3, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}, 
    "42":{n:"Wu Gui", cn:"五鬼", d:"Changes / Smart",p:"bad", s:-3, str:"weakest", strCn:"最弱", yinyang:"yin", level:4},
    
    // Huo Hai - 祸害 (Level 1-4)
    "17":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-8, str:"strongest", strCn:"最强", yinyang:"yang", level:1}, 
    "71":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-8, str:"strongest", strCn:"最强", yinyang:"yang", level:1},
    "89":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-6, str:"strong", strCn:"强", yinyang:"yang", level:2}, 
    "98":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-6, str:"strong", strCn:"强", yinyang:"yang", level:2},
    "46":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-4, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "64":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-4, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "23":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}, 
    "32":{n:"Huo Hai", cn:"祸害", d:"Arguments",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin", level:4},
    
    // Liu Sha - 六煞 (Level 1-4)
    "16":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-7, str:"strongest", strCn:"最强", yinyang:"yang", level:1}, 
    "61":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-7, str:"strongest", strCn:"最强", yinyang:"yang", level:1},
    "47":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-5, str:"strong", strCn:"强", yinyang:"yin", level:2}, 
    "74":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-5, str:"strong", strCn:"强", yinyang:"yin", level:2},
    "38":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-3, str:"weak", strCn:"较弱", yinyang:"yin", level:3}, 
    "83":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-3, str:"weak", strCn:"较弱", yinyang:"yin", level:3},
    "29":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}, 
    "92":{n:"Liu Sha", cn:"六煞", d:"Emotional",p:"bad", s:-2, str:"weakest", strCn:"最弱", yinyang:"yin", level:4}
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

// Energy Level System (1-4, where 1 is strongest)
// Maps each pair to its energy level within its star category
const energyLevels = {
    // Tian Yi - Level 1 (strongest) to Level 4 (weakest)
    "13": 1, "31": 1, "68": 2, "86": 2, "49": 3, "94": 3, "27": 4, "72": 4,
    // Sheng Qi
    "14": 1, "41": 1, "67": 2, "76": 2, "39": 3, "93": 3, "28": 4, "82": 4,
    // Yan Nian
    "19": 1, "91": 1, "78": 2, "87": 2, "34": 3, "43": 3, "26": 4, "62": 4,
    // Fu Wei
    "11": 1, "22": 1, "88": 2, "99": 2, "66": 3, "77": 3, "33": 4, "44": 4,
    // Jue Ming
    "12": 1, "21": 1, "69": 2, "96": 2, "48": 3, "84": 3, "37": 4, "73": 4,
    // Wu Gui
    "18": 1, "81": 1, "79": 2, "97": 2, "36": 3, "63": 3, "24": 4, "42": 4,
    // Huo Hai
    "17": 1, "71": 1, "89": 2, "98": 2, "46": 3, "64": 3, "23": 4, "32": 4,
    // Liu Sha
    "16": 1, "61": 1, "47": 2, "74": 2, "38": 3, "83": 3, "29": 4, "92": 4
};

// Zero (零) Handling Rules - Position-based transformations
const zeroRules = {
    beginning: {
        rule: "zero_inherits_next",
        description: "0 at beginning takes value of following digit",
        example: "086 → 886",
        effect: "0 transforms to match next digit"
    },
    middle: {
        rule: "bridge_separator",
        description: "0 in middle creates hidden energy, extends duration of concealment",
        example: "306 → creates 33, 66 伏位",
        effect: "Invisible/hidden energy, extends concealment duration"
    },
    end: {
        rule: "zero_inherits_previous",
        description: "0 at end inherits previous digit (highest danger)",
        example: "860 → 866",
        danger_level: "highest",
        warning: "一切归空 (everything returns to void)"
    }
};

// Zero's impact on each star type
const zeroStarEffects = {
    "Tian Yi": {
        pairs: ["103", "608", "409", "702"],
        effect: "有资产无现金 (assets invisible), 暗桃花 (secret romance)",
        principle: "0入吉星，由吉变凶 (Zero entering auspicious stars turns them negative)"
    },
    "Sheng Qi": {
        pairs: ["104", "607", "309", "208"],
        effect: "贵人不显 (hidden benefactors), 间接贵人 only",
        principle: "0入吉星，由吉变凶"
    },
    "Yan Nian": {
        pairs: ["109", "708", "304", "206"],
        effect: "Ability hidden, low-key success, 幕后操作",
        principle: "0入吉星，由吉变凶"
    },
    "Fu Wei": {
        pairs: ["101", "808", "606", "303"],
        effect: "没有耐心 (no patience), cannot persist",
        principle: "0入吉星，由吉变凶"
    },
    "Jue Ming": {
        pairs: ["102", "609", "408", "307"],
        effect: "Reduced risk-taking, 偷工减料 tendency",
        principle: "0入凶星，凶上加凶 (Zero entering inauspicious stars makes them worse)"
    },
    "Wu Gui": {
        pairs: ["108", "709", "306", "204"],
        effect: "Hidden creativity, 被动分手 (forced breakup)",
        principle: "0入凶星，凶上加凶"
    },
    "Liu Sha": {
        pairs: ["106", "407", "308", "209"],
        effect: "内心压抑 (suppressed emotions), hidden skin diseases",
        principle: "0入凶星，凶上加凶"
    },
    "Huo Hai": {
        pairs: ["107", "809", "406", "203"],
        effect: "看不见的小人 (invisible villains), 冷战 tendency",
        principle: "0入凶星，凶上加凶"
    }
};

// Triple Combination Patterns (三连星) - Rescue Formulas
const rescueFormulas = {
    "Jue Ming": {
        solution: "Tian Yi",
        examples: ["312", "869", "948", "137"],
        description: "Adding Tian Yi after Jue Ming neutralizes extreme risk"
    },
    "Liu Sha": {
        solution: "Yan Nian",
        examples: ["1678", "4387"],
        description: "Adding Yan Nian after Liu Sha stabilizes emotional chaos"
    },
    "Huo Hai": {
        solution: ["Sheng Qi", "Sheng Qi+Yan Nian", "Sheng Qi+Fu Wei"],
        examples: ["171467", "329314"],
        description: "Adding Sheng Qi or Sheng Qi+Yan Nian or Sheng Qi+Fu Wei resolves conflicts"
    },
    "Wu Gui": {
        solution: ["Sheng Qi+Tian Yi+Yan Nian", "Yan Nian+Fu Wei"],
        examples: ["1813126", "7997887"],
        description: "Complex rescue requiring multiple auspicious stars"
    },
    "Fu Wei+Jue Ming": {
        solution: "Tian Yi",
        examples: ["330212731"],
        description: "Adding Tian Yi breaks stagnation-danger cycle"
    },
    "Fu Wei+Wu Gui": {
        solution: "Sheng Qi+Tian Yi+Yan Nian",
        examples: ["77059314"],
        description: "Multiple auspicious stars needed to neutralize"
    }
};

// Dangerous Chain Combinations (大凶组合)
const dangerousChains = {
    "Huo Hai+Wu Gui": {
        examples: ["179", "718"],
        riskLevel: "Very High",
        healthWarning: "慢性病, 精神疾病, 车祸 (chronic illness, mental disorders, car accidents)"
    },
    "Huo Hai+Liu Sha": {
        examples: ["3832", "7161"],
        riskLevel: "High",
        healthWarning: "脑神经衰弱 (brain nerve weakness)"
    },
    "Jue Ming+Wu Gui": {
        examples: ["2181", "9697"],
        riskLevel: "Extreme",
        healthWarning: "骨癌, 精神分裂 (bone cancer, schizophrenia) - '不死也要半条命' (even if not dead, half life lost)"
    },
    "Jue Ming+Liu Sha": {
        examples: ["2160", "9692"],
        riskLevel: "Very High",
        healthWarning: "肠胃病, 精神抑郁, 自杀倾向 (gastrointestinal, depression, suicidal tendencies)"
    },
    "Fu Wei+Wu Gui": {
        examples: ["77059", "88097"],
        riskLevel: "High",
        healthWarning: "怪病 (strange illness)"
    },
    "Fu Wei+Jue Ming": {
        examples: ["33021", "44012"],
        riskLevel: "Extreme",
        healthWarning: "意外死亡 high risk (high risk of accidental death)"
    }
};

// Beneficial Chains (连吉但需平衡)
const beneficialChains = {
    "Tian Yi+Yan Nian": {
        examples: ["3178", "6878"],
        effect: "理财能力强, 感情有责任 (strong financial management, responsible in relationships)",
        warning: "Blood pressure if excessive"
    },
    "Yan Nian+Sheng Qi": {
        examples: ["1914", "7867"],
        effect: "抗压能力最强 (strongest stress resistance)",
        warning: "Heart strain"
    },
    "Sheng Qi+Tian Yi": {
        examples: ["4131", "6768"],
        effect: "贵人带财, 升职加薪 (benefactors bring wealth, promotion and salary increase)",
        warning: "Overreliance on others"
    },
    "Tian Yi+Tian Yi+Tian Yi": {
        examples: ["31313", "68686"],
        effect: "Sustained income",
        warning: "血压血液问题, 行动力不强 (blood pressure/blood issues, lack of action)"
    }
};

// Health Correlations by Star
const healthCorrelations = {
    "Tian Yi": {
        bodySystems: ["血压 (Blood pressure)", "血液循环 (Blood circulation)", "眼耳鼻 (Eyes, ears, nose)"],
        conditions: ["Hypertension", "Poor circulation", "Gynecological issues"],
        warningCombos: ["+0: hidden cardiovascular issues"]
    },
    "Sheng Qi": {
        bodySystems: ["肠胃 (Digestive system)"],
        conditions: ["Digestive disorders"],
        warningCombos: ["Stronger pair = worse GI issues"]
    },
    "Yan Nian": {
        bodySystems: ["心脏 (Heart)", "神经 (Nerves)", "颈椎腰椎 (Neck/spine)"],
        conditions: ["Insomnia", "Spine problems", "Heart issues"],
        warningCombos: ["Too much = workaholism damage"]
    },
    "Fu Wei": {
        bodySystems: ["心脑 (Heart/brain)", "隐性疾病 (Hidden chronic diseases)"],
        conditions: ["Hidden chronic diseases"],
        warningCombos: ["+Wu Gui: sudden strange illness"]
    },
    "Jue Ming": {
        bodySystems: ["肝胆 (Liver/gallbladder)", "肾 (Kidneys)", "泌尿 (Urinary)"],
        conditions: ["Diabetes", "Liver problems", "Urinary issues"],
        warningCombos: ["+Wu Gui: bone cancer, mental illness"]
    },
    "Wu Gui": {
        bodySystems: ["心血 (Heart/blood)", "妇科 (Gynecological)"],
        conditions: ["Blood accidents", "Uterine issues"],
        warningCombos: ["+Jue Ming: '不死也要半条命'"]
    },
    "Huo Hai": {
        bodySystems: ["咽喉 (Throat)", "口腔 (Mouth)", "呼吸系统 (Respiratory system)"],
        conditions: ["Chronic respiratory", "Weak immunity"],
        warningCombos: ["+Liu Sha: brain nerve damage"]
    },
    "Liu Sha": {
        bodySystems: ["皮肤 (Skin)", "肠胃 (Stomach/intestines)", "精神 (Mental)"],
        conditions: ["Depression", "Skin conditions", "Insomnia"],
        warningCombos: ["+0: anxiety disorders"]
    }
};

// Five Element Mappings (洛书系统)
const fiveElements = {
    digits: {
        1: { element: "水 (Water)", trigram: "坎 (Kan)", direction: "North" },
        2: { element: "土 (Earth)", trigram: "坤 (Kun)", direction: "Southwest" },
        3: { element: "木 (Wood)", trigram: "震 (Zhen)", direction: "East" },
        4: { element: "木 (Wood)", trigram: "巽 (Xun)", direction: "Southeast" },
        5: { element: "土 (Earth)", trigram: "中宫 (Center)", direction: "Center" },
        6: { element: "金 (Metal)", trigram: "乾 (Qian)", direction: "Northwest" },
        7: { element: "金 (Metal)", trigram: "兑 (Dui)", direction: "West" },
        8: { element: "土 (Earth)", trigram: "艮 (Gen)", direction: "Northeast" },
        9: { element: "火 (Fire)", trigram: "离 (Li)", direction: "South" },
        0: { element: "土 (Earth)", trigram: "中宫 (Center)", direction: "Center" }
    },
    generatingCycle: {
        description: "相生 (Generating) - Auspicious",
        cycle: "木 → 火 → 土 → 金 → 水 → 木",
        relationships: {
            "1,6": "生 3,4 (Water nourishes Wood)",
            "3,4": "生 9 (Wood feeds Fire)",
            "9": "生 2,5,8 (Fire creates Earth)",
            "2,5,8": "生 6,7 (Earth produces Metal)",
            "6,7": "生 1 (Metal carries Water)"
        },
        meaning: "More 相生 in number = better interpersonal relationships"
    },
    controllingCycle: {
        description: "相克 (Controlling) - Challenging",
        cycle: "木 克 土 → 土 克 水 → 水 克 火 → 火 克 金 → 金 克 木",
        warning: "When 被克者 strength >> 克者: causes 反克/反侮 (reverse control)",
        meaning: "More 相克 in number = relationship difficulties"
    }
};

// 81数理吉凶表 (81 Number Fortune Table)
const numberFortune81 = {
    daji: [1, 3, 5, 6, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68, 81],
    ji: [7, 8],
    banjibanxiong: [26, 38, 50, 51, 55, 58, 71, 73, 75, 77, 78],
    xiong: [2, 4, 9, 10, 12, 14, 19, 20, 22, 27, 28, 30, 34, 36, 40, 42, 43, 44, 46, 49, 53, 54, 56, 59, 60, 62, 64, 66, 69, 70, 72, 74, 76, 79, 80],
    calculate: function(lastDigits) {
        // Method 1: Last 4 digits ÷ 80 → remainder
        const remainder = parseInt(lastDigits) % 80;
        const num = remainder === 0 ? 80 : remainder;
        
        if (this.daji.includes(num)) return { category: "大吉 (Very Auspicious)", num: num };
        if (this.ji.includes(num)) return { category: "吉 (Auspicious)", num: num };
        if (this.banjibanxiong.includes(num)) return { category: "半吉半凶 (Mixed)", num: num };
        if (this.xiong.includes(num)) return { category: "凶 (Inauspicious)", num: num };
        return { category: "Unknown", num: num };
    }
};

// Position Weighting System
const positionWeights = {
    tail: { weight: 1.0, description: "尾号 (Last digits) - 最终结果/归宿 (Final outcome/destination)" },
    lastFour: { weight: 0.75, description: "后四位 (Last 4) - Core daily influence" },
    middle: { weight: 0.45, description: "中间段 (Middle) - Process/transition" },
    firstFour: { weight: 0.25, description: "前四位 (First 4) - Background context" },
    operator: { weight: 0.1, description: "前三位 (Operator code) - Minimal personal effect" }
};

// Ming Gua (命卦) System
const mingGuaSystem = {
    calculate: function(year, month, day, gender) {
        // Adjust for Li Chun (立春) - before Feb 4 uses previous year
        let effectiveYear = year;
        if (month === 1 || (month === 2 && day < 4)) {
            effectiveYear = year - 1;
        }
        
        // Sum digits until single digit
        let sum = effectiveYear.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        while (sum > 9) {
            sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        
        let gua;
        if (gender === 'male') {
            gua = 11 - sum;
            if (gua > 9) gua = gua - 9;
            if (gua === 5) gua = 2;
        } else {
            gua = sum + 4;
            if (gua > 9) gua = gua - 9;
            if (gua === 5) gua = 8;
        }
        return gua;
    },
    
    guaDetails: {
        1: { 
            name: "坎", 
            nameEn: "Kan",
            symbol: "☵",
            group: "east", 
            groupCn: "东四命",
            element: "水", 
            elementEn: "Water",
            favorable: [1, 3, 4, 9],
            unfavorable: [2, 6, 7, 8],
            personality: "智慧型，适应力强，深沉内敛，善于思考",
            personalityEn: "Wisdom type, adaptable, deep and introspective, good at thinking",
            traits: "智慧型 - 适应力强，深沉内敛，善于思考",
            traitsEn: "Wisdom type - Strong adaptability, deep and introspective, good at thinking",
            strengths: ["思维敏捷", "适应力强", "直觉敏锐", "耐心持久"],
            strengthsEn: ["Quick thinking", "Strong adaptability", "Sharp intuition", "Patient and persistent"],
            weaknesses: ["多疑敏感", "情绪波动", "过于保守", "不善社交"],
            weaknessesEn: ["Suspicious and sensitive", "Emotional fluctuations", "Too conservative", "Poor social skills"]
        },
        2: { 
            name: "坤", 
            nameEn: "Kun",
            symbol: "☷",
            group: "west", 
            groupCn: "西四命",
            element: "土", 
            elementEn: "Earth",
            favorable: [2, 6, 7, 8],
            unfavorable: [1, 3, 4, 9],
            personality: "包容型，稳重踏实，善于支持他人，厚德载物",
            personalityEn: "Nurturing type, steady and grounded, supportive of others",
            traits: "包容型 - 稳重踏实，善于支持他人",
            traitsEn: "Nurturing type - Steady and grounded, good at supporting others",
            strengths: ["心胸宽广", "稳重可靠", "善于照顾", "脚踏实地"],
            strengthsEn: ["Broad-minded", "Steady and reliable", "Good at caring", "Down-to-earth"],
            weaknesses: ["过于被动", "优柔寡断", "容易依赖", "过于牺牲"],
            weaknessesEn: ["Too passive", "Indecisive", "Easily dependent", "Too self-sacrificing"]
        },
        3: { 
            name: "震", 
            nameEn: "Zhen",
            symbol: "☳",
            group: "east", 
            groupCn: "东四命",
            element: "木", 
            elementEn: "Wood",
            favorable: [1, 3, 4, 9],
            unfavorable: [2, 6, 7, 8],
            personality: "行动型，冲劲十足，开创精神，雷厉风行",
            personalityEn: "Action type, full of drive, pioneering spirit, decisive",
            traits: "行动型 - 冲劲十足，开创精神",
            traitsEn: "Action type - Full of drive, pioneering spirit",
            strengths: ["行动力强", "勇于开创", "决策果断", "充满活力"],
            strengthsEn: ["Strong action ability", "Courageous in pioneering", "Decisive", "Full of energy"],
            weaknesses: ["急躁冲动", "缺乏耐心", "说话太直", "虎头蛇尾"],
            weaknessesEn: ["Impatient and impulsive", "Lacks patience", "Too direct in speech", "Starts strong but finishes weak"]
        },
        4: { 
            name: "巽", 
            nameEn: "Xun",
            symbol: "☴",
            group: "east", 
            groupCn: "东四命",
            element: "木", 
            elementEn: "Wood",
            favorable: [1, 3, 4, 9],
            unfavorable: [2, 6, 7, 8],
            personality: "沟通型，柔顺渗透，善于协调，风行草偃",
            personalityEn: "Communication type, gentle and pervasive, good at coordination",
            traits: "沟通型 - 柔顺渗透，善于协调",
            traitsEn: "Communication type - Gentle and pervasive, good at coordination",
            strengths: ["沟通能力强", "灵活变通", "细心周到", "影响力强"],
            strengthsEn: ["Strong communication skills", "Flexible and adaptable", "Careful and considerate", "Strong influence"],
            weaknesses: ["优柔寡断", "容易受影响", "缺乏坚定", "过于圆滑"],
            weaknessesEn: ["Indecisive", "Easily influenced", "Lacks firmness", "Too smooth/slippery"]
        },
        6: { 
            name: "乾", 
            nameEn: "Qian",
            symbol: "☰",
            group: "west", 
            groupCn: "西四命",
            element: "金", 
            elementEn: "Metal",
            favorable: [2, 6, 7, 8],
            unfavorable: [1, 3, 4, 9],
            personality: "领导型，刚健有力，天生权威，自强不息",
            personalityEn: "Leadership type, strong and powerful, natural authority",
            traits: "领导型 - 刚健有力，天生权威",
            traitsEn: "Leadership type - Strong and powerful, natural authority",
            strengths: ["领导气质", "意志坚定", "正直有原则", "眼光长远"],
            strengthsEn: ["Leadership charisma", "Strong will", "Upright with principles", "Long-term vision"],
            weaknesses: ["过于强势", "固执己见", "高处不胜寒", "不善表达情感"],
            weaknessesEn: ["Too domineering", "Stubborn", "Lonely at the top", "Poor at expressing emotions"]
        },
        7: { 
            name: "兑", 
            nameEn: "Dui",
            symbol: "☱",
            group: "west", 
            groupCn: "西四命",
            element: "金", 
            elementEn: "Metal",
            favorable: [2, 6, 7, 8],
            unfavorable: [1, 3, 4, 9],
            personality: "社交型，口才出众，喜悦感染力，和悦待人",
            personalityEn: "Social type, eloquent speaker, joyful and infectious personality",
            traits: "社交型 - 口才出众，喜悦感染力",
            traitsEn: "Social type - Excellent eloquence, infectious joy",
            strengths: ["口才极佳", "人缘好", "乐观开朗", "审美品味高"],
            strengthsEn: ["Excellent eloquence", "Good interpersonal relationships", "Optimistic and cheerful", "High aesthetic taste"],
            weaknesses: ["过于表面", "话多易得罪", "贪图享乐", "缺乏深度"],
            weaknessesEn: ["Too superficial", "Prone to offending with too much talk", "Pleasure-seeking", "Lacking depth"]
        },
        8: { 
            name: "艮", 
            nameEn: "Gen",
            symbol: "☶",
            group: "west", 
            groupCn: "西四命",
            element: "土", 
            elementEn: "Earth",
            favorable: [2, 6, 7, 8],
            unfavorable: [1, 3, 4, 9],
            personality: "稳固型，止步积累，厚积薄发，稳如泰山",
            personalityEn: "Stability type, accumulates steadily, patient and grounded",
            traits: "稳固型 - 厚积薄发，稳如泰山",
            traitsEn: "Stability type - Accumulates steadily, stable as Mount Tai",
            strengths: ["意志坚定", "善于积累", "稳重可靠", "专注力强"],
            strengthsEn: ["Strong will", "Good at accumulating", "Steady and reliable", "Strong focus"],
            weaknesses: ["过于固执", "行动缓慢", "不善表达", "过于保守"],
            weaknessesEn: ["Too stubborn", "Slow to act", "Poor at expression", "Too conservative"]
        },
        9: { 
            name: "离", 
            nameEn: "Li",
            symbol: "☲",
            group: "east", 
            groupCn: "东四命",
            element: "火", 
            elementEn: "Fire",
            favorable: [1, 3, 4, 9],
            unfavorable: [2, 6, 7, 8],
            personality: "光明型，热情奔放，文明智慧，光彩照人",
            personalityEn: "Radiant type, passionate and expressive, bright and wise",
            traits: "光明型 - 热情奔放，文明智慧",
            traitsEn: "Radiant type - Passionate and expressive, bright and wise",
            strengths: ["热情洋溢", "聪明智慧", "审美能力强", "积极乐观"],
            strengthsEn: ["Enthusiastic", "Intelligent and wise", "Strong aesthetic ability", "Positive and optimistic"],
            weaknesses: ["情绪波动大", "虚荣心强", "缺乏耐心", "依赖认可"],
            weaknessesEn: ["Large emotional fluctuations", "Strong vanity", "Lacks patience", "Dependent on recognition"]
        }
    },
    
    getGroup: function(gua) {
        return this.guaDetails[gua]?.group || "unknown";
    },
    
    getGroupCn: function(gua) {
        return this.guaDetails[gua]?.groupCn || "未知";
    },
    
    getFavorableDigits: function(gua) {
        return this.guaDetails[gua]?.favorable || [];
    },
    
    getUnfavorableDigits: function(gua) {
        return this.guaDetails[gua]?.unfavorable || [];
    },
    
    getPersonality: function(gua) {
        return this.guaDetails[gua]?.personality || "";
    }
};

