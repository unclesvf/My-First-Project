# Historical Accuracy Checker

## Description
Expert skill for verifying historical accuracy in educational lessons. Checks for anachronisms, incorrect dates, impossible events, and historical fallacies to ensure educational content is factually accurate.

## When to Use
- After creating a new lesson with the lesson-builder skill
- When reviewing existing lessons for accuracy
- Before publishing or deploying lesson content
- When user reports a potential historical error

## Capabilities
- Reads lesson content from data/lessons.ts
- Extracts all historical claims (dates, events, people, places, technologies)
- Cross-references claims against historical timelines
- Identifies anachronisms (events mentioned before they occurred)
- Verifies geographical and political boundaries for the time period
- Checks age calculations and biographical accuracy
- Generates detailed accuracy reports with corrections

## Process

### Step 1: Read the Lesson
Read the specified lesson from `data/lessons.ts` and extract:
- Lesson ID and title
- All story chapters
- All flashcard content
- All quiz questions and answers
- Any dates mentioned (explicit or implicit)

### Step 2: Extract Historical Claims
Identify and list all historical claims made in the lesson:
- **Events**: Battles, treaties, founding dates, inventions
- **People**: Names, ages, roles, actions, quotes
- **Places**: Cities, countries, regions, buildings
- **Technologies**: Tools, weapons, transportation, communication
- **Dates**: Years, seasons, relative timeframes
- **Relationships**: Who knew whom, who influenced whom, causation

### Step 3: Build Timeline Context
Determine the primary time period of the lesson:
- Identify the main date or date range
- Note any flashbacks or flash-forwards
- Establish the narrative's present moment

### Step 4: Verify Each Claim

Use the following historical databases to verify claims:

#### 4.1: American Colonial Timeline (1492-1776)
```
1492 - Columbus reaches Americas
1513 - Ponce de León explores Florida
1565 - St. Augustine founded (FIRST permanent European settlement in what becomes US)
1607 - Jamestown founded (Virginia)
1620 - Plymouth Colony founded (Mayflower)
1681 - Pennsylvania founded by William Penn
1733 - Georgia founded (last of 13 colonies)
1754-1763 - French and Indian War
1765 - Stamp Act
1773 - Boston Tea Party
1775-1783 - American Revolution
1776 - Declaration of Independence
```

**CRITICAL ANACHRONISM CHECK**:
- St. Augustine (1565) predates Jamestown (1607) by 42 years
- Anyone in St. Augustine in 1565-1606 CANNOT mention Jamestown
- Plymouth (1620) is 55 years after St. Augustine
- The "13 colonies" concept doesn't exist until much later

#### 4.2: American Revolution Timeline (1763-1789)
```
1763 - End of French and Indian War, Proclamation of 1763
1765 - Stamp Act, Stamp Act Congress
1766 - Stamp Act repealed
1767 - Townshend Acts
1770 - Boston Massacre
1773 - Tea Act, Boston Tea Party
1774 - Intolerable Acts, First Continental Congress
1775 - Battles of Lexington and Concord (April 19)
1775 - Second Continental Congress, George Washington appointed commander
1775 - Battle of Bunker Hill (June)
1776 - Common Sense published (January)
1776 - Declaration of Independence (July 4)
1777 - Battle of Saratoga (turning point)
1777-1778 - Winter at Valley Forge
1778 - France enters war as US ally
1781 - Battle of Yorktown (October)
1783 - Treaty of Paris (war officially ends)
1787 - Constitutional Convention
1788 - Constitution ratified
1789 - George Washington inaugurated as first president
```

#### 4.3: Civil War Timeline (1861-1865)
```
1860 - Lincoln elected president (November)
1860-1861 - Southern states secede
1861 - Fort Sumter attacked (April 12), Civil War begins
1861 - First Battle of Bull Run (July)
1862 - Battle of Shiloh (April)
1862 - Battle of Antietam (September) - bloodiest single day
1863 - Emancipation Proclamation takes effect (January 1)
1863 - Battle of Gettysburg (July 1-3) - turning point
1863 - Gettysburg Address (November 19)
1863 - Battle of Vicksburg (July)
1864 - Sherman's March to the Sea
1865 - Lee surrenders at Appomattox (April 9)
1865 - Lincoln assassinated (April 14)
1865 - 13th Amendment ratified (December) - abolishes slavery
```

