// Numerology Calculator - Logic File
// Contains only business logic functions

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
}

        function runFullReport() {
            const input = document.getElementById('phoneInput').value.replace(/\D/g, '');
            const results = document.getElementById('results');
            const loadingOverlay = document.getElementById('loadingOverlay');
            const analyzeBtn = document.getElementById('analyzeBtn');
    const copyBtn = document.getElementById('copyBtn');
            
            if (input.length < 2) {
                alert("Please enter a valid number.");
                return;
            }

            // Disable button and show loading spinner
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analyzing...';
            loadingOverlay.classList.add('active');
            copyBtn.classList.add('hidden');
            
            // Run analysis after 1 second to show loading animation
            setTimeout(() => {
                try {
                runFlowAndAnalysis(input);
                    results.classList.remove('hidden');
                } catch (error) {
                    console.error('Analysis error:', error);
                    console.error('Error stack:', error.stack);
                    console.error('Error at:', error.message, error.name);
                    // Show detailed error in console, simple message to user
                    alert(`Error: ${error.message}\n\nCheck browser console (F12) for details.`);
                    // Don't show results if there was an error
                    results.classList.add('hidden');
                } finally {
                    // Always hide loading spinner and re-enable button, even on error
                loadingOverlay.classList.remove('active');
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = 'Analyze';
                    copyBtn.classList.remove('hidden');
                
                    // Only scroll if results are visible
                    if (!results.classList.contains('hidden')) {
                results.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }, 1000); // 1 second animation duration
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
                starScore += (star.p === 'good' ? 2 : -1);
                    } else if (selectedGender === 'female' && star.yinyang === 'yin') {
                        yinyangMatch = true;
                starScore += (star.p === 'good' ? 2 : -1);
                    } else if (selectedGender === 'male' && star.yinyang === 'yin') {
                starScore -= (star.p === 'good' ? 1 : 0);
                    } else if (selectedGender === 'female' && star.yinyang === 'yang') {
                starScore -= (star.p === 'good' ? 1 : 0);
                    }
                    
                    // Special case: Strong Yan Nian (19/91) warning for women
                    let femaleYanNianWarning = false;
                    if (selectedGender === 'female' && star.n === 'Yan Nian' && (star.str === 'strongest' || star.str === 'strong')) {
                        femaleYanNianWarning = true;
                starScore -= 3;
            }
            
            // Track if this is the final outcome (last star)
            // The last star pair is when k === validIndices.length - 2
            let isFinalOutcome = (k === validIndices.length - 2);
            
            // Apply 1.5x weight to final outcome
            if (isFinalOutcome) {
                starScore = Math.round(starScore * 1.5);
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
                adjustedScore: starScore,
                isFinalOutcome: isFinalOutcome
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

    // Build visualization
            let stars = starsFound;
            
            if (stars.length === 0) {
        flowContainer.innerHTML = '<p class="text-neutral" style="text-align:center; padding: 20px;">No valid star patterns found in this number.</p>';
            } else {
        // Divide stars into 3 phases
                let originStars = [];
                let journeyStars = [];
                let outcomeStars = [];
                
                if (stars.length === 1) {
                    originStars = [stars[0]];
                } else if (stars.length === 2) {
                    originStars = [stars[0], stars[1]];
                } else if (stars.length === 3) {
                    originStars = [stars[0], stars[1]];
                    outcomeStars = [stars[2]];
                } else {
                    originStars = [stars[0], stars[1]];
                    journeyStars = stars.slice(2, -1);
                    outcomeStars = [stars[stars.length - 1]];
                }
                
        // Create train visualization with smart arrows
        createTrainVisualization(stars, flowContainer);
        
        // Create phase sections
        flowContainer.appendChild(
            createPhaseSection("1️⃣ Foundation 基础", `Starting Energy (${originStars.length} star${originStars.length > 1 ? 's' : ''})`, "🌅", originStars, "phase-origin")
        );
        
        if (journeyStars.length > 0) {
            flowContainer.appendChild(
                createPhaseSection("2️⃣ The Journey 旅程", `Process & Transitions (${journeyStars.length} phase${journeyStars.length > 1 ? 's' : ''})`, "🛤️", journeyStars, "phase-journey")
            );
        }
        
        if (outcomeStars.length > 0) {
            flowContainer.appendChild(
                createPhaseSection("3️⃣ Final Outcome 结果", "Destination (1.5x Weight)", "🏁", outcomeStars, "phase-outcome")
            );
        }
        
        // Tail digits
        if (tailStr) {
            addTailCard(tailStr, flowContainer);
        }
    }

    // Final score calculation
    if(totalScore > 100) totalScore = 100;
    if(totalScore < 0) totalScore = 0;

    scoreCircle.innerText = totalScore;
    scoreCircle.className = 'score-circle';
    if (totalScore < 40) {
        scoreCircle.classList.add('bad');
    } else if (totalScore < 60) {
        scoreCircle.classList.add('neutral');
    }
    
    // Update gender indicator
    const genderIndicator = document.getElementById('genderIndicator');
    if (selectedGender === 'male') {
        genderIndicator.innerHTML = '♂ Analyzing for Male (阳男)';
        genderIndicator.className = 'gender-indicator male';
    } else {
        genderIndicator.innerHTML = '♀ Analyzing for Female (阴女)';
        genderIndicator.className = 'gender-indicator female';
    }

    // Calculate and render Life Balance Dashboard
    const balanceScores = calculateLifeBalance(starsFound, selectedGender);
    renderLifeBalanceDashboard(balanceScores);

    generateDeepNarrative(input, starsFound, starsFound[starsFound.length - 1], combosFound, totalScore, narrativeContainer);
}

function createTrainVisualization(stars, container) {
                const trainContainer = document.createElement('div');
    trainContainer.className = 'train-container-enhanced';
    
    const trainHeader = document.createElement('div');
    trainHeader.className = 'train-header';
    trainHeader.textContent = 'Number Breakdown';
    
    const trainRow = document.createElement('div');
    trainRow.className = 'train-row';
                
                stars.forEach((star, idx) => {
                    const isDark = star.strength === 'strongest' || star.strength === 'strong';
        const prevSameStar = idx > 0 && stars[idx-1].n === star.n;
        const nextSameStar = idx < stars.length - 1 && stars[idx+1].n === star.n;
        const isElongated = prevSameStar || nextSameStar;
        
        // Create train car
        const car = document.createElement('div');
        car.className = `train-car-enhanced ${star.p} ${isDark ? 'dark' : ''} ${isElongated ? 'elongated' : ''}`;
        
        const digits = document.createElement('div');
        digits.className = 'train-car-digits';
        digits.textContent = star.displayDigits;
        digits.style.color = star.p === 'good' ? (isDark ? '#047857' : '#10b981') : 
                            (star.p === 'bad' ? (isDark ? '#dc2626' : '#f87171') : '#374151');
        
        const starName = document.createElement('div');
        starName.className = 'train-car-star';
        starName.textContent = star.n;
        
        const starChinese = document.createElement('div');
        starChinese.className = 'train-car-chinese';
        starChinese.textContent = star.cn;
        
        car.appendChild(digits);
        car.appendChild(starName);
        car.appendChild(starChinese);
        trainRow.appendChild(car);
        
        // Add smart arrow connector
        if (idx < stars.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'train-arrow';
            
            const prevStar = stars[idx];
            const nextStar = stars[idx + 1];
            
            // Determine arrow color based on transition
            if (prevStar.p === 'bad' && nextStar.p === 'good') {
                arrow.classList.add('good-transition');
            } else if (prevStar.p === 'good' && nextStar.p === 'bad') {
                arrow.classList.add('bad-transition');
                        } else {
                arrow.classList.add('neutral-transition');
            }
            
            arrow.textContent = '→';
            trainRow.appendChild(arrow);
        }
    });
    
    trainContainer.appendChild(trainHeader);
    trainContainer.appendChild(trainRow);
    container.appendChild(trainContainer);
}

function createPhaseSection(title, subtitle, emoji, phaseStars, phaseClass) {
                    const section = document.createElement('div');
                    section.className = `phase-section ${phaseClass}`;
    
    const header = document.createElement('div');
    header.className = 'phase-header';
    
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'phase-emoji';
    emojiDiv.textContent = emoji;
    
    const textDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.className = 'phase-title';
    titleDiv.textContent = title;
    const subtitleDiv = document.createElement('div');
    subtitleDiv.className = 'phase-subtitle';
    subtitleDiv.textContent = subtitle;
    
    textDiv.appendChild(titleDiv);
    textDiv.appendChild(subtitleDiv);
    header.appendChild(emojiDiv);
    header.appendChild(textDiv);
    
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'phase-cards';
    
    phaseStars.forEach((star) => {
        const card = createStarCard(star);
                        cardsContainer.appendChild(card);
                    });
    
    section.appendChild(header);
    section.appendChild(cardsContainer);
                    
                    return section;
                }
                
function createStarCard(star) {
                    const div = document.createElement('div');
                    const isDark = star.strength === 'strongest' || star.strength === 'strong';
    
    div.className = `star-card ${star.p} ${isDark ? 'dark' : ''}`;
    
    const header = document.createElement('div');
    header.className = 'star-card-header';
    
    const name = document.createElement('span');
    name.className = `star-card-name ${star.p} ${isDark ? 'dark' : ''}`;
    name.textContent = star.n;
    
    const chinese = document.createElement('span');
    chinese.className = `star-card-chinese ${star.p} ${isDark ? 'dark' : ''}`;
    chinese.textContent = star.cn;
    
    header.appendChild(name);
    header.appendChild(chinese);
    
    const digitsContainer = document.createElement('div');
    digitsContainer.style.marginBottom = '10px';
    
    const digits = document.createElement('span');
    digits.className = 'star-card-digits';
    digits.textContent = star.displayDigits;
    
    if (star.yinyangMatch) {
        const matchIcon = document.createElement('span');
        matchIcon.className = 'star-card-match-icon';
        matchIcon.textContent = '✓';
        digitsContainer.appendChild(matchIcon);
    }
    
    digitsContainer.insertBefore(digits, digitsContainer.firstChild);
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'star-card-tags';
    
                    const strengthEnglish = {
                        '最强': 'Strongest',
                        '强': 'Strong', 
                        '较弱': 'Weak',
                        '最弱': 'Weakest'
                    };
                    
    const strengthTag = document.createElement('span');
    strengthTag.className = `tag tag-${star.strength}`;
    strengthTag.textContent = `${star.strengthCn} ${strengthEnglish[star.strengthCn] || ''}`;
    tagsContainer.appendChild(strengthTag);
    
    if (star.yinyang === 'yang') {
        const yangTag = document.createElement('span');
        yangTag.className = 'tag tag-yang';
        yangTag.textContent = '阳 Yang';
        tagsContainer.appendChild(yangTag);
    } else if (star.yinyang === 'yin') {
        const yinTag = document.createElement('span');
        yinTag.className = 'tag tag-yin';
        yinTag.textContent = '阴 Yin';
        tagsContainer.appendChild(yinTag);
    }
    
    if (star.hasFive) {
        const fiveTag = document.createElement('span');
        fiveTag.className = 'tag tag-boost';
        fiveTag.textContent = '5';
        tagsContainer.appendChild(fiveTag);
    }
    
    if (star.hasZero) {
        const zeroTag = document.createElement('span');
        zeroTag.className = 'tag tag-hidden';
        zeroTag.textContent = '0';
        tagsContainer.appendChild(zeroTag);
    }
    
    div.appendChild(header);
    div.appendChild(digitsContainer);
    div.appendChild(tagsContainer);
    
                    return div;
                }
                
function getMissingStarsAnalysis(foundStars) {
    const allStarTypes = ['Tian Yi', 'Sheng Qi', 'Yan Nian', 'Fu Wei', 'Wu Gui', 'Huo Hai', 'Liu Sha', 'Jue Ming'];
    const foundStarTypes = new Set(foundStars.map(s => s.n));
    const missingStarTypes = allStarTypes.filter(type => !foundStarTypes.has(type));
    
    return missingStarTypes.map(starType => ({
        star: starType,
        ...missingStarRisks[starType]
    }));
        }

        /**
         * Analyze Sequence - Contextual Chain Analysis Helper
         * Analyzes energy transitions between consecutive star pairs
         * Separation of Concerns: Pure analysis logic, no DOM manipulation
         * 
         * @param {Array} pairs - Array of star objects with their positions
         * @returns {Array} Array of transition analysis objects
         */
        function analyzeSequence(pairs) {
            const transitions = [];
            
            for (let i = 0; i < pairs.length - 1; i++) {
                const currentPair = pairs[i];
                const nextPair = pairs[i + 1];
                const comboKey = currentPair.n + "+" + nextPair.n;
                const comboEffect = comboMap[comboKey];
                
                // Determine transition type
                let transitionType = 'neutral';
                let transitionIntensity = 'moderate';
                
                if (currentPair.p === 'good' && nextPair.p === 'bad') {
                    transitionType = 'drain';
                    transitionIntensity = 'severe';
                } else if (currentPair.p === 'bad' && nextPair.p === 'good') {
                    transitionType = 'redemption';
                    transitionIntensity = 'positive';
                } else if (currentPair.p === 'good' && nextPair.p === 'good') {
                    transitionType = 'amplification';
                    transitionIntensity = 'strong';
                } else if (currentPair.p === 'bad' && nextPair.p === 'bad') {
                    transitionType = 'compounding';
                    transitionIntensity = 'dangerous';
                }
                
                // Check for special modifier patterns (0 or 5)
                let specialNote = null;
                if (currentPair.hasZero && currentPair.p === 'bad') {
                    specialNote = `The 0 modifier in ${currentPair.displayDigits} makes the negative effects of ${currentPair.n} (${starChinese[currentPair.n]}) stronger but hidden—be vigilant.`;
                } else if (currentPair.hasZero && currentPair.p === 'good') {
                    specialNote = `The 0 modifier in ${currentPair.displayDigits} suppresses the benefits of ${currentPair.n} (${starChinese[currentPair.n]})—good luck may not manifest clearly.`;
                } else if (currentPair.hasFive) {
                    specialNote = `The 5 modifier in ${currentPair.displayDigits} amplifies ${currentPair.n} (${starChinese[currentPair.n]}) energy—effects manifest quickly and clearly.`;
                }
                
                transitions.push({
                    from: currentPair,
                    to: nextPair,
                    comboKey: comboKey,
                    comboEffect: comboEffect,
                    transitionType: transitionType,
                    transitionIntensity: transitionIntensity,
                    position: i + 1,
                    specialNote: specialNote
                });
            }
            
            return transitions;
        }

        /**
         * Detect Special Patterns - Looks for significant triplets or special combinations
         * 
         * @param {Array} stars - Array of all star objects
         * @returns {Array} Array of detected special patterns
         */
        function detectSpecialPatterns(stars) {
            const patterns = [];
            
            // Check for triple consecutive patterns
            for (let i = 0; i < stars.length - 2; i++) {
                const triple = stars.slice(i, i + 3);
                
                // Check for "Five Ghosts Carrying Wealth" pattern (Wu Gui -> Tian Yi)
                if (triple[0].n === 'Wu Gui' && triple[1].n === 'Tian Yi') {
                    patterns.push({
                        type: 'special_combo',
                        name: '五鬼带财 (Five Ghosts Carrying Wealth)',
                        description: 'Wu Gui (五鬼) followed by Tian Yi (天医) creates a pattern where unpredictable changes lead to unexpected wealth gains.',
                        stars: triple.slice(0, 2),
                        position: i + 1
                    });
                }
                
                // Check for "Wealth to Loss" pattern (Tian Yi/Sheng Qi -> Jue Ming)
                if ((triple[0].n === 'Tian Yi' || triple[0].n === 'Sheng Qi') && triple[1].n === 'Jue Ming') {
                    patterns.push({
                        type: 'warning',
                        name: '财来财去 (Wealth Comes and Goes)',
                        description: `${triple[0].n} (${starChinese[triple[0].n]}) followed by Jue Ming (绝命) suggests wealth generation but difficulty retaining it.`,
                        stars: triple.slice(0, 2),
                        position: i + 1
                    });
                }
                
                // Check for triple same-star (very powerful)
                if (triple[0].n === triple[1].n && triple[1].n === triple[2].n) {
                    patterns.push({
                        type: 'amplification',
                        name: `Triple ${triple[0].n} (三${starChinese[triple[0].n]})`,
                        description: `Three consecutive ${triple[0].n} (${starChinese[triple[0].n]}) patterns create extreme energy concentration—this is a rare and powerful configuration.`,
                        stars: triple,
                        position: i + 1
                    });
                }
            }
            
            return patterns;
        }

        function generateDeepNarrative(input, stars, lastStar, combos, score, container) {
            container.innerHTML = "";

            if(stars.length === 0) {
                container.innerHTML = "<div class='narrative-text'>Not enough valid digit pairs to generate a complete analysis. Please enter a longer number.</div>";
                return;
            }

            // Perform contextual chain analysis
            const sequenceAnalysis = analyzeSequence(stars);
            const specialPatterns = detectSpecialPatterns(stars);

    // Detect consecutive same-star runs
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

    // Define star type arrays for analysis
            let tianYiStars = stars.filter(s => s.n === 'Tian Yi');
            let shengQiStars = stars.filter(s => s.n === 'Sheng Qi');
            let yanNianStars = stars.filter(s => s.n === 'Yan Nian');
            let jueMingStars = stars.filter(s => s.n === 'Jue Ming');
            let wuGuiStars = stars.filter(s => s.n === 'Wu Gui');
            let liuShaStars = stars.filter(s => s.n === 'Liu Sha');
            let huoHaiStars = stars.filter(s => s.n === 'Huo Hai');
            let fuWeiStars = stars.filter(s => s.n === 'Fu Wei');
            
    // Missing Energy Analysis
    const missingStars = getMissingStarsAnalysis(stars);
    if (missingStars.length > 0) {
        const blindSpotsCard = document.createElement('div');
        blindSpotsCard.className = 'blind-spots-card';
        
        const title = document.createElement('div');
        title.className = 'blind-spots-title';
        title.innerHTML = '🔍 Blind Spots - Missing Energy Analysis';
        blindSpotsCard.appendChild(title);
        
        missingStars.forEach(missing => {
            const item = document.createElement('div');
            item.className = 'blind-spots-item';
            
            const itemTitle = document.createElement('div');
            itemTitle.className = 'blind-spots-item-title';
            itemTitle.textContent = `Missing ${missing.star} (${starChinese[missing.star]})`;
            
            const itemDesc = document.createElement('div');
            itemDesc.className = 'blind-spots-item-desc';
            itemDesc.innerHTML = `<strong>Risk:</strong> ${missing.risk}<br><strong>Description:</strong> ${missing.description}<br><strong>Impact:</strong> ${missing.impact}`;
            
            item.appendChild(itemTitle);
            item.appendChild(itemDesc);
            blindSpotsCard.appendChild(item);
        });
        
        container.appendChild(blindSpotsCard);
    }

    // Special Patterns - styled like Blind Spots but with different color (purple/blue theme)
    if (specialPatterns.length > 0) {
        const specialPatternsCard = document.createElement('div');
        specialPatternsCard.className = 'blind-spots-card';
        specialPatternsCard.style.background = 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)';
        specialPatternsCard.style.borderColor = '#6366f1';
        
        const title = document.createElement('div');
        title.className = 'blind-spots-title';
        title.style.color = '#4338ca';
        title.innerHTML = '🌟 Special Patterns Detected';
        specialPatternsCard.appendChild(title);
        
        specialPatterns.forEach(pattern => {
            const item = document.createElement('div');
            item.className = 'blind-spots-item';
            item.style.borderLeftColor = '#6366f1';
            
            const itemTitle = document.createElement('div');
            itemTitle.className = 'blind-spots-item-title';
            itemTitle.style.color = '#3730a3';
            const icon = pattern.type === 'warning' ? '⚠️' : (pattern.type === 'amplification' ? '✨' : '🔮');
            itemTitle.textContent = `${icon} ${pattern.name}`;
            
            const itemDesc = document.createElement('div');
            itemDesc.className = 'blind-spots-item-desc';
            itemDesc.style.color = '#4338ca';
            const positions = pattern.stars.map(s => s.displayDigits).join(' → ');
            itemDesc.innerHTML = `<strong>Description:</strong> ${pattern.description}<br><strong>Found at:</strong> <code style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 3px; font-family: monospace;">${positions}</code>`;
            
            item.appendChild(itemTitle);
            item.appendChild(itemDesc);
            specialPatternsCard.appendChild(item);
        });
        
        container.appendChild(specialPatternsCard);
    }

    // Define stars for Life Story analysis
    let rootStars = stars.slice(0, Math.min(3, stars.length));
    let journeyStars = stars.length > 3 ? stars.slice(3, -1) : [];
    let fruitStar = stars[stars.length - 1];

    // Your Life Story - Coherent narrative integrating Root, Journey, Fruit + Wealth, Career, Relationships, Health
            let lifeStory = `<div class="narrative-text" style="line-height: 1.8; color: #374151;">`;
            lifeStory += `<p style="font-size: 15px; margin-bottom: 20px;">Based on your complete energy profile, here is your life story:</p>`;
            
            // === FOUNDATION (Root) ===
            let foundationNarrative = "";
            if (rootStars.length > 0) {
                const rootStarCounts = {};
                rootStars.forEach(s => {
                    rootStarCounts[s.n] = (rootStarCounts[s.n] || 0) + 1;
                });
                const dominantRootStar = Object.keys(rootStarCounts).reduce((a, b) => 
                    rootStarCounts[a] > rootStarCounts[b] ? a : b
                );
                
                const rootGoodCount = rootStars.filter(s => s.p === 'good').length;
                const rootBadCount = rootStars.filter(s => s.p === 'bad').length;
                
                foundationNarrative += `Your life's foundation is anchored by <strong>${rootStars.length}</strong> core energy pattern${rootStars.length > 1 ? 's' : ''}, with <strong>${dominantRootStar} (${starChinese[dominantRootStar]})</strong> as the dominant force in your origin. `;
                
                // Foundation transitions
                if (rootStars.length > 1) {
                    const rootTransitions = analyzeSequence(rootStars);
                    if (rootTransitions.length > 0) {
                        foundationNarrative += `The foundational transitions reveal: `;
                        rootTransitions.forEach((trans, idx) => {
                            if (trans.comboEffect) {
                                foundationNarrative += `"${trans.comboEffect}" from <span class="flow-ref">${trans.from.displayDigits}</span> to <span class="flow-ref">${trans.to.displayDigits}</span>`;
                                if (idx < rootTransitions.length - 1) foundationNarrative += `; `;
                            }
                        });
                        foundationNarrative += `. `;
                    }
                }
                
                if (rootGoodCount > rootBadCount) {
                    foundationNarrative += `This auspicious foundation provides a <span class="text-good">strong starting point</span>—your early life and initial opportunities are blessed with favorable energy. `;
                } else if (rootBadCount > rootGoodCount) {
                    foundationNarrative += `This challenging foundation requires <span class="text-bad">resilience from the start</span>—your origins demand strength, but overcoming early obstacles builds character. `;
            } else {
                    foundationNarrative += `This balanced foundation offers <span class="text-neutral">moderate beginnings</span>—neither dramatically favorable nor severely challenging. `;
                }
            }
            
            // === JOURNEY (Process) ===
            let journeyNarrative = "";
            if (journeyStars.length > 0) {
                const journeyTransitions = analyzeSequence([...rootStars.slice(-1), ...journeyStars]);
                const journeyGoodCount = journeyStars.filter(s => s.p === 'good').length;
                const journeyBadCount = journeyStars.filter(s => s.p === 'bad').length;
                
                journeyNarrative += `As you move through life's middle phase, you navigate <strong>${journeyStars.length}</strong> energy transition${journeyStars.length > 1 ? 's' : ''}. `;
                
                if (journeyTransitions.length > 0) {
                    journeyNarrative += `Key transitions include: `;
                    journeyTransitions.forEach((trans, idx) => {
                        if (trans.comboEffect) {
                            journeyNarrative += `"${trans.comboEffect}" at <span class="flow-ref">${trans.from.displayDigits}</span> → <span class="flow-ref">${trans.to.displayDigits}</span>`;
                        } else if (trans.transitionType === 'drain') {
                            journeyNarrative += `energy drain from <strong>${trans.from.n}</strong> to <strong>${trans.to.n}</strong>`;
                        } else if (trans.transitionType === 'redemption') {
                            journeyNarrative += `redemption arc from <strong>${trans.from.n}</strong> challenges to <strong>${trans.to.n}</strong> rewards`;
                        } else if (trans.transitionType === 'amplification') {
                            journeyNarrative += `amplification from <strong>${trans.from.n}</strong> to <strong>${trans.to.n}</strong>`;
                        }
                        if (idx < journeyTransitions.length - 1) journeyNarrative += `; `;
                    });
                    journeyNarrative += `. `;
                }
                
                if (journeyGoodCount > journeyBadCount) {
                    journeyNarrative += `Your journey phase is <span class="text-good">predominantly favorable</span>—you navigate life's challenges with supportive energy. `;
                } else if (journeyBadCount > journeyGoodCount) {
                    journeyNarrative += `Your journey phase contains <span class="text-bad">significant challenges</span>—this is your testing ground where resilience is built. `;
            } else {
                    journeyNarrative += `Your journey phase is <span class="text-neutral">balanced</span>—a mix of opportunities and obstacles. `;
                }
            }
            
            // === OUTCOME (Fruit) ===
            let outcomeNarrative = "";
            outcomeNarrative += `Your number concludes with <strong>${fruitStar.n} (${starChinese[fruitStar.n]})</strong> at <span class="tag tag-${fruitStar.strength}">${fruitStar.strengthCn}</span> strength, represented by <span class="flow-ref">${fruitStar.displayDigits}</span>. `;
            outcomeNarrative += `This final energy pattern carries <strong>1.5x weight</strong> in determining your ultimate outcomes. `;
            
            if (journeyStars.length > 0) {
                const finalTransition = analyzeSequence([journeyStars[journeyStars.length - 1], fruitStar]);
                if (finalTransition.length > 0 && finalTransition[0].comboEffect) {
                    outcomeNarrative += `The final transition "${finalTransition[0].comboEffect}" shapes your destination. `;
                }
            }
            
            if (fruitStar.n === 'Jue Ming') {
                outcomeNarrative += `Critically, your number ends with <strong>Jue Ming (绝命)</strong>—the most extreme star. The principle 绝命结尾 = 留不住钱 (Jue Ming ending = Cannot keep money) applies: even if wealth or success accumulates during your journey, the final outcome energy makes retention difficult. `;
            } else if (fruitStar.n === 'Wu Gui') {
                outcomeNarrative += `Your number ends with <strong>Wu Gui (五鬼)</strong>—unpredictable outcomes. Final results can shift suddenly, requiring backup plans and careful verification of all deals. `;
            } else if (fruitStar.n === 'Tian Yi') {
                outcomeNarrative += `Favorably, your number ends with <strong>Tian Yi (天医)</strong>—excellent for wealth preservation. The principle 天医结尾 = 守财有方 (Tian Yi ending = Wealth preservation) means what you build can last. `;
            } else if (fruitStar.n === 'Yan Nian') {
                outcomeNarrative += `Your number ends with <strong>Yan Nian (延年)</strong>—strong for career success. The principle 延年结尾 = 事业有成 (Yan Nian ending = Career success) indicates hard work pays off in the end. `;
            } else if (fruitStar.p === 'bad') {
                outcomeNarrative += `The <strong>${fruitStar.n} (${starChinese[fruitStar.n]})</strong> ending requires extra vigilance in the areas it governs. `;
            }
            
            // Wealth narrative
            let wealthNarrative = "";
            if (tianYiStars.length > 0) {
                const tianYiCount = tianYiStars.length;
                const strongestTianYi = tianYiStars.find(s => s.strength === 'strongest');
                wealthNarrative += `Your financial path is blessed with <strong>Tian Yi (天医)</strong> energy—the primary wealth star. `;
                if (tianYiCount > 1) {
                    wealthNarrative += `With ${tianYiCount} instances, this creates a powerful wealth magnet. `;
                }
                wealthNarrative += `Money flows through legitimate channels: salary, investments, and business ventures. `;
                if (strongestTianYi) {
                    wealthNarrative += `The presence of strong Tian Yi at <span class="flow-ref">${strongestTianYi.displayDigits}</span> indicates significant wealth accumulation potential. `;
                }
            } else if (shengQiStars.length > 0) {
                wealthNarrative += `Your wealth comes through <strong>Sheng Qi (生气)</strong>—opportunities and connections rather than direct accumulation. `;
                wealthNarrative += `Money arrives when you're in the right place, know the right people, and seize moments. `;
            }

            if (jueMingStars.length > 0 || wuGuiStars.length > 0) {
                wealthNarrative += `However, `;
                if (jueMingStars.length > 0) {
                    wealthNarrative += `<strong>Jue Ming (绝命)</strong> introduces wealth volatility—money may come but retention is challenging. `;
                }
            if (wuGuiStars.length > 0) {
                    wealthNarrative += `<strong>Wu Gui (五鬼)</strong> brings unpredictability to finances. `;
                }
                wealthNarrative += `Extra financial discipline and safeguards are essential. `;
            }
            
            if (lastStar && lastStar.n === 'Jue Ming') {
                wealthNarrative += `Critically, your number ends with <strong>Jue Ming</strong>, meaning 绝命结尾 = 留不住钱 (cannot keep money). `;
                wealthNarrative += `Even if wealth accumulates, the ending energy makes retention difficult—automatic savings and financial advisors are recommended. `;
            } else if (lastStar && lastStar.n === 'Tian Yi') {
                wealthNarrative += `Favorably, your number ends with <strong>Tian Yi</strong>, meaning 天医结尾 = 守财有方 (wealth preservation). `;
                wealthNarrative += `What you build can last. `;
            }
            
            // Career narrative
            let careerNarrative = "";
            if (yanNianStars.length > 0) {
                const yanNianCount = yanNianStars.length;
                const strongestYanNian = yanNianStars.find(s => s.strength === 'strongest');
                careerNarrative += `In your professional life, <strong>Yan Nian (延年)</strong>—the leadership star—dominates. `;
                if (yanNianCount > 1) {
                    careerNarrative += `With ${yanNianCount} instances, this creates commanding authority. `;
                }
                careerNarrative += `You possess natural authority, the ability to take charge, and earn respect from peers and superiors. `;
                if (strongestYanNian) {
                    careerNarrative += `The strong presence at <span class="flow-ref">${strongestYanNian.displayDigits}</span> indicates executive potential. `;
                }
                if (lastStar && lastStar.n === 'Yan Nian') {
                    careerNarrative += `Your number concludes with Yan Nian, meaning 延年结尾 = 事业有成 (career success)—hard work pays off in the end. `;
                }
            } else if (shengQiStars.length > 0) {
                careerNarrative += `Your career thrives through <strong>Sheng Qi (生气)</strong>—social connections and networking. `;
                careerNarrative += `Opportunities open through relationships and being in the right social circles. `;
            }
            
            // Relationships narrative
            let relationshipNarrative = "";
            if (selectedGender === 'male') {
                relationshipNarrative += `As a male, you benefit from Yin-energy partners who complement your Yang-dominant patterns. `;
            } else {
                relationshipNarrative += `As a female, you benefit from Yang-energy partners. `;
            }

            if (selectedGender === 'female' && yanNianStars.length > 0) {
                const strongYanNian = yanNianStars.filter(s => s.strength === 'strongest' || s.strength === 'strong');
                if (strongYanNian.length > 0) {
                    relationshipNarrative += `However, your strong <strong>Yan Nian</strong> leadership energy may intimidate some partners or delay marriage as career takes priority. `;
                    relationshipNarrative += `Seek partners who appreciate your strength. `;
                }
            }
            
            if (tianYiStars.length > 0) {
                relationshipNarrative += `<strong>Tian Yi (天医)</strong> suggests finding a partner who is helpful, stable, and supportive. `;
                relationshipNarrative += `Marriage or long-term partnership can be a source of mutual growth. `;
            }

            if (liuShaStars.length > 0) {
                relationshipNarrative += `<strong>Liu Sha (六煞)</strong> brings strong interpersonal magnetism—you attract attention easily with natural charm. `;
                relationshipNarrative += `However, this same energy creates emotional complexity and potential entanglements. `;
            }

            if (huoHaiStars.length > 0) {
                relationshipNarrative += `<strong>Huo Hai (祸害)</strong> indicates potential for arguments and verbal conflict. `;
                relationshipNarrative += `Learning to pause before responding is essential for relationship harmony. `;
            }
            
            // Health narrative
            let healthNarrative = "";
            const healthConcerns = [];
            if (jueMingStars.length > 0) healthConcerns.push('liver, kidney, and urinary systems');
            if (wuGuiStars.length > 0) healthConcerns.push('blood pressure, heart, and immune system');
            if (huoHaiStars.length > 0) healthConcerns.push('respiratory and lymphatic areas');
            if (liuShaStars.length > 0) healthConcerns.push('skin, digestion, and emotional wellbeing');
            if (yanNianStars.length > 0) healthConcerns.push('stress, insomnia, and neck/shoulder tension from overwork');
            
            if (healthConcerns.length > 0) {
                healthNarrative += `Health-wise, monitor: ${healthConcerns.join('; ')}. `;
            }

            if (tianYiStars.length > 0) {
                healthNarrative += `Protectively, <strong>Tian Yi (天医)</strong> supports health and recovery, which can help offset other health concerns. `;
            }
            
            // Combine into one flowing narrative - like reading a life story in a book
            // All content synthesized into continuous paragraphs without sub-categories
            lifeStory += `<p style="margin-bottom: 20px; line-height: 1.9; text-align: justify;">${foundationNarrative}`;
            if (journeyNarrative) {
                lifeStory += journeyNarrative;
            }
            lifeStory += outcomeNarrative;
            lifeStory += `</p>`;
            
            lifeStory += `<p style="margin-bottom: 20px; line-height: 1.9; text-align: justify;">${wealthNarrative}`;
            if (careerNarrative) {
                lifeStory += careerNarrative;
            }
            lifeStory += relationshipNarrative;
            if (healthNarrative) {
                lifeStory += healthNarrative;
            }
            lifeStory += `</p>`;
            
            lifeStory += `</div>`;
            createNarrativeCard("📖 Your Life Story", lifeStory, container);

    // All Wealth, Career, Relationships, Health information is now integrated into "Your Life Story" above
    
    // Strategic Recommendations - Concise: What numbers to add/remove and why
    let stratText = `<div class="narrative-text">`;
            
            // Calculate change recommendation level
            let changeScore = 0;
            let changeReasons = [];
            
            if (lastStar && lastStar.p === 'bad') {
                changeScore += 40; // Bad ending is critical
                changeReasons.push('Bad ending star (1.5x weight)');
            }
            if (missingStars.length > 0) {
                changeScore += missingStars.length * 10;
                changeReasons.push(`${missingStars.length} missing good star${missingStars.length > 1 ? 's' : ''}`);
            }
            if (jueMingStars.length > 1 || wuGuiStars.length > 1) {
                changeScore += 20;
                changeReasons.push('Multiple problematic stars');
            }
            if (specialPatterns.some(p => p.type === 'warning')) {
                changeScore += 15;
                changeReasons.push('Warning patterns detected');
            }
            
            // Determine recommendation level
            let recommendationLevel, recommendationText, recommendationColor, recommendationBg;
            if (changeScore >= 50) {
                recommendationLevel = 'strongly-suggested';
                recommendationText = 'Strongly Suggested to Change';
                recommendationColor = '#991b1b';
                recommendationBg = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
            } else if (changeScore >= 30) {
                recommendationLevel = 'recommended';
                recommendationText = 'Recommended to Change';
                recommendationColor = '#d97706';
                recommendationBg = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
            } else if (changeScore >= 15) {
                recommendationLevel = 'consider';
                recommendationText = 'Consider Changing';
                recommendationColor = '#ca8a04';
                recommendationBg = 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)';
            } else if (changeScore > 0) {
                recommendationLevel = 'optional';
                recommendationText = 'Optional Improvement';
                recommendationColor = '#65a30d';
                recommendationBg = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
            } else {
                recommendationLevel = 'no-change';
                recommendationText = 'No Change Required';
                recommendationColor = '#059669';
                recommendationBg = 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)';
            }
            
            // Visual gradient scale
            stratText += `<div style="margin-bottom: 25px; padding: 20px; background: ${recommendationBg}; border-radius: 12px; border: 2px solid ${recommendationColor}; text-align: center;">`;
            stratText += `<div style="font-size: 18px; font-weight: 700; color: ${recommendationColor}; margin-bottom: 12px;">${recommendationText}</div>`;
            stratText += `<div style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0; padding: 0 10px;">`;
            stratText += `<span style="font-size: 12px; color: #991b1b; font-weight: 600;">Strongly Suggested</span>`;
            stratText += `<div style="flex: 1; height: 8px; margin: 0 15px; background: linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #eab308 50%, #84cc16 75%, #10b981 100%); border-radius: 4px; position: relative;">`;
            // Position indicator based on changeScore (0-100 scale)
            const indicatorPosition = Math.min(100, Math.max(0, changeScore));
            stratText += `<div style="position: absolute; left: ${indicatorPosition}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: ${recommendationColor}; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2);"></div>`;
            stratText += `</div>`;
            stratText += `<span style="font-size: 12px; color: #059669; font-weight: 600;">No Change</span>`;
            stratText += `</div>`;
            if (changeReasons.length > 0) {
                stratText += `<p style="font-size: 13px; color: #6b7280; margin-top: 10px;">Based on: ${changeReasons.join(', ')}</p>`;
            }
            stratText += `</div>`;
            
            stratText += `<p style="font-size: 15px; margin-bottom: 20px; font-weight: 600; margin-top: 25px;">Numbers to Add or Remove</p>`;

            let numberChanges = [];
            
            // 1. Most Critical: Ending Star Analysis
            if (lastStar && lastStar.p === 'bad') {
                // Suggest replacing bad ending with good ending
                let suggestedEndings = [];
            if (selectedGender === 'male') {
                    suggestedEndings = ['13', '31', '68', '86']; // Yang Tian Yi - best for wealth
            } else {
                    suggestedEndings = ['49', '94', '27', '72']; // Yin Tian Yi - good for wealth
                }
                
                numberChanges.push({
                    priority: 'critical',
                    action: 'Replace ending',
                    current: `${lastStar.displayDigits} (${lastStar.n} ${starChinese[lastStar.n]})`,
                    suggested: suggestedEndings.join(', '),
                    reasoning: `Your number ends with <strong>${lastStar.n} (${starChinese[lastStar.n]})</strong>, which carries 1.5x weight in determining outcomes—making this the most critical position in your entire number. ` +
                        (lastStar.n === 'Jue Ming' ? 
                            `The principle 绝命结尾 = 留不住钱 (Jue Ming ending = Cannot keep money) means that even if you successfully accumulate wealth throughout your journey, the final outcome energy makes retention extremely difficult. Money flows out through impulsive decisions, unexpected events, or losses. ` +
                            `Replacing the ending with <strong>Tian Yi (天医)</strong> pairs like ${suggestedEndings.join(', ')} would create 天医结尾 = 守财有方 (Tian Yi ending = Wealth preservation). ` +
                            `This transformation means that wealth accumulated during your journey can be retained and preserved. The ending star's 1.5x weight would then work in your favor, ensuring long-term financial stability rather than volatility. ` +
                            `This single change addresses the most critical weakness in your number configuration.` :
                        lastStar.n === 'Wu Gui' ?
                            `Wu Gui (五鬼) endings create unpredictable final outcomes where results can shift suddenly. The 1.5x weight amplifies this unpredictability, making it difficult to rely on any outcome until fully completed. ` +
                            `Replacing with <strong>Tian Yi (天医)</strong> pairs like ${suggestedEndings.join(', ')} stabilizes the ending, ensuring predictable and favorable results. ` +
                            `Instead of uncertainty, you gain wealth preservation energy. This change transforms your final outcomes from unpredictable to stable, allowing you to plan long-term with confidence. ` +
                            `The ending position is crucial because it determines how your entire journey's energy culminates.` :
                            `This bad ending star undermines your journey's positive energy. The 1.5x weight means that even positive patterns earlier in your number can be negated by this challenging ending. ` +
                            `Replacing with <strong>Tian Yi (天医)</strong> pairs like ${suggestedEndings.join(', ')} transforms the outcome from challenging to prosperous. ` +
                            `You would gain wealth preservation energy at the most critical position, ensuring that all your efforts and positive energy throughout the journey are protected and retained. ` +
                            `This change maximizes the return on your positive energy patterns by securing them with a favorable ending.`)
                });
            }
            
            // 2. Missing Critical Good Stars
            if (missingStars.length > 0) {
                missingStars.forEach(missing => {
                    let suggestedPairs = [];
                    if (missing.star === 'Tian Yi') {
                        suggestedPairs = selectedGender === 'male' ? ['13', '31', '68', '86'] : ['49', '94', '27', '72'];
                    } else if (missing.star === 'Sheng Qi') {
                        suggestedPairs = selectedGender === 'male' ? ['14', '41', '28', '82'] : ['67', '76', '39', '93'];
                    } else if (missing.star === 'Yan Nian') {
                        suggestedPairs = selectedGender === 'male' ? ['19', '91', '78', '87'] : ['34', '43', '26', '62'];
                    } else if (missing.star === 'Fu Wei') {
                        suggestedPairs = ['11', '22', '88', '99'];
                    }
                    
                    if (suggestedPairs.length > 0) {
                        numberChanges.push({
                            priority: 'high',
                            action: 'Add',
                            current: `Missing ${missing.star} (${starChinese[missing.star]})`,
                            suggested: suggestedPairs.join(', '),
                            reasoning: `Adding <strong>${missing.star} (${starChinese[missing.star]})</strong> pairs like ${suggestedPairs.join(', ')} would introduce ${missing.star === 'Tian Yi' ? 'primary wealth accumulation energy—the most important star for financial success. This energy supports money through legitimate channels like salary, investments, and business ventures' : 
                                missing.star === 'Sheng Qi' ? 'opportunity and networking energy—the star that opens doors through connections and social magnetism. This energy brings opportunities when you\'re in the right place with the right people' :
                                missing.star === 'Yan Nian' ? 'leadership and authority energy—the star that creates natural authority and respect. This energy supports career advancement and taking charge' :
                                'stability and patience energy—the star that provides steady progress and strategic thinking'}. ` +
                                `Currently, ${missing.risk.toLowerCase()}. ` +
                                `${missing.description} ` +
                                `By adding these pairs, you compensate for this gap in your energy profile. ` +
                                `${missing.impact} ` +
                                `The introduction of ${missing.star === 'Tian Yi' ? 'Tian Yi' : missing.star === 'Sheng Qi' ? 'Sheng Qi' : missing.star === 'Yan Nian' ? 'Yan Nian' : 'Fu Wei'} energy would create a more balanced and complete energy configuration, addressing this blind spot in your number.`
                        });
                    }
                });
            }
            
            // 3. Replace problematic patterns in the number
            // Check for problematic bad stars that could be replaced
            const badStarsToReplace = [];
            if (jueMingStars.length > 1) {
                badStarsToReplace.push({star: 'Jue Ming', count: jueMingStars.length, reason: 'Multiple Jue Ming creates extreme volatility'});
            }
            if (wuGuiStars.length > 1) {
                badStarsToReplace.push({star: 'Wu Gui', count: wuGuiStars.length, reason: 'Multiple Wu Gui amplifies unpredictability'});
            }
            
            badStarsToReplace.forEach(problem => {
                let replacementPairs = [];
                if (selectedGender === 'male') {
                    replacementPairs = ['13', '31', '68', '86', '14', '41']; // Tian Yi or Sheng Qi
                } else {
                    replacementPairs = ['49', '94', '27', '72', '67', '76']; // Yin Tian Yi or Sheng Qi
                }
                
                numberChanges.push({
                    priority: 'high',
                    action: 'Replace',
                    current: `${problem.count}x ${problem.star} (${starChinese[problem.star]})`,
                    suggested: replacementPairs.join(', '),
                    reasoning: `Replacing ${problem.count} instances of <strong>${problem.star} (${starChinese[problem.star]})</strong> with <strong>Tian Yi (天医)</strong> or <strong>Sheng Qi (生气)</strong> pairs like ${replacementPairs.join(', ')} would significantly reduce ${problem.reason.toLowerCase()}. ` +
                        `${problem.star === 'Jue Ming' ? 
                            `Multiple Jue Ming (绝命) creates extreme volatility where everything becomes all-or-nothing. This pattern makes financial stability nearly impossible and creates constant risk. ` :
                            `Multiple Wu Gui (五鬼) amplifies unpredictability to dangerous levels, making planning and stability extremely difficult. `}` +
                        `By replacing these with <strong>Tian Yi (天医)</strong> pairs, you gain wealth accumulation and preservation energy. ` +
                        `By replacing with <strong>Sheng Qi (生气)</strong> pairs, you gain opportunity and networking energy that opens doors. ` +
                        `This substitution transforms negative volatility into positive accumulation and opportunity energy. ` +
                        `Instead of energy that drains and creates chaos, you gain energy that builds and creates stability. ` +
                        `The cumulative effect of multiple bad stars is multiplicative—replacing them creates a cascading positive effect throughout your entire number configuration.`
                });
            });
            
            // 4. Special Pattern Mitigation
            specialPatterns.forEach(pattern => {
                if (pattern.type === 'warning' && pattern.name.includes('财来财去')) {
                    // Wealth Comes and Goes pattern - suggest adding Tian Yi after
                    let suggestedPairs = selectedGender === 'male' ? ['13', '31', '68', '86'] : ['49', '94', '27', '72'];
                    numberChanges.push({
                        priority: 'high',
                        action: 'Add after pattern',
                        current: `${pattern.stars[0].displayDigits} → ${pattern.stars[1].displayDigits} (${pattern.name})`,
                        suggested: suggestedPairs.join(', '),
                        reasoning: `The pattern "${pattern.name}" at ${pattern.stars.map(s => s.displayDigits).join(' → ')} creates wealth generation but difficulty retaining it. ` +
                            `This pattern means you have talent for generating wealth or opportunities, but the subsequent energy drains your gains. ` +
                            `Adding <strong>Tian Yi (天医)</strong> pairs like ${suggestedPairs.join(', ')} after this sequence would create a "Wealth → Preserved Steadily" flow (天医结尾 = 守财有方). ` +
                            `Instead of wealth flowing out, the Tian Yi energy would lock in and preserve what you've generated. ` +
                            `This transforms the pattern from "wealth comes and goes" to "wealth comes and stays." ` +
                            `The strategic placement after the wealth generation point ensures that accumulated gains are protected rather than lost. ` +
                            `This single addition can dramatically improve your financial retention while maintaining your wealth generation ability.`
                    });
                }
            });

            // Display recommendations
            if (numberChanges.length > 0) {
                // Sort by priority
                const priorityOrder = {critical: 0, high: 1, medium: 2};
                numberChanges.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                
                numberChanges.forEach((change, idx) => {
                    const priorityColor = change.priority === 'critical' ? '#991b1b' : '#1f2937';
                    const priorityBg = change.priority === 'critical' ? 'rgba(239, 68, 68, 0.1)' : '#f9fafb';
                    const priorityBorder = change.priority === 'critical' ? '#ef4444' : '#e5e7eb';
                    
                    stratText += `<div style="margin-bottom: 20px; padding: 18px; background: ${priorityBg}; border-left: 4px solid ${priorityBorder}; border-radius: 8px;">`;
                    stratText += `<strong style="font-size: 15px; color: ${priorityColor}; display: block; margin-bottom: 12px;">${idx + 1}. ${change.action}: ${change.current}</strong>`;
                    stratText += `<p style="margin-bottom: 10px; color: #374151;"><strong>Add/Use These Numbers:</strong> <code style="background: #f3f4f6; color: #1f2937; padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 13px;">${change.suggested}</code></p>`;
                    stratText += `<p style="color: #6b7280; line-height: 1.8; font-size: 14px; margin-top: 12px;"><strong>Why This Improves Your Life:</strong> ${change.reasoning}</p>`;
                    stratText += `</div>`;
                });
            } else {
                stratText += `<p style="color: #6b7280; font-style: italic;">Your current number configuration is well-balanced. No critical changes recommended.</p>`;
            }
                
            stratText += `</div>`;
    document.getElementById('strategicContainer').innerHTML = stratText;
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

