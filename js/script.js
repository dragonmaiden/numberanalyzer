        // Gender state
        let selectedGender = 'male';
        
        function setGender(gender) {
            selectedGender = gender;
            document.getElementById('maleBtn').classList.toggle('active', gender === 'male');
            document.getElementById('femaleBtn').classList.toggle('active', gender === 'female');
            
            if (gender === 'male') {
                document.getElementById('genderInfo').innerHTML = 'Yang patterns (14/41, 13/31, 68/86, 79/97) provide stronger benefits';
            } else {
                document.getElementById('genderInfo').innerHTML = 'Yin patterns (39/93, 67/76, 24/42, 18/81) provide stronger benefits';
            }
            // Gender change does not auto-analyze - user must click Analyze button
        }

        // Yang patterns (better for men): 13/31, 14/41, 68/86, 79/97
        // Yin patterns (better for women): 24/42, 39/93, 67/76, 18/81
        
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

        // Double star meanings
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

        function runFullReport() {
            const input = document.getElementById('phoneInput').value.replace(/\D/g, '');
            const results = document.getElementById('results');
            const loadingOverlay = document.getElementById('loadingOverlay');
            const analyzeBtn = document.getElementById('analyzeBtn');
            
            if (input.length < 2) {
                alert("Please enter a valid number.");
                return;
            }

            // Disable button and show loading spinner
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analyzing...';
            loadingOverlay.classList.add('active');
            
            // Run analysis after 2 seconds
            setTimeout(() => {
                results.classList.remove('hidden');
                runFlowAndAnalysis(input);
                
                // Hide loading spinner and re-enable button
                loadingOverlay.classList.remove('active');
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = 'Analyze';
                
                // Scroll to results
                results.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1000);
        }

        function runFlowAndAnalysis(input) {
            const flowContainer = document.getElementById('flowContainer');
            const narrativeContainer = document.getElementById('narrativeContainer');
            const strategicContainer = document.getElementById('strategicContainer');
            const scoreCircle = document.getElementById('scoreCircle');
            
            flowContainer.innerHTML = '';
            strategicContainer.innerHTML = '';
            
            let totalScore = 50; 
            let starsFound = [];
            let flowData = [];
            let lastStar = null;
            let combosFound = [];

            let validIndices = [];
            for(let i=0; i<input.length; i++) {
                if(input[i] !== '0' && input[i] !== '5') validIndices.push(i);
            }

            for(let k=0; k < validIndices.length - 1; k++) {
                let idxA = validIndices[k];
                let idxB = validIndices[k+1];
                let d1 = input[idxA];
                let d2 = input[idxB];
                let modifiers = input.substring(idxA + 1, idxB);
                let hasZero = modifiers.includes('0');
                let hasFive = modifiers.includes('5');

                let pair = d1 + d2;
                let star = starMap[pair];
                
                if(star) {
                    // Base score
                    let starScore = star.s;
                    
                    // Gender-based Yin-Yang adjustment
                    let yinyangMatch = false;
                    if (selectedGender === 'male' && star.yinyang === 'yang') {
                        yinyangMatch = true;
                        starScore += (star.p === 'good' ? 2 : -1); // Yang stars benefit men more
                    } else if (selectedGender === 'female' && star.yinyang === 'yin') {
                        yinyangMatch = true;
                        starScore += (star.p === 'good' ? 2 : -1); // Yin stars benefit women more
                    } else if (selectedGender === 'male' && star.yinyang === 'yin') {
                        starScore -= (star.p === 'good' ? 1 : 0); // Yin stars less effective for men
                    } else if (selectedGender === 'female' && star.yinyang === 'yang') {
                        starScore -= (star.p === 'good' ? 1 : 0); // Yang stars less effective for women
                    }
                    
                    // Special case: Strong Yan Nian (19/91) warning for women
                    let femaleYanNianWarning = false;
                    if (selectedGender === 'female' && star.n === 'Yan Nian' && (star.str === 'strongest' || star.str === 'strong')) {
                        femaleYanNianWarning = true;
                        starScore -= 3; // Reduce relationship potential for women with strong Yan Nian
                    }
                    
                    totalScore += starScore;
                    if(hasFive) totalScore += (star.s > 0 ? 2 : -2);
                    if(hasZero) totalScore -= (star.s > 0 ? 2 : -2);

                    starsFound.push({
                        ...star, 
                        digits: d1 + d2, 
                        displayDigits: d1 + modifiers + d2, 
                        hasZero, 
                        hasFive, 
                        position: k+1, 
                        strength: star.str, 
                        strengthCn: star.strCn,
                        yinyang: star.yinyang,
                        yinyangMatch: yinyangMatch,
                        femaleYanNianWarning: femaleYanNianWarning,
                        adjustedScore: starScore
                    });
                    
                    // Track combos
                    if (lastStar) {
                        let comboKey = lastStar.n + "+" + star.n;
                        let comboEffect = comboMap[comboKey];
                        if(comboEffect) {
                            combosFound.push({from: lastStar.n, to: star.n, effect: comboEffect, afterIndex: starsFound.length - 1});
                        }
                    }

                    lastStar = star;
                }
            }

            // Collect tail digits
            let tailStr = null;
            let lastValidIdx = validIndices[validIndices.length - 1];
            if (lastValidIdx < input.length - 1) {
                tailStr = input.substring(lastValidIdx + 1);
            }

            // === BUILD 3-PHASE FLOW VISUALIZATION WITH DEEP ANALYSIS ===
            let stars = starsFound;
            
            if (stars.length === 0) {
                flowContainer.innerHTML = '<p style="color:#6b7280; text-align:center; padding: 20px;">No valid star patterns found in this number.</p>';
            } else {
                // Divide stars into 3 phases - first 2 stars always in Origin
                let originStars = [];
                let journeyStars = [];
                let outcomeStars = [];
                
                if (stars.length === 1) {
                    originStars = [stars[0]];
                } else if (stars.length === 2) {
                    // Both stars in Origin
                    originStars = [stars[0], stars[1]];
                } else if (stars.length === 3) {
                    // First 2 in Origin, last in End Result
                    originStars = [stars[0], stars[1]];
                    outcomeStars = [stars[2]];
                } else {
                    // First 2 in Origin, middle in Journey, last in End Result
                    originStars = [stars[0], stars[1]];
                    journeyStars = stars.slice(2, -1);
                    outcomeStars = [stars[stars.length - 1]];
                }
                
                // === CREATE TRAIN LINKAGE VISUALIZATION ===
                const trainContainer = document.createElement('div');
                trainContainer.style.cssText = 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 25px; overflow-x: auto;';
                
                let trainHtml = '<div style="font-size: 11px; color: #6b7280; margin-bottom: 12px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Number Breakdown</div>';
                trainHtml += '<div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px;">';
                
                stars.forEach((star, idx) => {
                    // Color intensity based on type AND strength (only dark/light, no medium)
                    let bgColor, borderColor, textColor;
                    const isDark = star.strength === 'strongest' || star.strength === 'strong';
                    
                    if (star.p === 'good') {
                        if (isDark) {
                            bgColor = '#dcfce7'; borderColor = '#047857'; textColor = '#047857';
                        } else {
                            bgColor = '#f0fdf4'; borderColor = '#10b981'; textColor = '#10b981';
                        }
                    } else if (star.p === 'bad') {
                        if (isDark) {
                            bgColor = '#fee2e2'; borderColor = '#dc2626'; textColor = '#dc2626';
                        } else {
                            bgColor = '#fff5f5'; borderColor = '#f87171'; textColor = '#f87171';
                        }
                    } else {
                        bgColor = '#ffffff'; borderColor = '#d1d5db'; textColor = '#374151';
                    }
                    
                    // Check if this is part of a consecutive run
                    let prevSameStar = idx > 0 && stars[idx-1].n === star.n;
                    let nextSameStar = idx < stars.length - 1 && stars[idx+1].n === star.n;
                    
                    // Train car with elongation styling
                    trainHtml += `<div style="display: flex; align-items: center;">`;
                    trainHtml += `<div style="
                        background: ${bgColor}; 
                        border: 2px solid ${borderColor}; 
                        border-radius: 10px; 
                        padding: 8px 12px;
                        min-width: 60px;
                        ${prevSameStar || nextSameStar ? 'box-shadow: 0 2px 8px ' + borderColor + '40;' : 'box-shadow: 0 1px 3px rgba(0,0,0,0.08);'}
                    ">`;
                    trainHtml += `<div style="font-size: 22px; font-weight: 700; color: ${textColor}; text-align: center; font-family: 'SF Mono', Monaco, monospace; letter-spacing: 1px;">${star.displayDigits}</div>`;
                    trainHtml += `<div style="font-size: 9px; color: #6b7280; text-align: center; margin-top: 2px;">${star.n}</div>`;
                    trainHtml += `<div style="font-size: 9px; color: #9ca3af; text-align: center;">${star.cn}</div>`;
                    trainHtml += `</div>`;
                    
                    // Simple arrow connector (not after last)
                    if (idx < stars.length - 1) {
                        trainHtml += `<div style="
                            padding: 0 4px;
                            color: #9ca3af;
                            font-size: 16px;
                        ">→</div>`;
                    }
                    trainHtml += `</div>`;
                });
                
                trainHtml += '</div>';
                
                trainContainer.innerHTML = trainHtml;
                flowContainer.appendChild(trainContainer);
                
                // Deep analysis helper - creates detailed card with context
                function createDeepFlowCard(star, idx, totalStars, prevStar, nextStar) {
                    const div = document.createElement('div');
                    
                    // Color intensity based on type AND strength (only dark/light)
                    const isDark = star.strength === 'strongest' || star.strength === 'strong';
                    let borderColor, textColor, tagBgColor, tagTextColor;
                    
                    if (star.p === "good") {
                        if (isDark) {
                            borderColor = "#047857"; textColor = "#047857";
                            tagBgColor = "#dcfce7"; tagTextColor = "#047857";
                        } else {
                            borderColor = "#10b981"; textColor = "#10b981";
                            tagBgColor = "#ecfdf5"; tagTextColor = "#10b981";
                        }
                    } else if (star.p === "bad") {
                        if (isDark) {
                            borderColor = "#dc2626"; textColor = "#dc2626";
                            tagBgColor = "#fee2e2"; tagTextColor = "#dc2626";
                        } else {
                            borderColor = "#f87171"; textColor = "#f87171";
                            tagBgColor = "#fef2f2"; tagTextColor = "#f87171";
                        }
                    } else {
                        borderColor = "#9ca3af"; textColor = "#6b7280";
                        tagBgColor = "#f3f4f6"; tagTextColor = "#6b7280";
                    }
                    
                    // English translations for strength
                    const strengthEnglish = {
                        '最强': 'Strongest',
                        '强': 'Strong', 
                        '较弱': 'Weak',
                        '最弱': 'Weakest'
                    };
                    
                    let yinyangTag = star.yinyang === 'yang' ? '<span class="tag tag-yang">阳 Yang</span>' : 
                                    (star.yinyang === 'yin' ? '<span class="tag tag-yin">阴 Yin</span>' : '');
                    let matchIcon = star.yinyangMatch ? '<span style="color:#059669; font-size:14px; margin-left:4px;">✓</span>' : '';
                    
                    // Compact tags with dynamic colors matching the card
                    let strengthTag = `<span style="background:${tagBgColor}; color:${tagTextColor}; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:500;">${star.strengthCn} ${strengthEnglish[star.strengthCn] || ''}</span>`;
                    let tagsHtml = strengthTag + yinyangTag;
                    if (star.hasFive) tagsHtml += `<span class="tag" style="background:#fef3c7; color:#d97706;">5</span>`;
                    if (star.hasZero) tagsHtml += `<span class="tag" style="background:#f3f4f6; color:#6b7280;">0</span>`;
                    
                    div.className = 'star-card';
                    div.style.cssText = `
                        background: white;
                        border-left: 4px solid ${borderColor};
                        border-radius: 12px;
                        padding: 16px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                        min-width: 140px;
                        flex: 1;
                        max-width: 180px;
                    `;
                    div.innerHTML = `
                        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                            <span style="font-size:15px; font-weight:600; color:${textColor};">${star.n}</span>
                            <span style="color:${textColor}; font-size:13px;">${star.cn}</span>
                        </div>
                        <div style="margin-bottom:10px;">
                            <span style="font-size:28px; font-weight:700; color:#0f172a; font-family: 'SF Mono', Monaco, monospace; letter-spacing:1px;">${star.displayDigits}</span>
                            ${matchIcon}
                        </div>
                        <div style="display:flex; flex-wrap:wrap; gap:4px;">
                            ${tagsHtml}
                        </div>
                    `;
                    return div;
                }
                
                // Create phase section with deep analysis cards
                function createDeepPhaseSection(title, subtitle, emoji, phaseStars, phaseClass, bgGradient) {
                    const section = document.createElement('div');
                    section.className = `phase-section ${phaseClass}`;
                    section.style.cssText = `background:${bgGradient}; padding:20px; border-radius:16px; margin:15px 0; border: 1px solid #e5e7eb;`;
                    
                    let headerHtml = `
                        <div class="phase-header" style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
                            <div style="font-size:24px;">${emoji}</div>
                            <div>
                                <div style="font-size:16px; font-weight:700; color:#1f2937;">${title}</div>
                                <div style="font-size:12px; color:#6b7280;">${subtitle}</div>
                            </div>
                        </div>
                        <div class="phase-cards" style="display:flex; flex-wrap:wrap; gap:12px;"></div>
                    `;
                    section.innerHTML = headerHtml;
                    
                    const cardsContainer = section.querySelector('.phase-cards');
                    
                    // Add all cards for this phase (no connectors - just cards in a row)
                    phaseStars.forEach((star, idx) => {
                        // Get prev/next stars for flow context
                        let globalIdx = stars.indexOf(star);
                        let prevStar = globalIdx > 0 ? stars[globalIdx - 1] : null;
                        let nextStar = globalIdx < stars.length - 1 ? stars[globalIdx + 1] : null;
                        
                        let card = createDeepFlowCard(star, idx, phaseStars.length, prevStar, nextStar);
                        cardsContainer.appendChild(card);
                    });
                    
                    return section;
                }
                
                // Origin Phase - always shown
                flowContainer.appendChild(
                    createDeepPhaseSection("1️⃣ Foundation 基础", `Starting Energy (${originStars.length} star${originStars.length > 1 ? 's' : ''})`, "🌅", originStars, "phase-origin", "linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)")
                );
                
                // Journey Phase
                if (journeyStars.length > 0) {
                    flowContainer.appendChild(
                        createDeepPhaseSection("2️⃣ The Journey 旅程", `Process & Transitions (${journeyStars.length} phase${journeyStars.length > 1 ? 's' : ''})`, "🛤️", journeyStars, "phase-journey", "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)")
                    );
                }
                
                // End Result Phase
                if (outcomeStars.length > 0) {
                    flowContainer.appendChild(
                        createDeepPhaseSection("3️⃣ Final Outcome 结果", "Destination (2x Weight)", "🏁", outcomeStars, "phase-outcome", "linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)")
                    );
                }
                
                // Tail digits
                if (tailStr) {
                    addTailCard(tailStr, flowContainer);
                }
            }

            if(lastStar) totalScore += lastStar.s;
            if(totalScore > 100) totalScore = 100;
            if(totalScore < 0) totalScore = 0;

            scoreCircle.innerText = totalScore;
            // Update score circle class based on score
            scoreCircle.className = 'score-circle';
            if (totalScore < 40) {
                scoreCircle.classList.add('bad');
            } else if (totalScore < 60) {
                scoreCircle.classList.add('neutral');
            }
            // Good scores use the default gradient
            
            // Update gender indicator
            const genderIndicator = document.getElementById('genderIndicator');
            if (selectedGender === 'male') {
                genderIndicator.innerHTML = '♂ Analyzing for Male (阳男)';
                genderIndicator.className = 'gender-indicator male';
            } else {
                genderIndicator.innerHTML = '♀ Analyzing for Female (阴女)';
                genderIndicator.className = 'gender-indicator female';
            }

            generateDeepNarrative(input, starsFound, starsFound[starsFound.length - 1], combosFound, totalScore, narrativeContainer);
        }

        function getScoreColor(score) {
            if(score >= 80) return "#10b981"; 
            if(score >= 50) return "#facc15"; 
            return "#f87171"; 
        }

        function generateDeepNarrative(input, stars, lastStar, combos, score, container) {
            container.innerHTML = "";

            if(stars.length === 0) {
                container.innerHTML = "<div class='narrative-text'>Not enough valid digit pairs to generate a complete analysis. Please enter a longer number.</div>";
                return;
            }

            // Detect consecutive same-star runs (used by multiple sections)
            let consecutiveRuns = [];
            let runIdx = 0;
            while (runIdx < stars.length) {
                let runStart = runIdx;
                let currentStar = stars[runIdx].n;
                while (runIdx < stars.length && stars[runIdx].n === currentStar) {
                    runIdx++;
                }
                let runLength = runIdx - runStart;
                if (runLength >= 2) {
                    consecutiveRuns.push({
                        star: currentStar,
                        count: runLength,
                        startIndex: runStart,
                        endIndex: runIdx - 1,
                        positions: stars.slice(runStart, runIdx).map(s => s.displayDigits)
                    });
                }
            }

            // === SECTION 1: UNIFIED EXECUTIVE SUMMARY ===
            let summaryText = "";
            let startStar = stars[0];
            let goodCount = stars.filter(s => s.p === 'good').length;
            let badCount = stars.filter(s => s.p === 'bad').length;
            let neutralCount = stars.filter(s => s.p === 'neutral').length;
            
            // Gather all key data for coherent narrative
            let genderLabel = selectedGender === 'male' ? '阳男 (Yang Male)' : '阴女 (Yin Female)';
            let genderIcon = selectedGender === 'male' ? '♂' : '♀';
            let yangCount = stars.filter(s => s.yinyang === 'yang').length;
            let yinCount = stars.filter(s => s.yinyang === 'yin').length;
            let matchingCount = stars.filter(s => s.yinyangMatch).length;
            
            // Key stars for analysis
            let tianYiStars = stars.filter(s => s.n === 'Tian Yi');
            let shengQiStars = stars.filter(s => s.n === 'Sheng Qi');
            let yanNianStars = stars.filter(s => s.n === 'Yan Nian');
            let jueMingStars = stars.filter(s => s.n === 'Jue Ming');
            let wuGuiStars = stars.filter(s => s.n === 'Wu Gui');
            let liuShaStars = stars.filter(s => s.n === 'Liu Sha');
            let huoHaiStars = stars.filter(s => s.n === 'Huo Hai');
            let fuWeiStars = stars.filter(s => s.n === 'Fu Wei');
            
            // Get phase stars for contextual analysis
            let foundationStars = [];
            let journeyStars_exec = [];
            let outcomeStars_exec = [];
            
            if (stars.length === 1) {
                foundationStars = [stars[0]];
            } else if (stars.length === 2) {
                foundationStars = [stars[0], stars[1]];
            } else if (stars.length === 3) {
                foundationStars = [stars[0], stars[1]];
                outcomeStars_exec = [stars[2]];
            } else {
                foundationStars = [stars[0], stars[1]];
                journeyStars_exec = stars.slice(2, -1);
                outcomeStars_exec = [stars[stars.length - 1]];
            }
            
            // === BUILD COHERENT NARRATIVE ===
            summaryText += `<div style="line-height: 1.8; font-size: 14px; color: #374151;">`;
            
            // Opening paragraph - Overview with gender context
            summaryText += `<p style="margin-bottom: 16px;">`;
            summaryText += `As a <strong style="color: ${selectedGender === 'male' ? '#1e40af' : '#be185d'};">${genderIcon} ${genderLabel}</strong>, your number <strong>${input}</strong> carries `;
            
            if (goodCount > badCount) {
                summaryText += `<span style="color: #059669;">predominantly auspicious energy</span> with ${goodCount} favorable stars versus ${badCount} challenging ones. `;
            } else if (badCount > goodCount) {
                summaryText += `<span style="color: #dc2626;">significant challenges</span> with ${badCount} difficult stars versus ${goodCount} favorable ones—requiring strategic navigation. `;
            } else {
                summaryText += `balanced energy with equal measures of opportunity and challenge. `;
            }
            
            // Yin-Yang compatibility
            if (selectedGender === 'male') {
                if (yangCount > yinCount) {
                    summaryText += `The Yang-dominant composition (${yangCount} Yang vs ${yinCount} Yin) resonates well with your male energy, amplifying your natural strengths.`;
                } else if (yinCount > yangCount) {
                    summaryText += `However, the Yin-dominant composition (${yinCount} Yin vs ${yangCount} Yang) may feel somewhat subdued for male energy—consider pairing with Yang-heavy associates or environments.`;
                } else {
                    summaryText += `The balanced Yin-Yang ratio provides moderate compatibility with your male energy.`;
                }
            } else {
                if (yinCount > yangCount) {
                    summaryText += `The Yin-dominant composition (${yinCount} Yin vs ${yangCount} Yang) harmonizes beautifully with your female energy.`;
                } else if (yangCount > yinCount) {
                    summaryText += `However, the Yang-dominant composition (${yangCount} Yang vs ${yinCount} Yin) carries strong assertive energy—excellent for career, but may require conscious softening in relationships.`;
                } else {
                    summaryText += `The balanced Yin-Yang ratio provides versatile energy for both career and relationships.`;
                }
            }
            summaryText += `</p>`;
            
            // Wealth & Career paragraph
            summaryText += `<p style="margin-bottom: 16px;">`;
            summaryText += `<strong style="color: #1f2937;">💰 Wealth & Career:</strong> `;
            
            if (tianYiStars.length > 0 && yanNianStars.length > 0) {
                summaryText += `Your number contains both <span style="color: #059669;">Tian Yi (天医)</span> and <span style="color: #059669;">Yan Nian (延年)</span>—a powerful combination for material success. Wealth flows through legitimate channels while leadership opportunities naturally arise. `;
            } else if (tianYiStars.length > 0) {
                summaryText += `The presence of <span style="color: #059669;">Tian Yi (天医)</span> indicates wealth through legitimate means—careers, investments, and business acumen. Money comes to those who plan wisely. `;
            } else if (shengQiStars.length > 0) {
                summaryText += `<span style="color: #059669;">Sheng Qi (生气)</span> brings wealth through opportunity and networking—being in the right place with the right people matters more than traditional career climbing. `;
            } else if (yanNianStars.length > 0) {
                summaryText += `<span style="color: #059669;">Yan Nian (延年)</span> provides career authority and professional respect. Wealth follows leadership positions and sustained effort. `;
            } else {
                summaryText += `Without primary wealth stars, financial success depends more on direct effort and deliberate strategy than natural energetic flow. `;
            }
            
            // Wealth warnings
            if (jueMingStars.length > 0) {
                let jueMingIntensity = jueMingStars.some(s => s.strength === 'strongest' || s.strength === 'strong') ? 'significant' : 'moderate';
                summaryText += `<span style="color: #dc2626;">Jue Ming (绝命) introduces ${jueMingIntensity} wealth volatility</span>—money may come but can leave just as quickly. Automatic savings and avoiding impulse decisions are essential. `;
            }
            if (wuGuiStars.length > 0) {
                summaryText += `<span style="color: #dc2626;">Wu Gui (五鬼)</span> adds unpredictability—brilliant schemes may appear, but outcomes can shift unexpectedly. `;
            }
            
            // Ending impact on wealth
            if (lastStar.n === 'Tian Yi') {
                summaryText += `Crucially, your number <span style="color: #059669;">ends with Tian Yi</span>—the "wealth keeper" position. What you earn, you can preserve.`;
            } else if (lastStar.n === 'Jue Ming') {
                summaryText += `<span style="color: #dc2626;">Warning: 绝命结尾 (Jue Ming ending)</span>—even if wealth accumulates mid-journey, the ending energy makes retention difficult. Build strong financial safeguards.`;
            } else if (lastStar.n === 'Wu Gui') {
                summaryText += `The <span style="color: #dc2626;">Wu Gui ending</span> means final outcomes can shift—always maintain backup plans.`;
            }
            summaryText += `</p>`;
            
            // Relationships paragraph
            summaryText += `<p style="margin-bottom: 16px;">`;
            summaryText += `<strong style="color: #1f2937;">❤️ Relationships:</strong> `;
            
            if (liuShaStars.length > 0) {
                let liuShaIntensity = liuShaStars.some(s => s.strength === 'strongest' || s.strength === 'strong') ? 'powerful' : 'moderate';
                summaryText += `<span style="color: #ec4899;">Liu Sha (六煞)</span> brings ${liuShaIntensity} peach blossom energy—natural charm and social magnetism. While this attracts admirers easily, it can also create emotional complexity and indecision. Clear boundaries are essential. `;
            }
            
            if (selectedGender === 'female' && yanNianStars.length > 0) {
                let strongYanNian = yanNianStars.filter(s => s.strength === 'strongest' || s.strength === 'strong');
                if (strongYanNian.length > 0) {
                    summaryText += `<span style="color: #d97706;">⚠️ As a woman with strong Yan Nian (延年)</span>, your leadership energy may intimidate some partners or delay marriage as career takes priority. This isn't a flaw—seek partners who appreciate your strength rather than feel threatened by it. `;
                }
            } else if (selectedGender === 'male' && yanNianStars.length > 0) {
                summaryText += `<span style="color: #059669;">Yan Nian (延年)</span> serves you well in relationships as a man—providing stability and natural leadership in family dynamics. `;
            }
            
            if (tianYiStars.length > 0) {
                summaryText += `<span style="color: #059669;">Tian Yi (天医)</span> suggests partnership can be mutually beneficial—a supportive spouse contributes to both emotional and material wellbeing. `;
            }
            
            if (huoHaiStars.length > 0) {
                summaryText += `<span style="color: #dc2626;">Huo Hai (祸害)</span> indicates communication friction—words cut sharply. Practice pausing before responding and choose battles wisely.`;
            }
            
            if (liuShaStars.length === 0 && tianYiStars.length === 0 && huoHaiStars.length === 0) {
                summaryText += `Relationship energies are balanced without extreme pulls—partnerships develop through mutual effort rather than energetic destiny.`;
            }
            summaryText += `</p>`;
            
            // Health paragraph
            summaryText += `<p style="margin-bottom: 16px;">`;
            summaryText += `<strong style="color: #1f2937;">🏥 Health:</strong> `;
            
            let healthNotes = [];
            if (jueMingStars.length > 0) healthNotes.push(`<span style="color: #dc2626;">Jue Ming</span> suggests monitoring liver, kidney, and urinary systems`);
            if (wuGuiStars.length > 0) healthNotes.push(`<span style="color: #dc2626;">Wu Gui</span> points to blood pressure, heart, and immune considerations`);
            if (huoHaiStars.length > 0) healthNotes.push(`<span style="color: #d97706;">Huo Hai</span> indicates respiratory and lymphatic areas`);
            if (liuShaStars.length > 0) healthNotes.push(`<span style="color: #d97706;">Liu Sha</span> relates to skin, digestion, and emotional wellbeing`);
            if (yanNianStars.length > 0) healthNotes.push(`<span style="color: #059669;">Yan Nian</span> (overwork type) suggests watching for stress, insomnia, and neck/shoulder tension`);
            
            if (healthNotes.length > 0) {
                summaryText += healthNotes.join('; ') + '. ';
            } else {
                summaryText += `No major health indicators detected—maintain general wellness routines. `;
            }
            
            if (tianYiStars.length > 0) {
                summaryText += `<span style="color: #059669;">Tian Yi (天医) provides protective energy</span>—good recuperative ability and favorable medical outcomes when health issues do arise.`;
            }
            summaryText += `</p>`;
            
            // Closing assessment
            summaryText += `<div style="padding: 15px; background: ${lastStar.p === 'good' ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : (lastStar.p === 'bad' ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)')}; border-radius: 10px; margin-top: 8px; border: 1px solid ${lastStar.p === 'good' ? '#10b981' : (lastStar.p === 'bad' ? '#ef4444' : '#d1d5db')};">`;
            summaryText += `<strong style="font-size: 15px;">⚖️ Bottom Line:</strong> `;
            
            if (lastStar.p === 'good') {
                summaryText += `This number concludes with <span style="color: #059669;">${lastStar.n} (${starChinese[lastStar.n]})</span>—a favorable destination. ${badCount > 0 ? 'Challenges along the way lead to positive outcomes.' : 'Clear positive momentum throughout.'} <strong>What you build can last.</strong>`;
            } else if (lastStar.p === 'bad') {
                summaryText += `This number concludes with <span style="color: #dc2626;">${lastStar.n} (${starChinese[lastStar.n]})</span>—requiring strategic navigation. ${goodCount > 0 ? 'Good energy exists mid-journey—protect those gains before the ending.' : 'Extra vigilance needed throughout.'} <strong>Build safeguards early.</strong>`;
            } else {
                summaryText += `This number concludes with <span style="color: #6b7280;">${lastStar.n} (${starChinese[lastStar.n]})</span>—neither dramatic success nor failure. <strong>Trust steady progress over quick wins.</strong>`;
            }
            summaryText += `</div>`;
            
            summaryText += `</div>`; // Close main narrative div

            createNarrativeCard("📊 Executive Summary", summaryText, container);

            // === SECTION 3: WEALTH ANALYSIS ===
            let wealthText = "";
            // Star variables already declared above in Executive Summary
            
            // Check for multiple wealth stars in runs
            let doubleTianYi = consecutiveRuns.find(r => r.star === 'Tian Yi');
            let doubleShengQi = consecutiveRuns.find(r => r.star === 'Sheng Qi');
            let doubleJueMing = consecutiveRuns.find(r => r.star === 'Jue Ming');
            let doubleWuGui = consecutiveRuns.find(r => r.star === 'Wu Gui');

            if (doubleTianYi) {
                let runName = doubleTianYi.count === 2 ? 'Double' : (doubleTianYi.count === 3 ? 'Triple' : `${doubleTianYi.count}x`);
                wealthText += `<div class="insight-box"><strong>🌟 ${runName} Tian Yi (${starChinese['Tian Yi'].repeat(doubleTianYi.count)}) - Exceptional Wealth Configuration</strong><br>`;
                wealthText += `<p>This is one of the most favorable wealth patterns possible. The Heavenly Doctor star appearing ${doubleTianYi.count} times in succession creates a powerful wealth magnet. Financial opportunities multiply, and money comes from multiple legitimate sources. This is the configuration of significant wealth accumulation.</p></div>`;
            }

            if (tianYiStars.length > 0) {
                wealthText += `<p><span class="success">✓ Tian Yi (${starChinese['Tian Yi']}) Present</span><br>`;
                wealthText += `You have ${tianYiStars.length} instance(s) of the primary wealth star:</p><ul style="margin: 5px 0 10px 20px;">`;
                tianYiStars.forEach(s => {
                    let strengthNote = s.strength === 'strongest' ? 'Maximum wealth energy!' : 
                                       (s.strength === 'strong' ? 'Strong wealth influence.' :
                                       (s.strength === 'weak' ? 'Moderate wealth energy—needs activation.' : 'Subtle wealth energy—requires cultivation.'));
                    wealthText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${strengthNote}</li>`;
                });
                wealthText += `</ul>`;
                wealthText += `<p>This indicates money through legitimate channels—salary, investments, business. The energy supports accumulation and smart financial decisions.</p>`;
                
                if (tianYiStars.some(s => s === lastStar)) {
                    let endStrength = lastStar.strength === 'strongest' || lastStar.strength === 'strong' ? 'strongly' : 'moderately';
                    wealthText += `<div class="insight-box"><strong>Key Insight:</strong> Tian Yi (${starChinese['Tian Yi']}) at the ending position is ${endStrength} favorable. It suggests wealth is not only generated but <em>retained</em>. Final outcomes favor financial stability.</div>`;
                }
            }

            if (shengQiStars.length > 0) {
                wealthText += `<p><span class="success">✓ Sheng Qi (${starChinese['Sheng Qi']}) Present</span><br>`;
                wealthText += `Found at:</p><ul style="margin: 5px 0 10px 20px;">`;
                shengQiStars.forEach(s => {
                    let strengthNote = s.strength === 'strongest' ? 'Maximum opportunity energy!' : 
                                       (s.strength === 'strong' ? 'Strong social/career influence.' :
                                       (s.strength === 'weak' ? 'Moderate opportunity—effort needed.' : 'Subtle opportunity energy.'));
                    wealthText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${strengthNote}</li>`;
                });
                wealthText += `</ul>`;
                wealthText += `<p>Wealth through opportunity and connections. This isn't passive income—it's money that comes from being in the right place, knowing the right people, and seizing moments.</p>`;
            }

            if (tianYiStars.length === 0 && shengQiStars.length === 0) {
                wealthText += `<p><span class="neutral-hl">△ No Primary Wealth Stars</span><br>`;
                wealthText += `Neither Tian Yi (${starChinese['Tian Yi']}) nor Sheng Qi (${starChinese['Sheng Qi']}) appear in your sequence. This doesn't indicate poverty, but wealth may require more direct effort and labor rather than flowing naturally through opportunity or investment.</p>`;
            }

            if (jueMingStars.length > 0 || wuGuiStars.length > 0) {
                wealthText += `<div class="warning-box"><strong>Wealth Risk Factors:</strong><br>`;
                if (doubleJueMing) {
                    wealthText += `• <strong>⚠️ DOUBLE Jue Ming (双绝命)</strong> detected! This is the most extreme wealth volatility pattern. Money comes and goes in dramatic swings. One wrong investment could be catastrophic. Only risk what you can afford to lose completely.<br>`;
                } else if (jueMingStars.length > 0) {
                    wealthText += `• <strong>Jue Ming (${starChinese['Jue Ming']})</strong> present:<br>`;
                    jueMingStars.forEach(s => {
                        let severity = s.strength === 'strongest' ? '⚠️ SEVERE' : (s.strength === 'strong' ? '⚠️ High' : (s.strength === 'weak' ? 'Moderate' : 'Mild'));
                        wealthText += `&nbsp;&nbsp;- <span class="flow-ref">${s.displayDigits}</span> <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${severity} wealth leakage risk<br>`;
                    });
                }
                if (doubleWuGui) {
                    wealthText += `• <strong>⚠️ DOUBLE Wu Gui (双五鬼)</strong> detected! Extreme unpredictability with finances. Brilliant schemes may appear but outcomes are chaotic. Avoid all speculation during this influence.`;
                } else if (wuGuiStars.length > 0) {
                    wealthText += `• <strong>Wu Gui (${starChinese['Wu Gui']})</strong> present:<br>`;
                    wuGuiStars.forEach(s => {
                        let severity = s.strength === 'strongest' ? '⚠️ SEVERE' : (s.strength === 'strong' ? '⚠️ High' : (s.strength === 'weak' ? 'Moderate' : 'Mild'));
                        wealthText += `&nbsp;&nbsp;- <span class="flow-ref">${s.displayDigits}</span> <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${severity} unpredictability<br>`;
                    });
                }
                wealthText += `</div>`;
            }

            if (lastStar.n === 'Jue Ming' || lastStar.n === 'Wu Gui') {
                wealthText += `<p><span class="warn">⚠ Critical Ending Warning:</span> Your number ends with ${lastStar.n} (${starChinese[lastStar.n]}), which significantly impacts wealth retention. Even if money is earned mid-sequence, the ending energy suggests difficulty keeping it. Extra financial discipline is required.</p>`;
            }

            createNarrativeCard("💰 Wealth & Financial Outlook", wealthText, container);

            // === SECTION 4: CAREER ===
            let careerText = "";
            // yanNianStars already declared in Executive Summary
            let doubleYanNian = consecutiveRuns.find(r => r.star === 'Yan Nian');
            
            if (doubleYanNian) {
                let runName = doubleYanNian.count === 2 ? 'Double' : (doubleYanNian.count === 3 ? 'Triple' : `${doubleYanNian.count}x`);
                careerText += `<div class="insight-box"><strong>🌟 ${runName} Yan Nian (${starChinese['Yan Nian'].repeat(doubleYanNian.count)}) - Exceptional Leadership Configuration</strong><br>`;
                careerText += `<p>The Longevity star appearing ${doubleYanNian.count} times creates commanding authority. This is the pattern of executives, founders, and those who shape organizations. Your capacity to lead and take responsibility is multiplied. Major career moves are strongly favored.</p></div>`;
            }
            
            if (yanNianStars.length > 0) {
                careerText += `<p><span class="success">✓ Yan Nian (${starChinese['Yan Nian']}) Present</span><br>`;
                careerText += `Leadership star found at:</p><ul style="margin: 5px 0 10px 20px;">`;
                yanNianStars.forEach(s => {
                    let strengthNote = s.strength === 'strongest' ? 'Maximum authority energy!' : 
                                       (s.strength === 'strong' ? 'Strong leadership influence.' :
                                       (s.strength === 'weak' ? 'Moderate leadership—needs development.' : 'Latent leadership potential.'));
                    careerText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${strengthNote}</li>`;
                });
                careerText += `</ul>`;
                careerText += `<p>This is the leadership star. It indicates natural authority, the ability to take charge, and respect from peers and superiors. Career advancement is supported, especially in roles requiring responsibility and long-term commitment.</p>`;
                careerText += `<p><em>${starDescriptions['Yan Nian'].advice}</em></p>`;
            }

            if (shengQiStars.length > 0 && yanNianStars.length === 0) {
                let strongestShengQi = shengQiStars.reduce((a, b) => {
                    let order = ['strongest', 'strong', 'weak', 'weakest'];
                    return order.indexOf(a.strength) < order.indexOf(b.strength) ? a : b;
                });
                careerText += `<p><span class="highlight">◆ Career Through Connection</span><br>`;
                careerText += `With Sheng Qi (${starChinese['Sheng Qi']}) at <span class="tag tag-${strongestShengQi.strength}">${strongestShengQi.strengthCn}</span> but no Yan Nian (${starChinese['Yan Nian']}), your career path favors networking, relationships, and opportunity-driven moves rather than climbing a traditional corporate ladder. Entrepreneurship, sales, and people-centric roles are favored.</p>`;
            }

            if (wuGuiStars.length > 0) {
                let strongestWuGui = wuGuiStars.reduce((a, b) => {
                    let order = ['strongest', 'strong', 'weak', 'weakest'];
                    return order.indexOf(a.strength) < order.indexOf(b.strength) ? a : b;
                });
                careerText += `<p><span class="neutral-hl">◆ Unconventional Path</span><br>`;
                careerText += `Wu Gui (${starChinese['Wu Gui']}) at <span class="tag tag-${strongestWuGui.strength}">${strongestWuGui.strengthCn}</span> suggests a non-traditional career trajectory. ${strongestWuGui.strength === 'strongest' || strongestWuGui.strength === 'strong' ? 'The high intensity means career changes and pivots are likely frequent and dramatic.' : 'The moderate intensity allows for some stability amidst the changes.'} You may change jobs frequently, work in creative or strategic fields, or have unusual working hours. The mind is sharp but stability is elusive.</p>`;
            }

            // fuWeiStars already declared in Executive Summary
            if (fuWeiStars.length > 0 && yanNianStars.length === 0 && shengQiStars.length === 0) {
                careerText += `<p><span class="neutral-hl">◆ Steady, Slow Progress</span><br>`;
                careerText += `Fu Wei (${starChinese['Fu Wei']}) dominates your career energy. Advancement is possible but slow. Patience is required. This favors stable, long-term employment over rapid advancement or entrepreneurial risk.</p>`;
            }

            if (careerText === "") {
                careerText = "<p>No dominant career indicators. Your professional path is largely self-determined, without strong energetic pushes in any particular direction. Focus on deliberate skill-building and strategic positioning.</p>";
            }

            createNarrativeCard("💼 Career & Professional Path", careerText, container);

            // === SECTION 4B: CAREER SUITABILITY ===
            let careerSuitText = "<p><strong>Career Fields Aligned with Your Stars:</strong></p><ul style='margin: 5px 0 15px 20px;'>";
            
            let careerSuggestions = new Set();
            stars.forEach(s => {
                if (s.n === 'Tian Yi') {
                    careerSuggestions.add("Finance, Investment, Healthcare, Consulting");
                }
                if (s.n === 'Sheng Qi') {
                    careerSuggestions.add("Sales, Marketing, PR, Entertainment, Networking businesses");
                }
                if (s.n === 'Yan Nian') {
                    careerSuggestions.add("Management, Executive roles, Professional specialist, Decision-making");
                }
                if (s.n === 'Wu Gui') {
                    careerSuggestions.add("Creative work, Arts, Strategy/Planning, Religious/Spiritual, Police, Trade, Innovation");
                }
                if (s.n === 'Huo Hai') {
                    careerSuggestions.add("Teaching, Public speaking, Law, Food service, Negotiation (以口为业)");
                }
                if (s.n === 'Liu Sha') {
                    careerSuggestions.add("Service industry, Beauty/Cosmetics, Public relations, Women-focused industries");
                }
                if (s.n === 'Jue Ming') {
                    careerSuggestions.add("High-risk investment, Entrepreneurship, Independent ventures (prefers working alone)");
                }
            });
            
            careerSuggestions.forEach(c => {
                careerSuitText += `<li>${c}</li>`;
            });
            careerSuitText += "</ul>";

            createNarrativeCard("🎯 Suitable Career Fields", careerSuitText, container);

            // === SECTION 5: RELATIONSHIPS ===
            let relText = "";
            // liuShaStars and huoHaiStars already declared in Executive Summary
            let doubleLiuSha = consecutiveRuns.find(r => r.star === 'Liu Sha');
            let doubleHuoHai = consecutiveRuns.find(r => r.star === 'Huo Hai');

            // Gender-specific relationship intro
            relText += `<div style="padding: 10px; background: ${selectedGender === 'male' ? '#dbeafe' : '#fce7f3'}; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid ${selectedGender === 'male' ? '#3b82f6' : '#ec4899'};">`;
            relText += `<strong>${selectedGender === 'male' ? '♂ Male Relationship Profile:' : '♀ Female Relationship Profile:'}</strong><br>`;
            if (selectedGender === 'male') {
                relText += `<span style="font-size: 12px;">Men benefit from Yin-energy partners. Look for compatibility with 67/76, 39/93 patterns. Too much Yang (14/41, 19/91) in both partners can create power conflicts.</span>`;
            } else {
                relText += `<span style="font-size: 12px;">Women benefit from Yang-energy partners. Look for compatibility with 14/41, 13/31 patterns. Balance career-focused Yan Nian energy with softer Yin patterns for relationship harmony.</span>`;
            }
            relText += `</div>`;

            // Female + Strong Yan Nian - Detailed Relationship Warning
            if (selectedGender === 'female' && yanNianStars.length > 0) {
                let strongYanNian = yanNianStars.filter(s => s.strength === 'strongest' || s.strength === 'strong');
                if (strongYanNian.length > 0) {
                    relText += `<div class="warning-box"><strong>⚠️ Female + Strong Yan Nian (延年) - Relationship Impact:</strong><br>`;
                    relText += `<p>Your number contains <strong>${strongYanNian.length}</strong> strong Yan Nian pattern(s): `;
                    strongYanNian.forEach((s, i) => {
                        relText += `<span class="flow-ref">${s.displayDigits}</span>${i < strongYanNian.length - 1 ? ', ' : ''}`;
                    });
                    relText += `</p>`;
                    relText += `<p><strong>For women, this strong leadership energy affects relationships:</strong></p>`;
                    relText += `<ul style="margin: 5px 0 10px 20px;">`;
                    relText += `<li><strong>Intimidation factor:</strong> Your strong, independent energy may scare off weaker partners</li>`;
                    relText += `<li><strong>Power struggles:</strong> Two strong personalities often clash—you may need a partner who complements rather than competes</li>`;
                    relText += `<li><strong>Work prioritization:</strong> Career success may come at the cost of relationship time and emotional availability</li>`;
                    relText += `<li><strong>Delayed marriage:</strong> Traditional relationship timelines may not apply—marriage often comes later</li>`;
                    relText += `</ul>`;
                    relText += `<p><strong>Recommendations:</strong></p>`;
                    relText += `<ul style="margin: 5px 0 10px 20px;">`;
                    relText += `<li>Seek partners with complementary Yin energy who appreciate your strength</li>`;
                    relText += `<li>Consciously create space for vulnerability and emotional connection</li>`;
                    relText += `<li>Balance work achievements with relationship investments</li>`;
                    relText += `<li>Consider this pattern a feature, not a bug—the right partner will value your leadership</li>`;
                    relText += `</ul></div>`;
                }
            }

            if (doubleLiuSha) {
                let runName = doubleLiuSha.count === 2 ? 'Double' : (doubleLiuSha.count === 3 ? 'Triple' : `${doubleLiuSha.count}x`);
                relText += `<div class="warning-box"><strong>⚠️ ${runName} Liu Sha (${starChinese['Liu Sha'].repeat(doubleLiuSha.count)}) - Complex Relationship Pattern</strong><br>`;
                relText += `<p>The Peach Blossom star appearing ${doubleLiuSha.count} times creates overwhelming romantic and social complexity. You attract attention from multiple sources, but entanglements multiply. Emotional decision-making is clouded. Maintain strict boundaries and be decisively clear about what you want.</p></div>`;
            }

            if (doubleHuoHai) {
                let runName = doubleHuoHai.count === 2 ? 'Double' : (doubleHuoHai.count === 3 ? 'Triple' : `${doubleHuoHai.count}x`);
                relText += `<div class="warning-box"><strong>⚠️ ${runName} Huo Hai (${starChinese['Huo Hai'].repeat(doubleHuoHai.count)}) - High Conflict Pattern</strong><br>`;
                relText += `<p>The Mishaps star appearing ${doubleHuoHai.count} times intensifies all communication friction. Arguments escalate quickly and words cause lasting damage. This is a period requiring exceptional verbal discipline. Practice silence. Choose peace over being right.</p></div>`;
            }

            if (liuShaStars.length > 0) {
                relText += `<p><span class="highlight">◆ Peach Blossom Energy Active</span><br>`;
                relText += `Liu Sha (${starChinese['Liu Sha']}) present:</p><ul style="margin: 5px 0 10px 20px;">`;
                liuShaStars.forEach(s => {
                    let strengthNote = s.strength === 'strongest' ? 'Maximum charm but also maximum drama!' : 
                                       (s.strength === 'strong' ? 'Strong attraction energy.' :
                                       (s.strength === 'weak' ? 'Moderate social magnetism.' : 'Subtle charm influence.'));
                    relText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${strengthNote}</li>`;
                });
                relText += `</ul>`;
                relText += `<p>Brings strong interpersonal magnetism. You attract attention easily and have natural charm. However, this same energy creates emotional complexity—indecision, entanglements, and the potential for relationship drama.</p>`;
                relText += `<p><em>${starDescriptions['Liu Sha'].advice}</em></p>`;
            }

            if (tianYiStars.length > 0) {
                let strongestTianYi = tianYiStars.reduce((a, b) => {
                    let order = ['strongest', 'strong', 'weak', 'weakest'];
                    return order.indexOf(a.strength) < order.indexOf(b.strength) ? a : b;
                });
                relText += `<p><span class="success">◆ Supportive Partnership Indicator</span><br>`;
                relText += `Tian Yi (${starChinese['Tian Yi']}) at <span class="tag tag-${strongestTianYi.strength}">${strongestTianYi.strengthCn}</span> in relationships suggests finding a partner who is helpful, stable, and supportive. ${strongestTianYi.strength === 'strongest' || strongestTianYi.strength === 'strong' ? 'The strong energy indicates a particularly beneficial partnership.' : 'The partnership benefit is present but may require more cultivation.'} Marriage or long-term partnership can be a source of mutual growth and material benefit.</p>`;
            }

            if (yanNianStars.length > 0 && selectedGender === 'male') {
                let strongestYanNian = yanNianStars.reduce((a, b) => {
                    let order = ['strongest', 'strong', 'weak', 'weakest'];
                    return order.indexOf(a.strength) < order.indexOf(b.strength) ? a : b;
                });
                relText += `<p><span class="success">◆ Leadership in Relationships (Male Advantage)</span><br>`;
                relText += `Yan Nian (${starChinese['Yan Nian']}) at <span class="tag tag-${strongestYanNian.strength}">${strongestYanNian.strengthCn}</span> is generally positive for men in relationships—providing stability, direction, and the ability to lead the family. ${strongestYanNian.strength === 'strongest' || strongestYanNian.strength === 'strong' ? 'Strong Yang leadership energy suits traditional relationship dynamics.' : 'Moderate leadership presence.'}</p>`;
            } else if (yanNianStars.length > 0 && selectedGender === 'female') {
                // Already handled in detailed warning above for strong patterns
                let weakYanNian = yanNianStars.filter(s => s.strength === 'weak' || s.strength === 'weakest');
                if (weakYanNian.length > 0 && weakYanNian.length === yanNianStars.length) {
                    relText += `<p><span class="neutral-hl">◆ Moderate Leadership Energy</span><br>`;
                    relText += `Yan Nian (${starChinese['Yan Nian']}) is present at weaker strength, which provides career drive without overwhelming relationship dynamics. This is a more balanced configuration for women.</p>`;
                }
            }

            if (huoHaiStars.length > 0) {
                relText += `<p><span class="warn">◆ Communication Friction</span><br>`;
                relText += `Huo Hai (${starChinese['Huo Hai']}) present:</p><ul style="margin: 5px 0 10px 20px;">`;
                huoHaiStars.forEach(s => {
                    let severity = s.strength === 'strongest' ? '⚠️ High conflict risk!' : 
                                   (s.strength === 'strong' ? 'Significant friction potential.' :
                                   (s.strength === 'weak' ? 'Moderate disagreements.' : 'Minor irritations.'));
                    relText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span> ${severity}</li>`;
                });
                relText += `</ul>`;
                relText += `<p>Indicates potential for arguments and verbal conflict in relationships. Words cut sharply. Learning to pause before responding and choosing battles wisely is essential.</p>`;
            }

            if (relText === "") {
                relText = "<p>Relationship energies are balanced without strong pulls in any direction. Relationships develop based on mutual effort rather than energetic predisposition.</p>";
            }

            createNarrativeCard("❤️ Relationships & Connections", relText, container);

            // === SECTION 6: HEALTH ANALYSIS ===
            let healthText = "";
            let healthConcerns = [];
            
            // Collect health concerns from all stars
            stars.forEach(s => {
                if (s.n === 'Jue Ming') {
                    healthConcerns.push({
                        star: s.n,
                        strength: s.strength,
                        concerns: "肝肾 (Liver/Kidney), 糖尿病 (Diabetes), 泌尿系统 (Urinary), accident/injury risk",
                        severity: s.strength === 'strongest' || s.strength === 'strong' ? 'high' : 'moderate'
                    });
                }
                if (s.n === 'Wu Gui') {
                    healthConcerns.push({
                        star: s.n,
                        strength: s.strength,
                        concerns: "血液 (Blood), 血压 (Blood pressure), 心脏 (Heart), 脑部 (Brain), 免疫系统 (Immune)",
                        severity: s.strength === 'strongest' || s.strength === 'strong' ? 'high' : 'moderate'
                    });
                }
                if (s.n === 'Huo Hai') {
                    healthConcerns.push({
                        star: s.n,
                        strength: s.strength,
                        concerns: "气管 (Respiratory), 口腔 (Mouth), 淋巴 (Lymph), 身体偏寒 (Cold constitution)",
                        severity: s.strength === 'strongest' || s.strength === 'strong' ? 'high' : 'moderate'
                    });
                }
                if (s.n === 'Liu Sha') {
                    healthConcerns.push({
                        star: s.n,
                        strength: s.strength,
                        concerns: "皮肤 (Skin), 肠胃 (Stomach/Intestines), 情绪忧郁 (Emotional depression)",
                        severity: s.strength === 'strongest' || s.strength === 'strong' ? 'moderate' : 'low'
                    });
                }
                if (s.n === 'Yan Nian') {
                    healthConcerns.push({
                        star: s.n,
                        strength: s.strength,
                        concerns: "脑 (Brain), 精神系统 (Mental), 颈肩 (Neck/Shoulder), 失眠 (Insomnia) - 劳心型 (overwork type)",
                        severity: 'low'
                    });
                }
            });

            // Check for 0 modifier on bad stars (hidden health issues)
            let hiddenHealthRisks = stars.filter(s => s.hasZero && s.p === 'bad');
            
            if (healthConcerns.length > 0) {
                healthText += `<p><strong>Health Areas to Monitor:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
                healthConcerns.forEach(h => {
                    let severityIcon = h.severity === 'high' ? '⚠️' : (h.severity === 'moderate' ? '⚡' : '📋');
                    healthText += `<li>${severityIcon} <strong>${h.star} (${starChinese[h.star]})</strong> at <span class="tag tag-${h.strength}">${h.strength}</span>: ${h.concerns}</li>`;
                });
                healthText += `</ul>`;
            }

            if (hiddenHealthRisks.length > 0) {
                healthText += `<div class="warning-box"><strong>⚠️ Hidden Health Warning (0 Modifier):</strong><br>`;
                healthText += `Stars with 0 modifier can indicate health issues that develop silently and are hard to detect early. Consider regular checkups for:<br>`;
                hiddenHealthRisks.forEach(s => {
                    healthText += `• ${s.n} + 0: ${starDescriptions[s.n].health}<br>`;
                });
                healthText += `</div>`;
            }

            if (tianYiStars.length > 0) {
                healthText += `<div class="insight-box"><strong>✨ Protective Factor:</strong> Tian Yi (天医) is present, which supports health and recovery. This can help offset other health concerns and indicates good recuperative ability.</div>`;
            }

            if (healthText === "") {
                healthText = "<p>No major health indicators detected. General wellness maintenance recommended.</p>";
            }

            createNarrativeCard("🏥 Health Indicators", healthText, container);

            // === SECTION 7: STRATEGIC RECOMMENDATIONS (Final Section) ===
            let stratText = "";
            
            stratText += `<p>Based on the complete flow analysis of <span class="flow-ref">${input}</span>, here are targeted recommendations:</p>`;

            // Ending position analysis (critical)
            stratText += `<div style="padding: 15px; background: ${lastStar.p === 'bad' ? '#fef2f2' : (lastStar.p === 'good' ? '#dbeafe' : '#f8fafc')}; border-radius: 8px; margin-bottom: 15px; border: 1px solid ${lastStar.p === 'bad' ? '#f87171' : (lastStar.p === 'good' ? '#38bdf8' : '#cbd5e1')};">`;
            stratText += `<strong>🏁 Critical: End Result Analysis</strong><br>`;
            stratText += `Your number ends with <strong>${lastStar.n} (${starChinese[lastStar.n]})</strong> at <span class="tag tag-${lastStar.strength}">${lastStar.strengthCn}</span> strength.<br><br>`;
            
            if (lastStar.n === 'Jue Ming') {
                stratText += `<span class="warn">⚠️ 绝命结尾 = 留不住钱 (Jue Ming ending = Cannot keep money)</span><br>`;
                stratText += `This is the most critical warning. Money earned will flow out through impulsive decisions, unexpected events, or losses. Even if you accumulate wealth mid-journey, the ending energy suggests difficulty retaining it. <strong>Recommendation:</strong> Set up automatic savings, avoid impulse purchases, have someone else manage large financial decisions.`;
            } else if (lastStar.n === 'Wu Gui') {
                stratText += `<span class="warn">⚠️ 五鬼结尾 = 不稳定结局 (Wu Gui ending = Unstable outcome)</span><br>`;
                stratText += `Final outcomes are unpredictable. What seems certain can change suddenly. <strong>Recommendation:</strong> Always have backup plans. Don't assume any deal is final until fully completed.`;
            } else if (lastStar.n === 'Tian Yi') {
                stratText += `<span class="success">✨ 天医结尾 = 守财有方 (Tian Yi ending = Wealth preservation)</span><br>`;
                stratText += `Excellent ending! Wealth accumulated is retained. Final outcomes favor financial stability. The journey may have challenges but the destination is prosperous.`;
            } else if (lastStar.n === 'Yan Nian') {
                stratText += `<span class="success">✨ 延年结尾 = 事业有成 (Yan Nian ending = Career success)</span><br>`;
                stratText += `Strong ending for career and achievements. Hard work pays off in the end. Leadership positions are favored.`;
            } else if (lastStar.n === 'Sheng Qi') {
                stratText += `<span class="success">✨ 生气结尾 = 贵人相助 (Sheng Qi ending = Noble helpers)</span><br>`;
                stratText += `Positive ending with support from others. Popularity and opportunities increase over time.`;
            } else if (lastStar.n === 'Fu Wei') {
                stratText += `<span class="success">✨ 伏位结尾 = 稳定持久 (Fu Wei ending = Stable and lasting)</span><br>`;
                stratText += `Good ending with stability and patience. Results may take time but are preserved. Steady foundation for long-term success.`;
            } else if (lastStar.p === 'bad') {
                stratText += `<span class="warn">Challenging ending energy requires extra vigilance in the areas of ${lastStar.d.toLowerCase()}.</span>`;
            } else {
                stratText += `<span class="success">Positive ending provides stability and favorable outcomes.</span>`;
            }
            stratText += `</div>`;

            // Consecutive run priority warnings
            if (consecutiveRuns.length > 0) {
                let badRuns = consecutiveRuns.filter(r => {
                    let star = stars.find(s => s.n === r.star);
                    return star && star.p === 'bad';
                });
                
                if (badRuns.length > 0) {
                    stratText += `<div class="warning-box"><strong>⚠️ Consecutive Star Alert:</strong><br>`;
                    badRuns.forEach(r => {
                        let runName = r.count === 2 ? 'Double' : (r.count === 3 ? 'Triple' : `${r.count}x`);
                        stratText += `Your number contains <strong>${runName} ${r.star} (${starChinese[r.star].repeat(r.count)})</strong>. This compounds challenging energy and requires special attention. ${doubleStarMeanings[r.star].advice}<br>`;
                    });
                    stratText += `</div>`;
                }
                
                let goodRuns = consecutiveRuns.filter(r => {
                    let star = stars.find(s => s.n === r.star);
                    return star && star.p === 'good';
                });
                
                if (goodRuns.length > 0) {
                    stratText += `<div class="insight-box"><strong>🌟 Consecutive Star Advantage:</strong><br>`;
                    goodRuns.forEach(r => {
                        let runName = r.count === 2 ? 'Double' : (r.count === 3 ? 'Triple' : `${r.count}x`);
                        stratText += `Your number contains <strong>${runName} ${r.star} (${starChinese[r.star].repeat(r.count)})</strong>. This amplifies beneficial energy. ${doubleStarMeanings[r.star].advice}<br>`;
                    });
                    stratText += `</div>`;
                }
                
                // Energy transfer recommendations
                let energyTransfers = [];
                for (let run of consecutiveRuns) {
                    if (run.startIndex > 0) {
                        let precedingStar = stars[run.startIndex - 1];
                        if (precedingStar.n !== run.star) {
                            energyTransfers.push({
                                from: precedingStar,
                                toRun: run,
                                type: 'preceding'
                            });
                        }
                    }
                }
                
                if (energyTransfers.length > 0) {
                    stratText += `<div class="insight-box"><strong>🔄 Energy Transfer Insight:</strong><br>`;
                    energyTransfers.forEach(transfer => {
                        if (transfer.type === 'preceding' && transfer.toRun.star === 'Fu Wei' && transfer.from.p === 'bad') {
                            stratText += `The challenging ${transfer.from.n} energy is <em>buffered</em> by consecutive ${transfer.toRun.star}. This is protective—changes happen slowly, giving you time to adapt.<br>`;
                        }
                    });
                    stratText += `</div>`;
                }
            }

            // Leverage strengths
            let goodStars = stars.filter(s => s.p === 'good');
            if (goodStars.length > 0) {
                stratText += `<p><strong>✨ Leverage Your Strengths:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
                goodStars.forEach(s => {
                    stratText += `<li><strong>${s.n} (${starChinese[s.n]})</strong> at ${s.strengthCn}: ${starDescriptions[s.n].advice}</li>`;
                });
                stratText += `</ul>`;
            }
            
            // Navigate challenges
            let badStars = stars.filter(s => s.p === 'bad');
            if (badStars.length > 0) {
                stratText += `<p><strong>⚠️ Navigate These Challenges:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
                badStars.forEach(s => {
                    stratText += `<li><strong>${s.n} (${starChinese[s.n]})</strong> at ${s.strengthCn}: ${starDescriptions[s.n].advice}</li>`;
                });
                stratText += `</ul>`;
            }

            // Add content directly to strategicContainer (already styled)
            document.getElementById('strategicContainer').innerHTML = `<div class="narrative-text">${stratText}</div>`;

            }

        function createNarrativeCard(title, text, container) {
            const card = document.createElement('div');
            card.className = "narrative-card";
            card.innerHTML = `
                <div class="narrative-title">${title}</div>
                <div class="narrative-text">${text}</div>
            `;
            container.appendChild(card);
        }

        function addFlowCard(digits, star, hasZero, hasFive, container) {
            const div = document.createElement('div');
            let borderClass = "border-neutral";
            let textClass = "text-neutral";
            if (star.p === "good") { borderClass = "border-good"; textClass = "text-good"; }
            if (star.p === "bad") { borderClass = "border-bad"; textClass = "text-bad"; }

            let yinyangTag = star.yinyang === 'yang' ? '<span class="tag tag-yang">阳 Yang</span>' : 
                            (star.yinyang === 'yin' ? '<span class="tag tag-yin">阴 Yin</span>' : '');
            
            let tagsHtml = `<span class="tag tag-${star.str}">${star.strCn}</span>${yinyangTag}`;
            if(hasZero) tagsHtml += `<span class="tag tag-hidden">Hidden (0)</span>`;
            if(hasFive) tagsHtml += `<span class="tag tag-boost">Boost (5)</span>`;

            div.className = `flow-card ${borderClass}`;
            div.innerHTML = `
                <div class="flow-left">
                    <span class="flow-digits">${digits}</span>
                    <div class="flow-tags">${tagsHtml}</div>
                </div>
                <div class="flow-right">
                    <div class="flow-name ${textClass}">${star.n}</div>
                    <div class="flow-desc">${star.cn}</div>
                </div>
            `;
            container.appendChild(div);
        }

        function addTailCard(digits, container) {
            addArrow(container);
            const div = document.createElement('div');
            div.className = "flow-card border-neutral";
            div.style.borderLeftStyle = "dashed";
            div.innerHTML = `
                <div class="flow-left">
                    <span class="flow-digits" style="opacity:0.6">...${digits}</span>
                </div>
                <div class="flow-right">
                    <div class="flow-name text-neutral">Modifier Tail</div>
                    <div class="flow-desc">Ends with 0 or 5</div>
                </div>
            `;
            container.appendChild(div);
        }

        function addArrow(container) {
            const arrow = document.createElement('div');
            arrow.className = "standard-arrow";
            arrow.innerHTML = "↓";
            container.appendChild(arrow);
        }

        function addComboArrow(text, container) {
            const arrow = document.createElement('div');
            arrow.className = "combo-arrow";
            arrow.innerHTML = `<span>✨ ${text}</span>`;
            container.appendChild(arrow);
        }