#### 4.4: Progressive Era Timeline (1890-1920)
```
1890 - Sherman Antitrust Act
1898 - Spanish-American War
1901 - Theodore Roosevelt becomes president (after McKinley assassination)
1901-1909 - Roosevelt presidency
1902 - Coal Strike
1903 - Wright Brothers flight
1906 - The Jungle published (Upton Sinclair)
1906 - Pure Food and Drug Act
1909 - NAACP founded
1912 - Progressive "Bull Moose" Party
1913 - 16th Amendment (income tax)
1913 - 17th Amendment (direct election of senators)
1913 - Federal Reserve created
1914-1918 - World War I (US enters 1917)
1920 - 19th Amendment (women's suffrage)
```

#### 4.5: World War II Timeline (1939-1945)
```
1939 - Germany invades Poland (September 1), WWII begins in Europe
1940 - France falls to Germany
1941 - Germany invades Soviet Union (June)
1941 - Pearl Harbor attacked (December 7), US enters war
1942 - Battle of Midway (June) - turning point in Pacific
1942 - Battle of Stalingrad begins (August)
1943 - Italy surrenders (September)
1944 - D-Day invasion (June 6)
1944 - Battle of the Bulge (December)
1945 - Yalta Conference (February)
1945 - Roosevelt dies, Truman becomes president (April 12)
1945 - Germany surrenders (May 8) - V-E Day
1945 - Atomic bombs dropped on Hiroshima (August 6) and Nagasaki (August 9)
1945 - Japan surrenders (August 15) - V-J Day
```

#### 4.6: Cold War Timeline (1945-1991)
```
1945 - United Nations founded
1947 - Truman Doctrine, Marshall Plan
1948-1949 - Berlin Airlift
1949 - NATO founded
1949 - Communist victory in China
1950-1953 - Korean War
1954 - Brown v. Board of Education
1955-1975 - Vietnam War
1957 - Sputnik launched (space race begins)
1961 - Berlin Wall built
1962 - Cuban Missile Crisis
1963 - Kennedy assassinated
1969 - Moon landing
1989 - Berlin Wall falls
1991 - Soviet Union collapses
```

#### 4.7: Presidential Ages Database
```
George Washington (1732-1799)
- President: 1789-1797 (age 57-65)

Thomas Jefferson (1743-1826)
- President: 1801-1809 (age 57-65)
- Wrote Declaration of Independence: 1776 (age 33)

Abraham Lincoln (1809-1865)
- President: 1861-1865 (age 52-56)
- Assassinated: April 14, 1865 (age 56)

Theodore Roosevelt (1858-1919)
- President: 1901-1909 (age 42-50)
- Youngest president ever (succeeded McKinley at age 42)

Franklin D. Roosevelt (1882-1945)
- President: 1933-1945 (age 51-63)
- Only president elected 4 times
- Died in office: April 12, 1945 (age 63)

John F. Kennedy (1917-1963)
- President: 1961-1963 (age 43-46)
- Assassinated: November 22, 1963 (age 46)
```

#### 4.8: Geographic/Political Boundaries
```
Original 13 Colonies (1607-1733):
1. Virginia (1607)
2. Massachusetts (1620)
3. New Hampshire (1623)
4. Maryland (1634)
5. Connecticut (1636)
6. Rhode Island (1636)
7. Delaware (1638)
8. North Carolina (1653)
9. South Carolina (1663)
10. New York (1664)
11. New Jersey (1664)
12. Pennsylvania (1681)
13. Georgia (1733)

Territorial Expansions:
- Louisiana Purchase: 1803 (from France)
- Florida: 1819 (from Spain)
- Texas Annexation: 1845
- Oregon Territory: 1846
- Mexican Cession: 1848 (California, Nevada, Utah, Arizona, New Mexico)
- Gadsden Purchase: 1853 (southern Arizona/New Mexico)
- Alaska Purchase: 1867 (from Russia)
- Hawaii Annexation: 1898

Statehood Dates (examples):
- Delaware: 1787 (first state)
- Pennsylvania: 1787
- California: 1850
- Texas: 1845
- Alaska: 1959
- Hawaii: 1959 (last state)
```

#### 4.9: Technology/Invention Timeline
```
1440 - Printing press (Gutenberg)
1765 - Steam engine (Watt)
1783 - Hot air balloon
1793 - Cotton gin (Eli Whitney)
1807 - Steamboat (Fulton)
1825 - First railroad (England)
1830s - Telegraph developed
1844 - Telegraph commercially viable (Morse)
1859 - Oil drilling begins
1876 - Telephone (Bell)
1879 - Light bulb (Edison)
1885 - Automobile (Benz)
1903 - Airplane (Wright Brothers)
1920s - Radio broadcasts become common
1927 - First talking movie
1936 - Television broadcasts begin
1945 - Nuclear weapons
1946 - ENIAC (first general-purpose computer)
1957 - Sputnik (space age begins)
1969 - ARPANET (precursor to internet)
1976 - Apple computer
1991 - World Wide Web
```

