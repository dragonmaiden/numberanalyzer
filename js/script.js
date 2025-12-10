// Numerology Calculator - Logic File
// Contains only business logic functions

        // Gender state
        let selectedGender = 'male';
        
        function setGender(gender) {
            selectedGender = gender;
            document.getElementById('maleBtn').classList.toggle('active', gender === 'male');
            document.getElementById('femaleBtn').classList.toggle('active', gender === 'female');
            
            if (gender === 'male') {
                document.getElementById('genderInfo').textContent = 'Yang patterns (14/41, 13/31, 68/86, 79/97) provide stronger benefits';
            } else {
                document.getElementById('genderInfo').textContent = 'Yin patterns (39/93, 67/76, 24/42, 18/81) provide stronger benefits';
            }
}

        // Validation function
        function validateInputs() {
            const birthDay = document.getElementById('birthDay').value;
            const birthMonth = document.getElementById('birthMonth').value;
            const birthYear = document.getElementById('birthYear').value;
            const gender = selectedGender;
            
            if (!birthDay || !birthMonth || !birthYear) {
                alert('Please select your complete birthdate for personalized analysis');
                return false;
            }
            if (!gender) {
                alert('Please select your gender');
                return false;
            }
            return true;
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
            
            if (!validateInputs()) {
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

        // Get birthdate inputs
        function getBirthdateInputs() {
            const birthDay = parseInt(document.getElementById('birthDay').value);
            const birthMonth = parseInt(document.getElementById('birthMonth').value);
            const birthYear = parseInt(document.getElementById('birthYear').value);
            const gender = selectedGender;
            return { birthDay, birthMonth, birthYear, gender };
        }

        // Calculate digit compatibility with Ming Gua
        function calculateDigitCompatibility(phoneNumber, favorableDigits, unfavorableDigits) {
            const digits = phoneNumber.replace(/\D/g, '').split('').map(Number);
            let favorableCount = 0;
            let unfavorableCount = 0;
            
            digits.forEach(digit => {
                if (favorableDigits.includes(digit)) favorableCount++;
                if (unfavorableDigits.includes(digit)) unfavorableCount++;
            });
            
            const totalDigits = digits.length;
            const favorablePercent = Math.round((favorableCount / totalDigits) * 100);
            const unfavorablePercent = Math.round((unfavorableCount / totalDigits) * 100);
            
            let rating;
            if (favorablePercent >= 60) rating = "excellent";
            else if (favorablePercent >= 45) rating = "good";
            else if (favorablePercent >= 30) rating = "moderate";
            else rating = "poor";
            
            return {
                favorableCount,
                unfavorableCount,
                totalDigits,
                favorablePercent,
                unfavorablePercent,
                rating
            };
        }

        // Generate Ming Gua opening for life story
        function getMingGuaOpening(guaInfo, digitCompatibility) {
            const groupAdvice = guaInfo.group === 'east' 
                ? "As an East Group (东四命) person, numbers rich in 1, 3, 4, and 9 resonate with your energy."
                : "As a West Group (西四命) person, numbers rich in 2, 6, 7, and 8 resonate with your energy.";
            
            let compatibilityNote;
            if (digitCompatibility.rating === 'excellent') {
                compatibilityNote = "This number is highly compatible with your personal energy - it amplifies your natural strengths.";
            } else if (digitCompatibility.rating === 'good') {
                compatibilityNote = "This number works well with your energy profile and supports your endeavors.";
            } else if (digitCompatibility.rating === 'moderate') {
                compatibilityNote = "This number has mixed energy for you - the star patterns matter more than usual.";
            } else {
                compatibilityNote = "This number's digits don't naturally align with your energy - pay close attention to the star patterns.";
            }
            
            return `Your 命卦 is ${guaInfo.name} (${guaInfo.elementEn} element), making you a ${guaInfo.personality}. ${groupAdvice} ${compatibilityNote}`;
        }

        // Generate Ming Gua section HTML
        function generateMingGuaSection(mingGua, guaInfo, digitCompatibility) {
            function getCompatibilityLabel(rating) {
                const labels = {
                    excellent: "✨ Excellent - This number strongly aligns with your 命卦",
                    good: "✅ Good - This number is compatible with your energy",
                    moderate: "⚠️ Moderate - Mixed compatibility, some adjustments may help",
                    poor: "❌ Poor - This number conflicts with your 命卦 energy"
                };
                return labels[rating] || rating;
            }

            return `
                <div class="narrative-card" style="margin-bottom: 25px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9;">
                    <div class="narrative-title" style="color: #0c4a6e; font-size: 20px; margin-bottom: 15px;">🧒 Your Personal Profile (命卦 Ming Gua)</div>
                    <div class="narrative-text" style="line-height: 1.8;">
                        <p style="margin-bottom: 10px; font-size: 18px;"><strong>${guaInfo.symbol || ''} 命卦 (Ming Gua):</strong> ${guaInfo.name} (${guaInfo.nameEn}) (${mingGua})</p>
                        <p style="margin-bottom: 10px;"><strong>Group (组别):</strong> ${guaInfo.groupCn} (${guaInfo.group === 'east' ? 'East Group' : 'West Group'})</p>
                        <p style="margin-bottom: 10px;"><strong>Element (五行):</strong> ${guaInfo.element} (${guaInfo.elementEn})</p>
                        <p style="margin-bottom: 10px;"><strong>Type (类型):</strong> ${guaInfo.traits || guaInfo.personality}${guaInfo.traitsEn ? ` (${guaInfo.traitsEn})` : ''}</p>
                        
                        ${guaInfo.strengths ? `
                        <p style="margin-bottom: 8px;"><strong>Strengths (优势):</strong> ${guaInfo.strengths.map((s, i) => `${s}${guaInfo.strengthsEn && guaInfo.strengthsEn[i] ? ` (${guaInfo.strengthsEn[i]})` : ''}`).join('、')}</p>
                        ` : ''}
                        
                        ${guaInfo.weaknesses ? `
                        <p style="margin-bottom: 15px;"><strong>Weaknesses (劣势):</strong> ${guaInfo.weaknesses.map((w, i) => `${w}${guaInfo.weaknessesEn && guaInfo.weaknessesEn[i] ? ` (${guaInfo.weaknessesEn[i]})` : ''}`).join('、')}</p>
                        ` : ''}
                        
                        <p style="margin-bottom: 10px;"><strong>Favorable Digits (吉数):</strong> ${guaInfo.favorable.join(', ')}</p>
                        <p style="margin-bottom: 15px;"><strong>Unfavorable Digits (凶数):</strong> ${guaInfo.unfavorable.join(', ')}</p>
                        
                        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #bae6fd;">
                            <h4 style="color: #0c4a6e; font-size: 16px; margin-bottom: 10px;">📊 Number Compatibility with Your 命卦 (Ming Gua)</h4>
                            <p style="margin-bottom: 8px;"><strong>Favorable digits in your number (吉数占比):</strong> ${digitCompatibility.favorableCount}/${digitCompatibility.totalDigits} (${digitCompatibility.favorablePercent}%)</p>
                            <p style="margin-bottom: 8px;"><strong>Unfavorable digits in your number (凶数占比):</strong> ${digitCompatibility.unfavorableCount}/${digitCompatibility.totalDigits} (${digitCompatibility.unfavorablePercent}%)</p>
                            <p style="margin-bottom: 0;"><strong>Compatibility Rating (匹配度):</strong> ${getCompatibilityLabel(digitCompatibility.rating)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Calculate overall score with digit compatibility
        function calculateOverallScore(starScore, digitCompatibility) {
            // Weight: 70% star analysis, 30% digit compatibility
            const compatibilityBonus = {
                excellent: 15,
                good: 8,
                moderate: 0,
                poor: -10
            };
            
            const bonus = compatibilityBonus[digitCompatibility.rating] || 0;
            const adjustedScore = Math.min(100, Math.max(0, starScore + bonus));
            
            return adjustedScore;
        }

        function runFlowAndAnalysis(input) {
            const flowContainer = document.getElementById('flowContainer');
            const narrativeContainer = document.getElementById('narrativeContainer');
            const strategicContainer = document.getElementById('strategicContainer');
            const scoreCircle = document.getElementById('scoreCircle');
            
            flowContainer.innerHTML = '';
            strategicContainer.innerHTML = '';
            narrativeContainer.innerHTML = '';
            
            // Get birthdate and calculate Ming Gua
            const { birthDay, birthMonth, birthYear, gender } = getBirthdateInputs();
            const mingGua = mingGuaSystem.calculate(birthYear, birthMonth, birthDay, gender);
            const guaInfo = mingGuaSystem.guaDetails[mingGua];
            const favorableDigits = guaInfo.favorable;
            const unfavorableDigits = guaInfo.unfavorable;
            
            // Calculate digit compatibility
            const digitCompatibility = calculateDigitCompatibility(input, favorableDigits, unfavorableDigits);
            
            // Add Ming Gua section to narrative container (BEFORE other content)
            narrativeContainer.innerHTML = generateMingGuaSection(mingGua, guaInfo, digitCompatibility);
            
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

    // Final score calculation with digit compatibility adjustment
    if(totalScore > 100) totalScore = 100;
    if(totalScore < 0) totalScore = 0;
    
    // Adjust score based on digit compatibility
    const adjustedScore = calculateOverallScore(totalScore, digitCompatibility);

    scoreCircle.innerText = adjustedScore;
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

    // Enhanced analysis with new knowledge base
    const zeroAnalysis = analyzeZeroEffects(input, starsFound);
    const triplePatterns = detectTriplePatterns(starsFound);
    const healthRisks = analyzeHealthRisks(starsFound);
    const fiveElementAnalysis = analyzeFiveElements(input);
    const numberFortune81 = calculate81Fortune(input);
    const positionAnalysis = analyzePositionWeights(starsFound, input.length);

    generateDeepNarrative(input, starsFound, starsFound[starsFound.length - 1], combosFound, adjustedScore, narrativeContainer, {
        zeroAnalysis,
        triplePatterns,
        healthRisks,
        fiveElementAnalysis,
        numberFortune81,
        positionAnalysis,
        mingGuaOpening: getMingGuaOpening(guaInfo, digitCompatibility),
        guaInfo: guaInfo,
        digitCompatibility: digitCompatibility
    });
    
    // Update the report link with person's details
    updateReportLink(input, selectedGender, adjustedScore, starsFound);
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
        // Enhanced Zero Effects Analysis
        function analyzeZeroEffects(input, stars) {
            const zeroAnalysis = {
                zerosFound: [],
                effects: [],
                warnings: []
            };
            
            // Find all zero positions
            for (let i = 0; i < input.length; i++) {
                if (input[i] === '0') {
                    let position = 'middle';
                    if (i === 0) position = 'beginning';
                    else if (i === input.length - 1) position = 'end';
                    
                    zeroAnalysis.zerosFound.push({
                        index: i,
                        position: position,
                        rule: zeroRules[position]
                    });
                    
                    // Check if zero affects a star pair
                    stars.forEach(star => {
                        if (star.hasZero) {
                            const effect = zeroStarEffects[star.n];
                            if (effect) {
                                zeroAnalysis.effects.push({
                                    star: star.n,
                                    position: position,
                                    effect: effect.effect,
                                    principle: effect.principle
                                });
                                
                                if (star.p === 'good') {
                                    zeroAnalysis.warnings.push({
                                        star: star.n,
                                        message: `0入吉星，由吉变凶 - ${star.n} (${starChinese[star.n]}) energy is weakened by zero`
                                    });
            } else {
                                    zeroAnalysis.warnings.push({
                                        star: star.n,
                                        message: `0入凶星，凶上加凶 - ${star.n} (${starChinese[star.n]}) negative effects are amplified`
                                    });
                                }
                            }
                        }
                    });
                }
            }
            
            return zeroAnalysis;
        }
        
        // Enhanced Triple Pattern Detection (三连星)
        function detectTriplePatterns(stars) {
            const patterns = [];
            
            // Check for dangerous chains (大凶组合)
            for (let i = 0; i < stars.length - 1; i++) {
                const pair = [stars[i], stars[i + 1]];
                const comboKey = `${pair[0].n}+${pair[1].n}`;
                
                if (dangerousChains[comboKey]) {
                    const danger = dangerousChains[comboKey];
                    // Create proper description with English and Chinese
                    let description = '';
                    if (comboKey === 'Fu Wei+Wu Gui') {
                        description = 'Fu Wei (伏位) followed by Wu Gui (五鬼) creates a pattern where stillness and waiting suddenly transforms into unpredictable disruption and instability. This combination can lead to unexpected changes and strange illnesses (怪病).';
                    } else {
                        description = `${pair[0].n} (${starChinese[pair[0].n]}) followed by ${pair[1].n} (${starChinese[pair[1].n]}) creates a dangerous energy pattern. ${danger.healthWarning || ''}`;
                    }
                    
                    patterns.push({
                        type: 'danger',
                        name: `${comboKey} (${starChinese[pair[0].n]}+${starChinese[pair[1].n]})`,
                        riskLevel: danger.riskLevel,
                        healthWarning: danger.healthWarning,
                        description: description,
                        stars: pair,
                        position: i + 1
                    });
                }
            }
            
            // Check for rescue formulas (化解规律)
            for (let i = 0; i < stars.length - 2; i++) {
                const triple = stars.slice(i, i + 3);
                const firstStar = triple[0].n;
                
                if (rescueFormulas[firstStar]) {
                    const rescue = rescueFormulas[firstStar];
                    if (triple[1].n === rescue.solution || 
                        (Array.isArray(rescue.solution) && rescue.solution.includes(triple[1].n))) {
                        patterns.push({
                            type: 'rescue',
                            name: `${firstStar} + ${rescue.solution}`,
                            description: rescue.description,
                            stars: triple.slice(0, 2),
                            position: i + 1
                        });
                    }
                }
            }
            
            // Check for beneficial chains (连吉但需平衡)
            for (let i = 0; i < stars.length - 1; i++) {
                const pair = [stars[i], stars[i + 1]];
                const comboKey = `${pair[0].n}+${pair[1].n}`;
                
                if (beneficialChains[comboKey]) {
                    const benefit = beneficialChains[comboKey];
                    patterns.push({
                        type: 'beneficial',
                        name: comboKey,
                        effect: benefit.effect,
                        warning: benefit.warning,
                        stars: pair,
                        position: i + 1
                    });
                }
            }
            
            // Check for triple same-star (very powerful)
            for (let i = 0; i < stars.length - 2; i++) {
                const triple = stars.slice(i, i + 3);
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
        
        // Health Risk Analysis
        function analyzeHealthRisks(stars) {
            const healthRisks = [];
            const riskMap = {};
            
            stars.forEach(star => {
                const health = healthCorrelations[star.n];
                if (health) {
                    if (!riskMap[star.n]) {
                        riskMap[star.n] = {
                            star: star.n,
                            count: 0,
                            bodySystems: health.bodySystems,
                            conditions: health.conditions,
                            warningCombos: health.warningCombos,
                            positions: []
                        };
                    }
                    riskMap[star.n].count++;
                    riskMap[star.n].positions.push(star.displayDigits);
                }
            });
            
            // Convert to array and prioritize high-risk stars
            Object.values(riskMap).forEach(risk => {
                if (risk.star === 'Jue Ming' || risk.star === 'Wu Gui' || risk.star === 'Huo Hai') {
                    healthRisks.push({
                        ...risk,
                        priority: 'high'
                    });
            } else {
                    healthRisks.push({
                        ...risk,
                        priority: 'moderate'
                    });
                }
            });
            
            return healthRisks.sort((a, b) => {
                const priorityOrder = { high: 0, moderate: 1 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        }
        
        // Five Element Cycle Analysis
        function analyzeFiveElements(input) {
            const analysis = {
                elements: [],
                generatingPairs: [],
                controllingPairs: [],
                summary: {}
            };
            
            // Extract digits and map to elements
            for (let i = 0; i < input.length; i++) {
                const digit = parseInt(input[i]);
                if (!isNaN(digit) && fiveElements.digits[digit]) {
                    analysis.elements.push({
                        digit: digit,
                        ...fiveElements.digits[digit]
                    });
                }
            }

            // Check for generating cycle pairs (相生)
            for (let i = 0; i < analysis.elements.length - 1; i++) {
                const elem1 = analysis.elements[i].element;
                const elem2 = analysis.elements[i + 1].element;
                
                // Simplified check: if elements follow generating cycle
                if (elem1.includes('水') && elem2.includes('木')) {
                    analysis.generatingPairs.push(`${analysis.elements[i].digit}→${analysis.elements[i + 1].digit}`);
                } else if (elem1.includes('木') && elem2.includes('火')) {
                    analysis.generatingPairs.push(`${analysis.elements[i].digit}→${analysis.elements[i + 1].digit}`);
                } else if (elem1.includes('火') && elem2.includes('土')) {
                    analysis.generatingPairs.push(`${analysis.elements[i].digit}→${analysis.elements[i + 1].digit}`);
                } else if (elem1.includes('土') && elem2.includes('金')) {
                    analysis.generatingPairs.push(`${analysis.elements[i].digit}→${analysis.elements[i + 1].digit}`);
                } else if (elem1.includes('金') && elem2.includes('水')) {
                    analysis.generatingPairs.push(`${analysis.elements[i].digit}→${analysis.elements[i + 1].digit}`);
                }
            }
            
            analysis.summary = {
                totalElements: analysis.elements.length,
                generatingCount: analysis.generatingPairs.length,
                interpretation: analysis.generatingPairs.length > 0 ? 
                    "More 相生 in number = better interpersonal relationships" : 
                    "Limited generating cycle pairs - relationships may require more effort"
            };
            
            return analysis;
        }
        
        // 81 Number Fortune Table Calculation
        function calculate81Fortune(input) {
            const last4 = input.slice(-4);
            const last8 = input.length >= 8 ? input.slice(-8) : input;
            
            const result4 = numberFortune81.calculate(last4);
            const result8 = numberFortune81.calculate(last8);
            
            return {
                last4: result4,
                last8: result8,
                interpretation: `Last 4 digits: ${result4.category} (${result4.num}), Last 8 digits: ${result8.category} (${result8.num})`
            };
        }
        
        // Position Weighting Analysis
        function analyzePositionWeights(stars, totalLength) {
            const analysis = {
                tail: null,
                lastFour: [],
                middle: [],
                firstFour: [],
                weightedScore: 0
            };
            
            stars.forEach((star, idx) => {
                const position = idx + 1;
                const isLast = idx === stars.length - 1;
                const isLastFour = position > stars.length - 4;
                const isFirstFour = position <= 4;
                
                if (isLast) {
                    analysis.tail = {
                        star: star,
                        weight: positionWeights.tail.weight,
                        description: positionWeights.tail.description
                    };
                } else if (isLastFour) {
                    analysis.lastFour.push({
                        star: star,
                        weight: positionWeights.lastFour.weight
                    });
                } else if (isFirstFour) {
                    analysis.firstFour.push({
                        star: star,
                        weight: positionWeights.firstFour.weight
                    });
            } else {
                    analysis.middle.push({
                        star: star,
                        weight: positionWeights.middle.weight
                    });
                }
            });
            
            return analysis;
        }
        
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

        // Synthesis Helper Functions - Use data structures to generate rich insights
        function synthesizeStarInsight(starName, count, strength, context = 'general') {
            const desc = starDescriptions[starName];
            if (!desc) return '';
            
            let insight = '';
            if (count > 1 && doubleStarMeanings[starName]) {
                const double = doubleStarMeanings[starName];
                insight += `${double.name}: ${double.effect}. `;
                if (context === 'recommendation') {
                    insight += double.advice + ' ';
                }
            } else {
                insight += `${desc.full} (${starChinese[starName]}): ${desc.meaning} `;
            }
            
            if (context === 'wealth' && desc.career) {
                insight += `In financial matters, ${desc.advice.toLowerCase()} `;
            } else if (context === 'career' && desc.career) {
                insight += `Career-wise: ${desc.career}. `;
            } else if (context === 'relationships' && desc.love) {
                insight += `In relationships: ${desc.love}. `;
            } else if (context === 'health' && desc.health) {
                insight += `Health: ${desc.health}. `;
            }
            
            return insight;
        }
        
        function synthesizeComboInsight(fromStar, toStar, comboEffect) {
            if (!comboEffect) return '';
            return `${comboEffect}. This transition from <strong>${fromStar} (${starChinese[fromStar]})</strong> to <strong>${toStar} (${starChinese[toStar]})</strong> creates a specific energy flow pattern. `;
        }
        
        function synthesizeHealthInsight(starName, count) {
            const health = healthCorrelations[starName];
            if (!health) return '';
            
            let insight = `<strong>${starName} (${starChinese[starName]})</strong> affects: ${health.bodySystems.join(', ')}. `;
            if (count > 1) {
                insight += `With ${count} instances, these health considerations are amplified. `;
            }
            insight += `Monitor for: ${health.conditions.join(', ')}. `;
            if (health.warningCombos && health.warningCombos.length > 0) {
                insight += `Warning: ${health.warningCombos.join('; ')}. `;
            }
            return insight;
        }
        
        function synthesizeMissingStarInsight(missingStar) {
            const missing = missingStarRisks[missingStar];
            if (!missing) return '';
            
            const desc = starDescriptions[missingStar];
            return `The absence of <strong>${missingStar} (${starChinese[missingStar]})</strong> creates a gap: ${missing.description} ${desc ? `Without ${desc.full}, you lack ${desc.strengths.toLowerCase()}. ` : ''}${missing.impact} `;
        }

        // Synthesis Helper Functions - Use data structures to generate rich insights
        function synthesizeStarInsight(starName, count, strength, context = 'general') {
            const desc = starDescriptions[starName];
            if (!desc) return '';
            
            let insight = '';
            if (count > 1 && doubleStarMeanings[starName]) {
                const double = doubleStarMeanings[starName];
                insight += `${double.name}: ${double.effect}. `;
                if (context === 'recommendation') {
                    insight += double.advice + ' ';
                }
            } else {
                insight += `${desc.full} (${starChinese[starName]}): ${desc.meaning} `;
            }
            
            if (context === 'wealth' && desc.career) {
                insight += `In financial matters, ${desc.advice.toLowerCase()} `;
            } else if (context === 'career' && desc.career) {
                insight += `Career-wise: ${desc.career}. `;
            } else if (context === 'relationships' && desc.love) {
                insight += `In relationships: ${desc.love}. `;
            } else if (context === 'health' && desc.health) {
                insight += `Health: ${desc.health}. `;
            }
            
            return insight;
        }
        
        function synthesizeComboInsight(fromStar, toStar, comboEffect) {
            if (!comboEffect) return '';
            return `${comboEffect}. This transition from <strong>${fromStar} (${starChinese[fromStar]})</strong> to <strong>${toStar} (${starChinese[toStar]})</strong> creates a specific energy flow pattern. `;
        }
        
        function synthesizeHealthInsight(starName, count) {
            const health = healthCorrelations[starName];
            if (!health) return '';
            
            let insight = `<strong>${starName} (${starChinese[starName]})</strong> affects: ${health.bodySystems.join(', ')}. `;
            if (count > 1) {
                insight += `With ${count} instances, these health considerations are amplified. `;
            }
            insight += `Monitor for: ${health.conditions.join(', ')}. `;
            if (health.warningCombos && health.warningCombos.length > 0) {
                insight += `Warning: ${health.warningCombos.join('; ')}. `;
            }
            return insight;
        }
        
        function synthesizeMissingStarInsight(missingStar) {
            const missing = missingStarRisks[missingStar];
            if (!missing) return '';
            
            const desc = starDescriptions[missingStar];
            return `The absence of <strong>${missingStar} (${starChinese[missingStar]})</strong> creates a gap: ${missing.description} ${desc ? `Without ${desc.full}, you lack ${desc.strengths.toLowerCase()}. ` : ''}${missing.impact} `;
        }

        function generateDeepNarrative(input, stars, lastStar, combos, score, container, enhancedData = {}) {
            // Note: Don't clear container.innerHTML here because Ming Gua section is already added at the start
            // We'll append new content instead
            
            // Extract enhanced analysis data
            const { zeroAnalysis, triplePatterns, healthRisks, fiveElementAnalysis, numberFortune81, positionAnalysis, mingGuaOpening, guaInfo, digitCompatibility } = enhancedData;

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

    // Enhanced Special Patterns - includes dangerous chains, rescue formulas, beneficial chains
    const allSpecialPatterns = [...specialPatterns];
    if (triplePatterns && triplePatterns.length > 0) {
        allSpecialPatterns.push(...triplePatterns);
    }
    
    if (allSpecialPatterns.length > 0) {
        const specialPatternsCard = document.createElement('div');
        specialPatternsCard.className = 'blind-spots-card';
        specialPatternsCard.style.background = 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)';
        specialPatternsCard.style.borderColor = '#6366f1';
        
        const title = document.createElement('div');
        title.className = 'blind-spots-title';
        title.style.color = '#4338ca';
        title.innerHTML = '🌟 Special Patterns Detected';
        specialPatternsCard.appendChild(title);
        
        allSpecialPatterns.forEach(pattern => {
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

    // Helper function to check for rescue formulas
    function checkRescueFormulas(stars) {
        for (let i = 0; i < stars.length - 1; i++) {
            const current = stars[i];
            const next = stars[i + 1];
            
            // Check rescue formulas
            if (current.n === 'Jue Ming' && next.n === 'Tian Yi') return true;
            if (current.n === 'Liu Sha' && next.n === 'Yan Nian') return true;
            if (current.n === 'Huo Hai' && (next.n === 'Sheng Qi' || next.n === 'Yan Nian' || next.n === 'Fu Wei')) return true;
            if (current.n === 'Wu Gui' && (next.n === 'Sheng Qi' || next.n === 'Tian Yi' || next.n === 'Yan Nian')) return true;
        }
        return false;
    }
    
    // Helper function to check for dangerous chains
    function checkDangerousChains(stars) {
        const dangerousChainsFound = [];
        for (let i = 0; i < stars.length - 1; i++) {
            const comboKey = `${stars[i].n}+${stars[i + 1].n}`;
            if (dangerousChains[comboKey]) {
                dangerousChainsFound.push({
                    combo: comboKey,
                    stars: [stars[i], stars[i + 1]],
                    ...dangerousChains[comboKey]
                });
            }
        }
        return dangerousChainsFound;
    }
    
    // Enhanced Analysis Insights for Life Story
    let enhancedInsights = [];
    
    // Zero effects insights - enhanced to show amplification
    if (zeroAnalysis && zeroAnalysis.warnings && zeroAnalysis.warnings.length > 0) {
        const zeroWarnings = zeroAnalysis.warnings.filter(w => {
            // Only show if zero is adjacent to inauspicious stars
            return w.message.includes('凶上加凶') || w.message.includes('由吉变凶');
        });
        if (zeroWarnings.length > 0) {
            enhancedInsights.push({
                type: 'zero',
                text: `<span class="text-bad" style="font-weight: 600;">⚠️ Zero Amplification: ${zeroWarnings.map(w => w.message).join('; ')}</span> The principle "0入吉星，由吉变凶；0入凶星，凶上加凶" (Zero entering auspicious stars turns them negative; zero entering inauspicious stars makes them worse) applies here.`
            });
        }
    }
    
    // Dangerous chains detection
    const dangerousChainsFound = checkDangerousChains(stars);
    if (dangerousChainsFound.length > 0) {
        dangerousChainsFound.forEach(chain => {
            enhancedInsights.push({
                type: 'danger',
                text: `<span class="text-bad" style="font-weight: 600;">🚨 Dangerous Chain Detected: ${chain.combo}</span> Risk Level: ${chain.riskLevel}. Health Warning: ${chain.healthWarning}. Found at <code class="flow-ref">${chain.stars[0].displayDigits}</code> → <code class="flow-ref">${chain.stars[1].displayDigits}</code>`
            });
        });
    }
    
    // Health risk insights
    if (healthRisks && healthRisks.length > 0) {
        const highRisk = healthRisks.filter(r => r.priority === 'high');
        if (highRisk.length > 0) {
            enhancedInsights.push({
                type: 'health',
                text: `Health considerations: ${highRisk.map(r => `${r.star} (${starChinese[r.star]}) - ${r.bodySystems.join(', ')}`).join('; ')}. Pay attention to ${highRisk.map(r => r.conditions.join(', ')).join('; ')}.`
            });
        }
    }
    
    // Position weighting insights
    if (positionAnalysis && positionAnalysis.tail) {
        enhancedInsights.push({
            type: 'position',
            text: `The ending star ${positionAnalysis.tail.star.n} (${starChinese[positionAnalysis.tail.star.n]}) carries ${(positionAnalysis.tail.weight * 100).toFixed(0)}% weight in determining final outcomes—this is the most critical position.`
        });
    }
    
    // 81数理 insights
    if (numberFortune81) {
        enhancedInsights.push({
            type: 'fortune81',
            text: `81数理吉凶表 analysis: ${numberFortune81.interpretation}. This provides overall fortune assessment alongside the detailed 八星磁场 analysis.`
        });
    }

    // Define stars for Life Story analysis
    let rootStars = stars.slice(0, Math.min(3, stars.length));
    let journeyStars = stars.length > 3 ? stars.slice(3, -1) : [];
    let fruitStar = stars[stars.length - 1];

    // Your Life Story - Coherent narrative integrating Root, Journey, Fruit + Wealth, Career, Relationships, Health
            let lifeStory = `<div class="narrative-text" style="line-height: 1.8; color: #374151;">`;
            
            // Add Ming Gua opening if provided
            if (mingGuaOpening) {
                lifeStory += `<p style="margin-bottom: 15px; font-weight: 600; color: #0c4a6e;">${mingGuaOpening}</p>`;
            }
            
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
                const firstStar = rootStars[0]; // Critical: Check the FIRST star's polarity
                
                // Check Ming Gua compatibility with foundation digits
                let mingGuaFoundationNote = '';
                if (guaInfo && digitCompatibility) {
                    const rootDigits = rootStars.map(s => s.digits).join('');
                    const rootFavorableCount = rootDigits.split('').filter(d => guaInfo.favorable.includes(parseInt(d))).length;
                    const rootUnfavorableCount = rootDigits.split('').filter(d => guaInfo.unfavorable.includes(parseInt(d))).length;
                    
                    if (rootFavorableCount > rootUnfavorableCount) {
                        mingGuaFoundationNote = ` Notably, your foundation digits align well with your ${guaInfo.nameEn} (${guaInfo.name}) energy—this early compatibility supports your natural strengths.`;
                    } else if (rootUnfavorableCount > rootFavorableCount) {
                        const conflictingDigits = guaInfo.unfavorable.filter(d => rootDigits.includes(d.toString()));
                        if (conflictingDigits.length > 0) {
                            mingGuaFoundationNote = ` However, your foundation contains several digits (${conflictingDigits.join(', ')}) that conflict with your ${guaInfo.nameEn} (${guaInfo.name}) energy—this creates additional challenges from the start.`;
                        }
                    }
                }
                
                foundationNarrative += `Your life's foundation is anchored by <strong>${rootStars.length}</strong> core energy pattern${rootStars.length > 1 ? 's' : ''}, with <strong>${dominantRootStar} (${starChinese[dominantRootStar]})</strong> as the dominant force in your origin.${mingGuaFoundationNote} `;
                
                // Foundation transitions - using comboMap
                if (rootStars.length > 1) {
                    const rootTransitions = analyzeSequence(rootStars);
                    if (rootTransitions.length > 0) {
                        foundationNarrative += `The foundational transitions reveal: `;
                        rootTransitions.forEach((trans, idx) => {
                            if (trans.comboEffect) {
                                foundationNarrative += synthesizeComboInsight(trans.from.n, trans.to.n, trans.comboEffect);
                                foundationNarrative += `Found at <span class="flow-ref">${trans.from.displayDigits}</span> → <span class="flow-ref">${trans.to.displayDigits}</span>`;
                                if (idx < rootTransitions.length - 1) foundationNarrative += `; `;
                            }
                        });
                        foundationNarrative += `. `;
                    }
                }
                
                // Fix: Check the first star's polarity first (most critical)
                if (firstStar && firstStar.p === 'bad') {
                    foundationNarrative += `This challenging foundation requires <span class="text-bad">resilience from the start</span>—your origins begin with <strong>${firstStar.n} (${starChinese[firstStar.n]})</strong> at <span class="flow-ref">${firstStar.displayDigits}</span>, an inauspicious star (凶星), demanding strength from the beginning. Overcoming early obstacles builds character. `;
                } else if (rootGoodCount > rootBadCount) {
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
                
                // Check Ming Gua compatibility with journey digits
                const { guaInfo: mgInfo, digitCompatibility: mgCompat } = enhancedData;
                let mingGuaJourneyNote = '';
                if (mgInfo && mgCompat) {
                    const journeyDigits = journeyStars.map(s => s.digits).join('');
                    const journeyFavorableCount = journeyDigits.split('').filter(d => mgInfo.favorable.includes(parseInt(d))).length;
                    const journeyUnfavorableCount = journeyDigits.split('').filter(d => mgInfo.unfavorable.includes(parseInt(d))).length;
                    
                    if (journeyFavorableCount > journeyUnfavorableCount && mgCompat.rating !== 'poor') {
                        mingGuaJourneyNote = ` The journey phase digits resonate with your ${mgInfo.nameEn} (${mgInfo.name}) energy, amplifying positive transitions.`;
                    } else if (journeyUnfavorableCount > journeyFavorableCount) {
                        mingGuaJourneyNote = ` The journey phase contains conflicting digits that challenge your ${mgInfo.nameEn} (${mgInfo.name}) nature, requiring extra resilience.`;
                    }
                }
                
                journeyNarrative += `As you move through life's middle phase, you navigate <strong>${journeyStars.length}</strong> energy transition${journeyStars.length > 1 ? 's' : ''}.${mingGuaJourneyNote} `;
                
                if (journeyTransitions.length > 0) {
                    journeyNarrative += `Key transitions include: `;
                    journeyTransitions.forEach((trans, idx) => {
                        if (trans.comboEffect) {
                            journeyNarrative += synthesizeComboInsight(trans.from.n, trans.to.n, trans.comboEffect);
                            journeyNarrative += `Found at <span class="flow-ref">${trans.from.displayDigits}</span> → <span class="flow-ref">${trans.to.displayDigits}</span>`;
                        } else if (trans.transitionType === 'drain') {
                            const comboKey = `${trans.from.n}+${trans.to.n}`;
                            const comboEffect = comboMap[comboKey];
                            if (comboEffect) {
                                journeyNarrative += synthesizeComboInsight(trans.from.n, trans.to.n, comboEffect);
                            } else {
                                journeyNarrative += `energy drain from <strong>${trans.from.n}</strong> to <strong>${trans.to.n}</strong>`;
                            }
                        } else if (trans.transitionType === 'redemption') {
                            const comboKey = `${trans.from.n}+${trans.to.n}`;
                            const comboEffect = comboMap[comboKey];
                            if (comboEffect) {
                                journeyNarrative += synthesizeComboInsight(trans.from.n, trans.to.n, comboEffect);
                            } else {
                                journeyNarrative += `redemption arc from <strong>${trans.from.n}</strong> challenges to <strong>${trans.to.n}</strong> rewards`;
                            }
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
            
            // Check Ming Gua compatibility with outcome digits
            if (guaInfo && digitCompatibility) {
                const outcomeDigits = fruitStar.digits;
                const outcomeFavorableCount = outcomeDigits.split('').filter(d => guaInfo.favorable.includes(parseInt(d))).length;
                const outcomeUnfavorableCount = outcomeDigits.split('').filter(d => guaInfo.unfavorable.includes(parseInt(d))).length;
                
                if (outcomeFavorableCount > outcomeUnfavorableCount && digitCompatibility.rating !== 'poor') {
                    outcomeNarrative += `The ending digits align with your ${guaInfo.nameEn} (${guaInfo.name}) energy, which supports favorable final outcomes. `;
                } else if (outcomeUnfavorableCount > outcomeFavorableCount) {
                    outcomeNarrative += `The ending digits conflict with your ${guaInfo.nameEn} (${guaInfo.name}) energy, adding complexity to final results. `;
                }
            }
            
            if (journeyStars.length > 0) {
                const finalTransition = analyzeSequence([journeyStars[journeyStars.length - 1], fruitStar]);
                if (finalTransition.length > 0 && finalTransition[0].comboEffect) {
                    outcomeNarrative += synthesizeComboInsight(finalTransition[0].from.n, finalTransition[0].to.n, finalTransition[0].comboEffect);
                    outcomeNarrative += `This final transition shapes your destination. `;
                }
            }
            
            // Use starDescriptions for outcome insights
            const fruitDesc = starDescriptions[fruitStar.n];
            
            // Critical warning: Inauspicious tail (尾号凶星)
            if (fruitStar.p === 'bad') {
                outcomeNarrative += `<span class="text-bad" style="font-weight: 700; color: #dc2626;">🚨 CRITICAL WARNING: 尾号凶星 (Inauspicious Tail Ending)</span> `;
                outcomeNarrative += `Your number ends with <strong>${fruitStar.n} (${starChinese[fruitStar.n]})</strong>—an inauspicious star. This is an absolute avoidance according to traditional principles. `;
                outcomeNarrative += `The ending carries 1.5x weight, meaning final outcomes will be negatively influenced. `;
                
                if (fruitStar.n === 'Jue Ming') {
                    outcomeNarrative += `The principle 绝命结尾 = 留不住钱 (Jue Ming ending = Cannot keep money) applies: even if wealth or success accumulates during your journey, the final outcome energy makes retention difficult. `;
                } else if (fruitStar.n === 'Wu Gui') {
                    outcomeNarrative += `${fruitDesc.meaning.toLowerCase()}. Final results can shift suddenly, requiring backup plans and careful verification of all deals. `;
            } else {
                    outcomeNarrative += `${fruitDesc ? fruitDesc.meaning.toLowerCase() : 'This requires extra vigilance'} in the areas it governs. `;
                }
            } else if (fruitStar.n === 'Tian Yi') {
                outcomeNarrative += `Favorably, your number ends with <strong>Tian Yi (天医)</strong>—${fruitDesc.meaning.toLowerCase()}. The principle 天医结尾 = 守财有方 (Tian Yi ending = Wealth preservation) means what you build can last. `;
            } else if (fruitStar.n === 'Yan Nian') {
                outcomeNarrative += `Your number ends with <strong>Yan Nian (延年)</strong>—${fruitDesc.meaning.toLowerCase()}. The principle 延年结尾 = 事业有成 (Yan Nian ending = Career success) indicates hard work pays off in the end. `;
            } else if (fruitDesc) {
                outcomeNarrative += `Your number concludes with <strong>${fruitStar.n} (${starChinese[fruitStar.n]})</strong>—${fruitDesc.meaning.toLowerCase()}. `;
            }
            
            // Check for rescue formulas (化解)
            const hasRescueFormula = checkRescueFormulas(stars);
            if (!hasRescueFormula && fruitStar.p === 'bad') {
                outcomeNarrative += `<span class="text-bad" style="font-weight: 600;">⚠️ No rescue formula (化解) present: The inauspicious tail has no neutralization, making the negative effects more pronounced.</span> `;
            }
            
            // Wealth narrative - using synthesis functions
            let wealthNarrative = "";
            if (tianYiStars.length > 0) {
                const tianYiCount = tianYiStars.length;
                const strongestTianYi = tianYiStars.find(s => s.strength === 'strongest');
                wealthNarrative += synthesizeStarInsight('Tian Yi', tianYiCount, strongestTianYi?.strength, 'wealth');
                if (strongestTianYi) {
                    wealthNarrative += `The presence of strong Tian Yi at <span class="flow-ref">${strongestTianYi.displayDigits}</span> indicates significant wealth accumulation potential. `;
                }
            } else if (shengQiStars.length > 0) {
                wealthNarrative += synthesizeStarInsight('Sheng Qi', shengQiStars.length, null, 'wealth');
                wealthNarrative += `Money arrives when you're in the right place, know the right people, and seize moments. `;
            }

            if (jueMingStars.length > 0 || wuGuiStars.length > 0) {
                wealthNarrative += `However, `;
                if (jueMingStars.length > 0) {
                    const jueMingDesc = starDescriptions['Jue Ming'];
                    wealthNarrative += `<strong>Jue Ming (绝命)</strong> introduces wealth volatility—${jueMingDesc.meaning.toLowerCase()} `;
                }
            if (wuGuiStars.length > 0) {
                    const wuGuiDesc = starDescriptions['Wu Gui'];
                    wealthNarrative += `<strong>Wu Gui (五鬼)</strong> brings unpredictability: ${wuGuiDesc.meaning.toLowerCase()} `;
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
            
            // Career narrative - using synthesis functions
            let careerNarrative = "";
            if (yanNianStars.length > 0) {
                const yanNianCount = yanNianStars.length;
                const strongestYanNian = yanNianStars.find(s => s.strength === 'strongest');
                careerNarrative += synthesizeStarInsight('Yan Nian', yanNianCount, strongestYanNian?.strength, 'career');
                if (strongestYanNian) {
                    careerNarrative += `The strong presence at <span class="flow-ref">${strongestYanNian.displayDigits}</span> indicates executive potential. `;
                }
                if (lastStar && lastStar.n === 'Yan Nian') {
                    careerNarrative += `Your number concludes with Yan Nian, meaning 延年结尾 = 事业有成 (career success)—hard work pays off in the end. `;
                }
            } else if (shengQiStars.length > 0) {
                careerNarrative += synthesizeStarInsight('Sheng Qi', shengQiStars.length, null, 'career');
                careerNarrative += `Opportunities open through relationships and being in the right social circles. `;
            }
            
            // Relationships narrative - using synthesis functions
            let relationshipNarrative = "";
            if (selectedGender === 'male') {
                relationshipNarrative += `As a male, you benefit from Yin-energy partners who complement your Yang-dominant patterns. `;
            } else {
                relationshipNarrative += `As a female, you benefit from Yang-energy partners. `;
            }

            if (selectedGender === 'female' && yanNianStars.length > 0) {
                const strongYanNian = yanNianStars.filter(s => s.strength === 'strongest' || s.strength === 'strong');
                if (strongYanNian.length > 0) {
                    const yanNianDesc = starDescriptions['Yan Nian'];
                    relationshipNarrative += `However, your strong <strong>Yan Nian</strong> leadership energy may intimidate some partners or delay marriage as career takes priority. `;
                    relationshipNarrative += `Seek partners who appreciate your strength. `;
                }
            }
            
            if (tianYiStars.length > 0) {
                relationshipNarrative += synthesizeStarInsight('Tian Yi', tianYiStars.length, null, 'relationships');
            }

            if (liuShaStars.length > 0) {
                relationshipNarrative += synthesizeStarInsight('Liu Sha', liuShaStars.length, null, 'relationships');
            }

            if (huoHaiStars.length > 0) {
                relationshipNarrative += synthesizeStarInsight('Huo Hai', huoHaiStars.length, null, 'relationships');
            }
            
            // Health narrative - using synthesis functions and healthCorrelations
            let healthNarrative = "";
            const healthInsights = [];
            
            if (jueMingStars.length > 0) {
                healthInsights.push(synthesizeHealthInsight('Jue Ming', jueMingStars.length, jueMingStars, stars));
            }
            if (wuGuiStars.length > 0) {
                healthInsights.push(synthesizeHealthInsight('Wu Gui', wuGuiStars.length, wuGuiStars, stars));
            }
            if (huoHaiStars.length > 0) {
                healthInsights.push(synthesizeHealthInsight('Huo Hai', huoHaiStars.length, huoHaiStars, stars));
            }
            if (liuShaStars.length > 0) {
                healthInsights.push(synthesizeHealthInsight('Liu Sha', liuShaStars.length, liuShaStars, stars));
            }
            if (yanNianStars.length > 0) {
                healthInsights.push(synthesizeHealthInsight('Yan Nian', yanNianStars.length, yanNianStars, stars));
            }
            
            if (healthInsights.length > 0) {
                healthNarrative += `Health-wise: ${healthInsights.join(' ')}`;
            }

            if (tianYiStars.length > 0) {
                healthNarrative += synthesizeStarInsight('Tian Yi', tianYiStars.length, null, 'health');
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
            // Add enhanced insights to life story if available
            if (enhancedInsights.length > 0) {
                lifeStory += `<div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #6366f1;">`;
                lifeStory += `<strong style="color: #4338ca; font-size: 14px;">Additional Insights:</strong><br>`;
                enhancedInsights.forEach(insight => {
                    lifeStory += `<p style="margin-top: 8px; font-size: 13px; color: #6b7280;">${insight.text}</p>`;
                });
                lifeStory += `</div>`;
            }
            
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
            stratText += `<div style="font-size: 18px; font-weight: 700; color: ${recommendationColor}; margin-bottom: 12px;">Should I change my number?</div>`;
            stratText += `<div style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0; padding: 0 10px;">`;
            stratText += `<span style="font-size: 12px; color: #059669; font-weight: 600;">Safe to Keep</span>`;
            stratText += `<div style="flex: 1; height: 8px; margin: 0 15px; background: linear-gradient(90deg, #10b981 0%, #84cc16 25%, #eab308 50%, #f59e0b 75%, #ef4444 100%); border-radius: 4px; position: relative;">`;
            // Position indicator based on changeScore (0-100 scale)
            // Flipped: low changeScore = left (Safe to Keep), high changeScore = right (Strongly Suggested)
            const normalizedScore = Math.min(100, Math.max(0, changeScore));
            const indicatorPosition = normalizedScore; // No longer inverted - low score = left, high score = right
            stratText += `<div style="position: absolute; left: ${indicatorPosition}%; top: 50%; transform: translate(-50%, -50%); width: 32px; height: 32px; border: none; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); overflow: hidden; background: transparent;"><img src="Fortune god Logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; display: block;"></div>`;
            stratText += `</div>`;
            stratText += `<span style="font-size: 12px; color: #991b1b; font-weight: 600;">Strongly Suggested</span>`;
            stratText += `</div>`;
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
                            reasoning: synthesizeMissingStarInsight(missing.star) +
                                `Adding <strong>${missing.star} (${starChinese[missing.star]})</strong> pairs like ${suggestedPairs.join(', ')} would introduce ${starDescriptions[missing.star] ? starDescriptions[missing.star].meaning.toLowerCase() : 'this missing energy'}. ` +
                                `By adding these pairs, you compensate for this gap in your energy profile. ` +
                                `${missing.impact} ` +
                                `The introduction of ${missing.star} energy would create a more balanced and complete energy configuration, addressing this blind spot in your number.`
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

// Generate website link with person's details
function generateReportLink(input, selectedGender, score, stars) {
    // Base website URL - UPDATE THIS WITH YOUR ACTUAL WEBSITE URL
    const baseUrl = 'https://yourwebsite.com/report'; // TODO: Replace with your actual website URL
    
    // Collect person's details
    const phoneNumber = input;
    const gender = selectedGender;
    const energyScore = score;
    
    // Get star composition summary
    const starSummary = stars.map(s => `${s.displayDigits}-${s.n}`).join(',');
    
    // Get life balance scores
    const balanceScores = calculateLifeBalance(stars, selectedGender);
    
    // Build URL parameters
    const params = new URLSearchParams({
        phone: phoneNumber,
        gender: gender,
        score: energyScore,
        stars: starSummary,
        wealth: balanceScores.wealth,
        career: balanceScores.career,
        relationships: balanceScores.relationships,
        health: balanceScores.health
    });
    
    return `${baseUrl}?${params.toString()}`;
}

// Update Copy Report button to link to website
function updateReportLink(input, selectedGender, score, stars) {
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        const reportUrl = generateReportLink(input, selectedGender, score, stars);
        copyBtn.href = reportUrl;
    }
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

// Report link is updated automatically when analysis runs via updateReportLink()

// Initialize birthdate dropdowns
document.addEventListener('DOMContentLoaded', () => {
    // Populate day dropdown (1-31)
    const birthDay = document.getElementById('birthDay');
    if (birthDay) {
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            birthDay.appendChild(option);
        }
    }
    
    // Populate month dropdown (1-12)
    const birthMonth = document.getElementById('birthMonth');
    if (birthMonth) {
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            birthMonth.appendChild(option);
        }
    }
    
    // Populate year dropdown (1940-2010)
    const birthYear = document.getElementById('birthYear');
    if (birthYear) {
        for (let i = 2010; i >= 1940; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            birthYear.appendChild(option);
        }
    }
});
