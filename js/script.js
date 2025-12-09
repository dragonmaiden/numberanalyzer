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
            
    // Run analysis after 1 second
            setTimeout(() => {
                results.classList.remove('hidden');
                runFlowAndAnalysis(input);
                
                // Hide loading spinner and re-enable button
                loadingOverlay.classList.remove('active');
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = 'Analyze';
        copyBtn.classList.remove('hidden');
                
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

        function generateDeepNarrative(input, stars, lastStar, combos, score, container) {
            container.innerHTML = "";

            if(stars.length === 0) {
                container.innerHTML = "<div class='narrative-text'>Not enough valid digit pairs to generate a complete analysis. Please enter a longer number.</div>";
                return;
            }

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

    // Executive Summary (keeping existing logic but with CSS classes)
            let summaryText = "";
            let goodCount = stars.filter(s => s.p === 'good').length;
            let badCount = stars.filter(s => s.p === 'bad').length;
            
            let genderLabel = selectedGender === 'male' ? '阳男 (Yang Male)' : '阴女 (Yin Female)';
            let genderIcon = selectedGender === 'male' ? '♂' : '♀';
            let yangCount = stars.filter(s => s.yinyang === 'yang').length;
            let yinCount = stars.filter(s => s.yinyang === 'yin').length;
            
            let tianYiStars = stars.filter(s => s.n === 'Tian Yi');
            let shengQiStars = stars.filter(s => s.n === 'Sheng Qi');
            let yanNianStars = stars.filter(s => s.n === 'Yan Nian');
            let jueMingStars = stars.filter(s => s.n === 'Jue Ming');
            let wuGuiStars = stars.filter(s => s.n === 'Wu Gui');
            let liuShaStars = stars.filter(s => s.n === 'Liu Sha');
            let huoHaiStars = stars.filter(s => s.n === 'Huo Hai');
            let fuWeiStars = stars.filter(s => s.n === 'Fu Wei');
            
    summaryText += `<div class="narrative-text">`;
    summaryText += `<p>As a <strong>${genderIcon} ${genderLabel}</strong>, your number <strong>${input}</strong> carries `;
            
            if (goodCount > badCount) {
        summaryText += `<span class="text-good">predominantly auspicious energy</span> with ${goodCount} favorable stars versus ${badCount} challenging ones. `;
            } else if (badCount > goodCount) {
        summaryText += `<span class="text-bad">significant challenges</span> with ${badCount} difficult stars versus ${goodCount} favorable ones—requiring strategic navigation. `;
            } else {
                summaryText += `balanced energy with equal measures of opportunity and challenge. `;
            }
            
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
            
    // Continue with existing narrative generation logic...
    // (Keeping the rest of the narrative generation similar but using CSS classes)
    
            summaryText += `</div>`;
            createNarrativeCard("📊 Executive Summary", summaryText, container);

    // Wealth Analysis
            let wealthText = "";
            let doubleTianYi = consecutiveRuns.find(r => r.star === 'Tian Yi');
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
        wealthText += `</ul><p>This indicates money through legitimate channels—salary, investments, business. The energy supports accumulation and smart financial decisions.</p>`;
            }

            if (shengQiStars.length > 0) {
                wealthText += `<p><span class="success">✓ Sheng Qi (${starChinese['Sheng Qi']}) Present</span><br>`;
                wealthText += `Found at:</p><ul style="margin: 5px 0 10px 20px;">`;
                shengQiStars.forEach(s => {
            wealthText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span></li>`;
        });
        wealthText += `</ul><p>Wealth through opportunity and connections. This isn't passive income—it's money that comes from being in the right place, knowing the right people, and seizing moments.</p>`;
            }

            if (jueMingStars.length > 0 || wuGuiStars.length > 0) {
                wealthText += `<div class="warning-box"><strong>Wealth Risk Factors:</strong><br>`;
                if (doubleJueMing) {
            wealthText += `• <strong>⚠️ DOUBLE Jue Ming (双绝命)</strong> detected! This is the most extreme wealth volatility pattern. Money comes and goes in dramatic swings.<br>`;
                } else if (jueMingStars.length > 0) {
            wealthText += `• <strong>Jue Ming (${starChinese['Jue Ming']})</strong> present—wealth volatility risk<br>`;
                }
                if (doubleWuGui) {
            wealthText += `• <strong>⚠️ DOUBLE Wu Gui (双五鬼)</strong> detected! Extreme unpredictability with finances.<br>`;
                } else if (wuGuiStars.length > 0) {
            wealthText += `• <strong>Wu Gui (${starChinese['Wu Gui']})</strong> present—unpredictability risk<br>`;
                }
                wealthText += `</div>`;
            }

    if (lastStar && lastStar.n === 'Jue Ming') {
        wealthText += `<p><span class="warn">⚠ Critical Ending Warning:</span> Your number ends with ${lastStar.n} (${starChinese[lastStar.n]}), which significantly impacts wealth retention. Extra financial discipline is required.</p>`;
            }

    if (wealthText) {
            createNarrativeCard("💰 Wealth & Financial Outlook", wealthText, container);
    }

    // Career Analysis
            let careerText = "";
            let doubleYanNian = consecutiveRuns.find(r => r.star === 'Yan Nian');
            
            if (doubleYanNian) {
                let runName = doubleYanNian.count === 2 ? 'Double' : (doubleYanNian.count === 3 ? 'Triple' : `${doubleYanNian.count}x`);
                careerText += `<div class="insight-box"><strong>🌟 ${runName} Yan Nian (${starChinese['Yan Nian'].repeat(doubleYanNian.count)}) - Exceptional Leadership Configuration</strong><br>`;
        careerText += `<p>The Longevity star appearing ${doubleYanNian.count} times creates commanding authority. This is the pattern of executives, founders, and those who shape organizations.</p></div>`;
            }
            
            if (yanNianStars.length > 0) {
                careerText += `<p><span class="success">✓ Yan Nian (${starChinese['Yan Nian']}) Present</span><br>`;
                careerText += `Leadership star found at:</p><ul style="margin: 5px 0 10px 20px;">`;
                yanNianStars.forEach(s => {
            careerText += `<li><span class="flow-ref">${s.displayDigits}</span> - <span class="tag tag-${s.strength}">${s.strengthCn}</span></li>`;
        });
        careerText += `</ul><p>This is the leadership star. It indicates natural authority, the ability to take charge, and respect from peers and superiors.</p>`;
    }

    if (careerText) {
            createNarrativeCard("💼 Career & Professional Path", careerText, container);
    }

    // Relationships Analysis
            let relText = "";
            let doubleLiuSha = consecutiveRuns.find(r => r.star === 'Liu Sha');
            let doubleHuoHai = consecutiveRuns.find(r => r.star === 'Huo Hai');

    relText += `<div class="${selectedGender === 'male' ? 'insight-box' : 'warning-box'}" style="background: ${selectedGender === 'male' ? '#dbeafe' : '#fce7f3'}; border-color: ${selectedGender === 'male' ? '#3b82f6' : '#ec4899'};"><strong>${selectedGender === 'male' ? '♂ Male' : '♀ Female'} Relationship Profile:</strong><br>`;
    relText += `<span style="font-size: 12px;">${selectedGender === 'male' ? 'Men benefit from Yin-energy partners.' : 'Women benefit from Yang-energy partners.'}</span></div>`;

            if (selectedGender === 'female' && yanNianStars.length > 0) {
                let strongYanNian = yanNianStars.filter(s => s.strength === 'strongest' || s.strength === 'strong');
                if (strongYanNian.length > 0) {
                    relText += `<div class="warning-box"><strong>⚠️ Female + Strong Yan Nian (延年) - Relationship Impact:</strong><br>`;
            relText += `<p>Your strong leadership energy may intimidate some partners or delay marriage as career takes priority. Seek partners who appreciate your strength.</p></div>`;
        }
    }

            if (liuShaStars.length > 0) {
                relText += `<p><span class="highlight">◆ Peach Blossom Energy Active</span><br>`;
        relText += `Liu Sha (${starChinese['Liu Sha']}) brings strong interpersonal magnetism. You attract attention easily and have natural charm. However, this same energy creates emotional complexity.</p>`;
            }

            if (tianYiStars.length > 0) {
                relText += `<p><span class="success">◆ Supportive Partnership Indicator</span><br>`;
        relText += `Tian Yi (${starChinese['Tian Yi']}) suggests finding a partner who is helpful, stable, and supportive. Marriage or long-term partnership can be a source of mutual growth.</p>`;
            }

            if (huoHaiStars.length > 0) {
                relText += `<p><span class="warn">◆ Communication Friction</span><br>`;
        relText += `Huo Hai (${starChinese['Huo Hai']}) indicates potential for arguments and verbal conflict in relationships. Learning to pause before responding is essential.</p>`;
    }

    if (relText) {
        createNarrativeCard("❤️ Relationships & Connections", relText, container);
    }

    // Health Analysis
            let healthText = "";
    let healthNotes = [];
    if (jueMingStars.length > 0) healthNotes.push(`<span class="text-bad">Jue Ming</span> suggests monitoring liver, kidney, and urinary systems`);
    if (wuGuiStars.length > 0) healthNotes.push(`<span class="text-bad">Wu Gui</span> points to blood pressure, heart, and immune considerations`);
    if (huoHaiStars.length > 0) healthNotes.push(`<span class="warn">Huo Hai</span> indicates respiratory and lymphatic areas`);
    if (liuShaStars.length > 0) healthNotes.push(`<span class="warn">Liu Sha</span> relates to skin, digestion, and emotional wellbeing`);
    if (yanNianStars.length > 0) healthNotes.push(`<span class="text-good">Yan Nian</span> (overwork type) suggests watching for stress, insomnia, and neck/shoulder tension`);
    
    if (healthNotes.length > 0) {
                healthText += `<p><strong>Health Areas to Monitor:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
        healthNotes.forEach(note => {
            healthText += `<li>${note}</li>`;
                });
                healthText += `</ul>`;
            }

            if (tianYiStars.length > 0) {
        healthText += `<div class="insight-box"><strong>✨ Protective Factor:</strong> Tian Yi (天医) is present, which supports health and recovery. This can help offset other health concerns.</div>`;
    }

    if (healthText) {
        createNarrativeCard("🏥 Health Indicators", healthText, container);
    }
    
    // Strategic Recommendations section
    let stratText = `<div class="narrative-text">`;
            stratText += `<p>Based on the complete flow analysis of <span class="flow-ref">${input}</span>, here are targeted recommendations:</p>`;

    if (lastStar) {
        stratText += `<div class="${lastStar.p === 'bad' ? 'warning-box' : (lastStar.p === 'good' ? 'insight-box' : 'narrative-card')}">`;
            stratText += `<strong>🏁 Critical: End Result Analysis</strong><br>`;
            stratText += `Your number ends with <strong>${lastStar.n} (${starChinese[lastStar.n]})</strong> at <span class="tag tag-${lastStar.strength}">${lastStar.strengthCn}</span> strength.<br><br>`;
            
            if (lastStar.n === 'Jue Ming') {
                stratText += `<span class="warn">⚠️ 绝命结尾 = 留不住钱 (Jue Ming ending = Cannot keep money)</span><br>`;
                stratText += `This is the most critical warning. Money earned will flow out through impulsive decisions, unexpected events, or losses. Even if you accumulate wealth mid-journey, the ending energy suggests difficulty retaining it. <strong>Recommendation:</strong> Set up automatic savings, avoid impulse purchases, have someone else manage large financial decisions.`;
            } else if (lastStar.n === 'Tian Yi') {
                stratText += `<span class="success">✨ 天医结尾 = 守财有方 (Tian Yi ending = Wealth preservation)</span><br>`;
                stratText += `Excellent ending! Wealth accumulated is retained. Final outcomes favor financial stability. The journey may have challenges but the destination is prosperous.`;
        }
                    stratText += `</div>`;
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

// Initialize copy button event listener
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyReport);
    }
});