#### 4.10: Military Technology Timeline
```
Weapons Evolution:
- Matchlock musket: 1500s-1600s
- Flintlock musket: 1700s-1840s
- Rifle-musket (Minié ball): 1850s-1860s
- Repeating rifle: 1860s (Spencer, Henry)
- Gatling gun: 1861
- Machine gun: 1880s (Maxim)
- Airplane in warfare: WWI (1914-1918)
- Tank: WWI (1916)
- Aircraft carrier: 1920s
- Radar: 1930s
- Atomic bomb: 1945
- Jet fighters: 1940s
- ICBMs: 1950s
```

### Step 5: Anachronism Detection

For each claim, ask:

1. **The Temporal Test**: Does this event/person/thing exist at the time of the lesson?
   - If lesson is about 1565, can they mention 1607 events? NO
   - If lesson is about colonial era, can they use modern terminology? NO

2. **The Knowledge Test**: Would the characters reasonably know this information?
   - Would 1565 St. Augustine residents know about future Jamestown? NO
   - Would 1776 colonists know about the Louisiana Purchase (1803)? NO

3. **The Technology Test**: Does this technology exist in this time period?
   - Telephones in Civil War? NO (invented 1876)
   - Automobiles in American Revolution? NO (invented 1885)
   - Television in WWI? NO (1936)

4. **The Geography Test**: Do these boundaries/names exist?
   - "United States" before 1776? NO (use "colonies" or "British America")
   - "California" as a state before 1850? NO (use "California territory")
   - "Soviet Union" before 1922? NO (use "Russia")

5. **The Age Test**: Is this person the right age for this date?
   - Theodore Roosevelt age 30 in 1901? NO (he was 42)
   - Lincoln age 60 in 1863? NO (he was 54)

6. **The Causation Test**: Does cause precede effect?
   - Mentioning an event as a cause that hasn't happened yet? NO
   - Character learning from an event that's in their future? NO

### Step 6: Generate Accuracy Report

Create a detailed report with:

#### Summary
- Lesson ID and title
- Time period covered
- Total claims verified
- Number of inaccuracies found
- Severity rating (Critical / Moderate / Minor / Clean)

#### Critical Errors (Anachronisms)
List each anachronism with:
- **Location**: Chapter X, paragraph Y / Flashcard Z / Quiz question N
- **Claim**: The exact text making the false claim
- **Problem**: Why this is inaccurate
- **Timeline**: Actual dates showing the impossibility
- **Fix**: Suggested correction

Example:
```
CRITICAL ERROR #1
Location: Chapter 1, Paragraph 3
Claim: "Mateo told them about Jamestown, the English settlement to the north"
Problem: Jamestown did not exist in 1565. This is a 42-year anachronism.
Timeline:
  - St. Augustine founded: 1565
  - Jamestown founded: 1607
  - Gap: 42 years in the future
Fix: Remove all references to Jamestown. Mateo could mention:
  - Spanish settlements in the Caribbean (Cuba, Hispaniola)
  - Spanish missions in Florida
  - Competition with French (who were in Florida 1564-1565)
  - BUT NOTHING about English settlements, which don't exist yet
```

#### Moderate Errors (Incorrect Details)
- Wrong dates (off by a year or more)
- Wrong ages
- Incorrect geographic names
- Misattributed quotes or actions

#### Minor Issues (Questionable Phrasing)
- Anachronistic terminology (modern words for old concepts)
- Overgeneralized statements
- Potentially confusing timelines

#### Educational Recommendations
- Suggest clarifications to prevent student confusion
- Recommend adding dates to make timelines clearer
- Propose additional context where needed

### Step 7: Output Format

