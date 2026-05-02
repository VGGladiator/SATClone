// Digital SAT Practice Test — Original Question Data
// Not affiliated with or endorsed by College Board.

const TEST_CONFIG = {
  rwModuleMinutes: 32,    // change to 1 for quick dev testing
  mathModuleMinutes: 35,  // change to 1 for quick dev testing
  breakMinutes: 10,       // change to 1 for quick dev testing
};

const PRACTICE_TEST_DATA = {
  testId: 'sat-practice-001',
  modules: [
    // ── Section 1, Module 1: Reading and Writing ──────────────────────
    {
      id: 'rw-1',
      moduleNumber: 1,
      section: 'Reading & Writing',
      displayName: 'Section 1, Module 1: Reading and Writing',
      questions: [
        {
          id: 'rw1-q1', number: 1,
          type: 'multiple-choice',
          domain: 'Craft and Structure', difficulty: 'easy',
          passage: 'Although many observers believed that consumers would never voluntarily pay to harvest their own produce at farms, such doubts did little to ______ agricultural entrepreneur Marcus Tilden\'s efforts to promote the practice. Thanks in large part to Tilden\'s tireless advocacy, farms that welcome visitors to pick their own apples, strawberries, and pumpkins are now found throughout the United States.',
          prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
          choices: [
            { letter: 'A', text: 'accelerate' },
            { letter: 'B', text: 'deter' },
            { letter: 'C', text: 'misrepresent' },
            { letter: 'D', text: 'validate' },
          ],
          correctAnswer: 'B',
          explanation: '"Deter" (to discourage or impede) best fits the contrast established by "although": the skeptics\' doubts failed to stop Tilden\'s efforts. "Accelerate" would mean the doubts sped him up—the opposite of what the context implies. "Misrepresent" and "validate" don\'t logically complete the idea that skepticism had little effect on his advocacy.'
        },
        {
          id: 'rw1-q2', number: 2,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'easy',
          passage: 'Community gardens serve a dual purpose in urban neighborhoods: they supply fresh produce to residents who might otherwise have limited access to affordable fruits and vegetables, while simultaneously creating shared green spaces that encourage social interaction. Research consistently shows that neighborhoods with active community gardens report lower rates of food insecurity and stronger senses of local cohesion than comparable neighborhoods without them.',
          prompt: 'What is the main purpose of this passage?',
          choices: [
            { letter: 'A', text: 'To argue that traditional private gardens are inferior to community gardens' },
            { letter: 'B', text: 'To explain the multiple social and nutritional benefits community gardens provide to urban neighborhoods' },
            { letter: 'C', text: 'To critique the way city governments manage public green spaces' },
            { letter: 'D', text: 'To describe the aesthetic principles behind effective urban garden design' },
          ],
          correctAnswer: 'B',
          explanation: 'The passage presents two benefits of community gardens (food access and social connection) and supports both with research evidence. Choice B accurately captures this dual-benefit argument. The passage makes no comparison to private gardens (A), no criticism of government (C), and no discussion of garden aesthetics (D).'
        },
        {
          id: 'rw1-q3', number: 3,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'medium',
          passage: 'Marine biologist Dr. Camille Osei has spent two decades studying coral reef ecosystems. Her research demonstrates that rising ocean temperatures are not the only threat facing reefs: increased ocean acidification, driven by the absorption of atmospheric carbon dioxide, is dissolving the calcium carbonate structures that give corals their skeletal form. "Bleaching events capture the headlines," she observes, "but acidification is the silent erosion that prevents full recovery."',
          prompt: 'Which statement best describes the main claim Dr. Osei makes?',
          choices: [
            { letter: 'A', text: 'Ocean temperature increases are the dominant threat to coral reef ecosystems' },
            { letter: 'B', text: 'Coral bleaching events are significantly underreported by major news organizations' },
            { letter: 'C', text: 'Ocean acidification poses a critical but underappreciated threat to reef recovery' },
            { letter: 'D', text: 'Carbon dioxide emissions have no direct effect on ocean temperatures' },
          ],
          correctAnswer: 'C',
          explanation: 'Dr. Osei explicitly contrasts the high-profile nature of bleaching events with the quieter danger of acidification, calling it "the silent erosion that prevents full recovery." This supports Choice C. Choice A contradicts her statement that temperature is "not the only threat." Choices B and D introduce claims not present in the passage.'
        },
        {
          id: 'rw1-q4', number: 4,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'medium',
          passage: 'In 1910, physicist Elias Varen developed a technique for measuring the electrical resistance of metallic alloys at near-absolute-zero temperatures. While his original apparatus was too imprecise for commercial applications, Varen\'s methodology established the theoretical groundwork that later engineers would refine. Subsequent researchers used his framework to develop materials now employed in MRI machines, particle accelerators, and maglev train systems.',
          prompt: 'Based on the passage, what can most reasonably be inferred about the long-term significance of Varen\'s work?',
          choices: [
            { letter: 'A', text: 'Varen\'s original apparatus was widely adopted by commercial manufacturers within his lifetime' },
            { letter: 'B', text: 'Varen\'s methodology had no influence on the work of scientists who came after him' },
            { letter: 'C', text: 'Varen\'s theoretical framework contributed indirectly to technologies developed after his initial research' },
            { letter: 'D', text: 'Varen\'s work in physics was considered a failure until the invention of particle accelerators' },
          ],
          correctAnswer: 'C',
          explanation: 'The passage states that "subsequent researchers used his framework to develop materials" used in modern technologies—directly supporting C. Choice A is contradicted by the description of his apparatus as "too imprecise for commercial applications." Choice B directly contradicts the passage\'s account of his influence. Choice D introduces a claim about failure not present in the text.'
        },
        {
          id: 'rw1-q5', number: 5,
          type: 'multiple-choice',
          domain: 'Craft and Structure', difficulty: 'easy',
          passage: 'The first photographs taken of Earth from space in the 1960s were grainy and low-resolution by contemporary standards. ______, these images fundamentally altered human perception of the planet, generating a widespread sense of ecological responsibility that contributed to the founding of several major environmental organizations.',
          prompt: 'Which choice completes the text with the most logical transition?',
          choices: [
            { letter: 'A', text: 'Similarly,' },
            { letter: 'B', text: 'Nevertheless,' },
            { letter: 'C', text: 'For instance,' },
            { letter: 'D', text: 'As a result,' },
          ],
          correctAnswer: 'B',
          explanation: '"Nevertheless" correctly signals the contrast between the technical limitations of the photographs (grainy and low-resolution) and their profound cultural impact. "Similarly" would suggest comparison rather than contrast. "For instance" would introduce an example of the previous claim. "As a result" would suggest the photographs\'s low quality caused the ecological awakening, which inverts the logic.'
        },
        {
          id: 'rw1-q6', number: 6,
          type: 'multiple-choice',
          domain: 'Craft and Structure', difficulty: 'medium',
          passage: 'The preservation of indigenous languages is not merely a cultural concern—it is simultaneously a cognitive and ecological matter. Each language encodes unique perceptual frameworks and specialized knowledge of local ecosystems, including information about plant species that may have untapped medicinal or agricultural value. When a language disappears, this accumulated knowledge frequently vanishes with it.',
          prompt: 'The phrase "not merely a cultural concern" primarily functions to:',
          choices: [
            { letter: 'A', text: 'Dismiss the cultural importance of indigenous language preservation as secondary' },
            { letter: 'B', text: 'Expand the argument\'s scope by connecting language loss to cognition and ecology' },
            { letter: 'C', text: 'Concede that the subject is too broad to be adequately addressed in the passage' },
            { letter: 'D', text: 'Imply that ecological research is a higher priority than cultural preservation' },
          ],
          correctAnswer: 'B',
          explanation: 'The phrase "not merely" expands rather than restricts the argument: language preservation isn\'t only culturally relevant—it also has cognitive and ecological dimensions. This broadens the argument\'s appeal. The passage does not dismiss cultural concerns (A), concede any limitations (C), or rank ecological over cultural priorities (D).'
        },
        {
          id: 'rw1-q7', number: 7,
          type: 'multiple-choice',
          domain: 'Standard English Conventions', difficulty: 'easy',
          passage: null,
          prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe urban planning committee approved three separate proposals for the waterfront district, each design ______ a distinct vision of how the neighborhood could be reimagined.',
          choices: [
            { letter: 'A', text: 'reflects' },
            { letter: 'B', text: 'reflecting' },
            { letter: 'C', text: 'having reflected' },
            { letter: 'D', text: 'to reflect' },
          ],
          correctAnswer: 'B',
          explanation: '"Reflecting" is a present participial phrase that correctly modifies "each design." A comma + participial phrase is the appropriate construction for adding a modifying clause to the main sentence without creating a run-on. "Reflects" creates a run-on sentence by adding an independent clause without proper conjunction. "Having reflected" implies completed past action. "To reflect" implies purpose or intention rather than description.'
        },
        {
          id: 'rw1-q8', number: 8,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'medium',
          passage: 'Fermentation is among humanity\'s oldest food preservation methods. Long before refrigeration existed, cultures across Asia, the Middle East, Europe, and the Americas independently discovered that allowing foods to undergo controlled microbial transformation could extend shelf life while altering nutritional profiles in beneficial ways. Fermented foods such as yogurt, miso, kimchi, and kefir now appear prominently in contemporary dietary research as potential contributors to gut microbiome health.',
          prompt: 'Which choice best states the central idea of the passage?',
          choices: [
            { letter: 'A', text: 'Modern refrigeration has made fermentation unnecessary as a food preservation technique' },
            { letter: 'B', text: 'Fermentation is an ancient, cross-cultural practice whose health implications continue to be studied today' },
            { letter: 'C', text: 'Kimchi and miso are the most nutritionally significant fermented foods in the modern diet' },
            { letter: 'D', text: 'Microbial processes in food are unpredictable and require strict laboratory oversight' },
          ],
          correctAnswer: 'B',
          explanation: 'The passage covers three key ideas: the antiquity of fermentation, its global, independent discovery across cultures, and its current relevance to health research. Choice B integrates all three. Choice A contradicts the passage\'s framing of fermentation as still relevant. Choice C makes a comparative claim not supported by the text. Choice D mischaracterizes the passage\'s positive treatment of fermentation.'
        },
      ]
    },

    // ── Section 1, Module 2: Reading and Writing ──────────────────────
    {
      id: 'rw-2',
      moduleNumber: 2,
      section: 'Reading & Writing',
      displayName: 'Section 1, Module 2: Reading and Writing',
      questions: [
        {
          id: 'rw2-q1', number: 1,
          type: 'multiple-choice',
          domain: 'Craft and Structure', difficulty: 'medium',
          passage: 'The philosopher\'s argument, while ______, ultimately failed to account for the empirical evidence that had accumulated over the preceding decade. A logically rigorous structure cannot substitute for solid observational grounding when evaluating claims about the physical world.',
          prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
          choices: [
            { letter: 'A', text: 'speculative' },
            { letter: 'B', text: 'internally coherent' },
            { letter: 'C', text: 'widely discredited' },
            { letter: 'D', text: 'empirically verified' },
          ],
          correctAnswer: 'B',
          explanation: 'The passage contrasts the argument\'s logical structure with its failure to account for empirical evidence. "Internally coherent" best captures the idea that the argument was logically well-constructed but still incomplete—explaining why it "failed" despite its rigor. "Speculative" would make the rest of the sentence redundant. "Widely discredited" and "empirically verified" introduce information not in the text.'
        },
        {
          id: 'rw2-q2', number: 2,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'hard',
          passage: 'Text 1: Remote work has permanently restructured the relationship between employees and physical offices. Surveys consistently find that workers prize the flexibility and autonomy that remote arrangements provide, and many report they would seek new employment rather than return to daily commuting requirements.\n\nText 2: The enthusiasm surrounding remote work may mask significant downsides. Junior employees in particular frequently report feeling isolated from mentorship opportunities and disconnected from organizational culture when working from home—conditions that may carry long-term consequences for career development and workplace equity.',
          prompt: 'Based on both texts, how would the author of Text 2 most likely respond to the claim in Text 1 that workers broadly value remote flexibility?',
          choices: [
            { letter: 'A', text: 'By agreeing that remote work provides equal benefits across all employee demographics' },
            { letter: 'B', text: 'By arguing that the perceived benefits of remote work may be distributed unevenly across career stages' },
            { letter: 'C', text: 'By dismissing employee surveys as methodologically unreliable evidence' },
            { letter: 'D', text: 'By claiming that all categories of workers ultimately prefer in-office arrangements' },
          ],
          correctAnswer: 'B',
          explanation: 'Text 2 focuses specifically on junior employees who face unique disadvantages under remote work, implying that the benefits described in Text 1 may not apply equally to all workers. Choice B captures this nuanced response. Text 2 does not agree that benefits are equal (A), question survey methodology (C), or claim all workers prefer offices (D).'
        },
        {
          id: 'rw2-q3', number: 3,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'medium',
          passage: 'Economist Dr. Priya Nair\'s landmark longitudinal study tracked outcomes for 5,000 small businesses across three continents over twenty years. The study found that businesses led by women with access to structured microfinancing programs were 40 percent more likely to remain solvent after a decade than comparable businesses without such support. To complement her quantitative findings, Nair conducted in-depth interviews with 200 business owners.',
          prompt: 'Why does the author mention the 200 interviews Nair conducted?',
          choices: [
            { letter: 'A', text: 'To suggest that the quantitative data in the study is statistically unreliable' },
            { letter: 'B', text: 'To show that Nair supplemented her statistical findings with personal narrative evidence' },
            { letter: 'C', text: 'To argue that qualitative research methods are superior to quantitative analysis' },
            { letter: 'D', text: 'To explain the logistical reason the study required twenty years to complete' },
          ],
          correctAnswer: 'B',
          explanation: 'The phrase "to complement her quantitative findings" indicates that the interviews were used to add qualitative depth—personal accounts—alongside the numerical data. Choice B correctly identifies this complementary relationship. The passage does not suggest the quantitative data is unreliable (A), argue for the superiority of qualitative methods (C), or connect the interviews to the study\'s duration (D).'
        },
        {
          id: 'rw2-q4', number: 4,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'medium',
          passage: 'A university study examining sleep patterns among undergraduates found distinct correlations between sleep duration and academic performance. Students averaging fewer than 6 hours of sleep per night posted a mean GPA of 2.7. Those averaging 7 to 8 hours posted a mean GPA of 3.2. Students averaging more than 9 hours posted a mean GPA of 3.0—slightly lower than the 7–8 hour group.',
          prompt: 'Which conclusion is best supported by the study\'s data as described in the passage?',
          choices: [
            { letter: 'A', text: 'Longer sleep duration always produces higher academic performance among college students' },
            { letter: 'B', text: 'Among the groups studied, students sleeping 7–8 hours showed the strongest academic performance' },
            { letter: 'C', text: 'Sleep duration has no statistically significant relationship with GPA' },
            { letter: 'D', text: 'Students sleeping more than 9 hours perform worse than students sleeping fewer than 6 hours' },
          ],
          correctAnswer: 'B',
          explanation: 'The data shows GPAs of 2.7, 3.2, and 3.0 for the three groups respectively. The 7–8 hour group had the highest GPA, supporting B. Choice A overstates the finding since sleeping more than 9 hours actually produced a lower GPA than 7–8 hours. Choice C contradicts the clear differences in the data. Choice D is false—9+ hours (3.0) is still higher than under 6 hours (2.7).'
        },
        {
          id: 'rw2-q5', number: 5,
          type: 'multiple-choice',
          domain: 'Craft and Structure', difficulty: 'medium',
          passage: 'Early adopters of electric vehicles frequently cited environmental motivations as their primary reason for switching from internal combustion engines. ______ a comprehensive 2024 consumer analysis found that among new EV purchasers, lower operating costs and improved driving performance ranked above environmental considerations when participants explained their purchase decisions.',
          prompt: 'Which choice completes the text with the most logical transition?',
          choices: [
            { letter: 'A', text: 'Therefore,' },
            { letter: 'B', text: 'Likewise,' },
            { letter: 'C', text: 'However,' },
            { letter: 'D', text: 'In fact,' },
          ],
          correctAnswer: 'C',
          explanation: '"However" correctly signals the contrast between early adopters\' environmental motivations and the 2024 finding that newer buyers are primarily motivated by cost and performance. "Therefore" would suggest the first sentence caused the second, which it did not. "Likewise" would suggest the two sentences agree, but they contrast. "In fact" would imply the second sentence intensifies or restates the first.'
        },
        {
          id: 'rw2-q6', number: 6,
          type: 'multiple-choice',
          domain: 'Standard English Conventions', difficulty: 'medium',
          passage: null,
          prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe research team returned from the Antarctic expedition with thousands of ice core samples ______ the laboratory analysis alone required nearly three years to complete.',
          choices: [
            { letter: 'A', text: 'and' },
            { letter: 'B', text: ', and' },
            { letter: 'C', text: '; however,' },
            { letter: 'D', text: ', therefore' },
          ],
          correctAnswer: 'B',
          explanation: 'A comma followed by a coordinating conjunction ("and") is the correct way to join two independent clauses. "The research team returned... with samples" and "the laboratory analysis... required three years" are both independent clauses. Choice A omits the required comma. Choice C introduces a contrast not implied by the context. Choice D suggests causation, but "therefore" after a comma creates a comma splice with a conjunctive adverb.'
        },
        {
          id: 'rw2-q7', number: 7,
          type: 'multiple-choice',
          domain: 'Craft and Structure', difficulty: 'hard',
          passage: 'We cannot delay action on water infrastructure. In cities across the country, pipes installed in the 1920s continue to carry drinking water to millions of families today. These aging systems fail at accelerating rates, contaminating water supplies and causing billions of dollars in property damage annually. The question is not whether we must act—it is whether we will act before the next preventable crisis.',
          prompt: 'The author concludes the passage with a question primarily to:',
          choices: [
            { letter: 'A', text: 'Suggest that experts are uncertain about what action to take regarding water infrastructure' },
            { letter: 'B', text: 'Create urgency by reframing inaction as a conscious choice with foreseeable consequences' },
            { letter: 'C', text: 'Acknowledge that the cost of water infrastructure repair is prohibitively high' },
            { letter: 'D', text: 'Invite readers to conduct their own research and propose independent solutions' },
          ],
          correctAnswer: 'B',
          explanation: 'The final question reframes the issue from "whether to act" to "when"—implying that delay is not a neutral position but a choice that will lead to predictable harm ("the next preventable crisis"). This creates urgency. The question does not imply expert uncertainty (A), address cost concerns (C), or invite independent research (D).'
        },
        {
          id: 'rw2-q8', number: 8,
          type: 'multiple-choice',
          domain: 'Information and Ideas', difficulty: 'hard',
          passage: 'Critics of standardized testing frequently point to the influence of socioeconomic background on test performance, arguing that such assessments measure access to resources as much as they measure cognitive ability. Supporters counter that standardized exams provide a consistent metric that transcends the variability inherent in school-based grading systems. Both positions contain legitimate insights, yet neither fully captures the layered relationship among assessment design, structural inequity, and educational opportunity.',
          prompt: 'Which choice best describes the author\'s approach in this passage?',
          choices: [
            { letter: 'A', text: 'The author argues forcefully for the elimination of standardized testing in college admissions' },
            { letter: 'B', text: 'The author presents opposing viewpoints and concludes that the issue is more complex than either side acknowledges' },
            { letter: 'C', text: 'The author contends that standardized testing is the most equitable tool available for measuring student ability' },
            { letter: 'D', text: 'The author dismisses both critics and supporters of standardized testing as equally uninformed' },
          ],
          correctAnswer: 'B',
          explanation: 'The passage presents the critics\' argument, the supporters\' counterargument, then concludes that "both positions contain legitimate insights, yet neither fully captures" the full picture. This is a balanced, nuanced approach that acknowledges complexity—matching Choice B. The author takes no side (eliminating A and C) and explicitly says both positions have merit rather than dismissing them (eliminating D).'
        },
      ]
    },

    // ── Section 2, Module 1: Math ─────────────────────────────────────
    {
      id: 'math-1',
      moduleNumber: 1,
      section: 'Math',
      displayName: 'Section 2, Module 1: Math',
      questions: [
        {
          id: 'math1-q1', number: 1,
          type: 'multiple-choice',
          domain: 'Algebra', difficulty: 'easy',
          passage: null,
          prompt: 'If 3x + 7 = 22, what is the value of x?',
          choices: [
            { letter: 'A', text: '3' },
            { letter: 'B', text: '5' },
            { letter: 'C', text: '7' },
            { letter: 'D', text: '9' },
          ],
          correctAnswer: 'B',
          explanation: 'Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5. Checking: 3(5) + 7 = 15 + 7 = 22. ✓'
        },
        {
          id: 'math1-q2', number: 2,
          type: 'multiple-choice',
          domain: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: null,
          prompt: 'A jacket was originally priced at $80. It is now on sale for $68. By approximately what percentage was the original price reduced?',
          choices: [
            { letter: 'A', text: '12%' },
            { letter: 'B', text: '15%' },
            { letter: 'C', text: '17%' },
            { letter: 'D', text: '20%' },
          ],
          correctAnswer: 'B',
          explanation: 'Percent reduction = (reduction ÷ original) × 100 = (12 ÷ 80) × 100 = 0.15 × 100 = 15%.'
        },
        {
          id: 'math1-q3', number: 3,
          type: 'multiple-choice',
          domain: 'Algebra', difficulty: 'medium',
          passage: null,
          prompt: 'The following system of equations is given:\n  2x + y = 10\n  x − y = 2\nWhat is the value of x?',
          choices: [
            { letter: 'A', text: '2' },
            { letter: 'B', text: '4' },
            { letter: 'C', text: '6' },
            { letter: 'D', text: '8' },
          ],
          correctAnswer: 'B',
          explanation: 'Add both equations: (2x + y) + (x − y) = 10 + 2 → 3x = 12 → x = 4. Checking with y: from x − y = 2, y = 4 − 2 = 2. Verify in first equation: 2(4) + 2 = 10. ✓'
        },
        {
          id: 'math1-q4', number: 4,
          type: 'multiple-choice',
          domain: 'Geometry and Trigonometry', difficulty: 'medium',
          passage: null,
          prompt: 'A rectangle has a length that is three times its width. If the perimeter of the rectangle is 64 centimeters, what is the area of the rectangle in square centimeters?',
          choices: [
            { letter: 'A', text: '96' },
            { letter: 'B', text: '192' },
            { letter: 'C', text: '256' },
            { letter: 'D', text: '288' },
          ],
          correctAnswer: 'B',
          explanation: 'Let width = w and length = 3w. Perimeter: 2(w + 3w) = 64 → 2(4w) = 64 → 8w = 64 → w = 8. Length = 3(8) = 24. Area = 8 × 24 = 192 cm².'
        },
        {
          id: 'math1-q5', number: 5,
          type: 'multiple-choice',
          domain: 'Advanced Math', difficulty: 'medium',
          passage: null,
          prompt: 'Which expression is equivalent to (2x + 3)(x − 5)?',
          choices: [
            { letter: 'A', text: '2x² − 7x − 15' },
            { letter: 'B', text: '2x² + 7x − 15' },
            { letter: 'C', text: '2x² − 10x + 15' },
            { letter: 'D', text: '2x² − 7x + 15' },
          ],
          correctAnswer: 'A',
          explanation: 'Use FOIL: (2x)(x) + (2x)(−5) + (3)(x) + (3)(−5) = 2x² − 10x + 3x − 15 = 2x² − 7x − 15.'
        },
        {
          id: 'math1-q6', number: 6,
          type: 'multiple-choice',
          domain: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: null,
          prompt: 'A student\'s five test scores are 72, 85, 90, 68, and 95. What is the mean (average) of these scores?',
          choices: [
            { letter: 'A', text: '78' },
            { letter: 'B', text: '80' },
            { letter: 'C', text: '82' },
            { letter: 'D', text: '85' },
          ],
          correctAnswer: 'C',
          explanation: 'Sum = 72 + 85 + 90 + 68 + 95 = 410. Mean = 410 ÷ 5 = 82.'
        },
        {
          id: 'math1-q7', number: 7,
          type: 'multiple-choice',
          domain: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: null,
          prompt: 'In a graduating class, the ratio of students pursuing STEM fields to students pursuing arts and humanities is 5 : 3. If there are 240 students in the class, how many are pursuing STEM fields?',
          choices: [
            { letter: 'A', text: '90' },
            { letter: 'B', text: '120' },
            { letter: 'C', text: '150' },
            { letter: 'D', text: '160' },
          ],
          correctAnswer: 'C',
          explanation: 'Total ratio parts = 5 + 3 = 8. STEM students = (5/8) × 240 = 150.'
        },
        {
          id: 'math1-q8', number: 8,
          type: 'student-produced',
          domain: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: null,
          prompt: 'A car travels at a constant speed of 60 miles per hour. How many minutes will it take the car to travel 25 miles?\n\nEnter your answer in the box below.',
          choices: [],
          correctAnswer: '25',
          explanation: 'Speed = 60 mph = 1 mile per minute. Time = distance ÷ speed = 25 miles ÷ 1 mile/min = 25 minutes.'
        },
      ]
    },

    // ── Section 2, Module 2: Math ─────────────────────────────────────
    {
      id: 'math-2',
      moduleNumber: 2,
      section: 'Math',
      displayName: 'Section 2, Module 2: Math',
      questions: [
        {
          id: 'math2-q1', number: 1,
          type: 'multiple-choice',
          domain: 'Advanced Math', difficulty: 'medium',
          passage: null,
          prompt: 'What are the solutions to x² − 5x + 6 = 0?',
          choices: [
            { letter: 'A', text: 'x = 2 and x = 3' },
            { letter: 'B', text: 'x = −2 and x = −3' },
            { letter: 'C', text: 'x = 1 and x = 6' },
            { letter: 'D', text: 'x = −1 and x = −6' },
          ],
          correctAnswer: 'A',
          explanation: 'Factor the quadratic: x² − 5x + 6 = (x − 2)(x − 3) = 0. Setting each factor to zero: x − 2 = 0 → x = 2; x − 3 = 0 → x = 3. Solutions: x = 2 and x = 3.'
        },
        {
          id: 'math2-q2', number: 2,
          type: 'multiple-choice',
          domain: 'Advanced Math', difficulty: 'medium',
          passage: null,
          prompt: 'Which of the following is equivalent to (3 × 10⁴) × (2 × 10³)?',
          choices: [
            { letter: 'A', text: '5 × 10⁷' },
            { letter: 'B', text: '6 × 10⁷' },
            { letter: 'C', text: '6 × 10¹²' },
            { letter: 'D', text: '5 × 10¹²' },
          ],
          correctAnswer: 'B',
          explanation: 'Multiply the coefficients: 3 × 2 = 6. Add the exponents: 10⁴ × 10³ = 10⁷. Result: 6 × 10⁷.'
        },
        {
          id: 'math2-q3', number: 3,
          type: 'multiple-choice',
          domain: 'Advanced Math', difficulty: 'medium',
          passage: null,
          prompt: 'If f(x) = 2x² − 3x + 1, what is the value of f(4)?',
          choices: [
            { letter: 'A', text: '17' },
            { letter: 'B', text: '21' },
            { letter: 'C', text: '25' },
            { letter: 'D', text: '29' },
          ],
          correctAnswer: 'B',
          explanation: 'f(4) = 2(4)² − 3(4) + 1 = 2(16) − 12 + 1 = 32 − 12 + 1 = 21.'
        },
        {
          id: 'math2-q4', number: 4,
          type: 'multiple-choice',
          domain: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: null,
          prompt: 'A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. If one marble is selected at random, what is the probability that it is blue?',
          choices: [
            { letter: 'A', text: '1/6' },
            { letter: 'B', text: '1/3' },
            { letter: 'C', text: '1/2' },
            { letter: 'D', text: '2/3' },
          ],
          correctAnswer: 'C',
          explanation: 'Total marbles = 4 + 6 + 2 = 12. P(blue) = 6/12 = 1/2.'
        },
        {
          id: 'math2-q5', number: 5,
          type: 'multiple-choice',
          domain: 'Algebra', difficulty: 'medium',
          passage: null,
          prompt: 'Which of the following describes all values of x that satisfy 2x − 4 > 10?',
          choices: [
            { letter: 'A', text: 'x > 3' },
            { letter: 'B', text: 'x > 5' },
            { letter: 'C', text: 'x > 7' },
            { letter: 'D', text: 'x < 7' },
          ],
          correctAnswer: 'C',
          explanation: '2x − 4 > 10 → 2x > 14 → x > 7.'
        },
        {
          id: 'math2-q6', number: 6,
          type: 'multiple-choice',
          domain: 'Advanced Math', difficulty: 'hard',
          passage: null,
          prompt: 'A colony of bacteria doubles in population every 3 hours. If the initial population is 500, what will the population be after 12 hours?',
          choices: [
            { letter: 'A', text: '2,000' },
            { letter: 'B', text: '4,000' },
            { letter: 'C', text: '8,000' },
            { letter: 'D', text: '16,000' },
          ],
          correctAnswer: 'C',
          explanation: 'Number of doubling periods in 12 hours = 12 ÷ 3 = 4. Population = 500 × 2⁴ = 500 × 16 = 8,000.'
        },
        {
          id: 'math2-q7', number: 7,
          type: 'multiple-choice',
          domain: 'Geometry and Trigonometry', difficulty: 'medium',
          passage: null,
          prompt: 'Line m passes through the points (2, 5) and (6, 13). What is the slope of line m?',
          choices: [
            { letter: 'A', text: '1' },
            { letter: 'B', text: '2' },
            { letter: 'C', text: '3' },
            { letter: 'D', text: '4' },
          ],
          correctAnswer: 'B',
          explanation: 'Slope = (y₂ − y₁) / (x₂ − x₁) = (13 − 5) / (6 − 2) = 8 / 4 = 2.'
        },
        {
          id: 'math2-q8', number: 8,
          type: 'student-produced',
          domain: 'Algebra', difficulty: 'hard',
          passage: null,
          prompt: 'If 4(x + 2) = 3(x + 6), what is the value of x?\n\nEnter your answer in the box below.',
          choices: [],
          correctAnswer: '10',
          explanation: '4(x + 2) = 3(x + 6) → 4x + 8 = 3x + 18 → 4x − 3x = 18 − 8 → x = 10. Checking: 4(12) = 48 and 3(16) = 48. ✓'
        },
      ]
    },
  ]
};