function addTailCard(digits, container) {
            const div = document.createElement('div');
    div.className = "narrative-card";
            div.innerHTML = `
        <div class="narrative-title">Tail Digits</div>
        <div class="narrative-text">
            <span class="flow-ref">...${digits}</span> - Modifier tail (ends with 0 or 5)
                </div>
            `;
            container.appendChild(div);
        }

// Copy Report functionality
function copyReport() {
    const results = document.getElementById('results');
    if (!results || results.classList.contains('hidden')) {
        return;
    }
    
    // Collect all text content from the results section
    let reportText = "NUMEROLOGY ANALYSIS REPORT\n";
    reportText += "=".repeat(50) + "\n\n";
    
    // Score
    const scoreCircle = document.getElementById('scoreCircle');
    if (scoreCircle) {
        reportText += `Energy Profile Score: ${scoreCircle.textContent}\n`;
    }
    
    // Gender
    const genderIndicator = document.getElementById('genderIndicator');
    if (genderIndicator) {
        reportText += `${genderIndicator.textContent}\n\n`;
    }
    
    // Star composition
    const flowContainer = document.getElementById('flowContainer');
    if (flowContainer) {
        reportText += "STAR COMPOSITION:\n";
        reportText += "-".repeat(50) + "\n";
        const trainCars = flowContainer.querySelectorAll('.train-car-enhanced');
        trainCars.forEach((car, idx) => {
            const digits = car.querySelector('.train-car-digits')?.textContent || '';
            const starName = car.querySelector('.train-car-star')?.textContent || '';
            const starChinese = car.querySelector('.train-car-chinese')?.textContent || '';
            reportText += `${idx + 1}. ${digits} - ${starName} (${starChinese})\n`;
        });
        reportText += "\n";
    }
    
    // Narrative sections
    const narrativeContainer = document.getElementById('narrativeContainer');
    if (narrativeContainer) {
        const cards = narrativeContainer.querySelectorAll('.narrative-card, .blind-spots-card');
        cards.forEach(card => {
            const title = card.querySelector('.narrative-title, .blind-spots-title')?.textContent || '';
            const text = card.querySelector('.narrative-text, .blind-spots-item-desc')?.textContent || '';
            if (title && text) {
                reportText += `${title}\n`;
                reportText += "-".repeat(50) + "\n";
                reportText += text.replace(/<[^>]*>/g, '').replace(/\n\s*\n/g, '\n\n') + "\n\n";
            }
        });
    }
    
    // Strategic recommendations
    const strategicContainer = document.getElementById('strategicContainer');
    if (strategicContainer) {
        const text = strategicContainer.textContent || '';
        if (text) {
            reportText += "STRATEGIC RECOMMENDATIONS:\n";
            reportText += "-".repeat(50) + "\n";
            reportText += text.replace(/<[^>]*>/g, '').replace(/\n\s*\n/g, '\n\n') + "\n\n";
        }
    }
    
    reportText += "\n" + "=".repeat(50) + "\n";
    reportText += "Generated by NumeroLogic - Eight Star Magnetic Field Analysis\n";
    
    // Copy to clipboard
    navigator.clipboard.writeText(reportText).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
        copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy report. Please try selecting and copying manually.');
    });
}