```markdown
# Historical Accuracy Report: Lesson [ID] - [Title]

## Summary
- **Time Period**: [Main date or date range]
- **Historical Claims Verified**: [Number]
- **Accuracy Rating**: ⭐⭐⭐⭐⭐ [5 = Perfect, 4 = Minor issues, 3 = Moderate, 2 = Major, 1 = Critical errors]
- **Critical Anachronisms**: [Count]
- **Moderate Errors**: [Count]
- **Minor Issues**: [Count]

---

## 🚨 CRITICAL ERRORS (Anachronisms)

### Error #1: [Brief description]
**Location**: [Where in the lesson]
**Problematic Text**:
> "[Exact quote from lesson]"

**Problem**: [Detailed explanation of the historical inaccuracy]

**Historical Timeline**:
```
[Year] - [Lesson's time period]
[Year] - [When the referenced thing actually existed]
Gap: X years [before/after]
```

**Why This Matters for Students**: [Educational impact]

**Recommended Fix**:
[Specific suggestion for correction]

**Suggested Replacement Text**:
> "[Alternative historically accurate text]"

---

## ⚠️ MODERATE ERRORS

[List moderate errors with similar structure but less detail]

---

## 📋 MINOR ISSUES

[List minor issues with brief explanations]

---

## ✅ VERIFIED ACCURATE CLAIMS

[List major claims that were verified as historically accurate - this builds confidence]

Example:
- ✅ St. Augustine founded 1565: CORRECT
- ✅ Spanish under Pedro Menéndez de Avilés: CORRECT
- ✅ French Fort Caroline destroyed 1565: CORRECT

---

## 📚 EDUCATIONAL RECOMMENDATIONS

1. [Recommendation for improvement]
2. [Additional context suggestion]
3. [Clarification suggestion]

---

## 🎯 ACTION ITEMS

- [ ] Fix critical error #1: [Brief description]
- [ ] Fix critical error #2: [Brief description]
- [ ] Review moderate errors
- [ ] Consider minor improvements

---

## OVERALL VERDICT

[Brief summary paragraph stating whether the lesson is ready for students or needs revision]
```

### Step 8: If Errors Found - Offer to Fix

If critical or moderate errors are found, ask the user:
> "I found [X] historical inaccuracies in this lesson. Would you like me to:
> 1. Fix the errors and update the lesson file
> 2. Generate a corrected version for your review
> 3. Just provide the report for manual correction"

If user chooses option 1 or 2, use the Edit tool to correct the errors in data/lessons.ts.

## Example Usage

**User**: "Check lesson 1 for historical accuracy"

**Assistant**: [Runs skill]
1. Reads lesson-1 from data/lessons.ts
2. Extracts all historical claims
3. Identifies time period (1565, St. Augustine founding)
4. Cross-references against Colonial Timeline
5. **Finds critical error**: Mateo mentions Jamestown (doesn't exist until 1607)
6. Generates detailed report showing 42-year anachronism
7. Offers to fix the error

## Critical Rules

1. **Date Verification is Mandatory**: Every date mentioned must be checked
2. **Causation Must Be Chronological**: Effect cannot precede cause
3. **Character Knowledge is Limited**: Characters can't know about future events
4. **Technology Must Exist**: No anachronistic technology
5. **Geography Must Be Accurate**: Use correct names and boundaries for the time
6. **Ages Must Calculate**: Birth year + current year = accurate age
7. **When In Doubt, Flag It**: Better to over-report than miss an error

## Special Attention Areas

### Common Anachronism Traps:
1. **Terminology Drift**: Using modern terms for historical concepts
   - "United States" before 1776 → "colonies" or "British America"
   - "Civil War" during 1861 → "War Between the States" or "The War"
   - Modern state names before statehood

2. **Retrospective Knowledge**: Characters knowing outcomes they couldn't know
   - Colonists in 1770 saying "We will win independence" (they don't know yet)
   - Soldiers in 1863 saying "The war will end in 1865" (impossible to know)

3. **Technology Creep**: Modern conveniences sneaking into historical settings
   - Too-advanced medical knowledge
   - Communication methods that don't exist yet
   - Transportation that's anachronistic

4. **Causation Errors**: Mentioning causes after effects
   - Saying an 1800 event was caused by an 1803 event
   - Character learning from a future battle

5. **Forward References**: Mentioning things that don't exist yet
   - The Jamestown problem (mentioned before it exists)
   - Future presidents, inventions, places

## Integration with Other Skills

- **Use AFTER lesson-builder**: Check newly created lessons
- **Use BEFORE image-prompter**: Ensure text is accurate before creating images
- **Use WITH lesson-builder**: Can be run automatically after lesson creation

## Success Criteria

A successful accuracy check:
- ✅ Reads entire lesson thoroughly
- ✅ Extracts all date-sensitive claims
- ✅ Cross-references against historical timelines
- ✅ Identifies all anachronisms (none missed)
- ✅ Provides clear, actionable fixes
- ✅ Educates user about the historical context
- ✅ Offers to implement corrections

## Important Notes

- This skill is CRITICAL for educational content quality
- Historical inaccuracies mislead students and damage credibility
- Even "small" anachronisms (like Jamestown in 1565) are MAJOR errors
- Every lesson should pass this check before being published
- Better to be pedantic about accuracy than to teach false history
