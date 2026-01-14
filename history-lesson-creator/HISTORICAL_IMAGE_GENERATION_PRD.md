# Historical Image Generation PRD
## History for Homeschoolers - 51 Lessons (1565-1920)

**Version:** 2.2
**Last Updated:** 2026-01-14
**Status:** ✅ COMPLETE (276/276 images - 100% success rate)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Historical Accuracy Framework](#4-historical-accuracy-framework)
5. [Era-Specific Visual Guidelines](#5-era-specific-visual-guidelines)
6. [Lesson-by-Lesson Image Specifications](#6-lesson-by-lesson-image-specifications)
7. [Anachronism Prevention Database](#7-anachronism-prevention-database)
8. [Technical Implementation](#8-technical-implementation)
9. [Validation & Quality Assurance](#9-validation--quality-assurance)
10. [Prompt Engineering Best Practices](#10-prompt-engineering-best-practices)
11. [Implementation Phases](#11-implementation-phases)

---

## 1. Executive Summary

### Purpose
Generate historically accurate, visually compelling images for 51 American history lessons targeting 7th-grade homeschool students. Each lesson contains 5 chapters told from a first-person perspective of a young narrator living during that era (1565-1920).

### Scope
- **~270 total images** (5-9 per lesson × 51 lessons, variable chapter counts)
- **355 years of history** spanning 13 distinct eras
- **51 unique narrators** with specific ages, ethnicities, and locations

### Current Status
- **Lessons 1-2**: 11 images generated and accepted (100%)
- **Lessons 3-51**: 265 images generated and accepted (100%)
- **Total**: 276 images complete with 100% acceptance rate

### Core Requirements
1. **Historical Accuracy** - No anachronisms; period-correct clothing, architecture, technology
2. **Narrator Representation** - Images must reflect each lesson's specific narrator demographics
3. **Educational Value** - Visuals must enhance understanding of historical context
4. **Age Appropriateness** - Suitable for 7th-grade students (12-13 years old)
5. **Consistent Style** - Cohesive visual language across all lessons

---

## 2. Current State Analysis

### Existing Pipeline
```
Lesson Text → GPT-OS (era-action-props) → Z-Image Turbo → VLM Evaluation → Keepers/Fails
```

### What's Working
- GPT-OS prompt generation at 100% success rate (after num_predict fix)
- Two-stage VLM evaluation (MiniCPM-V → Qwen2.5-VL)
- Auto-refinement loop (up to 3 attempts)
- Batch processing mode for efficiency
- GPU memory management between phases
- Z-Image Turbo via ComfyUI (8 steps, fast generation)

### Current Gaps Identified

| Gap | Impact | Priority |
|-----|--------|----------|
| No era-specific clothing database | Images show generic "old-timey" clothes | Critical |
| Missing architectural period guides | Buildings look anachronistic | Critical |
| No narrator demographic enforcement | Images don't match story character | High |
| Limited negative prompt library | Modern elements slip through | High |
| No regional accuracy (North vs South vs Frontier) | Generic American settings | Medium |
| Missing seasonal/weather context | Inconsistent environmental details | Medium |
| No lighting period accuracy | Electric lighting appears pre-1880 | Medium |

### Sample Failure Analysis (Session 20260112_205013)
- Only 1/5 images passed (Chapter 4, score 82)
- Common failures: generic colonial imagery, wrong clothing period, modern materials visible

---

## 3. Goals & Success Metrics

### Primary Goals

1. **95% Historical Accuracy Rate** - Images pass VLM evaluation with score ≥75
2. **Zero Anachronisms** - No post-period technology, clothing, or architecture
3. **Narrator Authenticity** - 100% of images match narrator age, gender, ethnicity
4. **Educational Enhancement** - Images reinforce key lesson concepts

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| VLM First-Pass Rate | ≥80% | Images scoring 75+ on Llama Vision |
| VLM Second-Pass Rate | ≥95% | Images scoring 75+ on Qwen VL |
| Anachronism Detection | 0 per image | Historical accuracy checker |
| Narrator Match | 100% | Manual review checklist |
| Student Engagement | 4.5/5 rating | User feedback surveys |
| Generation Efficiency | ≤2 attempts/image | Pipeline logs |

---

## 4. Historical Accuracy Framework

### Core Principles

#### 4.1 Temporal Accuracy
Every visual element must exist and be in use during the lesson's time period:
- If lesson is set in 1620, nothing invented after 1620 can appear
- Technology adoption takes time (telegraphs existed 1844, but rural areas got them later)

#### 4.2 Regional Accuracy
America varied dramatically by region:
- **New England**: Stone walls, saltbox houses, cod fishing
- **Mid-Atlantic**: Dutch/German architecture, wheat farming
- **Southern Colonies**: Plantation houses, tobacco/cotton fields
- **Frontier**: Log cabins, trading posts, wilderness

#### 4.3 Social Class Accuracy
Clothing and possessions varied by wealth:
- **Wealthy**: Fine fabrics, imported goods, elaborate homes
- **Middle Class**: Practical but neat clothing, modest homes
- **Poor/Servants**: Rough homespun cloth, minimal possessions
- **Enslaved**: Provided clothing, often coarse materials

#### 4.4 Ethnic Representation Accuracy
- **Indigenous Peoples**: Tribe-specific clothing, housing, tools
- **African Americans**: Context of slavery vs. freedom, regional variations
- **European Immigrants**: Country-of-origin influence on dress
- **Mixed Heritage**: Blended cultural elements where historically accurate

---

## 5. Era-Specific Visual Guidelines

### ERA 1: Spanish Colonial (1565-1600)
**Lessons:** 1

#### Clothing
| Category | Description |
|----------|-------------|
| Spanish Men | Doublet and hose, leather boots, ruffs (wealthy), linen shirts, wool breeches |
| Spanish Women | Long gowns with high collars, mantillas, modest colors |
| Spanish Boys (13-15) | Smaller versions of adult clothing, simpler doublets |
| Timucua Indigenous | Breechcloths, deerskin, shell jewelry, tattoos, long hair |
| Spanish Soldiers | Morion helmets, breastplates, pikes, matchlock muskets |

#### Architecture
- **Spanish**: Adobe and timber frame, coquina stone (St. Augustine), wooden palisades
- **Timucua**: Circular thatched houses, communal structures

#### Props & Technology
- Wooden sailing ships (galleons), fishing nets
- Iron tools (axes, knives), wooden farming implements
- Oil lamps, candles (no glass lanterns with metal frames)
- Religious items: crucifixes, rosaries, Catholic icons

#### AVOID
- Any English colonial elements
- Brick buildings (wrong region)
- Any Native American elements from wrong tribes (no feather headdresses)
- Steel swords with elaborate hilts (use simpler rapiers/cutlasses)

---

### ERA 2: Early English Settlement (1607-1630)
**Lessons:** 2, 3, 4

#### Jamestown (1607-1620) - Lesson 2
| Category | Description |
|----------|-------------|
| English Gentlemen | Doublets with padded shoulders, starched ruffs, paned trunk hose |
| Indentured Servants | Plain linen shirts, wool breeches, no ruffs, leather aprons |
| Powhatan Indigenous | Deerskin mantles, shell beadwork, feathers (not war bonnets), body paint |
| Women | Bodices with stomachers, long skirts, linen caps (middling class) |

#### Plymouth (1620-1630) - Lessons 3, 4
| Category | Description |
|----------|-------------|
| Pilgrim Men | Dark wool doublets (NOT all black), white linen collars, tall felt capotain hats (NO buckles - this is a myth) |
| Pilgrim Women | Modest bodices, long wool skirts, white coifs/caps, aprons |
| Pilgrim Children | Miniature adult clothing, leading strings for young children |
| Wampanoag | Deerskin clothing, wampum belts, copper ornaments |

#### Architecture
- **Jamestown**: Wooden palisade fort, wattle-and-daub houses, thatch roofs
- **Plymouth**: Timber-frame houses, steep roofs, central chimneys, small windows (glass expensive)

#### Props & Technology
- Matchlock muskets (NOT flintlocks until 1630s)
- Wooden bowls and trenchers (metal plates for wealthy)
- Spinning wheels, butter churns
- Quill pens, hand-bound books

#### AVOID
- Buckle shoes (Pilgrims wore plain leather shoes)
- All-black Pilgrim clothing (they wore browns, greens, reds)
- Log cabins (Swedish introduced in 1638)
- Thanksgiving turkey imagery (historically unclear)

---

### ERA 3: Colonial Expansion (1630-1700)
**Lessons:** 5, 6, 7

#### Middle Colonies (1664-1700) - Lesson 5
| Category | Description |
|----------|-------------|
| Dutch Merchants | Wide-brimmed hats, lace collars, fitted jackets |
| Quaker Men | Plain gray/brown clothing, broad-brimmed hats, no buttons (use hooks) |
| Quaker Women | Plain dresses, white caps, no jewelry |
| German Settlers | Traditional folk clothing, distinctive caps |

#### Southern Colonies (1660-1700) - Lesson 6
| Category | Description |
|----------|-------------|
| Plantation Owners | Cavalier style: long wigs, lace cuffs, embroidered waistcoats |
| Yeoman Farmers | Practical linen shirts, leather breeches, straw hats |
| Enslaved Africans | Coarse osnaburg cloth, no shoes (often), head wraps |
| Indentured Servants | Similar to yeoman but more worn clothing |

#### Triangular Trade (1650-1750) - Lesson 7
| Category | Description |
|----------|-------------|
| Ship Captains | Cocked hats (tricorn beginning), blue coats, brass buttons |
| Sailors | Loose trousers, striped shirts, bare feet or soft shoes |
| Merchants | Periwigs beginning, long waistcoats, walking sticks |

#### Architecture
- **Dutch**: Stepped gables, brick construction, tile roofs
- **Southern**: Georgian beginnings, central hall, symmetry, tobacco barns
- **New England**: Saltbox houses, clapboard siding, central chimney

#### Props & Technology
- Flintlock muskets (replacing matchlocks by 1650)
- Tobacco: clay pipes, hogshead barrels, curing barns
- Trade goods: rum barrels, molasses, textiles

#### AVOID
- Georgian mansions in early period (develop by 1700s)
- Cast iron stoves (Franklin stove 1741)
- Spectacles with modern frames

---

### ERA 4: Colonial Religious & Military (1730-1763)
**Lessons:** 8, 9, 10

#### Great Awakening (1730-1750) - Lesson 8
| Category | Description |
|----------|-------------|
| Preachers | Black robes or plain dark suits, white bands at throat |
| Congregants | Sunday best: women in caps and shawls, men in clean wool |
| Revival Meeting | Outdoor setting, temporary wooden platforms |

#### French and Indian War (1755-1763) - Lesson 9
| Category | Description |
|----------|-------------|
| British Regulars | Red coats, white crossbelts, tricorn hats, Brown Bess muskets |
| Colonial Militia | Mix of civilian clothes and military items, hunting shirts |
| French Soldiers | White/gray coats with blue facings, tricorn hats |
| Native Warriors | Tribal-specific war paint, shaved heads with scalp locks, trade goods mixed with traditional |

#### Colonial Life 1763 - Lesson 10
| Category | Description |
|----------|-------------|
| Urban Gentry | Full Georgian style: powdered wigs, brocade waistcoats, silk stockings |
| Craftsmen | Leather aprons, rolled sleeves, practical clothing |
| Women | Sacque-back gowns (wealthy), short gowns and petticoats (middling) |
| Children | Boys in gowns until age 6-7, then breeching into breeches |

#### Architecture
- **Churches**: White clapboard, tall steeples, clear glass windows
- **Military**: Log forts, bastions, palisades
- **Urban**: Brick townhouses, cobblestone streets

#### Props & Technology
- Brown Bess muskets, powder horns, cartridge boxes
- Printing presses (hand-operated)
- Carriages for wealthy, farm wagons for others
- Tea sets (Chinese porcelain for wealthy)

#### AVOID
- Rifles in large numbers (common by 1776, but rare before)
- American flags (none exist yet)
- Independence-era imagery

---

### ERA 5: Revolutionary Period (1765-1783)
**Lessons:** 11, 12, 13, 14, 15, 16, 17

#### Pre-War Tensions (1765-1774) - Lessons 11-13
| Category | Description |
|----------|-------------|
| Patriots | Homespun cloth (boycott of British goods), liberty caps, cockades |
| Loyalists | Continued British fashion, finer imported goods |
| British Soldiers | Red coats, white breeches, bearskin caps (grenadiers) |
| Sons of Liberty | Working-class clothing, tar and feathers imagery |
| Boston Women | Homespun dresses as political statement, spinning bees |

#### Revolutionary War (1775-1783) - Lessons 14-17
| Category | Description |
|----------|-------------|
| Continental Army (Early) | Mix of civilian clothes, hunting shirts, tricorn hats |
| Continental Army (Late) | Blue coats with state-specific facings, after French aid |
| Militiamen | Civilian clothes, minimal uniformity |
| Officers | Gorgets, swords, epaulettes, mounted |
| Camp Followers | Women in practical dress, children |
| Black Soldiers | Mixed clothing, some in Continental uniform |

#### Valley Forge Specifics (Lesson 16)
- Ragged uniforms, blanket coats, bloody footprints
- Makeshift shelters, log huts
- Starvation imagery: thin faces, cooking scraps

#### Yorktown Specifics (Lesson 17)
- Siege works, trenches, cannon
- French allies in white uniforms with blue facings
- Surrender scene imagery

#### Architecture
- **Boston**: Georgian townhouses, cobblestone streets, Long Wharf
- **Philadelphia**: Brick row houses, Independence Hall style
- **Camps**: Log huts, tent cities, earthworks

#### Props & Technology
- Charleville muskets (French aid), Pennsylvania rifles
- Drums and fifes, regimental colors
- Liberty trees, tarred and feathered effigies
- Tea chests (Boston Tea Party)

#### AVOID
- Betsy Ross flag before 1777 (and even then, uncertain)
- Electric lighting at any indoor scene
- Metallic industrial elements

---

### ERA 6: Early Republic (1787-1800)
**Lessons:** 18, 19, 20, 21

#### Constitutional Era (1787-1791) - Lessons 18-20
| Category | Description |
|----------|-------------|
| Founding Fathers | Powdered wigs, silk stockings, buckled shoes, long coats |
| Washington | Military uniform or civilian dark suit, no crown imagery |
| Common Citizens | Simpler versions of elite fashion, less powder/wigs |
| Women | Empire waist beginning, mob caps, fichus |

#### Federalist Era (1790s) - Lesson 21
| Category | Description |
|----------|-------------|
| Hamilton Faction | Urban, mercantile imagery, banking symbols |
| Jefferson Faction | Rural, agrarian imagery, farmer iconography |
| High Fashion | Directory/Empire transition, less powder |

#### Architecture
- **Government**: Federal style, columns, domes
- **Urban**: Brick townhouses, fanlights over doors
- **Rural**: Expanded farmhouses, barns

#### Props & Technology
- Quill pens and inkwells, sealing wax
- Carriages (phaetons, coaches)
- Early banking instruments
- Newspapers (hand-set type)

#### AVOID
- Eagles as national symbol before 1782 (Continental Congress adoption)
- Modern U.S. Capitol dome (current dome from 1860s)
- Gas lighting (invented 1792, not widespread)

---

### ERA 7: Jeffersonian Expansion (1803-1815)
**Lessons:** 22, 23, 24

#### Louisiana Purchase (1803) - Lesson 22
| Category | Description |
|----------|-------------|
| New Orleans French | Creole fashion, lighter fabrics for climate |
| American Officials | Federal-era formal dress |
| Traders/Frontiersmen | Buckskin, fur hats, trade goods |

#### Lewis and Clark (1804-1806) - Lesson 23
| Category | Description |
|----------|-------------|
| Corps of Discovery | Military uniforms (worn/adapted), expedition gear |
| Sacagawea | Shoshone dress, cradleboard, practical frontier wear |
| Plains Tribes | Specific tribal dress: Mandan, Sioux, Nez Perce distinctions |
| Frontier Gear | Canoes, pack horses, scientific instruments |

#### War of 1812 (1812-1815) - Lesson 24
| Category | Description |
|----------|-------------|
| U.S. Army | Blue coats, red facings, shakos replacing tricorns |
| Navy | Blue jackets, white trousers |
| British (1812 era) | Red coats, stovepipe shakos |
| Militia | Varied civilian/military mix |

#### Architecture
- **New Orleans**: French Quarter style, wrought iron balconies
- **Frontier**: Log structures, trading posts
- **Washington D.C.**: Federal buildings (before British burning)

#### Props & Technology
- Keelboats, pirogues
- Trade goods: blankets, beads, metal tools
- Compasses, sextants, journals

#### AVOID
- Steamboats before 1807 (Fulton's Clermont)
- Conestoga wagons (Oregon Trail era imagery)
- Photography equipment

---

### ERA 8: Jacksonian America (1823-1850)
**Lessons:** 25, 26, 27, 28, 29, 30

*Note: Extended to 1850 to include Seneca Falls Convention (1848)*

#### Monroe Doctrine Era (1823) - Lesson 25
| Category | Description |
|----------|-------------|
| Politicians | Transition from wigs to natural hair, high collars, cravats |
| Women | Empire waist declining, fuller skirts beginning |

#### Jacksonian Democracy (1828-1840) - Lesson 26
| Category | Description |
|----------|-------------|
| "Common Man" | Less formal dress, stovepipe hats, frontier influence |
| Western Settlers | Practical work clothes, boots, broad-brimmed hats |
| Women | Leg-of-mutton sleeves, fuller skirts, bonnets |

#### Trail of Tears (1838) - Lesson 27
| Category | Description |
|----------|-------------|
| Cherokee People | Mix of traditional and adapted European clothing |
| Cherokee Women | Adapted dresses with traditional elements |
| Cherokee Men | Some in European-style suits (assimilation), others traditional |
| U.S. Soldiers | 1830s military uniforms, blue with yellow cavalry |
| Forced March | Wagons, walking families, winter conditions |

#### Reform Movements (1830-1840) - Lessons 28-30
| Category | Description |
|----------|-------------|
| Abolitionists | Quaker influence, plain dress |
| Temperance Advocates | Middle-class respectability |
| Women's Rights | Practical dress, Bloomer beginnings (1851) |
| Religious Revivalists | Camp meeting attire, outdoor settings |

#### Architecture
- **Plantation**: Greek Revival, columns, symmetry
- **Frontier**: Expanding log to frame houses
- **Urban**: Row houses, early factories

#### Props & Technology
- Steam locomotives (1830s railroad expansion)
- Cotton gin imagery
- Printing press (political newspapers)

#### AVOID
- Daguerreotypes in hand before 1839
- Telegraph wires before 1844
- Covered wagons (more 1840s-1850s imagery)

---

### ERA 9: Manifest Destiny (1840-1860)
**Lessons:** 31, 32, 33, 34, 35, 36, 37

#### Oregon Trail/Westward (1846) - Lesson 31
| Category | Description |
|----------|-------------|
| Pioneer Men | Wool trousers, cotton shirts, broad-brimmed hats |
| Pioneer Women | Practical calico dresses, sunbonnets |
| Children | Miniature adult clothing |
| Equipment | Covered wagons (Conestoga), oxen, campfire cooking |

#### Mexican-American War (1846-1848) - Lesson 32
| Category | Description |
|----------|-------------|
| U.S. Soldiers | Blue uniforms, shakos, dragoon cavalry |
| Mexican Soldiers | Green/blue uniforms, distinctive shakos |
| Californios/Tejanos | Spanish-influenced ranch wear |

#### Pre-Civil War Tensions (1850-1860) - Lessons 33-37
| Category | Description |
|----------|-------------|
| 1850s Men | Frock coats, top hats, facial hair increasing |
| 1850s Women | Wide hoop skirts (crinoline), elaborate bonnets |
| Enslaved People | Coarse clothing, no shoes often, work context |
| Free Blacks | Modest but respectable dress, Northern vs Southern variations |
| Kansas Settlers | Armed farmers, Sharps rifles ("Beecher's Bibles") |

#### Architecture
- **Plantation**: Peak of Greek Revival, slave quarters
- **Northern Industrial**: Brick factories, tenements
- **Kansas Territory**: Sod houses, log cabins, raw settlements

#### Props & Technology
- Colt revolvers, Sharps rifles
- Printing presses (abolitionist newspapers)
- Uncle Tom's Cabin book (1852)
- Railroad locomotives (expanding network)

#### AVOID
- Repeating rifles (Civil War era)
- Photographs in color
- Electric anything

---

### ERA 10: Civil War (1861-1865)
**Lessons:** 38, 39, 40

#### Early War (1861-1862) - Lesson 38
| Category | Description |
|----------|-------------|
| Union Army | Blue wool uniforms, kepis, leather accoutrements |
| Confederate Army | Gray (varied shades), butternut when gray unavailable |
| Officers | Frock coats, swords, sashes |
| Civilians | 1860s fashion, women in mourning increasingly |
| Camp Life | Tents, campfires, hardtack/coffee |

#### Mid-War (1863) - Lesson 39
| Category | Description |
|----------|-------------|
| Battle Scenes | Smoke, cannon, infantry lines |
| Gettysburg Civilians | Pennsylvania Dutch influence, farm families |
| Field Hospitals | Crude surgery, bandages, ambulances |

#### War's End (1865) - Lesson 40
| Category | Description |
|----------|-------------|
| Appomattox | McLean House interior, surrender table |
| Lee | Gray uniform, sword |
| Grant | Mud-spattered field uniform |
| Lincoln | Tall stovepipe hat, black suit, beard |
| Ford's Theatre | 1860s theatre interior, box seats |

#### Architecture
- **Military**: Entrenchments, siege lines, fortifications
- **Destroyed Cities**: Richmond, Atlanta ruins
- **Northern Cities**: Unchanged urban landscape

#### Props & Technology
- Springfield rifles, Enfield rifles
- Cannon (Napoleon, Parrott)
- Telegraphs (field use)
- Railroads (military use)
- Photography (Matthew Brady era)

#### AVOID
- Machine guns (Gatling existed but rare)
- Modern surgical equipment
- Color photographs

---

### ERA 11: Reconstruction (1865-1877)
**Lessons:** 41, 42, 43

#### Reconstruction Era
| Category | Description |
|----------|-------------|
| Freedmen | Transitioning from slave clothing to self-purchased |
| Freedwomen | Simple dresses, head wraps, church Sunday best |
| Freedmen's Bureau | Northern officials in suits |
| Carpetbaggers/Scalawags | Business suits, distinctive luggage |
| KKK (if depicted) | White robes, hoods (historically accurate for education) |
| Black Politicians | Formal suits, dignity emphasized |

#### Architecture
- **Freedmen's Schools**: Simple frame buildings
- **Southern Towns**: Rebuilding, some ruins
- **Black Churches**: Simple frame structures, central to community

#### Props & Technology
- Schoolbooks, chalkboards
- Farming implements (sharecropping)
- Voting ballots (paper)
- Railroad expansion

#### AVOID
- Modern civil rights imagery
- Integrated scenes that weren't realistic for era
- Romanticized plantation imagery

---

### ERA 12: Gilded Age (1870-1900)
**Lessons:** 44, 45, 46, 47

#### Industrial America (1870-1900) - Lesson 44
| Category | Description |
|----------|-------------|
| Industrialists | Top hats, long coats, gold watch chains |
| Factory Workers | Work clothes, aprons, child labor imagery |
| Women Workers | Simple dresses, hair up, factory conditions |
| Urban Poor | Tenement imagery, crowded conditions |

#### Immigration (1880-1920) - Lesson 45
| Category | Description |
|----------|-------------|
| Ellis Island Arrivals | European peasant dress, bundles, ethnic variety |
| Italian Immigrants | Southern Italian folk dress transitioning |
| Eastern European Jews | Traditional clothing, head coverings |
| Chinese Immigrants | Queue hairstyle (men), traditional dress |
| Americanization | Transition to American clothing |

#### Labor Movement (1877-1914) - Lesson 46
| Category | Description |
|----------|-------------|
| Union Workers | Work clothes, union buttons/badges |
| Strikers | Picket signs, mass gatherings |
| Pinkertons | Suits, weapons |
| Child Workers | Small-sized work clothes, industrial settings |

#### Populism (1890s) - Lesson 47
| Category | Description |
|----------|-------------|
| Farmers | Overalls becoming common, straw hats |
| Farm Women | Practical calico, aprons, bonnets |
| Political Rallies | Outdoor gatherings, banners |

#### Architecture
- **Industrial**: Factories with smokestacks, tenements
- **Wealthy**: Victorian mansions, ornate details
- **Rural**: Farmhouses, barns, windmills (Plains)

#### Props & Technology
- Steam engines, factory machinery
- Electric lighting (late period, urban)
- Telephones (1876 invention, spreading)
- Typewriters (1870s onward)

#### AVOID
- Automobiles (rare until 1900s)
- Radio equipment
- Modern industrial safety equipment

---

### ERA 13: Progressive Era (1900-1920)
**Lessons:** 48, 49, 50, 51

#### Progressive Reform (1900-1920) - Lesson 48
| Category | Description |
|----------|-------------|
| Settlement House Workers | Simple professional dress, practical |
| Immigrants | Transitioning to American styles |
| Middle-Class Reformers | Edwardian fashion, high collars, long skirts |

#### Women's Suffrage (1848-1920) - Lesson 49
| Category | Description |
|----------|-------------|
| Suffragists | White dresses (symbolism), sashes, banners |
| Working Women | Shirtwaists, long skirts |
| 1910s Fashion | Hobble skirts, elaborate hats |

#### World War I (1914-1918) - Lesson 50
| Category | Description |
|----------|-------------|
| Doughboys | Olive drab uniforms, campaign hats, puttees |
| Officers | Sam Browne belts, insignia |
| French Setting | Trenches, shell craters, mud |
| Home Front | Liberty Bonds, women in workforce |

#### Theodore Roosevelt (1901) - Lesson 51
| Category | Description |
|----------|-------------|
| TR | Pince-nez glasses, robust physique, Rough Rider imagery |
| Progressive Politicians | Business suits, early 1900s style |

#### Architecture
- **Urban**: Steel-frame buildings, department stores
- **Settlement Houses**: Urban neighborhood settings
- **Trenches**: WWI Western Front

#### Props & Technology
- Automobiles (Model T 1908)
- Airplanes (Wright Brothers 1903)
- Machine guns, gas masks (WWI)
- Motion pictures (early)
- Telephones (desk models)

#### AVOID
- Modern WWI movies aesthetic (too clean)
- Post-1920 fashion (flapper era)
- Television, radio broadcasting

---

## 6. Lesson-by-Lesson Image Specifications

### Master Reference Table

| # | Lesson Title | Era | Year | Narrator | Age | Gender | Ethnicity | Location |
|---|--------------|-----|------|----------|-----|--------|-----------|----------|
| 1 | One World to the Next | Spanish Colonial | 1565 | Mateo | 13 | M | Spanish | St. Augustine, FL |
| 2 | Survival in Jamestown | Early English | 1609 | Samuel | 14 | M | English | Jamestown, VA |
| 3 | The Mayflower Compact | Early English | 1620 | Elizabeth | 12 | F | English | Plymouth, MA |
| 4 | City Upon a Hill | Colonial | 1630 | John | 13 | M | English (Puritan) | Boston, MA |
| 5 | Diversity in the Colonies | Colonial | 1680 | Maria | 14 | F | Dutch | New York |
| 6 | The Southern Way | Colonial | 1690 | Thomas | 14 | M | English | Virginia |
| 7 | Triangular Trade | Colonial | 1720 | James | 15 | M | English | Boston, MA |
| 8 | The Great Awakening | Colonial | 1741 | Sarah | 14 | F | English | Connecticut |
| 9 | French and Indian War | Military | 1755 | Benjamin | 16 | M | English | Virginia Frontier |
| 10 | Colonial Life | Colonial | 1763 | Rachel | 15 | F | English | Philadelphia, PA |
| 11 | No Taxation | Revolutionary | 1765 | William | 16 | M | English | Boston, MA |
| 12 | Boston Massacre | Revolutionary | 1770 | Abigail | 14 | F | English | Boston, MA |
| 13 | Boston Tea Party | Revolutionary | 1773 | Thomas | 15 | M | English | Boston, MA |
| 14 | Shot Heard Round World | Revolutionary | 1775 | Nathan | 17 | M | English | Concord, MA |
| 15 | Common Sense | Revolutionary | 1776 | Hannah | 16 | F | English | Philadelphia, PA |
| 16 | Valley Forge | Revolutionary | 1777 | Joseph | 17 | M | English | Valley Forge, PA |
| 17 | Yorktown | Revolutionary | 1781 | Marcus | 16 | M | African American | Yorktown, VA |
| 18 | A More Perfect Union | Early Republic | 1787 | Rebecca | 15 | F | American | Philadelphia, PA |
| 19 | President Washington | Early Republic | 1789 | Eleanor | 14 | F | American | New York, NY |
| 20 | Bill of Rights | Early Republic | 1791 | Jacob | 16 | M | American | United States |
| 21 | Hamilton vs Jefferson | Early Republic | 1796 | Samuel | 15 | M | American | Virginia |
| 22 | Louisiana Purchase | Jeffersonian | 1803 | Marie | 14 | F | French-American | New Orleans, LA |
| 23 | Lewis and Clark | Jeffersonian | 1805 | William | 17 | M | American | Western Frontier |
| 24 | War of 1812 | Jeffersonian | 1814 | Daniel | 16 | M | American | Baltimore, MD |
| 25 | Monroe Doctrine | Jacksonian | 1823 | Clara | 15 | F | American | Washington, DC |
| 26 | Jacksonian Democracy | Jacksonian | 1829 | Thomas | 15 | M | American | Western Frontier |
| 27 | Indian Removal | Jacksonian | 1838 | Sarah | 14 | F | Cherokee | Cherokee Nation |
| 28 | Nullification Crisis | Jacksonian | 1832 | James | 16 | M | American | South Carolina |
| 29 | Second Great Awakening | Jacksonian | 1831 | Emily | 15 | F | American | New York |
| 30 | Seneca Falls | Jacksonian | 1848 | Charlotte | 17 | F | American | Seneca Falls, NY |
| 31 | Manifest Destiny | Expansion | 1846 | Samuel | 16 | M | American | Oregon Trail |
| 32 | Mexican-American War | Expansion | 1847 | Miguel | 16 | M | Mexican-American | Texas/Mexico |
| 33 | Compromise of 1850 | Expansion | 1850 | Anna | 15 | F | American | California |
| 34 | Uncle Tom's Cabin | Expansion | 1852 | Rebecca | 14 | F | American | Northern States |
| 35 | Kansas-Nebraska Act | Expansion | 1856 | John | 17 | M | American | Kansas Territory |
| 36 | Dred Scott | Expansion | 1857 | Frederick | 16 | M | African American | Pennsylvania |
| 37 | Lincoln's Election | Expansion | 1860 | William | 15 | M | American | South Carolina |
| 38 | Civil War Begins | Civil War | 1862 | Thomas | 17 | M | American | Northern States |
| 39 | Gettysburg & Vicksburg | Civil War | 1863 | Sarah | 15 | F | American | Gettysburg, PA |
| 40 | Appomattox & Lincoln | Civil War | 1865 | Daniel | 16 | M | American | Virginia |
| 41 | Reconstruction Begins | Reconstruction | 1865 | Marcus | 15 | M | African American | Georgia |
| 42 | Radical Reconstruction | Reconstruction | 1868 | Eliza | 16 | F | African American | South Carolina |
| 43 | End of Reconstruction | Reconstruction | 1877 | Samuel | 17 | M | African American | Mississippi |
| 44 | Gilded Age | Gilded Age | 1890 | Anna | 15 | F | American | New York City |
| 45 | Immigration | Gilded Age | 1892 | Giuseppe | 14 | M | Italian | Ellis Island/NYC |
| 46 | Labor Movement | Gilded Age | 1886 | Michael | 17 | M | Irish-American | United States |
| 47 | Populist Movement | Gilded Age | 1896 | Emma | 16 | F | American | Kansas |
| 48 | Progressive Era | Progressive | 1910 | Catherine | 15 | F | American | Chicago, IL |
| 49 | Women's Suffrage | Progressive | 1920 | Alice | 16 | F | American | United States |
| 50 | World War I | Progressive | 1918 | James | 18 | M | American | France |
| 51 | Rough Rider President | Progressive | 1901 | Theodore Roosevelt | Adult | M | American | Washington, DC |

---

### Detailed Scene Requirements per Chapter

For each of the 51 lessons × 5 chapters = 255 images, specific scene requirements:

#### Chapter Types (Consistent Pattern)
1. **Chapter 1: "The Journey Begins"** - Establishing shot, narrator introduction
2. **Chapter 2: "Survival and Struggle"** - Conflict/challenge scene
3. **Chapter 3: "Building a New World"** - Action/progress scene
4. **Chapter 4: "Two Worlds Collide"** - Tension/confrontation scene
5. **Chapter 5: "Reflections"** - Contemplative/resolution scene

#### Standard Shot Types
| Chapter | Shot Type | Composition |
|---------|-----------|-------------|
| 1 | Wide establishing | Setting visible, narrator small in frame |
| 2 | Medium action | Narrator engaged in challenge |
| 3 | Medium-wide | Narrator with others, community activity |
| 4 | Close-medium | Emotional intensity, key moment |
| 5 | Medium contemplative | Narrator reflecting, possibly looking at horizon |

---

## 7. Anachronism Prevention Database

### Critical Timeline Events

Items cannot appear before their dates:

| Item | Invention/Introduction | Notes |
|------|----------------------|-------|
| Log cabins | 1638 | Swedish settlers introduced |
| Flintlock muskets | ~1630 | Replaced matchlocks |
| Franklin stove | 1741 | Cast iron heating |
| Lightning rod | 1752 | Franklin invention |
| Spinning jenny | 1764 | Industrial revolution |
| Cotton gin | 1793 | Whitney invention |
| Steamboat | 1807 | Fulton's Clermont |
| Gas lighting | 1816 | Baltimore first US city |
| Railroad | 1830 | First US passenger rail |
| Telegraph | 1844 | Morse code |
| Daguerreotype | 1839 | First practical photography |
| Sewing machine | 1846 | Howe patent |
| Kerosene lamp | 1853 | Replaced whale oil |
| Elevator (safety) | 1853 | Otis invention |
| Steel (Bessemer) | 1856 | Mass production |
| Cable car | 1873 | San Francisco first |
| Telephone | 1876 | Bell patent |
| Phonograph | 1877 | Edison invention |
| Electric light | 1879 | Edison practical bulb |
| Skyscraper (steel) | 1885 | Home Insurance Building |
| Automobile (practical) | 1886 | Benz patent |
| Motion pictures | 1895 | Lumière brothers |
| Radio broadcast | 1920 | KDKA first |

### Universal Anachronisms (Never Include)

- Wristwatches (pocket watches only until WWI)
- Plastic anything
- Zippers (1893, but rare until 1930s)
- Sunglasses (modern style)
- Synthetic fabrics
- Electric lighting before 1880
- Paved roads before 1870s
- Steel-frame buildings before 1885
- Airplanes before 1903
- Automobiles before 1890s

### Regional-Specific Warnings

| Region | Common Error | Correct Approach |
|--------|--------------|------------------|
| Florida 1565 | English colonial style | Spanish colonial only |
| Plymouth 1620 | Log cabins | Timber-frame, wattle-daub |
| Virginia 1607 | Brick houses | Wooden palisade, thatch |
| Frontier 1800s | Too developed | Raw settlements, wilderness |
| Civil War South | Modern ruins | Period-accurate destruction |

### Problem Lessons (RESOLVED)

These lessons had persistent accuracy issues that were fixed by rewriting prompts:

| Lesson | Issue | Fix Applied | Result |
|--------|-------|-------------|--------|
| **L7 (Triangular Trade)** | Ch5 generic imagery | Rewrote with specific Boston harbor details | ✅ PASSED (90/60=75) |
| **L19 (President Washington)** | Ch6,7 showed D.C. (wrong - capital was Philadelphia in 1797) | Rewrote with Philadelphia setting, removed White House/Capitol references | ✅ ALL PASSED (85-95 avg) |
| **L19 Ch4** | Generic "colonial settlement" prompt | Rewrote with specific Whiskey Rebellion scene | ✅ PASSED (85/85=85) |
| **L38 (Civil War Begins)** | Ch1 lacked specific details | Added accurate Bull Run battle details, Union uniforms | ✅ PASSED (95/85=90) |
| **L49 (Women's Suffrage)** | Ch4 era mismatch (1848 vs 1920) | Fixed era to 1920, accurate polling place scene | ✅ PASSED (85/85=85) |

### Key Lessons Learned

1. **Location accuracy is critical**: Washington D.C. wasn't the capital until 1800 - prompts must use correct historical locations
2. **Era field must match content**: VLM checks against the era, so 1920 suffrage victory can't be labeled 1848
3. **Specific prompts outperform generic ones**: "colonial settlement" fails; specific scene descriptions pass
4. **Rewriting prompts is more effective than regenerating with same prompt**

---

## 8. Technical Implementation

### Enhanced Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HISTORICAL IMAGE GEN LOOP v2.0                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: ERA CONTEXT LOADING                                   │
│  ─────────────────────────────                                  │
│  • Load lesson metadata (year, location, narrator)              │
│  • Query era-specific guidelines from this PRD                  │
│  • Build negative prompt from anachronism database              │
│  • Set clothing/architecture/props constraints                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2: ENHANCED PROMPT GENERATION (GPT-OS 20B)               │
│  ─────────────────────────────────────────                      │
│  INPUT:                                                         │
│  • Chapter text                                                 │
│  • ERA GUIDELINES block (from this PRD)                         │
│  • NARRATOR SPEC (age, gender, ethnicity)                       │
│  • AVOID list (era-specific anachronisms)                       │
│                                                                 │
│  OUTPUT (structured):                                           │
│  {                                                              │
│    "era": "exact time and place",                               │
│    "setting": "specific location description",                  │
│    "subject": "narrator description matching demographics",     │
│    "action": "what is happening",                               │
│    "clothing": "era-accurate attire from guidelines",           │
│    "props": ["period-accurate objects"],                        │
│    "architecture": "era and region appropriate",                │
│    "lighting": "period-appropriate (candle/oil/natural)",       │
│    "mood": "emotional atmosphere",                              │
│    "camera": "shot type (wide/medium/close)"                    │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 3: FLUX PROMPT CONSTRUCTION                              │
│  ─────────────────────────────────                              │
│  POSITIVE PROMPT:                                               │
│  "Historical illustration, {era}, {setting},                    │
│   {subject} wearing {clothing}, {action},                       │
│   {props visible}, {architecture}, {lighting},                  │
│   {mood} atmosphere, {camera} shot,                             │
│   oil painting style, muted historical colors,                  │
│   educational illustration, period accurate"                    │
│                                                                 │
│  NEGATIVE PROMPT:                                               │
│  "modern elements, {era-specific avoid list},                   │
│   anachronisms, plastic, synthetic materials,                   │
│   electric lighting (if pre-1880), photographs,                 │
│   bright saturated colors, cartoon style,                       │
│   fantasy elements, wrong time period items"                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 4: IMAGE GENERATION (Z-Image Turbo via ComfyUI)          │
│  ─────────────────────────────────────────────                  │
│  • Model: Z-Image Turbo (fast, 8 steps)                         │
│  • Resolution: 1024x768 (landscape) or 768x1024 (portrait)      │
│  • Steps: 8 (optimized for Z-Image Turbo)                       │
│  • Seed: Random or fixed for consistency                        │
│  • CRITICAL: Unload Ollama models before starting ComfyUI       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 5: HISTORICAL ACCURACY EVALUATION                        │
│  ─────────────────────────────────────────                      │
│  CRITICAL: Stop ComfyUI and unload models before VLM phase      │
│  CRITICAL: Use num_ctx: 8192 (not 65536 default) to fit in GPU  │
│                                                                 │
│  FIRST PASS: MiniCPM-V (minicpm-v:latest)                       │
│  Prompt: "Evaluate this image for historical accuracy.          │
│          Time period: {year}. Location: {location}.             │
│          Check for:                                             │
│          1. Clothing accuracy (score 0-25)                      │
│          2. Architecture accuracy (score 0-25)                  │
│          3. Props/technology accuracy (score 0-25)              │
│          4. Narrator representation (score 0-25)                │
│          Total score 0-100. List any anachronisms found."       │
│                                                                 │
│  SECOND PASS: Qwen2.5-VL (qwen2.5vl:latest) - stricter          │
│  Prompt: "Strict historical accuracy check for {year}.          │
│          Subject should be: {age} year old {gender} of          │
│          {ethnicity} background.                                │
│          Fail immediately if any of these appear: {avoid list}  │
│          Score 0-100 with detailed justification."              │
│                                                                 │
│  THRESHOLD: Average of both scores >= 75 to accept              │
│  (e.g., 98 + 50 = avg 74 = FAIL)                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 6: REFINEMENT LOOP                                       │
│  ─────────────────────────                                      │
│  IF score < 75:                                                 │
│    • Extract specific failures from VLM feedback                │
│    • Add failures to negative prompt                            │
│    • Strengthen positive prompt for failed areas                │
│    • Regenerate (max 3 attempts)                                │
│  ELSE:                                                          │
│    • Move to keepers folder                                     │
│    • Log success metadata                                       │
└─────────────────────────────────────────────────────────────────┘
```

### File Structure

```
scripts/
├── historical_image_gen_loop.py      # Core generation/evaluation functions
├── cross_lesson_batch.py             # Full batch pipeline (MAIN SCRIPT)
├── regenerate_failures.py            # Regenerate failed images
├── era_guidelines.py                 # Era-specific rules (CREATED)
├── narrator_specs.py                 # All 51 narrator demographics (CREATED)
├── evaluate_batch.py                 # Batch evaluation utilities
├── resume_second_pass.py             # Resume interrupted second-pass
├── finish_second_pass.py             # Complete second-pass evaluation
└── run_eval.py                       # Evaluation runner

generated_images/
├── batch_session_YYYYMMDD_HHMMSS/    # Session directory
│   ├── keepers/                      # Accepted images (score >= 75)
│   ├── fails/                        # Failed images for regeneration
│   └── all_prompts.json              # All generated prompts
```

### Configuration Updates

```python
# Current configuration in historical_image_gen_loop.py

# Ollama Configuration
OLLAMA_URL = "http://localhost:11434"
PROMPT_GEN_MODEL = "gpt-oss:20b"        # GPT-OS 20B for prompt generation
FIRST_PASS_MODEL = "minicpm-v:latest"   # MiniCPM-V (replaced llama3.2-vision)
SECOND_PASS_MODEL = "qwen2.5vl:latest"  # Qwen2.5-VL for strict second pass

# CRITICAL: VLM API options - must limit context to fit in GPU
VLM_OPTIONS = {
    "num_ctx": 8192,  # NOT 65536 default - will crash GPU
    "temperature": 0.1
}

# Generation Settings
DEFAULT_THRESHOLD = 75  # Average of both VLM scores must be >= 75
MAX_ATTEMPTS = 3
```

```python
# GPU Memory Management (CRITICAL)

def unload_ollama_model(model: str):
    """Unload model to free GPU memory."""
    requests.post(f"{OLLAMA_URL}/api/generate",
                  json={"model": model, "keep_alive": 0})

# Before image generation: unload all Ollama models
# Before VLM evaluation: stop ComfyUI process
```

VLM_EVALUATION_PROMPT = """
Evaluate this historical image for accuracy.
Time Period: {year}
Location: {location}
Expected Subject: {age}-year-old {gender} of {ethnicity} background

SCORING CRITERIA (0-100 total):
1. Clothing Accuracy (0-25): Does clothing match {year} {location}?
2. Architecture/Setting (0-25): Is the environment period-accurate?
3. Props/Technology (0-25): Are all objects era-appropriate?
4. Subject Representation (0-25): Does subject match narrator specs?

AUTOMATIC FAIL CONDITIONS:
- Any item from avoid list: {avoid_list}
- Modern materials (plastic, synthetic fabrics)
- Electric lighting before 1880
- Wrong ethnic representation for narrator

Provide:
- Total score (0-100)
- Breakdown by category
- List of any anachronisms found
- Specific recommendations for improvement
"""
```

---

## 9. Validation & Quality Assurance

### Pre-Generation Validation

Before generating any image, verify:

- [ ] Lesson year is correctly identified
- [ ] Narrator demographics loaded (age, gender, ethnicity)
- [ ] Era guidelines loaded for time period
- [ ] Location-specific rules applied
- [ ] Avoid list populated with era-specific items

### Post-Generation Checklist

For each generated image, verify:

| Category | Check | Pass/Fail |
|----------|-------|-----------|
| **Clothing** | Matches era guidelines | |
| | Appropriate to character's class | |
| | Gender-appropriate for era | |
| | Ethnicity-appropriate for era | |
| **Architecture** | Matches era and region | |
| | No anachronistic buildings | |
| | Appropriate scale | |
| **Props** | All items existed in era | |
| | Technology appropriate | |
| | No modern materials | |
| **Lighting** | Pre-1880: No electric | |
| | Appropriate sources shown | |
| **Subject** | Age appears correct | |
| | Gender matches narrator | |
| | Ethnicity matches narrator | |
| | Expression matches chapter mood | |

### Manual Review Process

1. **Batch Review**: After VLM passes, human reviews keepers
2. **Expert Consultation**: History teacher reviews for educational accuracy
3. **Student Testing**: Sample images tested with target audience
4. **Revision Cycle**: Failed images queued for regeneration with notes

### Quality Metrics Dashboard

Track across all 255 images:

| Metric | Target | Current |
|--------|--------|---------|
| First-pass VLM success | ≥80% | TBD |
| Second-pass VLM success | ≥95% | TBD |
| Manual review approval | ≥98% | TBD |
| Anachronisms detected | 0 | TBD |
| Narrator match rate | 100% | TBD |
| Average generation attempts | ≤2 | TBD |

---

## 10. Prompt Engineering Best Practices

### Template Structure

```
[Style Prefix] [Era/Time] [Location] [Subject] [Action] [Clothing] [Props] [Architecture] [Lighting] [Mood] [Camera] [Quality Suffix]
```

### Example Prompts by Era

#### Lesson 1: Spanish Colonial 1565
```
POSITIVE:
Historical oil painting illustration, 1565 Spanish Florida, St. Augustine settlement,
13-year-old Spanish boy with dark hair wearing linen shirt and wool breeches,
helping carry timber for fortification construction,
wooden palisade walls visible, palmetto trees, sandy ground,
warm afternoon sunlight, atmosphere of determination and hard work,
medium-wide shot showing settlement activity,
muted earth tones, educational illustration style, period accurate, no modern elements

NEGATIVE:
English colonial style, brick buildings, log cabins, modern clothing,
bright colors, electric lighting, synthetic materials, anachronisms,
feather headdresses, wrong Native American tribes, photography,
cartoon style, fantasy elements
```

#### Lesson 16: Valley Forge 1777
```
POSITIVE:
Historical oil painting illustration, winter 1777-1778 Valley Forge Pennsylvania,
Continental Army winter camp, 17-year-old soldier in ragged uniform,
threadbare blue coat patched with blanket, bare feet wrapped in cloth,
sitting by small fire outside log hut, Brown Bess musket beside him,
snow-covered ground, bare trees, smoke rising from crude chimneys,
dim winter afternoon light, atmosphere of suffering and endurance,
medium shot focusing on soldier's determination despite hardship,
muted gray-blue winter palette, educational illustration, period accurate

NEGATIVE:
clean uniforms, well-fed soldiers, modern winter gear, bright colors,
electric lighting, anachronisms, photography style, cartoon,
synthetic materials, paved roads
```

#### Lesson 45: Ellis Island 1892
```
POSITIVE:
Historical oil painting illustration, 1892 Ellis Island New York,
immigration processing hall, 14-year-old Italian immigrant boy,
wearing worn but clean European peasant clothing, cloth cap,
holding bundle of belongings, looking with wonder and anxiety,
great hall with high arched windows, crowds of immigrants,
American officials at processing desks, gas lighting and natural light,
atmosphere of hope mixed with uncertainty, medium shot,
warm sepia tones, educational illustration, period accurate

NEGATIVE:
modern building materials, electric lighting dominant, bright colors,
contemporary clothing, anachronisms, plastic, synthetic fabrics,
photography style, cartoon, airplane visible
```

### Flux-Specific Optimization

| Parameter | Recommended | Reason |
|-----------|-------------|--------|
| CFG Scale | 7-8 | Balance between prompt adherence and image quality |
| Steps | 35-50 | Higher for detailed historical accuracy |
| Sampler | DPM++ 2M Karras | Good for detailed illustrations |
| Resolution | 1024×768 | Landscape for scene context |
| Seed | Random → Fixed | Random for variety, fixed for consistency in series |

### Negative Prompt Layers

```
Layer 1 (Universal):
modern, contemporary, anachronism, plastic, synthetic, photography,
cartoon, anime, 3D render, video game, fantasy, sci-fi

Layer 2 (Era-Specific):
[Generated from ERA_GUIDELINES avoid list]

Layer 3 (Quality):
blurry, low quality, distorted, bad anatomy, wrong proportions,
text, watermark, signature, extra limbs
```

---

## 11. Implementation Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] Create era_guidelines.py with all 13 era specifications
- [x] Build narrator_specs.py with all 51 narrator demographics
- [x] Update VLM evaluation prompts with structured scoring
- [x] Implement GPU memory management

### Phase 2: Pipeline Enhancement ✅ COMPLETE
- [x] Integrate era guidelines into prompt generation
- [x] Add narrator demographic enforcement
- [x] Implement structured JSON output from GPT-OS
- [x] Create batch processing scripts (cross_lesson_batch.py)
- [x] Switch to Z-Image Turbo for faster generation
- [x] Switch to MiniCPM-V for more balanced first-pass evaluation

### Phase 3: Batch Generation ✅ COMPLETE (Lessons 3-51)
- [x] Generate images for Lessons 3-51 (265 images)
- [x] Achieve 100% acceptance rate after regeneration
- [x] Document common failure patterns
- [x] Create regeneration script for failures

### Phase 4: Lessons 1-2 & Regeneration ✅ COMPLETE
- [x] Generate images for Lessons 1-2 (11 images, 100% pass)
- [x] Regenerate 9 failing images - 3 fixed with new seeds
- [x] Rewrite prompts for 6 persistent failures - ALL PASSED
- [x] Fix historical errors (Philadelphia vs D.C., era mismatches)

### Phase 5: Quality Assurance (Optional - All Images Complete)
- [ ] Expert validation by history educators
- [ ] Integration with lesson viewer
- [ ] Student testing with target audience
- [ ] Accessibility review (alt-text generation)
- [ ] Documentation finalization

**Final Results: 276/276 images accepted (100% success rate)**

---

## Appendix A: Quick Reference Cards

### Clothing Quick Reference

| Era | Men | Women | Children |
|-----|-----|-------|----------|
| 1565-1600 | Doublet, hose, ruffs | Long gowns, high collars | Mini adult |
| 1600-1650 | Cavalier, wide collars | Bodices, long skirts | Mini adult |
| 1650-1700 | Waistcoats, cravats | Corsets, petticoats | Mini adult |
| 1700-1750 | Tricorn, periwigs | Sacque gowns, caps | Breeched at 6-7 |
| 1750-1780 | Revolutionary dress | Mob caps, fichus | Mini adult |
| 1780-1820 | High collars, tail coats | Empire waist | Simpler versions |
| 1820-1850 | Frock coats, top hats | Leg-of-mutton sleeves | Mini adult |
| 1850-1870 | Civil War uniforms | Hoop skirts, crinolines | Mini adult |
| 1870-1900 | Business suits | Bustles | Factory workers |
| 1900-1920 | Modern suits | Shirtwaists, long skirts | Progressive era |

### Architecture Quick Reference

| Era | New England | Mid-Atlantic | South | Frontier |
|-----|-------------|--------------|-------|----------|
| 1600s | Saltbox, thatch | Dutch stepped gable | Wood frame | N/A |
| 1700s | Georgian, brick | Georgian, townhouse | Plantation | Log cabins |
| 1800s | Federal, Greek Revival | Row houses | Antebellum | Sod houses |
| Post-1865 | Victorian | Industrial | Reconstruction | Railroads |

---

## Appendix B: Resources

### Historical Image References
- Library of Congress Digital Collections
- Metropolitan Museum of Art Costume Institute
- Colonial Williamsburg Visual Resources
- National Archives photograph collection
- Smithsonian American History images

### Academic Sources
- "What People Wore" series by clothing historians
- Museum of Fine Arts Boston costume collection
- American Antiquarian Society images
- State historical society archives

### Software Tools
- Stable Diffusion / Flux for generation
- Ollama for local LLM/VLM
- ComfyUI for pipeline orchestration
- Python for automation

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-10 | Initial pipeline PRD |
| 2.0 | 2026-01-12 | Complete rewrite with era-specific guidelines, narrator specs, detailed implementation |
| 2.1 | 2026-01-14 | Updated to reflect actual implementation: MiniCPM-V, Z-Image Turbo, GPU memory management, batch completion status, problem lessons guidance |
| 2.2 | 2026-01-14 | **PROJECT COMPLETE**: All 276 images generated and accepted. Documented fixes for problem lessons (L7, L19, L38, L49). Added lessons learned section. |

---

*This PRD should be reviewed quarterly and updated as new historical resources become available or as the generation pipeline improves.*