/**
 * Calculate Life Balance Scores
 * Separation of Concerns: Pure calculation logic - maps stars to 4 life areas
 * 
 * @param {Array} stars - Array of found star objects
 * @returns {Object} Object with wealth, career, relationships, health scores (0-100)
 */
function calculateLifeBalance(stars, selectedGender) {
    // Base score for each category
    let wealth = 50;
    let career = 50;
    let relationships = 50;
    let health = 50;

    // Strength multipliers - more conservative
    const strengthMultipliers = {
        'strongest': 1.0,
        'strong': 0.75,
        'weak': 0.4,
        'weakest': 0.2
    };

    stars.forEach(star => {
        const multiplier = strengthMultipliers[star.strength] || 0.4;
        // Use a fixed base impact value instead of star.s to avoid double-weighting
        const baseImpact = 10; // Standard impact unit
        const weightedValue = baseImpact * multiplier;

        // Wealth calculation - more conservative multipliers
        if (star.n === 'Tian Yi') {
            wealth += weightedValue * 2.5; // Primary wealth star
        } else if (star.n === 'Sheng Qi') {
            wealth += weightedValue * 1.2; // Wealth through opportunities
        } else if (star.n === 'Yan Nian') {
            wealth += weightedValue * 0.8; // Wealth preservation
        } else if (star.n === 'Fu Wei') {
            wealth += weightedValue * 0.2; // Slow accumulation
        } else if (star.n === 'Jue Ming') {
            wealth -= weightedValue * 2.5; // Severe wealth volatility
        } else if (star.n === 'Wu Gui') {
            wealth -= weightedValue * 1.5; // Unpredictable wealth
        } else if (star.n === 'Huo Hai') {
            wealth -= weightedValue * 0.3; // Minor negative
        } else if (star.n === 'Liu Sha') {
            wealth -= weightedValue * 0.5; // Emotional spending
        }

        // Career calculation - more conservative multipliers
        if (star.n === 'Yan Nian') {
            career += weightedValue * 2.2; // Strong leadership
        } else if (star.n === 'Sheng Qi') {
            career += weightedValue * 1.8; // Career through connections
        } else if (star.n === 'Tian Yi') {
            career += weightedValue * 1.3; // Career in finance/healthcare
        } else if (star.n === 'Fu Wei') {
            career += weightedValue * 0.3; // Steady but slow
        } else if (star.n === 'Huo Hai') {
            career += weightedValue * 0.6; // Good for speaking careers
        } else if (star.n === 'Liu Sha') {
            career += weightedValue * 0.4; // Good for service industry
        } else if (star.n === 'Wu Gui') {
            career -= weightedValue * 1.0; // Unconventional, unstable
        } else if (star.n === 'Jue Ming') {
            career -= weightedValue * 0.6; // High-risk career
        }

        // Relationships calculation
        // Note: Liu Sha brings charm but also emotional complexity and drama - net negative
        // Wu Gui causes unstable relationships, affairs, love triangles - strongly negative
        if (star.n === 'Tian Yi') {
            relationships += weightedValue * 1.8; // Supportive partnership, good marriage
        } else if (star.n === 'Sheng Qi') {
            relationships += weightedValue * 0.9; // Popularity, attracts people
        } else if (star.n === 'Yan Nian') {
            // Gender-dependent: positive for men, negative for women
            if (selectedGender === 'male') {
                relationships += weightedValue * 0.6; // Leadership helps men
            } else {
                relationships -= weightedValue * 1.2; // Strong Yan Nian hurts women's relationships
            }
        } else if (star.n === 'Fu Wei') {
            relationships += weightedValue * 0.2; // Stable but slow
        } else if (star.n === 'Liu Sha') {
            // Complex: brings charm but also emotional drama, entanglements, indecision
            // Net effect is negative due to complications
            relationships -= weightedValue * 0.6; // Emotional complexity hurts relationships
        } else if (star.n === 'Huo Hai') {
            relationships -= weightedValue * 1.8; // Communication conflicts, arguments
        } else if (star.n === 'Jue Ming') {
            relationships -= weightedValue * 2.2; // Relationship instability, breakups, high divorce rate
        } else if (star.n === 'Wu Gui') {
            relationships -= weightedValue * 1.5; // Unstable relationships, affairs, love triangles
        }

        // Health calculation - more conservative multipliers
        if (star.n === 'Tian Yi') {
            health += weightedValue * 2.2; // Strong health protection
        } else if (star.n === 'Sheng Qi') {
            health += weightedValue * 0.6; // Good vitality
        } else if (star.n === 'Yan Nian') {
            health += weightedValue * 0.2; // Health but overwork risk
        } else if (star.n === 'Fu Wei') {
            health += weightedValue * 0.3; // Stable health
        } else if (star.n === 'Jue Ming') {
            health -= weightedValue * 2.5; // Severe: liver/kidney, diabetes, urinary, accident risk
        } else if (star.n === 'Wu Gui') {
            health -= weightedValue * 1.8; // Blood pressure, heart, brain, immune system
        } else if (star.n === 'Huo Hai') {
            health -= weightedValue * 1.5; // Respiratory, breathing, mouth, lymph
        } else if (star.n === 'Liu Sha') {
            health -= weightedValue * 0.8; // Skin, stomach/intestines, emotional depression
        }
    });

    // Normalize scores to 0-100 range
    wealth = Math.max(0, Math.min(100, Math.round(wealth)));
    career = Math.max(0, Math.min(100, Math.round(career)));
    relationships = Math.max(0, Math.min(100, Math.round(relationships)));
    health = Math.max(0, Math.min(100, Math.round(health)));

    return { wealth, career, relationships, health };
}

/**
 * Render Life Balance Dashboard
 * Separation of Concerns: Pure UI logic - displays calculated scores
 * 
 * @param {Object} scores - Object with wealth, career, relationships, health scores
 */
function renderLifeBalanceDashboard(scores) {
    const categories = ['wealth', 'career', 'relationships', 'health'];
    
    categories.forEach(category => {
        const score = scores[category];
        const fillBar = document.getElementById(`${category}-bar`)?.querySelector('.balance-fill');
        const percentageEl = document.getElementById(`${category}-percentage`);
        
        if (fillBar && percentageEl) {
            // Animate the fill bar
            setTimeout(() => {
                fillBar.style.width = `${score}%`;
                percentageEl.textContent = `${score}%`;
            }, 100);
        }
    });
}

// Initialize copy button event listener
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyReport);
    }
});
